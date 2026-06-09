import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { HUBSPOT_MEETING } from '../../data/stats'

export default function CTABanner({
  title = 'Ready to Transform Your Business with AI?',
  text = 'Schedule a free consultation with our AI experts and discover how PR1SM.AI can be configured specifically for your enterprise.',
  buttonLabel = 'Schedule a Free Consultation',
  buttonHref = HUBSPOT_MEETING,
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-navy via-blue to-purple section-padding">
        <div className="relative container-wide text-center text-white">
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight max-w-2xl mx-auto">
            {title}
          </h2>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            {text}
          </p>
          <div className="mt-8">
            <Button
              href={buttonHref}
              variant="primary"
              className="!bg-white !text-navy hover:!bg-white/90"
            >
              {buttonLabel}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
