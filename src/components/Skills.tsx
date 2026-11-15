
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Globe, Palette, Zap, Atom, Wind, Box, Rocket, Database, Flame, Figma, Code2 } from 'lucide-react'

type IconProps = {
  size?: number | string
  className?: string
}

type Skill = {
  name: string
  icon: ComponentType<IconProps>
  category: string
  color: string
}

const Skills = () => {
  const skills = [
    // Core Frontend
    { name: 'React', icon: Atom, category: 'Frontend', color: 'from-cyan-400 via-blue-500 to-indigo-500' },
    { name: 'JavaScript', icon: Zap, category: 'Frontend', color: 'from-yellow-400 via-orange-500 to-red-500' },
    { name: 'HTML5', icon: Globe, category: 'Frontend', color: 'from-orange-500 via-red-500 to-pink-500' },
    { name: 'CSS3', icon: Palette, category: 'Frontend', color: 'from-blue-500 via-cyan-500 to-teal-500' },
    { name: 'Tailwind', icon: Wind, category: 'Frontend', color: 'from-teal-400 via-cyan-500 to-blue-500' },

    // Frameworks & Libraries
    { name: 'Next.js', icon: Rocket, category: 'Framework', color: 'from-gray-600 via-slate-700 to-black' },

    // Backend & Database
    { name: 'Python', icon: Code2, category: 'Backend', color: 'from-green-400 via-blue-500 to-purple-500' },
    { name: 'Supabase', icon: Database, category: 'Backend', color: 'from-green-400 via-emerald-500 to-cyan-500' },
    { name: 'Firebase', icon: Flame, category: 'Backend', color: 'from-orange-400 via-red-500 to-pink-500' },

    // Design & 3D
    { name: 'Figma', icon: Figma, category: 'Design', color: 'from-pink-500 via-violet-500 to-purple-500' },
    { name: 'Spline 3D', icon: Box, category: 'Design', color: 'from-purple-500 via-pink-500 to-rose-500' }
  ]


  const SkillCard = ({ skill, index }: { skill: Skill, index: number }) => {
    const IconComponent = skill.icon

    return (
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.6, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ 
          duration: 1, 
          delay: index * 0.06,
          type: "spring",
          stiffness: 100,
          damping: 25
        }}
        viewport={{ once: true, margin: '0px 0px 200px 0px' }}
        whileHover={{ 
          y: -25, 
          scale: 1.1,
          rotateY: 10,
          rotateX: 8,
          transition: { duration: 0.4, type: "spring", stiffness: 300 }
        }}
        className="group relative cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div className="relative bg-gradient-to-br from-white/10 via-white/15 to-white/8 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sm:p-8 h-full transition-all duration-700 group-hover:border-white/50 group-hover:shadow-2xl group-hover:shadow-purple-500/40 overflow-hidden transform-gpu">
          
          {/* Dynamic morphing background layers */}
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-30 transition-all duration-1200 rounded-3xl`} />
          <div className={`absolute inset-0 bg-gradient-to-tl ${skill.color} opacity-0 group-hover:opacity-20 transition-all duration-1200 delay-300 rounded-3xl blur-xl`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-15 transition-all duration-1200 delay-600 rounded-3xl blur-2xl`} />
          
          {/* Enhanced floating holographic particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
                style={{
                  top: `${15 + i * 12}%`,
                  left: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [-15, -40, -15],
                  x: [-8, 12, -8],
                  opacity: [0, 1, 0],
                  scale: [0.3, 1.5, 0.3],
                }}
                transition={{
                  duration: 4 + i * 0.6,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Content with enhanced styling */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* Enhanced icon container with multiple layers */}
            <div className="relative">
              <motion.div 
                className={`relative w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br ${skill.color} rounded-3xl flex items-center justify-center shadow-2xl`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 8,
                  transition: { duration: 0.4 }
                }}
              >
                {/* Multiple holographic layers for depth */}
                <div className="absolute inset-0 bg-white/25 rounded-3xl group-hover:bg-white/40 transition-all duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${skill.color} rounded-3xl opacity-70 group-hover:opacity-90 transition-all duration-700 blur-sm`} />
                <div className="absolute inset-0 bg-white/10 rounded-3xl group-hover:bg-white/20 transition-all duration-700 blur-lg" />
                
                <IconComponent
                  size={typeof window !== 'undefined' ? (window.innerWidth < 640 ? 32 : 42) : 32}
                  className="text-white relative z-10 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-2xl"
                />
                
                {/* Enhanced multi-layer glow effects */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-800 scale-150`} />
                <div className={`absolute inset-0 bg-gradient-to-tl ${skill.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-1200 scale-200`} />
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1500 scale-250`} />
              </motion.div>
              
              {/* Enhanced orbiting elements */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 bg-white/70 rounded-full shadow-lg"
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400/80 rounded-full shadow-lg"
                animate={{
                  rotate: -360,
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Enhanced skill name with multiple gradient animations */}
            <motion.h3 
              className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-800"
              whileHover={{ scale: 1.08 }}
            >
              {skill.name}
            </motion.h3>
            
            
            {/* Enhanced category badge */}
            <motion.span 
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-white/15 text-white/90 rounded-full border border-white/30 group-hover:bg-gradient-to-r group-hover:${skill.color} group-hover:text-white group-hover:border-transparent group-hover:shadow-xl transition-all duration-800 backdrop-blur-sm`}
              whileHover={{ scale: 1.08 }}
            >
              {skill.category}
            </motion.span>
          </div>

          {/* Enhanced decorative elements with complex animations */}
          <motion.div 
            className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-500/25 via-blue-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1200"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 w-32 h-32 sm:w-44 sm:h-44 bg-gradient-to-tr from-cyan-500/25 via-purple-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1200 delay-400"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Enhanced prismatic border effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-800">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${skill.color} blur-sm opacity-50 animate-pulse`} />
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-l ${skill.color} blur-lg opacity-30`} />
          </div>
          
          {/* Enhanced corner accents */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600" />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-300" />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-150" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-450" />
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced section header with improved animations */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          className="text-center mb-20 sm:mb-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            className="relative inline-block mb-8 sm:mb-10"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              My{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Skills
                </span>
                {/* Enhanced animated underline */}
                <motion.div
                  className="absolute -bottom-2 sm:-bottom-3 left-0 h-1 sm:h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2, delay: 0.8 }}
                  viewport={{ once: true, margin: '0px 0px 200px 0px' }}
                />
                <motion.div
                  className="absolute -bottom-3 sm:-bottom-5 left-2 right-2 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                  viewport={{ once: true, margin: '0px 0px 200px 0px' }}
                />
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          >
            A comprehensive arsenal of cutting-edge technologies and creative tools that power extraordinary digital experiences
          </motion.p>
        </motion.div>

        {/* Professional skills grid with optimized mobile layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 max-w-8xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Enhanced floating background elements with more complex animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/5 left-1/8 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/6 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.06, 0.20, 0.06],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/5 right-1/8 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.08, 0.25, 0.08],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[600px] sm:h-[1000px] bg-gradient-to-r from-purple-500/4 via-pink-500/6 to-blue-500/4 rounded-full blur-3xl"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute top-1/4 right-1/3 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
