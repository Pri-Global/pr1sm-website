import { motion, useReducedMotion } from 'framer-motion'

const GRADIENTS = {
  blue: 'radial-gradient(circle, rgba(65,105,225,0.12) 0%, transparent 70%)',
  purple: 'radial-gradient(circle, rgba(123,47,190,0.10) 0%, transparent 70%)',
  gold: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
}

export default function GradientOrb({
  color = 'blue',
  size = 400,
  top,
  bottom,
  left,
  right,
  opacity = 0.8,
  className = '',
}) {
  const reducedMotion = useReducedMotion()
  const style = {
    width: size,
    height: size,
    background: GRADIENTS[color] || GRADIENTS.blue,
    opacity,
    ...(top != null && { top }),
    ...(bottom != null && { bottom }),
    ...(left != null && { left }),
    ...(right != null && { right }),
  }

  return (
    <motion.div
      className={`absolute pointer-events-none z-0 rounded-full ${className}`}
      style={style}
      animate={reducedMotion ? undefined : { y: [0, -20, 0], x: [0, 10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}
