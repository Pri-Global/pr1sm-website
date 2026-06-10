import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94]
const viewport = { once: true, margin: '-10% 0px -8% 0px', amount: 0.2 }

const variants = {
  rise: {
    hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: EASE },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  },
  reveal: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 1, ease: EASE },
    },
  },
}

export function SectionReveal({
  children,
  type = 'rise',
  className = '',
  delay = 0,
  as = 'div',
}) {
  const reducedMotion = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const v = variants[type] || variants.rise

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { ...v.visible.transition, delay },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

export function SplitHeadline({ lines, className = '' }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={viewport}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

export function StaggerGrid({ children, className = '', stagger = 0.06 }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGridItem({ children, className = '' }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants.scale}
    >
      {children}
    </motion.div>
  )
}
