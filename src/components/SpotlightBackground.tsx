
import React from 'react'
import { motion } from 'framer-motion'

const SpotlightBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main spotlight */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(146, 63, 255, 0.3) 0%, rgba(88, 63, 255, 0.2) 50%, transparent 70%)',
        }}
        animate={{
          x: [100, 300, 100],
          y: [100, 200, 100],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary spotlight */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(125, 191, 255, 0.3) 0%, rgba(88, 63, 255, 0.2) 50%, transparent 70%)',
          right: '10%',
          top: '30%'
        }}
        animate={{
          x: [-50, 50, -50],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tertiary spotlight */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(146, 63, 255, 0.4) 0%, rgba(125, 191, 255, 0.2) 50%, transparent 70%)',
          left: '20%',
          bottom: '20%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default SpotlightBackground
