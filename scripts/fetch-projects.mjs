import { rename, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { detectPython, detectStack, readmeSummary } from './lib.mjs'

const username = 'Emmersonmutero'
const githubApi = 'https://api.github.com'
const snapshotPath = fileURLToPath(new URL('../src/data/projects.generated.json', import.meta.url))
const temporaryPath = `${snapshotPath}.${process.pid}.tmp`
const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'EmmersonMutero-Portfolio-Build',
}

if (process.env.GITHUB_TOKEN) {
  githubHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function fetchGitHubJson(url) {
  const response = await fetch(url, {
    headers: githubHeaders,
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}): ${url}`)
  }
  return response.json()
}

async function fetchRawFile(owner, repo, branch, filename) {
  const branchPath = branch.split('/').map(encodeURIComponent).join('/')
  const url = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${branchPath}/${filename}`
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`Repository file request failed (${response.status}): ${url}`)
  }
  return response.text()
}

function unique(values) {
  return [...new Set(values)]
}

function normalizeUrl(url) {
  const value = url?.trim()
  if (!value) return null
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

function getLiveCandidates(repo) {
  const owner = repo.owner.login
  const repoName = repo.name.toLowerCase()
  const ownerName = owner.toLowerCase()
  const pagesUrl = repoName === `${ownerName}.github.io`
    ? `https://${ownerName}.github.io`
    : `https://${ownerName}.github.io/${encodeURIComponent(repo.name)}`

  return unique([
    normalizeUrl(repo.homepage),
    pagesUrl,
    `https://${repoName}.vercel.app`,
    `https://${repoName}-emmersonmutero.vercel.app`,
    `https://${repoName}.netlify.app`,
  ].filter(Boolean))
}

async function findLiveUrl(repo) {
  for (const url of getLiveCandidates(repo)) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
      })
      if (response.status < 400) return url
    } catch {
      // Try the next candidate when a host is offline or does not respond.
    }
  }
  return null
}

async function mapWithConcurrency(values, limit, mapper) {
  const results = new Array(values.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++
      results[index] = await mapper(values[index])
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, values.length) }, () => worker()),
  )
  return results
}

async function buildRepoLite(repo) {
  const owner = repo.owner.login
  const branch = repo.default_branch || 'main'
  const [languages, packageJsonText, requirementsText, readme] = await Promise.all([
    fetchGitHubJson(`${githubApi}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo.name)}/languages`),
    fetchRawFile(owner, repo.name, branch, 'package.json'),
    fetchRawFile(owner, repo.name, branch, 'requirements.txt'),
    fetchRawFile(owner, repo.name, branch, 'README.md'),
  ])
  const stack = unique([
    ...detectStack(packageJsonText),
    ...detectPython(requirementsText, readme),
  ]).slice(0, 6)
  const liveUrl = await findLiveUrl(repo)

  return {
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    topics: repo.topics ?? [],
    fork: repo.fork,
    archived: repo.archived,
    pushed_at: repo.pushed_at,
    languages: Object.keys(languages),
    stack,
    summary: readmeSummary(readme),
    liveUrl,
  }
}

async function main() {
  try {
    const repositories = await fetchGitHubJson(
      `${githubApi}/users/${username}/repos?per_page=100&sort=pushed`,
    )
    if (!Array.isArray(repositories)) {
      throw new Error('GitHub returned an invalid repository list')
    }

    const eligibleRepositories = repositories.filter(
      (repo) => !repo.fork && !repo.archived && repo.language !== null,
    )
    const repos = await mapWithConcurrency(eligibleRepositories, 5, buildRepoLite)
    const contents = `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      repos,
    }, null, 2)}\n`

    await writeFile(temporaryPath, contents, 'utf8')
    await rename(temporaryPath, snapshotPath)
  } catch (error) {
    await rm(temporaryPath, { force: true }).catch(() => {})
    console.warn(
      'Project snapshot refresh failed; keeping the existing snapshot.',
      error instanceof Error ? error.message : error,
    )
  }
}

await main()
