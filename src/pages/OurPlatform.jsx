import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import Button from '../components/ui/Button'
import { platform } from '../data/pages'

const iconStyles = [
  'bg-blue/20 text-blue-light',
  'bg-purple/20 text-purple-light',
  'bg-gold/20 text-gold',
  'bg-teal/20 text-teal-light',
]

export default function OurPlatform() {
  return (
    <>
      <PageHero title={platform.heading} subtitle={platform.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platform.capabilities.map((cap, i) => (
            <div key={cap.title} className="card">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${iconStyles[i % iconStyles.length]}`}>
                <span className="font-heading font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-white">{cap.title}</h3>
              <p className="mt-2 text-white/50 text-sm leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
        <div className="container-wide text-center mt-10">
          <Button to="/use-cases" variant="secondary">Explore All Capabilities</Button>
        </div>
      </section>
      <BookCallCTA />
    </>
  )
}
