import { useEffect, useSyncExternalStore } from 'react'
import snapshot from '../data/projects.generated.json'
import { site } from '../data/site'
import { toProjects, type RepoLite } from './projects'

interface GitHubRepoResponse {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
}

interface CachedProjects {
  savedAt: number
  repos: RepoLite[]
}

interface ProjectsState {
  repos: RepoLite[]
  loading: boolean
  unreachable: boolean
}

const CACHE_KEY = 'portfolio-projects-v1'
const CACHE_DURATION = 30 * 60 * 1000
const snapshotRepos = snapshot.repos as RepoLite[]

let state: ProjectsState = {
  repos: snapshotRepos,
  loading: false,
  unreachable: false,
}
let started = false
const listeners = new Set<() => void>()

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = (): ProjectsState => state

const updateState = (next: ProjectsState): void => {
  state = next
  listeners.forEach((listener) => listener())
}

const readCache = (): RepoLite[] | null => {
  try {
    const value = localStorage.getItem(CACHE_KEY)
    if (!value) return null
    const cached = JSON.parse(value) as CachedProjects
    if (
      !Number.isFinite(cached.savedAt) ||
      Date.now() - cached.savedAt >= CACHE_DURATION ||
      !Array.isArray(cached.repos)
    ) {
      return null
    }
    return cached.repos
  } catch {
    return null
  }
}

const writeCache = (repos: RepoLite[]): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }))
  } catch {
    // Storage can be unavailable in private browsing; keep the in-memory data.
  }
}

const normalizeRepo = (repo: GitHubRepoResponse): RepoLite => ({
  ...repo,
  topics: Array.isArray(repo.topics) ? repo.topics : [],
  languages: repo.language ? [repo.language] : [],
  stack: [],
  summary: null,
  liveUrl: null,
})

const mergeRepos = (freshRepos: RepoLite[]): RepoLite[] => {
  const reposByName = new Map(
    snapshotRepos.map((repo) => [repo.name.toLowerCase(), repo]),
  )

  freshRepos.forEach((repo) => {
    const snapshotRepo = reposByName.get(repo.name.toLowerCase())
    reposByName.set(repo.name.toLowerCase(), {
      ...snapshotRepo,
      ...repo,
      languages: snapshotRepo?.languages.length ? snapshotRepo.languages : repo.languages,
      stack: snapshotRepo?.stack ?? repo.stack,
      summary: snapshotRepo?.summary ?? repo.summary,
      liveUrl: snapshotRepo?.liveUrl ?? repo.liveUrl,
    })
  })

  return [...reposByName.values()]
}

const loadProjects = async (): Promise<void> => {
  const cachedRepos = readCache()
  if (cachedRepos) {
    updateState({
      repos: mergeRepos(cachedRepos),
      loading: false,
      unreachable: false,
    })
    return
  }

  updateState({ ...state, loading: true })

  try {
    const response = await fetch(
      `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed`,
    )
    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`)
    }
    const data: unknown = await response.json()
    if (!Array.isArray(data)) {
      throw new Error('GitHub API returned an invalid repository list')
    }

    const repos = mergeRepos((data as GitHubRepoResponse[]).map(normalizeRepo))
    writeCache(repos)
    updateState({ repos, loading: false, unreachable: false })
  } catch {
    updateState({ ...state, loading: false, unreachable: true })
  }
}

const startLoading = (): void => {
  if (started) return
  started = true
  void loadProjects()
}

export const useProjects = () => {
  const currentState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    startLoading()
  }, [])

  return {
    projects: toProjects(currentState.repos),
    loading: currentState.loading,
    unreachable: currentState.unreachable,
  }
}
