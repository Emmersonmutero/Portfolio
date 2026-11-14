
import { motion } from 'framer-motion'
import {Linkedin, Github, Twitter, Instagram} from 'lucide-react'
import { githubUrl, linkedInUrl } from '../data/site'

const Footer = () => {
  const quickLinks = [
    'Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: linkedInUrl },
    { name: 'GitHub', icon: Github, href: githubUrl },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/emmerson_mutero' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/emmerson_mutero' }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient wave accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Emmerson
            </h3>
            <p className="text-white/70 leading-relaxed">
              Creating immersive digital experiences that captivate and inspire. 
              Let's build the future of web together.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="text-white/60 hover:text-purple-400 transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          >
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-purple-400/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <IconComponent className="w-5 h-5 text-white/70 group-hover:text-purple-400 transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          className="border-t border-white/10 pt-8 text-center"
        >
          <p className="text-white/60">
            © {new Date().getFullYear()} Emmerson Mutero.
          </p>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
    </footer>
  )
}

export default Footer
