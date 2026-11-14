import { useEffect, useSyncExternalStore } from 'react'
import snapshot from '../data/projects.generated.json'
import { githubUser } from '../data/site'
import type { RepoLite } from './projects'

type Snapshot = {
  generatedAt: string | null
  repos: RepoLite[]
}

type CachedRepos = {
  expiresAt: number
  repos: RepoLite[]
}

export type ProjectsState = {
  repos: RepoLite[]
  unavailable: boolean
}

const cacheKey = 'portfolio.github-projects'
const cacheDuration = 30 * 60 * 1000
const initialSnapshot = snapshot as Snapshot

let state: ProjectsState = { repos: initialSnapshot.repos, unavailable: false }
let started = false
const listeners = new Set<() => void>()

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = (): ProjectsState => state

const updateState = (next: ProjectsState) => {
  state = next
  listeners.forEach((listener) => listener())
}

const mergeRepos = (freshRepos: RepoLite[]): RepoLite[] => {
  const snapshotByName = new Map(
    initialSnapshot.repos.map((repo) => [repo.name.toLowerCase(), repo]),
  )
  const mergedByName = new Map<string, RepoLite>()

  for (const repo of freshRepos) {
    const saved = snapshotByName.get(repo.name.toLowerCase())
    mergedByName.set(repo.name.toLowerCase(), {
      ...saved,
      ...repo,
      languages: saved?.languages?.length ? saved.languages : repo.languages,
      stack: saved?.stack?.length ? saved.stack : repo.stack,
      summary: saved?.summary || repo.summary,
      liveUrl: saved?.liveUrl || repo.liveUrl,
    })
  }

  for (const repo of initialSnapshot.repos) {
    if (!mergedByName.has(repo.name.toLowerCase())) {
      mergedByName.set(repo.name.toLowerCase(), repo)
    }
  }

  return [...mergedByName.values()].sort(
    (left, right) => Date.parse(right.pushed_at) - Date.parse(left.pushed_at),
  )
}

const readCache = (): RepoLite[] | null => {
  try {
    const cachedValue = window.localStorage.getItem(cacheKey)
    if (!cachedValue) return null

    const cached = JSON.parse(cachedValue) as CachedRepos
    if (cached.expiresAt <= Date.now() || !Array.isArray(cached.repos)) {
      window.localStorage.removeItem(cacheKey)
      return null
    }

    return cached.repos
  } catch {
    return null
  }
}

const writeCache = (repos: RepoLite[]) => {
  try {
    const cached: CachedRepos = { expiresAt: Date.now() + cacheDuration, repos }
    window.localStorage.setItem(cacheKey, JSON.stringify(cached))
  } catch {
    return
  }
}

const startFetch = () => {
  if (started) return
  started = true

  const cachedRepos = readCache()
  if (cachedRepos) {
    updateState({ repos: mergeRepos(cachedRepos), unavailable: false })
    return
  }

  void fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=pushed`)
    .then(async (response) => {
      if (!response.ok || response.headers.get('X-RateLimit-Remaining') === '0') {
        throw new Error(`GitHub returned ${response.status}`)
      }
      const repos: unknown = await response.json()
      if (!Array.isArray(repos)) {
        throw new Error('GitHub returned an invalid repository list')
      }

      const freshRepos = repos as RepoLite[]
      writeCache(freshRepos)
      updateState({ repos: mergeRepos(freshRepos), unavailable: false })
    })
    .catch((error: unknown) => {
      console.error('Unable to refresh GitHub projects:', error)
      updateState({ repos: initialSnapshot.repos, unavailable: true })
    })
}

export const useProjects = (): ProjectsState => {
  const currentState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    startFetch()
  }, [])

  return currentState
}
