export const hero = {
  badge: {
    line1: 'AI PLATFORM BY PRI GLOBAL',
    line2: '29+ YEARS IN ENTERPRISE TECHNOLOGY',
  },
  headline: {
    phrases: [
      { line1: 'Turn Your Data', line2: 'Into Decisions.' },
      { line1: 'Launch in Weeks,', line2: 'Not Months.' },
      { line1: 'Your Systems,', line2: 'Unified by AI.' },
    ],
  },
  subheadline:
    'PR1SM sits on top of your existing systems — ask anything by voice or text and get secure answers in seconds.',
  valueProps: [
    { icon: 'Shield', label: 'Secure & Compliant' },
    { icon: 'Plug', label: 'Works With Your Systems' },
    { icon: 'BarChart3', label: 'Built for Enterprise Scale' },
  ],
}

export const dataFlow = {
  heading: 'All Your Data. Unified in PR1SM.',
  subheading: 'Securely connect. Instantly understand.',
  hub: 'Intelligence Layer',
  tagline: { line1: 'One Intelligence Layer.', line2: 'Unlimited Possibilities.' },
  sources: ['ERP Systems', 'CRM', 'Financials', 'Spreadsheets', 'Project Systems', 'Other Sources'],
  outputs: ['Dashboards & Reports', 'AI Insights & Answers', 'Alerts & Notifications', 'Automated Workflows'],
}

export const trustedBy = {
  heading: 'Trusted by Forward-Thinking Leaders',
  logos: [
    { name: 'Solstice Marketing Company', caption: 'MARKETING COMPANY', logo: '/trusted-by/solstice.png' },
    { name: 'Schneider Building', caption: 'LUXURY HOME BUILDER', logo: '/trusted-by/schneider.png' },
    { name: 'Caras Institute', caption: 'ADVISORY & BPO SERVICES', logo: '/trusted-by/caras.png' },
    { name: 'Al Zaabi Construction Company', caption: 'CONSTRUCTION COMPANY', logo: '/trusted-by/al-zaabi.png' },
  ],
}

export const industries = {
  heading: 'PR1SM Powers Every Industry',
  items: [
    { label: 'Construction', icon: 'Construction' },
    { label: 'Manufacturing', icon: 'Manufacturing' },
    { label: 'Real Estate', icon: 'RealEstate' },
    { label: 'Financial Services', icon: 'FinancialServices' },
    { label: 'Healthcare', icon: 'Healthcare' },
    { label: 'Government', icon: 'Government' },
    { label: 'Any Business', icon: 'AnyBusiness' },
  ],
}

export const stats = [
  { value: '29+', line1: 'Years in', line2: 'Enterprise Technology' },
  { value: '500+', line1: 'Enterprise', line2: 'Implementations' },
  { value: '99.9%', line1: 'Platform', line2: 'Uptime' },
  { value: 'Global', line1: 'Presence', line2: 'Worldwide Delivery', isText: true },
]

export const productOverview = {
  label: 'Product overview',
  heading: 'Watch PR1SM in Action',
  body: 'See PR1SM in action. See the power of unified intelligence.',
  videoUrl: '/videos/pr1sm-ai-by-pri-global.mp4',
}

export const dashboardPreview = {
  label: 'Dashboard preview',
  heading: 'Live look at the PR1SM dashboard',
  body: 'Brief overview plus a sample of how KPIs and insights appear in product.',
  kpis: [
    { label: 'Total Projects', value: '128', delta: '▲ 6' },
    { label: 'At Risk', value: '23', delta: '▲ 3' },
    { label: 'On Track', value: '88%', delta: '▲ 4%' },
    { label: 'Total Budget', value: '$2.4B', delta: '▲ 1.2%' },
  ],
  aiInsights: [
    'Material costs projected to rise 8% next quarter.',
    '3 projects at risk of missing their deadline.',
  ],
  alerts: [
    'Budget overrun risk — Metro Center Build',
    'Resource overallocation across 2 projects',
  ],
}

import { testimonials } from './team'

export const testimonialPreview = {
  label: 'Customer Voices',
  heading: 'What customers are saying',
  items: testimonials.items.map(({ name, role, company, videoUrl }) => ({
    name,
    role,
    company,
    videoUrl,
  })),
}
