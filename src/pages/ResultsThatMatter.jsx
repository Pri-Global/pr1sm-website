import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { results } from '../data/pages'

export default function ResultsThatMatter() {
  return (
    <>
      <PageHero title={results.heading} subtitle={results.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {results.metrics.map((m) => (
            <div key={m.headline} className="card text-center">
              <p className="font-heading font-extrabold text-4xl text-gradient">{m.headline}</p>
              {m.highlight && (
                <p className="font-heading font-bold text-3xl text-blue-light mt-2">{m.highlight}</p>
              )}
              <p className="mt-3 text-white/50 text-sm">{m.description}</p>
            </div>
          ))}
        </div>
      </section>
      <BookCallCTA />
    </>
  )
}
