import { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from '../ui/Logo'
import AnimatedIcon from '../ui/AnimatedIcon'
import Button from '../ui/Button'
import { useLenis } from '../../context/LenisContext'
import { aboutDropdown, navLinks, BOOK_CALL_ROUTE } from '../../data/navigation'

export default function Navbar() {
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const scrolledRef = useRef(false)
  const aboutRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)

  const springProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30, mass: 0.5 })
  const progressScale = useTransform(springProgress, (v) => v)

  useEffect(() => {
    const onScroll = ({ scroll, limit }) => {
      const next = scroll > 50
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
      setScrollProgress(limit > 0 ? scroll / limit : 0)
    }

    if (lenis) {
      lenis.on('scroll', onScroll)
      return () => lenis.off('scroll', onScroll)
    }

    const handleScroll = () => {
      const next = window.scrollY > 50
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lenis])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, { opacity: 0, x: -20, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      gsap.from(navRef.current?.children || [], {
        opacity: 0,
        y: -10,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.25,
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleClick = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) setAboutOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const showGlass = scrolled || mobileOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        showGlass ? 'nav-shell-glass' : 'nav-shell-transparent'
      }`}
    >
      <nav className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <div ref={logoRef}>
          <Logo to="/" onClick={closeMobile} variant="icon" size="nav" className="scale-110 sm:scale-125 md:scale-[1.45] origin-left" />
        </div>

        <div ref={navRef} className="hidden lg:flex items-center gap-6">
          <div className="relative" ref={aboutRef}>
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              className="group flex items-center gap-1 text-sm font-medium text-white/55 hover:text-white/90 transition-colors"
            >
              About
              <AnimatedIcon Icon={ChevronDown} size={16} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
            </button>
            {aboutOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 nav-shell-glass rounded-xl shadow-xl p-2 z-50">
                {aboutDropdown.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setAboutOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="block text-sm font-medium text-white">{item.title}</span>
                    <span className="block text-xs text-white/45 mt-0.5">{item.subtitle}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-light' : 'text-white/55 hover:text-white/90'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button to={BOOK_CALL_ROUTE} variant="primary" className="!py-2.5 !px-5 text-sm">
            Book a Call
          </Button>
        </div>

        <button
          type="button"
          className="group lg:hidden text-white p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <AnimatedIcon Icon={X} size={24} /> : <AnimatedIcon Icon={Menu} size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden nav-shell-glass border-t border-white/[0.08] px-4 py-6 max-h-[80vh] overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-white/35 mb-3">About PR1SM</p>
          <div className="flex flex-col gap-1 mb-4">
            {aboutDropdown.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobile}
                className="py-2 text-sm text-white/70 hover:text-blue-light"
              >
                {item.title}
              </NavLink>
            ))}
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMobile}
              className="block py-2 text-base font-medium text-white/70"
            >
              {link.label}
            </NavLink>
          ))}
          <Button to={BOOK_CALL_ROUTE} variant="primary" className="mt-4 w-full" onClick={closeMobile}>
            Book a Call
          </Button>
        </div>
      )}

      <motion.div
        className="h-[1.5px] bg-gradient-to-r from-[#4169E1] via-[#7B2FBE] to-[#D4AF37] origin-left"
        style={{ scaleX: progressScale }}
      />
    </header>
  )
}
