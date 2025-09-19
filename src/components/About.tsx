

import { motion } from 'framer-motion'

const About = () => {
  const highlights = [
    { title: 'Experience', value: '5+ Years', icon: '💼' },
    { title: 'Technologies', value: '15+ Tools', icon: '⚡' },
    { title: 'Specialties', value: '3D Web Design', icon: '🎨' },
    { title: 'Achievements', value: '50+ Projects', icon: '🏆' },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Me</span>
          </h2>
        </motion.div>

        {/* Bio - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-6 mb-16"
        >
          <h3 className="text-3xl font-bold">Passionate Developer</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            I'm Emmerson Mutero, a creative web developer with a passion for crafting immersive digital experiences. 
            With over 5 years of experience, I specialize in modern web technologies and 3D web design, bringing 
            ideas to life through clean code and stunning visuals.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            My journey began with a curiosity for how things work on the web, and it has evolved into a career 
            dedicated to pushing the boundaries of what's possible in web development.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {item.value}
              </div>
              <div className="text-white/60">{item.title}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
