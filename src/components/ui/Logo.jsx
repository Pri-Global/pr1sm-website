import { Link, useLocation } from 'react-router-dom'

export default function Logo({
  className = '',
  size = 'default',
  variant = 'icon',
  to,
  onClick,
}) {
  const { pathname } = useLocation()
  const heights = {
    sm: 'h-6',
    default: 'h-8',
    lg: 'h-10',
    xl: 'h-14',
    nav: 'h-14 md:h-16',
    footer: 'h-20 sm:h-24 md:h-28 w-auto max-w-full',
  }

  const isFooter = size === 'footer'
  const src =
    variant === 'full'
      ? isFooter
        ? '/logo-full-footer.png'
        : '/logo-full.png'
      : '/logo-icon.png'

  const img = (
    <img
      src={src}
      alt="PR1SM.AI"
      className={`block w-auto object-contain object-left ${heights[size] || heights.default} ${to ? '' : className}`}
    />
  )

  const handleClick = (e) => {
    onClick?.(e)
    if (pathname === to) {
      e.preventDefault()
      const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, left: 0, behavior: instant ? 'auto' : 'smooth' })
    }
  }

  if (to) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        aria-label="PR1SM.AI — Home"
        className={`inline-block shrink-0 rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 ${className}`}
      >
        {img}
      </Link>
    )
  }

  return img
}
