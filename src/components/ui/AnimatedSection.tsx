import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

export function AnimatedSection({ children, className, variants, delay = 0, once = true }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })
  const defaultVariants: Variants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay } }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants ?? defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
