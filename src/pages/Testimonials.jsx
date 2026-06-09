import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import TestimonialVideo from '../components/ui/TestimonialVideo'
import { testimonials } from '../data/team'

export default function Testimonials() {
  return (
    <>
      <PageHero title={testimonials.heading} subtitle={testimonials.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide grid md:grid-cols-3 gap-8">
          {testimonials.items.map((t) => (
            <div key={t.name} className="card">
              <TestimonialVideo src={t.videoUrl} name={t.name} className="mb-4" />
              <h3 className="font-heading font-semibold text-lg">{t.name}</h3>
              <p className="text-blue-light text-sm mt-1">{t.role}</p>
              <p className="text-white/50 text-sm">{t.company}</p>
            </div>
          ))}
        </div>
      </section>
      <BookCallCTA />
    </>
  )
}
