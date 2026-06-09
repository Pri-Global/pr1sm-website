import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Plug, BarChart3 } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionLabel from '../components/ui/SectionLabel'
import DashboardMock from '../components/sections/DashboardMock'
import BookCallCTA from '../components/ui/BookCallCTA'
import IntelligenceDiagram from '../components/sections/IntelligenceDiagram'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import MorphingText from '../components/animations/MorphingText'
import GradientOrb from '../components/animations/GradientOrb'
import AnimatedStat from '../components/animations/AnimatedStat'
import TestimonialVideo from '../components/ui/TestimonialVideo'
import { industryIconMap } from '../components/icons/IndustryIcons'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import {
  hero, trustedBy, industries, stats,
  productOverview, dashboardPreview, testimonialPreview,
} from '../data/home'

const valueIcons = { Shield, Plug, BarChart3 }
const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold']
const morphWords = [
  hero.headline.highlight,
  'Your Business.',
  'Your Team.',
  'Your Data.',
  'Your Future.',
]

export default function Home() {
  const marqueeLogos = [...trustedBy.logos, ...trustedBy.logos]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] hero-glow-main" />
          <div className="absolute top-16 left-8 w-[250px] h-[250px] hero-glow-secondary" />
        </div>
        <div className="relative z-10 container-wide section-padding pt-28 sm:pt-32 pb-16 sm:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <div className="eyebrow-badge mb-3">
                <span className="eyebrow-dot" />
                {hero.badge.line1}
              </div>
              <p className="text-white/45 text-[10px] font-medium uppercase tracking-[0.12em] mb-4 sm:mb-6">
                {hero.badge.line2}
              </p>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white">
                {hero.headline.line1}{' '}
                <MorphingText words={morphWords} />
              </h1>
              <p className="mt-3 sm:mt-4 font-heading text-lg sm:text-xl md:text-2xl text-white/75">{hero.headline.sub}</p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">{hero.subheadline}</p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button to="/request" variant="primary" className="btn-mobile-full !justify-center">
                  Book a Call <AnimatedIcon Icon={ArrowRight} size={18} />
                </Button>
                <Button to="/our-platform" variant="ghost" className="btn-mobile-full !justify-center">
                  Explore Platform
                </Button>
              </div>

              <StaggerContainer className="mt-10 flex flex-wrap gap-4">
                {hero.valueProps.map(({ icon, label }, i) => {
                  const Icon = valueIcons[icon]
                  return (
                    <StaggerItem key={label}>
                      <div className="feature-item group !inline-flex items-center gap-2 !p-3">
                        <span className={dotClasses[i % dotClasses.length]} />
                        <AnimatedIcon Icon={Icon} size={16} className="text-blue-light" />
                        <span className="text-sm text-white/70">{label}</span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </div>

            <IntelligenceDiagram />
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Trusted By */}
      <section className="section-default py-12 md:py-16">
        <div className="container-wide text-center">
          <SectionLabel>{trustedBy.heading}</SectionLabel>
          <div className="marquee-wrapper mt-8">
            <div className="marquee-track items-center">
              {marqueeLogos.map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="marquee-item px-10 flex items-center justify-center">
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-10 sm:h-12 md:h-14 w-auto max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Industries */}
      <section className="section-gradient section-padding text-white">
        <div className="container-wide text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl">{industries.heading}</h2>
        </div>
        <div className="container-wide grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4 max-w-6xl mx-auto">
          {industries.items.map((item) => {
            const Icon = industryIconMap[item.icon]
            return (
              <div
                key={item.label}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-teal/20 bg-teal/[0.06] px-4 py-5 md:py-6 transition-colors hover:border-teal/40 hover:bg-teal/[0.1]"
              >
                {Icon && (
                  <AnimatedIcon
                    Icon={Icon}
                    size={28}
                    className="text-teal shrink-0"
                    strokeWidth={1.75}
                  />
                )}
                <span className="text-sm md:text-base font-medium text-offwhite text-center leading-snug">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Stats */}
      <section className="stats-bar section-padding !py-10 md:!py-12">
        <div className="container-wide grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <div key={stat.line1} className="text-center px-4 py-4 lg:py-0">
              <AnimatedStat value={stat.value} index={i} isText={stat.isText} />
              <p className="stat-label mt-2">{stat.line1}</p>
              <p className="stat-label">{stat.line2}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Product Video */}
      <section className="relative section-alt section-padding overflow-hidden">
        <GradientOrb color="gold" size={350} top="20%" right="-120px" opacity={0.5} />
        <div className="relative z-10 container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>{productOverview.label}</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-white">{productOverview.heading}</h2>
            <p className="mt-4 text-white/50 leading-relaxed">{productOverview.body}</p>
          </div>
          <TestimonialVideo
            src={productOverview.videoUrl}
            name="PR1SM in action"
            className="rounded-2xl border border-blue/20"
          />
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Dashboard Preview */}
      <section className="section-default section-padding">
        <div className="container-wide">
          <SectionLabel>{dashboardPreview.label}</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-2 text-white">{dashboardPreview.heading}</h2>
          <p className="text-white/50 mb-10 max-w-2xl">{dashboardPreview.body}</p>
          <DashboardMock />
        </div>
      </section>

      <div className="gradient-divider" />

      {/* Testimonials Preview */}
      <section className="relative section-elevated section-padding text-white overflow-hidden">
        <GradientOrb color="purple" size={380} top="-80px" left="-100px" opacity={0.7} />
        <div className="relative z-10 container-wide">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <SectionLabel>{testimonialPreview.label}</SectionLabel>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl">{testimonialPreview.heading}</h2>
            </div>
            <Link to="/testimonials" className="text-blue-light text-sm font-medium hover:text-white transition-colors shrink-0">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonialPreview.items.map((t) => (
              <div key={t.name} className="card">
                <TestimonialVideo src={t.videoUrl} name={t.name} className="mb-4" />
                <h3 className="font-heading font-semibold text-white">{t.name}</h3>
                <p className="text-blue-light text-sm mt-1">{t.role}</p>
                <p className="text-white/45 text-sm">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookCallCTA heading="Ready to unify your data?" subheading="Book a call and see PR1SM in action." />
    </>
  )
}
