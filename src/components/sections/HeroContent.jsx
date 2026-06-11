import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Shield, Plug, BarChart3 } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedIcon from '../ui/AnimatedIcon'
import MorphingText from '../animations/MorphingText'
import PrismaMascot from '../ui/PrismaMascot'
import { hero } from '../../data/home'
import { BOOK_CALL_URL } from '../../data/navigation'

const valueIcons = { Shield, Plug, BarChart3 }
const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold']

export default function HeroContent() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('[data-hero="badge"]', { opacity: 0, y: 20, duration: 0.6 }, 0)
        .from('[data-hero="badge-sub"]', { opacity: 0, y: 16, duration: 0.5 }, 0.1)
        .from('[data-hero="headline"]', { opacity: 0, y: 60, duration: 0.8 }, 0.15)
        .from('[data-hero="body"]', { opacity: 0, y: 20, duration: 0.7 }, 0.45)
        .from('[data-hero="prop"]', { opacity: 0, x: -20, duration: 0.5, stagger: 0.1 }, 1)
        .from('[data-hero="mascot"]', { opacity: 0, scale: 0.92, y: 30, duration: 1 }, 0.5)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative z-10 container-wide section-padding pt-28 sm:pt-32 pb-16 sm:pb-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
        <div className="max-w-2xl xl:max-w-none">
          <div data-hero="badge" className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            {hero.badge.line1}
          </div>
          <p data-hero="badge-sub" className="text-white/45 text-[10px] font-medium uppercase tracking-[0.12em] mb-4 sm:mb-6">
            {hero.badge.line2}
          </p>
          <h1
            data-hero="headline"
            className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
          >
            <MorphingText phrases={hero.headline.phrases} block />
          </h1>
          <p data-hero="body" className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl xl:max-w-3xl">
            {hero.subheadline}
          </p>

          <div data-hero="cta" className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 relative z-10">
            <Button
              href={BOOK_CALL_URL}
              variant="primary"
              data-hero="cta-primary"
              className="btn-mobile-full btn-shine !justify-center relative z-10"
            >
              Book a Call <AnimatedIcon Icon={ArrowRight} size={18} />
            </Button>
            <Button
              to="/our-platform"
              variant="ghost"
              data-hero="cta-secondary"
              className="btn-mobile-full btn-glass !justify-center relative z-10"
            >
              Explore Platform
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl xl:max-w-none">
            {hero.valueProps.map(({ icon, label }, i) => {
              const Icon = valueIcons[icon]
              return (
                <div
                  key={label}
                  data-hero="prop"
                  className="feature-item group flex items-center gap-2 !p-3 h-full min-h-[3.25rem]"
                >
                  <span className={`${dotClasses[i % dotClasses.length]} !mt-0 shrink-0`} />
                  <AnimatedIcon Icon={Icon} size={16} className="text-blue-light shrink-0" />
                  <span className="text-sm text-white/70 leading-snug">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div
          data-hero="mascot"
          className="flex justify-center items-end w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:justify-end xl:justify-center"
        >
          <PrismaMascot variant="hello" size="xl" className="!h-44 sm:!h-56 md:!h-64 lg:!h-72 xl:!h-[22rem] 2xl:!h-80" />
        </div>
      </div>
    </div>
  )
}
