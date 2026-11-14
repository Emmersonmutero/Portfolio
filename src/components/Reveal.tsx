import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  className?: string
}

const Reveal = ({ children, className }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, margin: '0px 0px 200px 0px' }}
    className={className}
  >
    {children}
  </motion.div>
)

export default Reveal
