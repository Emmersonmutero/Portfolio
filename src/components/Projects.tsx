import { motion } from 'framer-motion'

const Projects = () => (
  <section id="projects" className="min-h-screen py-20 relative">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
          Projects will be available here soon.
        </p>
      </motion.div>
    </div>
  </section>
)

export default Projects
