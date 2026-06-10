import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import Button from '../components/ui/Button'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import GradientOrb from '../components/animations/GradientOrb'
import DashboardMock from '../components/sections/DashboardMock'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { platform } from '../data/pages'
import { getIcon, iconBgClasses } from '../utils/pageIcons'

export default function OurPlatform() {
  return (
    <>
      <PageHero eyebrow={platform.eyebrow} title={platform.heading} subtitle={platform.subheading} />

      <section className="relative section-alt section-padding overflow-x-clip">
        <GradientOrb color="blue" size={400} top="-80px" right="-60px" opacity={0.5} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Capabilities" title="Six pillars of enterprise intelligence" centered />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {platform.capabilities.map((cap, i) => {
              const Icon = getIcon(cap.icon)
              return (
                <StaggerItem key={cap.title}>
                  <div className="card h-full">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBgClasses[i % iconBgClasses.length]}`}>
                      <AnimatedIcon Icon={Icon} size={20} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-white">{cap.title}</h3>
                    <p className="mt-2 text-white/55 text-sm leading-relaxed">{cap.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
          <div className="text-center mt-10">
            <Button to="/use-cases" variant="secondary">Explore All Use Cases</Button>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-default section-padding overflow-x-clip">
        <GradientOrb color="purple" size={360} bottom="-40px" left="-100px" opacity={0.4} />
        <div className="relative z-10 container-wide grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeader
              label="Live Preview"
              title="See your data come alive"
              subtitle="Dashboards, insights, and answers — unified in one intelligent layer."
            />
          </div>
          <DashboardMock />
        </div>
      </section>

      <BookCallCTA heading={platform.cta.heading} subheading={platform.cta.subheading} />
    </>
  )
}
