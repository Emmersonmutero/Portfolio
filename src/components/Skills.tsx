
import React from 'react'
import { motion } from 'framer-motion'
import {Globe, Palette, Zap, Atom, Wind, Box, Rocket, Database, Flame, Figma, Code2, Server} from 'lucide-react'

const Skills = () => {
  const skills = [
    { name: 'HTML', icon: Globe, category: 'Frontend', color: 'from-orange-500 to-red-500' },
    { name: 'CSS', icon: Palette, category: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', icon: Zap, category: 'Frontend', color: 'from-yellow-500 to-orange-500' },
    { name: 'React', icon: Atom, category: 'Frontend', color: 'from-cyan-500 to-blue-500' },
    { name: 'Tailwind', icon: Wind, category: 'Frontend', color: 'from-teal-500 to-cyan-500' },
    { name: 'Python', icon: Code2, category: 'Backend', color: 'from-green-500 to-blue-500' },
    { name: '3D Web', icon: Box, category: 'Design', color: 'from-purple-500 to-pink-500' },
    { name: 'Next.js', icon: Rocket, category: 'Framework', color: 'from-gray-600 to-gray-800' },
    { name: 'Supabase', icon: Database, category: 'Backend', color: 'from-green-500 to-emerald-500' },
    { name: 'Firebase', icon: Flame, category: 'Backend', color: 'from-orange-500 to-yellow-500' },
    { name: 'Spline', icon: Box, category: 'Design', color: 'from-indigo-500 to-purple-500' },
    { name: 'Figma', icon: Figma, category: 'Design', color: 'from-pink-500 to-violet-500' },
  ]

  const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
    const IconComponent = skill.icon

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -15, 
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        className="group relative"
      >
        <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/30 group-hover:shadow-2xl group-hover:shadow-purple-500/25 overflow-hidden">
          
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-all duration-700 rounded-3xl`} />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-100" />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-300" />
            <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-200" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Icon container with enhanced styling */}
            <div className={`relative w-20 h-20 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-all duration-300" />
              <IconComponent 
                size={32} 
                className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" 
              />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150`} />
            </div>
            
            {/* Skill name with enhanced typography */}
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-500">
              {skill.name}
            </h3>
            
            {/* Category badge with enhanced styling */}
            <span className={`px-4 py-2 text-sm font-semibold bg-white/10 text-white/80 rounded-full border border-white/20 group-hover:bg-gradient-to-r group-hover:${skill.color} group-hover:text-white group-hover:border-transparent group-hover:shadow-lg transition-all duration-500 backdrop-blur-sm`}>
              {skill.category}
            </span>
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-150" />
          
          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${skill.color} blur-sm opacity-30`} />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Technologies and tools I use to craft exceptional digital experiences
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Enhanced background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 via-pink-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </div>
    </section>
  )
}

export default Skills
