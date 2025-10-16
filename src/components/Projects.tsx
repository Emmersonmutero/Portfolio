
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {ExternalLink, Github, Eye, Code, Zap, Star, Loader2} from 'lucide-react'
import { fetchGitHubRepos, fetchVercelDeployments, transformToProjects, type Project } from '../services/api'

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const [repos, deployments] = await Promise.all([
        fetchGitHubRepos('emmersonmutero'),
        fetchVercelDeployments('syOKxX8aycgEnhDrlTtdl8w0')
      ])

      const transformedProjects = transformToProjects(repos, deployments)
      setProjects(transformedProjects)
    } catch (err) {
      setError('Failed to load projects. Please try again later.')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()

    // Set up periodic refresh every 5 minutes
    const interval = setInterval(fetchProjects, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])


  const categories = ["All", "Full Stack", "E-Commerce", "Data Science", "Social Media", "Fintech", "Healthcare", "VR/AR", "AI/ML", "Education", "Content Management", "Food Delivery"]
  const [activeCategory, setActiveCategory] = React.useState("All")

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-20 relative flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white/70 text-lg">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen py-20 relative flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <Code className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Error Loading Projects</p>
          </div>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={fetchProjects}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="min-h-screen py-20 relative flex items-center justify-center">
        <div className="text-center">
          <div className="text-white/70 mb-4">
            <Github className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">No Projects Found</p>
          </div>
          <p className="text-white/60 mb-6">
            No deployed projects found. Make sure your GitHub repositories are connected to Vercel deployments.
          </p>
          <button
            onClick={fetchProjects}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </section>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">Featured Work</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Explore my comprehensive portfolio showcasing innovative solutions, cutting-edge technologies, 
            and creative problem-solving across various domains and industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 px-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white'
                  : 'bg-white/5 backdrop-blur-sm border-white/10 text-white/70 hover:border-purple-400/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 ${
                project.highlight ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
              whileHover={{ y: -10 }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status}
                </div>
              </div>

              {/* Highlight Badge */}
              {project.highlight && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 space-y-4">
                {/* Category & Title */}
                <div>
                  <div className="text-sm text-purple-400 font-medium mb-2">{project.category}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/60"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="px-2 py-1 text-xs text-purple-400">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-full text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-2">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">View Project</span>
                    <span className="sm:hidden">View</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm hover:border-purple-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-white/70 mb-6 text-lg">
            Interested in collaborating on your next project?
          </p>
          <motion.button
            onClick={scrollToContact}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
