import { Zap } from 'lucide-react'

interface SectionHeadingProps {
  title: string
  subtitle: string
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
      <Zap className="w-4 h-4 text-purple-400" />
      <span className="text-sm text-white/70">Featured Work</span>
    </div>
    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
      <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
    <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
)

export default SectionHeading
