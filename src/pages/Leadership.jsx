import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import BookCallCTA from '../components/ui/BookCallCTA'
import GradientOrb from '../components/animations/GradientOrb'
import { TeamGrid } from '../components/sections/TeamMemberCard'
import { leadership } from '../data/team'

function SectionHeader({ label, title }) {
  return (
    <div className="mb-8 md:mb-10">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">{title}</h2>
    </div>
  )
}

export default function LeadershipPage() {
  return (
    <>
      <PageHero title={leadership.heading} subtitle={leadership.subheading} />

      <section className="relative section-alt section-padding overflow-hidden">
        <GradientOrb color="blue" size={420} top="-60px" right="-80px" opacity={0.6} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Executive Team" title="Leadership" />
          <TeamGrid people={leadership.leaders} variant="leadership" />
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-default section-padding overflow-hidden">
        <GradientOrb color="purple" size={360} bottom="-40px" left="-100px" opacity={0.5} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Builders & Operators" title="The Team" />
          <TeamGrid people={leadership.team} variant="team" />
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="section-elevated section-padding text-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionLabel>Global Network</SectionLabel>
            <h2 className="font-heading font-bold text-2xl md:text-3xl">{leadership.globalResources.heading}</h2>
            <p className="mt-4 text-white/65 leading-relaxed">{leadership.globalResources.description}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10 w-full">
            {leadership.globalResources.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.08] bg-navy/40 px-4 py-5 md:py-6 text-center"
              >
                <p className="stat-value !text-2xl md:!text-3xl">{s.value}</p>
                <p className="stat-label mt-2 !text-[9px] md:!text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookCallCTA />
    </>
  )
}
