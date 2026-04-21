import { motion } from 'framer-motion'

export default function HotspotTable({ data }) {
  return (
    <motion.div
      key={data.hotspots[0].category}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">
        Emissions Hotspots
      </h3>
      <p className="text-eco-muted text-sm mb-8">Ranked by contribution to total footprint</p>

      <div className="space-y-5">
        {data.hotspots.map((h, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-eco-white text-sm font-medium">{h.category}</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${h.trendColor}`}>{h.trend}</span>
                <span className="text-eco-green font-bold text-sm">{h.pct}%</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-eco-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${h.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full rounded-full bg-eco-green"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}