export type RepoOverride = {
  title?: string
  description?: string
  image?: string
  liveUrl?: string
  category?: string
  featured?: boolean
  hidden?: boolean
}

export const overrides: Record<string, RepoOverride> = {}

export const EXCLUDED_REPOS = [
  'Emmerson-Mutero-Uncommon-Software-engineer-assessment',
]
