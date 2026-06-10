import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import DashboardMock from '../components/sections/DashboardMock'
import BookCallCTA from '../components/ui/BookCallCTA'
import HeroContent from '../components/sections/HeroContent'
import HeroScene from '../components/animations/HeroScene'
import FloatingOrbs from '../components/animations/FloatingOrbs'
import AnimatedStat from '../components/animations/AnimatedStat'
import TestimonialVideo from '../components/ui/TestimonialVideo'
import PrismaMascot from '../components/ui/PrismaMascot'
import TiltCard from '../components/ui/TiltCard'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import { industryIconMap } from '../components/icons/IndustryIcons'
import { SectionReveal, StaggerGrid, StaggerGridItem } from '../components/animations/SectionReveal'
import {
  trustedBy, industries, stats,
  productOverview, dashboardPreview, testimonialPreview,
} from '../data/home'

export default function Home() {
  const marqueeLogos = [...trustedBy.logos, ...trustedBy.logos]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center text-white overflow-x-clip">
        <HeroScene />
        <FloatingOrbs count={3} />
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] hero-glow-main" />
          <div className="absolute top-16 left-8 w-[250px] h-[250px] hero-glow-secondary" />
        </div>
        <HeroContent />
      </section>

      <div className="gradient-divider" />

      {/* Trusted By */}
      <SectionReveal type="rise" className="section-default py-12 md:py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="container-wide text-center">
          <SectionLabel>{trustedBy.heading}</SectionLabel>
          <div className="marquee-wrapper mt-8">
            <div className="marquee-track marquee-track-slow items-center">
              {marqueeLogos.map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="marquee-item px-10 flex items-center justify-center">
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="marquee-logo h-10 sm:h-12 md:h-14 w-auto max-w-[180px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </SectionReveal>

      <div className="gradient-divider" />

      {/* Industries */}
      <section className="relative section-gradient section-padding text-white overflow-x-clip">
        <FloatingOrbs count={2} />
        <SectionReveal type="rise" className="container-wide text-center mb-10 relative z-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl">{industries.heading}</h2>
        </SectionReveal>
        <StaggerGrid className="container-wide relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4 xl:gap-5">
          {industries.items.map((item) => {
            const Icon = industryIconMap[item.icon]
            return (
              <StaggerGridItem key={item.label}>
                <TiltCard className="group flex flex-col items-center gap-3 rounded-2xl border border-teal/20 bg-teal/[0.06] px-4 py-5 md:py-6 transition-colors hover:border-teal/40 hover:bg-teal/[0.1] h-full">
                  {Icon && (
                    <AnimatedIcon
                      Icon={Icon}
                      size={28}
                      className="text-teal shrink-0 relative z-[2]"
                      strokeWidth={1.75}
                    />
                  )}
                  <span className="text-sm md:text-base font-medium text-offwhite text-center leading-snug relative z-[2]">
                    {item.label}
                  </span>
                </TiltCard>
              </StaggerGridItem>
            )
          })}
        </StaggerGrid>
      </section>

      <div className="gradient-divider" />

      {/* Stats */}
      <SectionReveal type="rise" className="stats-bar section-padding !py-10 md:!py-12 relative">
        <FloatingOrbs count={1} />
        <StaggerGrid className="container-wide relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {stats.map((stat, i) => (
            <StaggerGridItem key={stat.line1}>
              <div className="stat-card text-center px-4 py-4 lg:py-6 rounded-xl lg:rounded-none lg:border-0 lg:bg-transparent h-full">
                <AnimatedStat value={stat.value} index={i} isText={stat.isText} />
                <p className="stat-label mt-2">{stat.line1}</p>
                <p className="stat-label">{stat.line2}</p>
              </div>
            </StaggerGridItem>
          ))}
        </StaggerGrid>
      </SectionReveal>

      <div className="gradient-divider" />

      {/* Product Video */}
      <section className="relative section-alt section-padding overflow-x-clip">
        <FloatingOrbs count={2} />
        <SectionReveal type="reveal" className="relative z-10 container-wide grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <div>
            <SectionLabel>{productOverview.label}</SectionLabel>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">{productOverview.heading}</h2>
            <p className="mt-4 text-white/50 leading-relaxed">{productOverview.body}</p>
            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
              <PrismaMascot variant="tagline" size="lg" floating />
            </div>
          </div>
          <TestimonialVideo
            src={productOverview.videoUrl}
            name="PR1SM in action"
            className="rounded-2xl border border-blue/20 glow-blue"
          />
        </SectionReveal>
      </section>

      <div className="gradient-divider" />

      {/* Dashboard Preview */}
      <SectionReveal type="rise" className="section-default section-padding">
        <div className="container-wide">
          <SectionLabel>{dashboardPreview.label}</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-2 text-white">{dashboardPreview.heading}</h2>
          <p className="text-white/50 mb-10 max-w-2xl">{dashboardPreview.body}</p>
          <DashboardMock />
        </div>
      </SectionReveal>

      <div className="gradient-divider" />

      {/* Testimonials Preview */}
      <section className="relative section-elevated section-padding text-white overflow-x-clip">
        <FloatingOrbs count={2} />
        <div className="relative z-10 container-wide">
          <SectionReveal type="rise" className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <SectionLabel>{testimonialPreview.label}</SectionLabel>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl">{testimonialPreview.heading}</h2>
            </div>
            <Link to="/testimonials" className="text-blue-light text-sm font-medium hover:text-white transition-colors shrink-0">
              View all →
            </Link>
          </SectionReveal>
          <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonialPreview.items.map((t) => (
              <StaggerGridItem key={t.name}>
                <TiltCard className="card h-full">
                  <TestimonialVideo src={t.videoUrl} name={t.name} className="mb-4 relative z-[2]" />
                  <h3 className="font-heading font-semibold text-white relative z-[2]">{t.name}</h3>
                  <p className="text-blue-light text-sm mt-1 relative z-[2]">{t.role}</p>
                  <p className="text-white/45 text-sm relative z-[2]">{t.company}</p>
                </TiltCard>
              </StaggerGridItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <BookCallCTA heading="Ready to unify your data?" subheading="Book a call and see PR1SM in action." />
    </>
  )
}
