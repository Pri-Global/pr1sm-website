import { Briefcase, ChevronRight, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import PortalDashboardShell from '../components/portal/PortalDashboardShell'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import { dashboardPreview } from '../data/home'

const PIPELINE = [
  { name: 'Sarah Chen', role: 'Senior ML Engineer', stage: 'Final Interview', score: 94, status: 'Active' },
  { name: 'Marcus Webb', role: 'Data Architect', stage: 'Technical Review', score: 88, status: 'Active' },
  { name: 'Elena Rossi', role: 'AI Product Lead', stage: 'Offer Sent', score: 91, status: 'Pending' },
  { name: 'James Okonkwo', role: 'Platform Engineer', stage: 'Screening', score: 76, status: 'Active' },
]

const PROJECTS = [
  { name: 'Metro Center Build', progress: 72, status: 'At Risk', budget: '$48M' },
  { name: 'Cloud Migration Phase 2', progress: 91, status: 'On Track', budget: '$12M' },
  { name: 'Talent AI Rollout', progress: 58, status: 'On Track', budget: '$3.2M' },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function ClientDashboard() {
  return (
    <PortalDashboardShell
      title="Client Dashboard"
      subtitle="Good morning, Alex — Hiring Client"
      accent="blue"
      signOutTo="/portal/client"
    >
      <motion.div {...fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {dashboardPreview.kpis.map((kpi) => (
          <div key={kpi.label} className="portal-card rounded-2xl border border-blue/20 p-4">
            <p className="text-white/45 text-xs">{kpi.label}</p>
            <p className="stat-value !text-2xl sm:!text-3xl mt-1">{kpi.value}</p>
            <p className="text-teal-light text-xs mt-0.5">{kpi.delta}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue/15 flex items-center justify-center">
                <AnimatedIcon Icon={Users} size={16} className="text-blue-light" />
              </span>
              <h2 className="font-heading font-semibold text-white">Talent Pipeline</h2>
            </div>
            <span className="badge-blue text-[10px]">{PIPELINE.length} candidates</span>
          </div>

          <div className="portal-card rounded-2xl border border-blue/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left text-white/40 text-xs">
                    <th className="px-4 py-3 font-medium">Candidate</th>
                    <th className="px-4 py-3 font-medium">Stage</th>
                    <th className="px-4 py-3 font-medium">AI Score</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE.map((row) => (
                    <tr key={row.name} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{row.name}</p>
                        <p className="text-white/40 text-xs">{row.role}</p>
                      </td>
                      <td className="px-4 py-3 text-white/60">{row.stage}</td>
                      <td className="px-4 py-3">
                        <span className="text-blue-light font-medium">{row.score}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge text-[10px] ${row.status === 'Pending' ? 'badge-gold' : 'badge-teal'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-blue/15 flex items-center justify-center">
                <AnimatedIcon Icon={Briefcase} size={16} className="text-blue-light" />
              </span>
              <h2 className="font-heading font-semibold text-white">Project Status</h2>
            </div>
            <div className="space-y-3">
              {PROJECTS.map((project) => (
                <div key={project.name} className="portal-card rounded-xl border border-blue/20 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-white text-sm font-medium">{project.name}</p>
                    <span className={`badge text-[10px] shrink-0 ${project.status === 'At Risk' ? 'badge-gold' : 'badge-teal'}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">{project.budget}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue to-purple rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-white/35 text-xs mt-1.5">{project.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          <div className="portal-card rounded-xl border border-blue/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AnimatedIcon Icon={Sparkles} size={16} className="text-blue-light" />
              <p className="text-white font-medium text-sm">AI Insights</p>
              <span className="badge-blue !py-0.5 !text-[9px] ml-auto">2 new</span>
            </div>
            <ul className="space-y-2">
              {dashboardPreview.aiInsights.map((item) => (
                <li key={item} className="text-white/50 text-xs leading-relaxed flex gap-2">
                  <span className="feature-dot-blue !mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button type="button" className="mt-4 inline-flex items-center gap-1 text-xs text-blue-light hover:text-white transition-colors">
              View all insights
              <AnimatedIcon Icon={ChevronRight} size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </PortalDashboardShell>
  )
}
