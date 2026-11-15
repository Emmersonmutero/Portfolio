import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { site } from '../data/site'
import { useProjects } from '../lib/useProjects'
import type { Project } from '../lib/projects'

const ProjectCard = ({ project }: { project: Project }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const imageHref = project.liveUrl ?? project.htmlUrl
  const hasImage = imageIndex < project.imageSources.length

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-purple-400/50"
      whileHover={{ y: -8 }}
    >
      <a
        href={imageHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} ${project.liveUrl ? 'live demo' : 'GitHub repository'}`}
        className="relative block aspect-video overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950"
      >
        {hasImage ? (
          <img
            src={project.imageSources[imageIndex]}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageIndex((current) => current + 1)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/80 via-slate-900 to-blue-900 p-6 text-center">
            <span className="text-xl font-semibold text-white/90">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm">
            <Star className="h-3 w-3" />
            Featured
          </span>
        )}
        {project.liveUrl && (
          <span className="absolute right-4 top-4 rounded-full border border-green-400/30 bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300 backdrop-blur-sm">
            Live
          </span>
        )}
      </a>

      <div className="flex h-full flex-col p-5 sm:p-6">
        <p className="mb-2 text-sm font-medium text-purple-400">{project.category}</p>
        <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-purple-300">
          {project.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-white/70">
          {project.description}
        </p>
        {project.tech.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 text-xs text-purple-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 pt-1">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:border-purple-400/50"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Github className="h-4 w-4" />
            Code
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

const Projects = () => {
  const { projects, loading, unreachable } = useProjects()
  const [activeCategory, setActiveCategory] = useState('All')
  const categoryOrder = ['Full Stack', 'Frontend', '3D / Creative', 'Scripts & Automation']
  const categories = categoryOrder.filter((category) =>
    projects.some((project) => project.category === category),
  )
  const visibleCategories = categories.length > 1 ? ['All', ...categories] : []
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            title="My Projects"
            subtitle="Everything I publish on GitHub shows up here automatically."
          />
        </Reveal>

        {visibleCategories.length > 0 && (
          <Reveal className="mb-10 flex flex-wrap justify-center gap-3">
            {visibleCategories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  activeCategory === category
                    ? 'border-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-purple-400/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {category}
              </motion.button>
            ))}
          </Reveal>
        )}

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.name} delay={Math.min(index % 3, 2) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center">
            <p className="mb-3 text-lg font-semibold text-white">No projects to show yet.</p>
            <p className="text-white/70">
              Visit my{' '}
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 underline underline-offset-4 hover:text-purple-200"
              >
                GitHub profile
              </a>
              .
            </p>
          </Reveal>
        )}

        <p className="mt-8 text-center text-sm text-white/55" aria-live="polite">
          {unreachable
            ? 'Showing saved projects (GitHub is unreachable right now).'
            : loading
              ? 'Checking GitHub for recent projects...'
              : `Showing ${projects.length} projects from GitHub.`}
        </p>

        <Reveal className="mt-12 text-center">
          <motion.button
            type="button"
            onClick={scrollToContact}
            className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-shadow hover:shadow-purple-500/25 sm:px-8 sm:py-4"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Let's Work Together
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}

export default Projects
