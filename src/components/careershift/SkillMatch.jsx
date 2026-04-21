import { motion } from 'framer-motion'

export default function SkillMatch({ data }) {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">Skill Match Analysis</h3>
      <p className="text-eco-muted text-sm mb-8">{data.name} · Current Role</p>

      <div className="space-y-5">
        {data.skills.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <span className="text-eco-white text-sm font-medium">{s.name}</span>
              <span className="text-eco-green font-bold text-sm">{s.match}%</span>
            </div>
            <div className="h-2 rounded-full bg-eco-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.match}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-eco-green to-teal-400"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}