import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { about } from '../data/pages'

export default function About() {
  return (
    <>
      <PageHero title={about.heading} subtitle={about.tagline} />
      <section className="section-alt section-padding">
        <div className="container-wide max-w-3xl">
          <p className="text-white/50 text-lg leading-relaxed">{about.description}</p>
        </div>
      </section>

      <section className="section-default section-padding">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.highlights.map((h, i) => (
            <div key={h.title} className="card text-center">
              <div className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                ['bg-blue/20 text-blue-light', 'bg-purple/20 text-purple-light', 'bg-gold/20 text-gold', 'bg-teal/20 text-teal-light'][i]
              }`}>
                <span className="font-heading font-bold text-xs">{i + 1}</span>
              </div>
              <p className="font-heading font-bold text-lg stat-value !text-xl">{h.title}</p>
              <p className="text-white font-medium mt-1">{h.line1}</p>
              <p className="text-white/50 text-sm">{h.line2}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-alt section-padding">
        <div className="container-wide grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="font-heading font-bold text-2xl">{about.mission.heading}</h2>
            <p className="mt-4 text-white/50 leading-relaxed">{about.mission.text}</p>
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl">{about.vision.heading}</h2>
            <p className="mt-4 text-white/50 leading-relaxed">{about.vision.text}</p>
          </div>
        </div>
      </section>

      <BookCallCTA />
    </>
  )
}
