import { motion } from 'framer-motion'

export default function CareerCards({ data }) {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">Green Career Matches</h3>
      <p className="text-eco-muted text-sm mb-8">Best fits based on your existing skills</p>

      <div className="space-y-4">
        {data.careers.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl border border-eco-border bg-eco-dark/50 hover:border-eco-green/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{c.icon}</div>
              <div>
                <div className="text-eco-white font-semibold text-sm group-hover:text-eco-green transition-colors">
                  {c.title}
                </div>
                <div className="text-eco-muted text-xs mt-0.5">
                  Ready in {c.timeline} · Salary {c.salary}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-bold text-eco-green">{c.match}%</div>
              <div className="text-eco-muted text-xs">match</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}