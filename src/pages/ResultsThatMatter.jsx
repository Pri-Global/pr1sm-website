import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedStat from '../components/animations/AnimatedStat'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { results } from '../data/pages'

export default function ResultsThatMatter() {
  return (
    <>
      <PageHero eyebrow={results.eyebrow} title={results.heading} subtitle={results.subheading} />

      <section className="relative stats-bar section-padding overflow-x-clip">
        <GradientOrb color="gold" size={300} top="50%" left="50%" opacity={0.2} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Proof Points" title="Numbers that speak for themselves" centered />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {results.metrics.map((m, i) => (
              <StaggerItem key={m.label}>
                <div className="text-center px-2">
                  <AnimatedStat
                    value={m.value}
                    index={i}
                    isText={!!m.isText}
                  />
                  {m.highlight && (
                    <p className="font-heading font-semibold text-sm text-blue-light mt-2">{m.highlight}</p>
                  )}
                  <p className="stat-label mt-3">{m.label}</p>
                  <p className="mt-2 text-white/45 text-xs leading-relaxed">{m.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="section-gradient section-padding">
        <div className="container-wide max-w-3xl mx-auto text-center">
          <SectionHeader
            label="Real Impact"
            title="From weeks of reporting to minutes of insight"
            subtitle="PR1SM.AI clients see measurable ROI within the first month — faster decisions, lower costs, happier teams."
            centered
          />
        </div>
      </section>

      <BookCallCTA heading={results.cta.heading} subheading={results.cta.subheading} />
    </>
  )
}
