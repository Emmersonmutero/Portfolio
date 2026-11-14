import { useEffect, useState } from 'react'
import { Github } from 'lucide-react'

type GitHubRepository = {
  id: number
  name: string
  description: string | null
  html_url: string
}

const Projects = () => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Emmersonmutero/repos?per_page=100&sort=pushed')
        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`)
        }
        setRepositories(await response.json() as GitHubRepository[])
      } catch (error) {
        console.error('Unable to load GitHub repositories:', error)
      }
    }

    void loadRepositories()
  }, [])

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl sm:text-5xl md:text-7xl font-bold mb-12">
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {repositories.map((repository) => (
            <a
              key={repository.id}
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-purple-400/50"
            >
              <Github className="mb-4 text-purple-400" />
              <h3 className="text-xl font-bold text-white">{repository.name}</h3>
              <p className="mt-2 text-sm text-white/70">
                {repository.description || 'View this project on GitHub.'}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
