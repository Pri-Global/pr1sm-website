import Button from './Button'

export default function BookCallCTA({ heading, subheading, className = '' }) {
  return (
    <section className={`section-padding section-default ${className}`}>
      <div className="container-wide">
        <div className="cta-banner section-padding !py-12 md:!py-16 text-center">
          {heading && (
            <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-white">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-3 text-white/55 max-w-xl mx-auto">{subheading}</p>
          )}
          <Button to="/request" variant="primary" className="mt-6">
            Book a Call
          </Button>
        </div>
      </div>
    </section>
  )
}

export function PriGlobalLink() {
  return (
    <a
      href="https://priglobal.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-light hover:text-white transition-colors text-sm"
    >
      PRI Global
    </a>
  )
}
