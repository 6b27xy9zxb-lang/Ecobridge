import { motion } from 'framer-motion'

const alerts = [
  {
    regulation: "EU CSRD",
    status: "Gap Detected",
    deadline: "Jan 1, 2025",
    statusColor: "text-red-400",
    badgeColor: "bg-red-400/10 border-red-400/30",
    icon: "⚠️"
  },
  {
    regulation: "SEC Climate Rule",
    status: "At Risk",
    deadline: "Jun 1, 2025",
    statusColor: "text-yellow-400",
    badgeColor: "bg-yellow-400/10 border-yellow-400/30",
    icon: "🔶"
  },
  {
    regulation: "UK TCFD",
    status: "On Track",
    deadline: "Apr 6, 2025",
    statusColor: "text-eco-green",
    badgeColor: "bg-eco-green/10 border-eco-green/30",
    icon: "✅"
  },
]

export default function ComplianceAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">
        Compliance Alerts
      </h3>
      <p className="text-eco-muted text-sm mb-8">Upcoming regulatory deadlines</p>

      <div className="space-y-4">
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-4 rounded-xl border ${a.badgeColor} bg-eco-dark/50`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{a.icon}</span>
              <div>
                <div className="text-eco-white font-semibold text-sm">{a.regulation}</div>
                <div className="text-eco-muted text-xs mt-0.5">Deadline: {a.deadline}</div>
              </div>
            </div>
            <span className={`text-xs font-bold ${a.statusColor}`}>{a.status}</span>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 rounded-xl border border-eco-green/30 text-eco-green text-sm font-semibold hover:bg-eco-green/10 transition-all">
        View Full Compliance Report →
      </button>
    </motion.div>
  )
}