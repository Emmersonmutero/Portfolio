import { EXCLUDED_REPOS, overrides, type RepoOverride } from '../data/overrides'

export interface RepoLite {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
  languages: string[]
  stack: string[]
  summary: string | null
  liveUrl: string | null
}

export interface Project {
  name: string
  title: string
  description: string
  htmlUrl: string
  liveUrl: string | null
  category: string
  tech: string[]
  imageSources: string[]
  featured: boolean
}

const excludedTechTopics = new Set([
  'portfolio',
  'project',
  'hacktoberfest',
  'vercel',
  'github',
])

const backendTech = new Set([
  'next.js',
  'nuxt',
  'express',
  'supabase',
  'firebase',
  'prisma',
  'mongodb',
  'stripe',
])

const findOverride = (repoName: string): RepoOverride | undefined => {
  const key = Object.keys(overrides).find(
    (name) => name.toLowerCase() === repoName.toLowerCase(),
  )

  return key ? overrides[key] : undefined
}

const formatTitle = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const normalizeUrl = (url: string | null | undefined): string | null => {
  const trimmed = url?.trim()
  if (!trimmed) return null
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

const formatTopic = (topic: string): string =>
  topic.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

const getTech = (repo: RepoLite): string[] => {
  const topics = repo.topics
    .filter((topic) => !excludedTechTopics.has(topic.toLowerCase()))
    .map(formatTopic)
  const seen = new Set<string>()

  return [...repo.stack, ...repo.languages, ...topics].filter((tech) => {
    const key = tech.trim().toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 6)
}

const getCategory = (repo: RepoLite): string => {
  const topics = repo.topics.map((topic) => topic.toLowerCase())
  const description = repo.description ?? ''
  const text = `${description} ${repo.summary ?? ''}`.toLowerCase()

  if (
    topics.some((topic) => ['3d', 'spline', 'threejs', 'webgl'].includes(topic)) ||
    /\b(3d|spline|three\.js)\b/i.test(text)
  ) {
    return '3D / Creative'
  }

  const tech = [...repo.languages, ...repo.stack, repo.language ?? '']
    .map((item) => item.toLowerCase())
  if (tech.some((item) => ['python', 'shell', 'jupyter', 'jupyter notebook'].includes(item))) {
    return 'Scripts & Automation'
  }

  const languages = [...new Set(
    [...repo.languages, ...(repo.language ? [repo.language] : [])]
      .map((item) => item.toLowerCase()),
  )]
  const onlyFrontendLanguages = languages.length > 0 &&
    languages.every((language) => ['html', 'css', 'scss'].includes(language))

  if (
    onlyFrontendLanguages ||
    topics.some((topic) => ['frontend', 'landing-page'].includes(topic))
  ) {
    return 'Frontend'
  }

  if (repo.stack.length > 0 && !repo.stack.some((item) => backendTech.has(item.toLowerCase()))) {
    return 'Frontend'
  }

  return 'Full Stack'
}

export const toProjects = (repos: RepoLite[]): Project[] => {
  const excludedNames = new Set(EXCLUDED_REPOS.map((name) => name.toLowerCase()))
  const eligible = repos
    .filter((repo) => {
      const override = findOverride(repo.name)
      const name = repo.name.toLowerCase()

      return !repo.fork &&
        !repo.archived &&
        name !== 'portfolio' &&
        name !== 'emmersonmutero' &&
        !excludedNames.has(name) &&
        !override?.hidden
    })
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))

  return eligible.map((repo, index) => {
    const override = findOverride(repo.name)
    const title = override?.title ?? formatTitle(repo.name)
    const liveUrl = normalizeUrl(override?.liveUrl) ??
      normalizeUrl(repo.homepage) ??
      normalizeUrl(repo.liveUrl)
    const detectedTech = [...repo.stack, ...repo.languages, ...(repo.language ? [repo.language] : [])]
    const description = override?.description ?? (
      repo.description?.trim() ||
      repo.summary?.trim() ||
      `A project built with ${detectedTech.slice(0, 3).join(', ') || 'modern technologies'}.`
    )
    const imageSources = [
      override?.image,
      liveUrl
        ? `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800&waitForTimeout=1500`
        : null,
      `https://opengraph.githubassets.com/1/Emmersonmutero/${encodeURIComponent(repo.name)}`,
    ].filter((source): source is string => Boolean(source))
    const isTopicFeatured = repo.topics.some((topic) => topic.toLowerCase() === 'featured')

    return {
      name: repo.name,
      title,
      description,
      htmlUrl: repo.html_url,
      liveUrl,
      category: override?.category ?? getCategory(repo),
      tech: getTech(repo),
      imageSources,
      featured: override?.featured ?? (index === 0 || isTopicFeatured),
    }
  })
}
