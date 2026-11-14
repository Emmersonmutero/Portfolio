import { useMemo, useState } from 'react'
import { Github, Star } from 'lucide-react'
import { githubUrl } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { toProjects, type Project } from '../lib/projects'
import { useProjects } from '../lib/useProjects'

const categoryOrder = [
  'Full Stack',
  'Frontend',
  '3D / Creative',
  'Scripts & Automation',
]

const ProjectCard = ({ project }: { project: Project }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const imageSource = project.imageSources[imageIndex]

  const advanceImage = () => {
    setImageIndex((current) => current + 1)
  }

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        <a
          href={project.liveUrl || project.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}${project.liveUrl ? ' live demo' : ' on GitHub'}`}
          className="absolute inset-0"
        >
          {imageSource ? (
            <img
              src={imageSource}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={advanceImage}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 px-6 text-center">
              <span className="text-xl font-bold text-white">{project.title}</span>
            </div>
          )}
        </a>

        {project.featured && (
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
            <Star className="h-3 w-3" />
            Featured
          </div>
        )}
        {project.liveUrl && (
          <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
            Live
          </div>
        )}
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <p className="mb-2 text-sm font-medium text-purple-400">{project.category}</p>
          <h3 className="text-lg font-bold text-white sm:text-xl">{project.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-white/70">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 text-xs text-purple-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-purple-500/25"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-purple-400/50"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        </div>
      </div>
    </article>
  )
}

const Projects = () => {
  const { repos, unavailable } = useProjects()
  const projects = useMemo(() => toProjects(repos), [repos])
  const categories = categoryOrder.filter((category) =>
    projects.some((project) => project.category === category),
  )
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="relative py-20">
      <div className="container mx-auto px-6">
        <Reveal>
          <SectionHeading
            title="My Projects"
            subtitle="Everything I publish on GitHub shows up here automatically."
          />
        </Reveal>

        {categories.length > 1 && (
          <Reveal className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-4">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'border-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-purple-400/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </Reveal>
        )}

        {projects.length === 0 ? (
          <div className="py-12 text-center text-white/70">
            <p className="mb-3">No public projects to show yet.</p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Visit my GitHub
            </a>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {filteredProjects.map((project) => (
              <Reveal key={project.repoName}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="mb-6 text-sm text-white/60" aria-live="polite">
            {unavailable
              ? 'Showing saved projects (GitHub is unreachable right now).'
              : `Showing ${projects.length} ${projects.length === 1 ? 'project' : 'projects'} from GitHub.`}
          </p>
          <a
            href="#contact"
            className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/25 sm:px-8 sm:py-4"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
