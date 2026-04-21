import { motion } from 'framer-motion'

export default function ReskillRoadmap({ data }) {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">Reskilling Roadmap</h3>
      <p className="text-eco-muted text-sm mb-8">
        Your path to {data.careers[0].title}
      </p>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-eco-border" />
        <div className="space-y-6">
          {data.roadmap.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex items-start gap-6 pl-2"
            >
              <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-eco-dark font-bold text-sm flex-shrink-0 z-10`}>
                {s.step}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between">
                  <div className="text-eco-white font-semibold text-sm">{s.skill}</div>
                  <div className="text-eco-muted text-xs">{s.weeks} weeks</div>
                </div>
                <div className="text-eco-muted text-xs mt-1">via {s.provider}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="mt-8 w-full py-3 rounded-xl bg-eco-green text-eco-dark font-semibold text-sm hover:opacity-90 transition-all glow">
        Start My Roadmap →
      </button>
    </motion.div>
  )
}