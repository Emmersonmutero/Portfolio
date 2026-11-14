import { EXCLUDED_REPOS, overrides } from '../data/overrides'

export type RepoLite = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
  languages?: string[]
  stack?: string[]
  summary?: string | null
  liveUrl?: string | null
}

export type Project = {
  repoName: string
  title: string
  description: string
  category: string
  technologies: string[]
  htmlUrl: string
  liveUrl: string | null
  imageSources: string[]
  featured: boolean
}

const excludedNames = new Set([
  ...EXCLUDED_REPOS.map((name) => name.toLowerCase()),
  'portfolio',
  'emmersonmutero',
])

const getOverride = (name: string) =>
  Object.entries(overrides).find(([repoName]) => repoName.toLowerCase() === name.toLowerCase())?.[1]

const normalizeUrl = (value: string | null | undefined): string | null => {
  if (!value?.trim()) return null

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

const titleFromName = (name: string): string =>
  name
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ')

const categoryFor = (repo: RepoLite, stack: string[], languages: string[]): string => {
  const topics = repo.topics.map((topic) => topic.toLowerCase())
  const description = [repo.description, repo.summary].filter(Boolean).join(' ')
  const searchable = [...stack, ...languages].map((item) => item.toLowerCase())

  if (
    topics.some((topic) => ['3d', 'spline', 'threejs', 'webgl'].includes(topic)) ||
    /\b3d\b|spline|three\.?js/i.test(description)
  ) {
    return '3D / Creative'
  }

  if (searchable.some((item) => ['python', 'shell', 'jupyter'].includes(item))) {
    return 'Scripts & Automation'
  }

  if (
    topics.some((topic) => ['frontend', 'landing-page'].includes(topic)) ||
    (languages.length > 0 && languages.every((language) => ['html', 'css', 'scss'].includes(language.toLowerCase())))
  ) {
    return 'Frontend'
  }

  const backendTech = ['next.js', 'nuxt', 'express', 'supabase', 'firebase', 'prisma', 'mongodb', 'stripe']
  if (stack.length > 0 && !stack.some((item) => backendTech.includes(item.toLowerCase()))) {
    return 'Frontend'
  }

  return 'Full Stack'
}

const techChips = (repo: RepoLite, stack: string[], languages: string[]): string[] => {
  const ignoredTopics = new Set(['portfolio', 'project', 'hacktoberfest', 'vercel', 'github'])
  const labels = [...stack, ...languages, ...repo.topics.filter((topic) => !ignoredTopics.has(topic.toLowerCase()))]
  const seen = new Set<string>()

  return labels
    .map((label) => label.trim())
    .filter((label) => {
      const key = label.toLowerCase()
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 6)
}

const formatTechList = (technologies: string[]): string => {
  if (technologies.length < 2) return technologies[0] || 'modern technologies'
  if (technologies.length === 2) return technologies.join(' and ')
  return `${technologies.slice(0, -1).join(', ')} and ${technologies[technologies.length - 1]}`
}

export const toProjects = (repos: RepoLite[]): Project[] =>
  repos
    .filter((repo) => {
      const override = getOverride(repo.name)
      return !repo.fork && !repo.archived && !excludedNames.has(repo.name.toLowerCase()) && !override?.hidden
    })
    .sort((left, right) => Date.parse(right.pushed_at) - Date.parse(left.pushed_at))
    .map((repo, index) => {
      const override = getOverride(repo.name)
      const stack = repo.stack || []
      const languages = repo.languages?.length
        ? repo.languages
        : repo.language
          ? [repo.language]
          : []
      const liveUrl = normalizeUrl(override?.liveUrl || repo.homepage || repo.liveUrl)
      const title = override?.title || titleFromName(repo.name)
      const imageSources = [
        override?.image,
        liveUrl && `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800&waitForTimeout=1500`,
        `https://opengraph.githubassets.com/1/Emmersonmutero/${encodeURIComponent(repo.name)}`,
      ].filter((source): source is string => Boolean(source))

      return {
        repoName: repo.name,
        title,
        description:
          override?.description ||
          repo.description ||
          repo.summary ||
          `A project built with ${formatTechList((stack.length ? stack : languages).slice(0, 3))}.`,
        category: override?.category || categoryFor(repo, stack, languages),
        technologies: techChips(repo, stack, languages),
        htmlUrl: repo.html_url,
        liveUrl,
        imageSources,
        featured:
          override?.featured === true ||
          index === 0 ||
          repo.topics.some((topic) => topic.toLowerCase() === 'featured'),
      }
    })
