import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { footer } from '../../data/team'
import { footerLegalLinks } from '../../data/legal'

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer className="relative z-10 bg-navy3/85 text-white border-t border-white/[0.06]">
      <div className="section-padding container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col items-start text-left">
            <Logo to="/" variant="full" size="footer" className="mb-1" />
            <p className="mt-4 font-heading font-bold text-lg tracking-wide text-white/80">
              {footer.tagline}
            </p>
            <p className="mt-2 text-white/50 text-sm">
              A product of{' '}
              <a href={footer.priGlobalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-white">
                PRI Global
              </a>
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-white/50 hover:text-white/80 transition-colors">About</Link>
              <Link to="/use-cases" className="text-sm text-white/50 hover:text-white/80 transition-colors">Use Cases</Link>
              <Link to="/leadership" className="text-sm text-white/50 hover:text-white/80 transition-colors">Leadership</Link>
              <Link to="/testimonials" className="text-sm text-white/50 hover:text-white/80 transition-colors">Testimonials</Link>
              <Link to="/request" className="text-sm text-white/50 hover:text-white/80 transition-colors">Request</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">
              Stay Up To Date
            </h4>
            {subscribed ? (
              <p className="text-teal-light text-sm">Subscribed! Thank you.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-input flex-1 !py-2.5"
                />
                <button type="submit" className="btn-gradient text-sm !px-4 !py-2.5 w-full sm:w-auto">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="gradient-divider mt-12" />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-sm text-white/35">© {new Date().getFullYear()} PR1SM. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              {footerLegalLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-xs text-white/35 hover:text-white/60 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue transition-colors">
            <LinkedInIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
