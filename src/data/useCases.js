export const useByRole = {
  heading: 'Use PR1SM.AI by Role',
  subheading: 'Solutions tailored to the way you work.',
  eyebrow: 'By Role',
  roles: [
    {
      icon: 'Crown',
      accent: 'blue',
      title: 'Executive Leaders',
      description: 'Make smarter decisions and drive business impact.',
      bullets: ['Executive Dashboards', 'Strategic Insights', 'Performance Tracking'],
    },
    {
      icon: 'Settings',
      accent: 'purple',
      title: 'Operations Managers',
      description: 'Optimize processes and improve operational efficiency.',
      bullets: ['Process Optimization', 'Real-time Monitoring', 'Resource Management'],
    },
    {
      icon: 'Cpu',
      accent: 'teal',
      title: 'IT Managers',
      description: 'Deliver reliable services and maximize system performance.',
      bullets: ['Infrastructure Monitoring', 'Incident Management', 'Service Reliability'],
    },
    {
      icon: 'DollarSign',
      accent: 'gold',
      title: 'Finance Managers',
      description: 'Improve financial performance and ensure accountability.',
      bullets: ['Budget Tracking', 'Financial Reporting', 'Cost Optimization'],
    },
    {
      icon: 'Kanban',
      accent: 'blue',
      title: 'Project Managers',
      description: 'Deliver projects on time, on scope, and on budget.',
      bullets: ['Project Planning', 'Progress Tracking', 'Risk Management'],
    },
    {
      icon: 'Heart',
      accent: 'purple',
      title: 'Healthcare Professionals',
      description: 'Enhance patient care and operational outcomes.',
      bullets: ['Patient Monitoring', 'Care Coordination', 'Compliance Tracking'],
    },
  ],
  cta: {
    heading: "Don't see your role?",
    subheading: 'PR1SM.AI adapts to your unique needs.',
  },
}

export const useByOutcome = {
  heading: 'Use PR1SM.AI by Outcome',
  subheading: 'Drive measurable results that matter.',
  eyebrow: 'By Outcome',
  outcomes: [
    {
      icon: 'Gauge',
      accent: 'blue',
      title: 'Increase Efficiency',
      description: 'Streamline operations and get more done.',
      bullets: ['Process Automation', 'Workflow Optimization', 'Time Savings'],
    },
    {
      icon: 'PiggyBank',
      accent: 'gold',
      title: 'Reduce Costs',
      description: 'Lower operating costs and improve margins.',
      bullets: ['Cost Optimization', 'Resource Efficiency', 'Waste Reduction'],
    },
    {
      icon: 'TrendingUp',
      accent: 'teal',
      title: 'Improve Performance',
      description: 'Boost productivity and achieve better results.',
      bullets: ['Performance Monitoring', 'KPI Tracking', 'Continuous Improvement'],
    },
    {
      icon: 'AlertTriangle',
      accent: 'purple',
      title: 'Manage Risk',
      description: 'Identify risks early and strengthen compliance.',
      bullets: ['Risk Assessment', 'Compliance Management', 'Audit & Reporting'],
    },
    {
      icon: 'Smile',
      accent: 'blue',
      title: 'Enhance Customer Experience',
      description: 'Deliver exceptional experiences that drive loyalty.',
      bullets: ['Customer Insights', 'Service Optimization', 'Satisfaction Tracking'],
    },
    {
      icon: 'Lightbulb',
      accent: 'gold',
      title: 'Drive Innovation',
      description: 'Turn insights into new ideas and market opportunities.',
      bullets: ['Data Insights', 'Innovation Management', 'Strategic Planning'],
    },
  ],
  cta: {
    heading: "Let's achieve your goals together.",
    subheading: 'See how PR1SM.AI can help you get there.',
  },
}

export const useCaseCategories = [
  {
    id: 'executive',
    accent: 'blue',
    title: 'Executive Decision Intelligence',
    tagline: 'Smarter decisions. Greater impact.',
    useCases: [
      {
        title: 'Real-Time Business Health Dashboard',
        problem: 'Executives rely on fragmented reports from finance, ops, and sales.',
        solution: ['Connect ERP, CRM, Finance, Excel', 'Unified dashboard across departments', 'Voice query: "What\'s at risk this quarter?"'],
        outcomes: ['10x faster decision-making', 'Instant board-ready visibility'],
      },
      {
        title: 'Predictive Risk Detection',
        problem: 'Issues are identified too late (missed targets, cost overruns).',
        solution: ['AI flags anomalies across systems', 'Predicts delays, cost overruns, revenue risk'],
        outcomes: ['Early intervention', 'Reduced surprises'],
      },
      {
        title: 'Board Meeting Automation',
        problem: 'Weeks spent preparing executive reports.',
        solution: ['Auto-generate board-level insights', 'Export to presentation-ready format'],
        outcomes: ['Hours → minutes', 'Consistent executive storytelling'],
      },
    ],
  },
  {
    id: 'operational',
    accent: 'purple',
    title: 'Operational Efficiency & Automation',
    tagline: 'Optimize processes. Drive results.',
    useCases: [
      {
        title: 'Workflow Bottleneck Detection',
        problem: 'No visibility into where delays occur.',
        solution: ['Tracks workflows across systems', 'Identifies bottlenecks in real time'],
        outcomes: ['Faster cycle times', 'Increased throughput'],
      },
      {
        title: 'Process Automation Engine',
        problem: 'Manual tasks slow down operations.',
        solution: ['Automate repetitive workflows', 'Trigger actions across systems'],
        outcomes: ['30–50% time savings', 'Reduced manual errors'],
      },
      {
        title: 'Resource Optimization',
        problem: 'Teams are over/under-utilized.',
        solution: ['Real-time workforce & resource tracking', 'Optimization recommendations'],
        outcomes: ['Better utilization', 'Lower labor costs'],
      },
    ],
  },
  {
    id: 'unified',
    accent: 'teal',
    title: 'Unified Systems & Secure AI Layer',
    tagline: 'Connect, secure, and scale with confidence.',
    useCases: [
      {
        title: 'Multi-System Integration Without Replacement',
        problem: 'Too many disconnected systems (ERP, CRM, Excel).',
        solution: ['Sits on top of all systems', 'Normalizes data in real time'],
        outcomes: ['No rip & replace', 'Faster implementation'],
      },
      {
        title: 'Data Governance & Access Control',
        problem: 'Data access is inconsistent and risky.',
        solution: ['Role-based access controls', 'Table-level security'],
        outcomes: ['Secure enterprise AI', 'Compliance-ready'],
      },
      {
        title: 'System Performance Monitoring',
        problem: 'IT lacks visibility across systems.',
        solution: ['Monitor system health', 'Identify performance issues early'],
        outcomes: ['Reduced downtime', 'Improved reliability'],
      },
    ],
  },
  {
    id: 'financial',
    accent: 'gold',
    title: 'Financial Clarity & Margin Control',
    tagline: 'Better visibility. Stronger financial performance.',
    useCases: [
      {
        title: 'Real-Time Margin Visibility',
        problem: 'Margins are unclear until month-end.',
        solution: ['Live tracking of revenue vs cost', 'Integrated across systems'],
        outcomes: ['Immediate insights', 'Better financial decisions'],
      },
      {
        title: 'Cost Leak Detection',
        problem: 'Hidden inefficiencies erode profits.',
        solution: ['Identifies anomalies in spending', 'Highlights unnecessary costs'],
        outcomes: ['Increased profitability', 'Better cost control'],
      },
      {
        title: 'Cash Flow Intelligence',
        problem: 'Cash flow forecasting is manual.',
        solution: ['Predictive cash flow modeling', 'Alerts for risk'],
        outcomes: ['Improved liquidity', 'Reduced financial risk'],
      },
    ],
  },
  {
    id: 'project',
    accent: 'blue',
    title: 'Project Intelligence & Delivery Control',
    tagline: 'Deliver projects on time, on scope, and on budget.',
    useCases: [
      {
        title: 'Budget vs Actual Tracking',
        problem: 'Projects go over budget without visibility.',
        solution: ['Real-time cost tracking', 'Alerts on overruns'],
        outcomes: ['Budget control', 'Reduced losses'],
      },
      {
        title: 'Timeline Risk Prediction',
        problem: 'Delays are identified too late.',
        solution: ['AI predicts schedule risks', 'Highlights critical path issues'],
        outcomes: ['On-time delivery', 'Better planning'],
      },
      {
        title: 'Takeoff Automation',
        problem: 'Manual takeoffs take 30+ hours.',
        solution: ['AI-assisted blueprint analysis'],
        outcomes: ['30 hours → 15 minutes', 'Massive productivity gain'],
      },
    ],
  },
  {
    id: 'patient',
    accent: 'purple',
    title: 'Patient & Operational Intelligence',
    tagline: 'Better care. Smarter operations. Lower risk.',
    useCases: [
      {
        title: 'Patient Data Insights',
        problem: 'Data is siloed across systems.',
        solution: ['Unified patient data view'],
        outcomes: ['Better care decisions'],
      },
      {
        title: 'Operational Efficiency',
        problem: 'Administrative overhead is high.',
        solution: ['Automate reporting and workflows'],
        outcomes: ['More time for patients'],
      },
      {
        title: 'Compliance Tracking',
        problem: 'Regulatory compliance is complex.',
        solution: ['Automated compliance monitoring'],
        outcomes: ['Reduced risk'],
      },
    ],
  },
]
