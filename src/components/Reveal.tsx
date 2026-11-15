import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  motionProps?: Omit<HTMLMotionProps<'div'>, 'children' | 'className' | 'initial' | 'whileInView' | 'viewport' | 'transition'>
}

const Reveal = ({ children, className, delay = 0, motionProps }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: '0px 0px 200px 0px' }}
    className={className}
    {...motionProps}
  >
    {children}
  </motion.div>
)

export default Reveal
