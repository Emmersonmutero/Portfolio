import { readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { detectPython, detectStack, readmeSummary } from './lib.mjs'

const username = 'Emmersonmutero'
const snapshotPath = fileURLToPath(new URL('../src/data/projects.generated.json', import.meta.url))
const temporaryPath = `${snapshotPath}.tmp`
const githubApi = 'https://api.github.com'
const rawBase = `https://raw.githubusercontent.com/${username}`

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

const request = async (url, { allowNotFound = false, headers = githubHeaders, method = 'GET' } = {}) => {
  const response = await fetch(url, {
    method,
    headers,
    signal: AbortSignal.timeout(8000),
  })

  if (allowNotFound && response.status === 404) return null
  if (!response.ok) throw new Error(`Request failed (${response.status}): ${url}`)
  return response
}

const fetchText = async (url) => {
  const response = await request(url, {
    allowNotFound: true,
    headers: { Accept: 'text/plain' },
  })
  return response ? response.text() : ''
}

const normalizeHomepage = (homepage) => {
  if (!homepage?.trim()) return null
  try {
    const parsed = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(homepage) ? homepage : `https://${homepage}`)
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : null
  } catch {
    return null
  }
}

const findLiveUrl = async (repo) => {
  const repoName = repo.name.toLowerCase()
  const candidates = [
    normalizeHomepage(repo.homepage),
    `https://${username.toLowerCase()}.github.io/${repo.name}/`,
    `https://${repoName}.vercel.app`,
    `https://${repoName}-emmersonmutero.vercel.app`,
    `https://${repoName}.netlify.app`,
  ].filter((url, index, urls) => url && urls.indexOf(url) === index)

  for (const candidate of candidates) {
    try {
      await request(candidate, {
        headers: {},
        method: 'HEAD',
      })
      return candidate
    } catch {
      continue
    }
  }

  return null
}

const mapWithConcurrency = async (items, concurrency, callback) => {
  const results = new Array(items.length)
  let nextIndex = 0

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await callback(items[index])
    }
  })

  await Promise.all(workers)
  return results
}

const enrichRepo = async (repo) => {
  const branch = encodeURIComponent(repo.default_branch || 'main')
  const repoName = encodeURIComponent(repo.name)
  const apiRepoUrl = `${githubApi}/repos/${username}/${repoName}`
  const rawRepoUrl = `${rawBase}/${repoName}/${branch}`

  const [languagesResponse, packageJsonText, requirementsText, readme] = await Promise.all([
    request(`${apiRepoUrl}/languages`).then((response) => response.json()),
    fetchText(`${rawRepoUrl}/package.json`),
    fetchText(`${rawRepoUrl}/requirements.txt`),
    fetchText(`${rawRepoUrl}/README.md`),
  ])
  const languages = Object.keys(languagesResponse)
  const stack = [
    ...detectStack(packageJsonText),
    ...detectPython(requirementsText, readme),
  ].filter((label, index, labels) => labels.indexOf(label) === index).slice(0, 6)

  return {
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    topics: repo.topics || [],
    fork: repo.fork,
    archived: repo.archived,
    pushed_at: repo.pushed_at,
    languages,
    stack,
    summary: readmeSummary(readme),
    liveUrl: await findLiveUrl(repo),
  }
}

const main = async () => {
  const response = await request(`${githubApi}/users/${username}/repos?per_page=100&sort=pushed`)
  const repos = await response.json()
  if (!Array.isArray(repos)) throw new Error('GitHub returned an invalid repository list')

  const eligibleRepos = repos.filter((repo) => !repo.fork && !repo.archived && repo.language !== null)
  const enrichedRepos = await mapWithConcurrency(eligibleRepos, 5, enrichRepo)
  const snapshot = {
    generatedAt: new Date().toISOString(),
    repos: enrichedRepos,
  }

  await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, snapshotPath)
  console.info(`Updated project snapshot with ${enrichedRepos.length} repositories.`)
}

try {
  await main()
} catch (error) {
  await unlink(temporaryPath).catch(() => {})
  console.warn('Project snapshot refresh failed; using the existing snapshot.', error)
  process.exitCode = 0
}
