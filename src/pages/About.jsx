import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import AnimatedStat from '../components/animations/AnimatedStat'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { about } from '../data/pages'
import { getIcon, iconBgClasses } from '../utils/pageIcons'

export default function About() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.heading} subtitle={about.tagline} />

      <section className="relative section-alt section-padding overflow-x-clip">
        <GradientOrb color="blue" size={400} top="-80px" right="-60px" opacity={0.5} />
        <div className="relative z-10 container-wide max-w-3xl">
          <SectionHeader
            label="Who We Are"
            title="Enterprise AI, built for real business"
            subtitle={about.description}
          />
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-default section-padding overflow-x-clip">
        <GradientOrb color="purple" size={320} bottom="-60px" left="-80px" opacity={0.4} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="At a Glance" title="Built on experience. Designed for outcomes." centered />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {about.highlights.map((h, i) => {
              const Icon = getIcon(h.icon)
              return (
                <StaggerItem key={h.title}>
                  <div className="card text-center group h-full">
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${iconBgClasses[i % iconBgClasses.length]}`}>
                      <AnimatedIcon Icon={Icon} size={22} />
                    </div>
                    <p className="font-heading font-extrabold text-2xl stat-value !text-2xl">{h.title}</p>
                    <p className="text-white font-medium mt-2">{h.line1}</p>
                    <p className="text-white/50 text-sm mt-0.5">{h.line2}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="section-gradient section-padding">
        <div className="container-wide grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="mission-card !pl-8" style={{ '--mission-accent': 'linear-gradient(180deg, #4169e1, #7b2fbe)' }}>
            <p className="text-[10px] uppercase tracking-[0.12em] text-blue-light font-medium mb-2">Mission</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">{about.mission.heading}</h2>
            <p className="mt-4 text-white/55 leading-relaxed">{about.mission.text}</p>
          </div>
          <div className="mission-card !pl-8" style={{ '--mission-accent': 'linear-gradient(180deg, #7b2fbe, #d4af37)' }}>
            <p className="text-[10px] uppercase tracking-[0.12em] text-purple-light font-medium mb-2">Vision</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">{about.vision.heading}</h2>
            <p className="mt-4 text-white/55 leading-relaxed">{about.vision.text}</p>
          </div>
        </div>
      </section>

      <BookCallCTA heading={about.cta.heading} subheading={about.cta.subheading} />
    </>
  )
}
