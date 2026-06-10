import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-primary group',
  secondary: 'btn-secondary group',
  ghost: 'btn-ghost group',
}

const MotionLink = motion.create(Link)
const MotionAnchor = motion.create('a')
const MotionButton = motion.create('button')

const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
}

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `${variants[variant]} ${className}`

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <MotionAnchor href={href} target="_blank" rel="noopener noreferrer" className={classes} {...motionProps} {...props}>
        {children}
      </MotionAnchor>
    )
  }

  return (
    <MotionButton type={type} className={classes} {...motionProps} {...props}>
      {children}
    </MotionButton>
  )
}
