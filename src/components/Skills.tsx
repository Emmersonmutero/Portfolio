

import { motion } from 'framer-motion'

const Skills = () => {
  const skills = [
    { name: 'HTML', level: 95, icon: '🌐' },
    { name: 'CSS', level: 92, icon: '🎨' },
    { name: 'JavaScript', level: 90, icon: '⚡' },
    { name: 'React', level: 88, icon: '⚛️' },
    { name: 'Tailwind', level: 85, icon: '💨' },
    { name: '3D Web', level: 80, icon: '🎯' },
    { name: 'Next.js', level: 85, icon: '🚀' },
    { name: 'Supabase', level: 78, icon: '🔥' },
    { name: 'Firebase', level: 82, icon: '🔥' },
    { name: 'Spline', level: 75, icon: '🎪' },
    { name: 'Figma', level: 88, icon: '🎨' },
  ]

  interface Skill {
    name: string;
    level: number;
    icon: string;
  }

  const CircularProgress = ({ skill, index }: { skill: Skill, index: number }) => {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (skill.level / 100) * circumference

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center group"
      >
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#923FFF" />
                <stop offset="50%" stopColor="#583FFF" />
                <stop offset="100%" stopColor="#7DBFFF" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Icon and percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">{skill.icon}</span>
            <span className="text-sm font-bold text-white">{skill.level}%</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-center group-hover:text-purple-400 transition-colors">
          {skill.name}
        </h3>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <CircularProgress key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
