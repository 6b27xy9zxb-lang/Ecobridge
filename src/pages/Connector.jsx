import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MatchCards from '../components/connector/MatchCards'
import TalentGap from '../components/connector/TalentGap'

const stats = [
  { val: "340+", label: "Matches made", icon: "🤝" },
  { val: "91%", label: "Avg match score", icon: "🎯" },
  { val: "6 wks", label: "Avg time to hire", icon: "⚡" },
]

export default function Connector() {
  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 mb-4">
            For Both
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-eco-white mb-6">
            <span className="text-eco-green">Connector</span> Layer
          </h1>
          <p className="text-eco-muted text-xl max-w-2xl mx-auto">
            Close the green talent gap. AI matches transitioning workers
            with businesses that need green skills — faster than any recruiter.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-eco-border bg-eco-card text-center hover:border-eco-green/30 transition-all group"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-display text-3xl font-bold text-eco-green">
                {s.val}
              </div>
              <div className="text-eco-muted text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MatchCards />
          <TalentGap />
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-8 rounded-2xl border border-eco-green/20 bg-eco-green/5 text-center"
        >
          <p className="text-eco-white font-semibold text-lg mb-2">
            Ready to close your talent gap?
          </p>
          <p className="text-eco-muted text-sm mb-6">
            Post your open green roles and get matched with ready workers in 48 hours.
          </p>
          <Link to="/join">
            <button className="px-8 py-3 rounded-full bg-eco-green text-eco-dark font-bold text-sm hover:opacity-90 transition-all glow">
              Get Started Free →
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  )
}