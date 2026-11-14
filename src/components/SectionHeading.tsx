type SectionHeadingProps = {
  title: string
  subtitle: string
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="text-center mb-12">
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
