export const SITE_URL = 'https://pr1sm.ai'
export const SITE_NAME = 'PR1SM.AI'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-full.png`
export const DEFAULT_DESCRIPTION =
  'PR1SM.AI is an enterprise AI platform by PRI Global. Unify your data, get instant answers, and automate workflows — secure, custom-fit AI for your business.'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PR1SM.AI',
  legalName: 'PRI Global',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: '1997',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '174 Clarkson Road',
    addressLocality: 'Ellisville',
    addressRegion: 'MO',
    postalCode: '63011',
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'PRI Global',
    url: 'https://priglobal.com',
  },
  sameAs: ['https://priglobal.com', 'https://linkedin.com'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@type': 'Organization', name: 'PR1SM.AI' },
}

function webPageJsonLd(title, description, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  }
}

function softwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: DEFAULT_DESCRIPTION,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for enterprise pricing' },
    provider: { '@type': 'Organization', name: 'PRI Global' },
  }
}

export const seoRoutes = {
  '/': {
    title: 'PR1SM.AI — Turn Your Data Into Decisions. Instantly.',
    description:
      'Custom-fit enterprise AI by PRI Global. Connect ERP, CRM, and spreadsheets — ask questions, get answers, automate workflows. Secure. Scalable. Proven.',
    keywords: 'enterprise AI, business intelligence, PR1SM.AI, PRI Global, data unification, AI platform',
    jsonLd: [organizationJsonLd, websiteJsonLd, softwareJsonLd()],
  },
  '/about': {
    title: 'About PR1SM.AI — Enterprise AI by PRI Global',
    description:
      'Learn about PR1SM.AI — 29+ years of enterprise technology expertise, mission-driven AI built for real business outcomes.',
    keywords: 'about PR1SM.AI, PRI Global AI, enterprise intelligence platform',
  },
  '/how-it-works': {
    title: 'How PR1SM.AI Works — Connect, Unify, Answer, Act',
    description:
      'See how PR1SM.AI connects your systems, unifies data, delivers AI insights, and automates workflows — from data to decisions in minutes.',
    keywords: 'how PR1SM works, AI workflow, data unification, enterprise AI process',
  },
  '/our-platform': {
    title: 'PR1SM.AI Platform — Capabilities & Features',
    description:
      'Explore PR1SM.AI capabilities: AI intelligence layer, data unification, workflow automation, voice AI, predictive insights, and reporting.',
    keywords: 'PR1SM platform, AI capabilities, conversational AI, workflow automation',
  },
  '/results-that-matter': {
    title: 'Results That Matter — PR1SM.AI Impact & ROI',
    description:
      'Real PR1SM.AI results: 97% faster reporting, 12–18% cost savings, 98% user satisfaction, and 2–4 week time to value.',
    keywords: 'PR1SM results, AI ROI, enterprise AI outcomes, business impact',
  },
  '/security-and-trust': {
    title: 'Security & Trust — PR1SM.AI Enterprise Compliance',
    description:
      'Enterprise-grade security: SOC 2 Type II, encryption, RBAC, audit logs. Your data stays in your environment. GDPR & HIPAA ready.',
    keywords: 'PR1SM security, SOC 2 AI, enterprise AI compliance, data privacy',
  },
  '/use-cases': {
    title: 'Use Cases — PR1SM.AI for Every Department',
    description:
      'PR1SM.AI use cases for executives, operations, finance, projects, and healthcare — real problems, practical solutions, measurable outcomes.',
    keywords: 'PR1SM use cases, enterprise AI examples, AI business use cases',
  },
  '/use-by-role': {
    title: 'Use PR1SM.AI by Role — Solutions for Your Team',
    description:
      'PR1SM.AI solutions for executives, operations, IT, finance, project managers, and healthcare professionals.',
    keywords: 'AI by role, executive AI dashboard, operations AI, finance AI',
  },
  '/use-by-outcome': {
    title: 'Use PR1SM.AI by Outcome — Drive Measurable Results',
    description:
      'Achieve efficiency, cost reduction, performance gains, risk management, customer experience, and innovation with PR1SM.AI.',
    keywords: 'AI outcomes, business efficiency AI, cost reduction AI, innovation AI',
  },
  '/leadership': {
    title: 'Leadership & Team — PR1SM.AI by PRI Global',
    description:
      'Meet the PR1SM.AI leadership team and builders behind the enterprise AI platform — led by Ajay Patel and PRI Global.',
    keywords: 'PR1SM leadership, Ajay Patel, PRI Global team, AI leadership',
  },
  '/testimonials': {
    title: 'Testimonials — What Clients Say About PR1SM.AI',
    description:
      'Watch client testimonials and hear how enterprises use PR1SM.AI to transform data into decisions.',
    keywords: 'PR1SM testimonials, AI client reviews, enterprise AI success stories',
  },
  '/request': {
    title: 'Book a Call — Request a PR1SM.AI Demo',
    description:
      'Request a personalized PR1SM.AI demo. Tell us about your business, goals, and systems — our team responds within 1–2 business days.',
    keywords: 'PR1SM demo, book AI demo, request PR1SM, contact PR1SM.AI',
  },
  '/legal': {
    title: 'Legal Notice — PR1SM.AI',
    description: 'Legal notice and terms of use for the PR1SM.AI website operated by PRI Global.',
    robots: 'index, follow',
  },
  '/privacy': {
    title: 'Privacy Policy — PR1SM.AI',
    description: 'Privacy policy for PR1SM.AI — how PRI Global collects, uses, and protects your information.',
    robots: 'index, follow',
  },
  '/cookies': {
    title: 'Cookie Policy — PR1SM.AI',
    description: 'Cookie policy for PR1SM.AI — learn about cookies and analytics on pr1sm.ai.',
    robots: 'index, follow',
  },
}

export function getSeoForPath(pathname) {
  const config = seoRoutes[pathname] || {
    title: 'Page Not Found — PR1SM.AI',
    description: DEFAULT_DESCRIPTION,
    robots: 'noindex, follow',
  }

  const jsonLd = config.jsonLd || [webPageJsonLd(config.title, config.description, pathname)]

  return {
    ...config,
    jsonLd: Array.isArray(jsonLd) ? jsonLd : [jsonLd],
  }
}

export const sitemapPaths = Object.keys(seoRoutes)
