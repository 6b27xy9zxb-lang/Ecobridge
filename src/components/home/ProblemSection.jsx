import { motion } from 'framer-motion'

const problems = [
  {
    icon: "🏭",
    stat: "70%",
    label: "of businesses",
    desc: "have no clear view of their Scope 3 emissions — the biggest compliance risk they face right now.",
    accent: "from-emerald-500/20 to-transparent",
    border: "hover:border-emerald-500/30",
  },
  {
    icon: "👷",
    stat: "14M",
    label: "workers at risk",
    desc: "in fossil fuel industries have transferable skills but no clear path to green jobs.",
    accent: "from-teal-500/20 to-transparent",
    border: "hover:border-teal-500/30",
  },
  {
    icon: "🔌",
    stat: "2.5M",
    label: "green jobs unfilled",
    desc: "Green employers can't find skilled workers fast enough to meet clean energy demand.",
    accent: "from-cyan-500/20 to-transparent",
    border: "hover:border-cyan-500/30",
  },
]

export default function ProblemSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eco-green/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-eco-border" />
            <span className="text-eco-green text-xs font-bold uppercase tracking-[0.2em]">The Problem</span>
            <div className="h-px flex-1 bg-eco-border" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-eco-white text-center leading-tight"
            style={{ letterSpacing: '-0.02em' }}>
            The green transition<br />
            <span className="text-eco-green glow-text">is broken.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl border border-eco-border ${p.border} transition-all overflow-hidden group`}
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-5xl mb-6">{p.icon}</div>
                <div className="font-display text-6xl font-bold text-eco-green glow-text mb-1">{p.stat}</div>
                <div className="text-eco-white font-semibold text-lg mb-4">{p.label}</div>
                <p className="text-eco-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-eco-green/40 to-transparent"
        />
      </div>
    </section>
  )
}