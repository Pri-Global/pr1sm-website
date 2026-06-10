import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import { ScrollRevealList, ScrollRevealItem } from '../components/animations/ScrollReveal'
import { legalPages, footerLegalLinks } from '../data/legal'

function renderParagraph(text) {
  if (text.includes('co-studio')) {
    return (
      <>
        Website design and development by{' '}
        <a href="https://co-studio.at" target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-white">
          co-studio
        </a>
        {' '}(co-studio.at).
      </>
    )
  }

  if (text.includes('\n')) {
    return text.split('\n').map((line, i, arr) => (
      <span key={i}>
        {/^https?:\/\//.test(line.trim()) ? (
          <a href={line.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-white break-all">
            {line.trim()}
          </a>
        ) : (
          line
        )}
        {i < arr.length - 1 && <br />}
      </span>
    ))
  }

  return text
}

export default function LegalPage({ type }) {
  const page = legalPages[type]
  if (!page) return null

  return (
    <>
      <PageHero title={page.title} subtitle={`Last updated: ${page.lastUpdated}`} eyebrow={page.eyebrow} />
      <section className="section-alt section-padding">
        <div className="container-wide max-w-3xl">
          <ScrollRevealList className="space-y-10">
            {page.sections.map((section) => (
              <ScrollRevealItem key={section.heading}>
                <h2 className="font-heading font-bold text-xl text-white mb-3">{section.heading}</h2>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-white/60 text-sm leading-relaxed">
                      {renderParagraph(paragraph)}
                    </p>
                  ))}
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealList>

          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap gap-4">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  link.to === `/${type}` ? 'text-blue-light' : 'text-white/45 hover:text-white/75'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
