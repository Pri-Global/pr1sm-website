import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import useIsDesktop from '../../hooks/useIsDesktop'

export default function FlySection({ children, className = '' }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop(1024)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 })

  const z = useTransform(progress, [0, 0.35, 0.65, 1], [-500, 0, 0, 200])
  const opacity = useTransform(progress, [0, 0.18, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(progress, [0, 0.35, 1], [0.9, 1, 1.1])

  if (reducedMotion || !isDesktop) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ z, opacity, scale, willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
