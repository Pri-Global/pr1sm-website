import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import { TimelineSteps, TimelineStep } from '../components/animations/ScrollReveal'
import GradientOrb from '../components/animations/GradientOrb'
import IntelligenceDiagram from '../components/sections/IntelligenceDiagram'
import { dataFlow } from '../data/home'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { howItWorks } from '../data/pages'
import { getIcon, dotClasses } from '../utils/pageIcons'

const stepStyles = [
  'btn-gradient',
  'bg-purple/25 border border-purple/40',
  'bg-gold/15 border border-gold/35 text-gold',
  'bg-teal/15 border border-teal/35 text-teal-light',
  'btn-gradient',
]

export default function HowItWorks() {
  return (
    <>
      <PageHero eyebrow={howItWorks.eyebrow} title={howItWorks.heading} subtitle={howItWorks.subheading} />

      <section className="relative section-default section-padding overflow-x-clip">
        <GradientOrb color="purple" size={400} top="-80px" right="-60px" opacity={0.4} />
        <div className="relative z-10 container-wide">
          <SectionHeader
            label={dataFlow.tagline.line1}
            title={dataFlow.tagline.line2}
            centered
          />
          <div className="mt-8 md:mt-10 xl:mt-12">
            <IntelligenceDiagram layout="wide" />
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-alt section-padding overflow-x-clip">
        <GradientOrb color="blue" size={420} top="-100px" left="-80px" opacity={0.45} />
        <div className="relative z-10 container-wide max-w-3xl xl:max-w-4xl mx-auto">
          <SectionHeader label="5 Steps" title="From raw data to real decisions" centered />
          <TimelineSteps>
            {howItWorks.steps.map((step, i) => {
              const Icon = getIcon(step.icon)
              return (
                <TimelineStep
                  key={step.num}
                  icon={Icon}
                  iconClassName={stepStyles[i]}
                  eyebrow={`Step ${step.num}`}
                  title={step.title}
                  description={step.description}
                />
              )
            })}
          </TimelineSteps>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-elevated section-padding text-white overflow-x-clip">
        <GradientOrb color="purple" size={380} bottom="-60px" right="-80px" opacity={0.45} />
        <div className="relative z-10 container-wide">
          <SectionHeader
            label={howItWorks.builtFor.label}
            title={howItWorks.builtFor.heading}
            centered
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            {howItWorks.builtFor.items.map((item, i) => (
              <StaggerItem key={item}>
                <div className="feature-item !items-center text-sm text-white/80 h-full min-h-[72px]">
                  <span className={dotClasses[i % dotClasses.length]} />
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BookCallCTA heading={howItWorks.cta.heading} subheading={howItWorks.cta.subheading} />
    </>
  )
}
