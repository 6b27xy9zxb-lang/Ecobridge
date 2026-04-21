import { motion } from 'framer-motion'

const matches = [
  { worker: "Jordan K.", role: "EV Battery Tech", score: 94, gaps: 1, ready: "6 weeks", avatar: "JK" },
  { worker: "Maria S.", role: "Solar Installer", score: 89, gaps: 2, ready: "8 weeks", avatar: "MS" },
  { worker: "Tomas R.", role: "Wind Technician", score: 82, gaps: 3, ready: "12 weeks", avatar: "TR" },
  { worker: "Priya N.", role: "EV Battery Tech", score: 77, gaps: 2, ready: "8 weeks", avatar: "PN" },
]

function ScoreRing({ score }) {
  const color = score >= 90 ? '#00FF87' : score >= 80 ? '#00C9A7' : '#0EA5E9'
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15" fill="none" stroke="#1E2E24" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="15" fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${(score / 100) * 94} 94`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-eco-white">{score}</span>
      </div>
    </div>
  )
}

export default function MatchCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">Top Talent Matches</h3>
      <p className="text-eco-muted text-sm mb-8">GreenGrid Co. · 12 open roles</p>

      <div className="space-y-4">
        {matches.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border border-eco-border bg-eco-dark/50 hover:border-eco-green/40 transition-all cursor-pointer group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-eco-green/20 border border-eco-green/30 flex items-center justify-center text-eco-green text-xs font-bold flex-shrink-0">
              {m.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-eco-white font-semibold text-sm group-hover:text-eco-green transition-colors">
                {m.worker}
              </div>
              <div className="text-eco-muted text-xs mt-0.5">{m.role} · {m.gaps} skill gap{m.gaps > 1 ? 's' : ''} · Ready in {m.ready}</div>
            </div>

            {/* Score ring */}
            <ScoreRing score={m.score} />
          </motion.div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 rounded-xl border border-eco-green/30 text-eco-green text-sm font-semibold hover:bg-eco-green/10 transition-all">
        View All Matches →
      </button>
    </motion.div>
  )
}