import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import GradientOrb from '../components/animations/GradientOrb'
import { ScrollRevealList, ScrollRevealItem } from '../components/animations/ScrollReveal'
import { useCaseCategories } from '../data/useCases'
import { accentStyles, dotClasses } from '../utils/pageIcons'

export default function UseCases() {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="Real problems. Practical solutions."
        subtitle="Measurable outcomes across every department — from the boardroom to the front line."
      />

      {useCaseCategories.map((cat, catIndex) => {
        const accent = accentStyles[cat.accent] || accentStyles.blue
        const isAlt = catIndex % 2 === 0

        return (
          <section
            key={cat.id}
            className={`relative section-padding overflow-x-clip ${isAlt ? 'section-alt' : 'section-default'}`}
          >
            {catIndex % 3 === 0 && (
              <GradientOrb color={cat.accent === 'gold' ? 'gold' : cat.accent} size={400} top="-80px" right="-60px" opacity={0.4} />
            )}
            <div className="relative z-10 container-wide">
              {catIndex > 0 && <div className="gradient-divider mb-12 md:mb-16" />}
              <SectionHeader label={cat.tagline} title={cat.title} />
              <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
                {cat.useCases.map((uc) => (
                  <div
                    key={uc.title}
                    className="use-case-card"
                    style={{ '--uc-accent': accent.border, '--uc-accent-text': accent.text }}
                  >
                    <h3 className="font-heading font-semibold text-lg text-white">{uc.title}</h3>
                    <div className="mt-5 space-y-4 text-sm flex-1">
                      <div>
                        <p className="uc-label">Problem</p>
                        <p className="text-white/55 leading-relaxed">{uc.problem}</p>
                      </div>
                      <div>
                        <p className="uc-label">Solution</p>
                        <ScrollRevealList className="mt-2 space-y-2">
                          {uc.solution.map((s, si) => (
                            <ScrollRevealItem key={s} as="li" className="feature-item !p-2.5 text-white/60 text-sm list-none">
                              <span className={dotClasses[si % dotClasses.length]} />
                              {s}
                            </ScrollRevealItem>
                          ))}
                        </ScrollRevealList>
                      </div>
                      <div>
                        <p className="uc-label">Outcomes</p>
                        <ScrollRevealList className="mt-2 space-y-2">
                          {uc.outcomes.map((o, oi) => (
                            <ScrollRevealItem key={o} as="li" className="feature-item !p-2.5 text-sm list-none" style={{ color: accent.text }}>
                              <span className={dotClasses[(oi + 1) % dotClasses.length]} />
                              {o}
                            </ScrollRevealItem>
                          ))}
                        </ScrollRevealList>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <BookCallCTA
        heading="Don't see your use case?"
        subheading="PR1SM adapts to your industry, systems, and goals. Let's map it together."
      />
    </>
  )
}
