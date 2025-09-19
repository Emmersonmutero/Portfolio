
import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Desktop & Tablet Layout (md and up) - Split Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Column - Text Content */}
        <div className="w-1/2 flex items-center justify-center relative z-10">
          <div className="max-w-2xl px-6 md:px-8 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 xl:space-y-8"
            >
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Hi, I'm Emmerson —{' '}
                <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Creative Web Developer
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl 2xl:text-2xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Building immersive, modern, and high-performance websites that captivate and engage users
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pt-4 md:pt-6"
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-semibold shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(146, 63, 255, 0.4)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - 3D Spline Model */}
        <div className="w-1/2 relative">
          <iframe 
            src="https://my.spline.design/cubeandballs-nY0aPWlHRObZibcWNtEtN9Pi/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="absolute inset-0 w-full h-full"
            title="Spline 3D Model"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* Mobile Layout (below md) - Overlay Layout */}
      <div className="md:hidden min-h-screen relative">
        {/* Background 3D Spline Model - Full Screen */}
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            src="https://my.spline.design/cubeandballs-nY0aPWlHRObZibcWNtEtN9Pi/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="absolute inset-0 w-full h-full object-cover"
            title="Spline 3D Model Background"
            style={{ border: 'none' }}
          />
          
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>

        {/* Text Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-start">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl sm:text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Hi, I'm Emmerson —{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Creative Web Developer
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Building immersive, modern, and high-performance websites that captivate and engage users
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="pt-4"
                >
                  <motion.button
                    onClick={scrollToProjects}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 25px 50px rgba(146, 63, 255, 0.4)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements for both layouts */}
      <motion.div
        className="absolute top-20 left-8 w-4 h-4 bg-purple-400 rounded-full opacity-80 z-20 shadow-lg shadow-purple-400/50"
        animate={{
          y: [0, -30, 0],
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-12 w-3 h-3 bg-cyan-400 rounded-full opacity-70 z-20 shadow-lg shadow-cyan-400/50"
        animate={{
          y: [0, 25, 0],
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/3 right-16 w-2 h-2 bg-blue-400 rounded-full opacity-60 z-20 shadow-lg shadow-blue-400/50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  )
}

export default Hero
