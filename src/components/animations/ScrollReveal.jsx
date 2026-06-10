import { motion, useReducedMotion } from 'framer-motion'
import AnimatedIcon from '../ui/AnimatedIcon'

const EASE = [0.25, 0.1, 0.25, 1]

const viewport = {
  once: true,
  margin: '-8% 0px -5% 0px',
  amount: 0.35,
}

const timelineViewport = {
  once: true,
  margin: '-12% 0px -8% 0px',
  amount: 0.45,
}

export const scrollRevealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const scrollRevealLeft = {
  hidden: { opacity: 0, x: -20, y: 12 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const timelineStep = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const timelineIcon = {
  hidden: { opacity: 0, scale: 0.65 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
}

const timelineContent = {
  hidden: { opacity: 0, y: 20, x: -8 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export function ScrollRevealList({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function ScrollRevealItem({
  children,
  className = '',
  variant = 'up',
  as = 'div',
}) {
  const reducedMotion = useReducedMotion()
  const variants = variant === 'left' ? scrollRevealLeft : scrollRevealUp

  if (reducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  )
}

export function TimelineSteps({ children, className = '' }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className={`page-timeline relative ${className}`}>
      {!reducedMotion && (
        <motion.div
          className="page-timeline-progress"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-10% 0px', amount: 0.15 }}
          transition={{ duration: 1.4, ease: EASE }}
          aria-hidden="true"
        />
      )}
      <div className="relative space-y-8 sm:space-y-10">{children}</div>
    </div>
  )
}

export function TimelineStep({
  iconClassName = '',
  eyebrow,
  title,
  description,
  icon: Icon,
  iconSize = 20,
}) {
  const reducedMotion = useReducedMotion()

  const iconNode = (
    <div
      className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-heading font-bold flex items-center justify-center shrink-0 text-white ${iconClassName}`}
    >
      <AnimatedIcon Icon={Icon} size={iconSize} />
    </div>
  )

  const contentNode = (
    <div className="pt-1 min-w-0">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-medium">{eyebrow}</p>
      )}
      <h3 className="font-heading font-semibold text-xl md:text-2xl text-white mt-1">{title}</h3>
      {description && (
        <p className="mt-2 text-white/55 leading-relaxed">{description}</p>
      )}
    </div>
  )

  if (reducedMotion) {
    return (
      <div className="relative flex gap-4 sm:gap-6 pl-1 sm:pl-2">
        {iconNode}
        {contentNode}
      </div>
    )
  }

  return (
    <motion.div
      className="relative flex gap-4 sm:gap-6 pl-1 sm:pl-2"
      variants={timelineStep}
      initial="hidden"
      whileInView="visible"
      viewport={timelineViewport}
    >
      <motion.div
        className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-heading font-bold flex items-center justify-center shrink-0 text-white ${iconClassName}`}
        variants={timelineIcon}
      >
        <AnimatedIcon Icon={Icon} size={iconSize} />
      </motion.div>
      <motion.div className="pt-1 min-w-0" variants={timelineContent}>
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-medium">{eyebrow}</p>
        )}
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-white mt-1">{title}</h3>
        {description && (
          <p className="mt-2 text-white/55 leading-relaxed">{description}</p>
        )}
      </motion.div>
    </motion.div>
  )
}
