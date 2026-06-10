import { dashboardPreview } from '../../data/home'
import { ScrollRevealList, ScrollRevealItem } from '../animations/ScrollReveal'

export default function DashboardMock() {
  return (
    <div className="card !p-0 overflow-hidden shadow-btn-glow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-navy3/80">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-white text-sm">PR1SM.AI</span>
          <span className="badge-teal !py-0.5 !text-[9px]">Live</span>
        </div>
        <span className="text-white/45 text-sm">Good morning, Alex</span>
      </div>

      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardPreview.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3">
            <p className="text-white/45 text-xs">{kpi.label}</p>
            <p className="stat-value !text-2xl mt-1">{kpi.value}</p>
            <p className="text-teal-light text-xs mt-0.5">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 grid md:grid-cols-2 gap-3">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-medium text-sm">AI Insights</p>
            <span className="badge-blue !py-0.5 !text-[9px]">2 new</span>
          </div>
          <ScrollRevealList className="space-y-2">
            {dashboardPreview.aiInsights.map((item) => (
              <ScrollRevealItem key={item} as="li" className="text-white/50 text-xs leading-relaxed flex gap-2 list-none">
                <span className="feature-dot-blue !mt-1.5" />
                {item}
              </ScrollRevealItem>
            ))}
          </ScrollRevealList>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
          <p className="text-white font-medium text-sm mb-3">Recent Alerts</p>
          <ScrollRevealList className="space-y-2">
            {dashboardPreview.alerts.map((item) => (
              <ScrollRevealItem key={item} as="li" className="text-white/50 text-xs leading-relaxed flex gap-2 list-none">
                <span className="feature-dot-purple !mt-1.5" />
                {item}
              </ScrollRevealItem>
            ))}
          </ScrollRevealList>
        </div>
      </div>
    </div>
  )
}
