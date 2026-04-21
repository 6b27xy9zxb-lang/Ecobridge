import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { role: "EV Tech", open: 5, filled: 3 },
  { role: "Solar", open: 4, filled: 2 },
  { role: "Wind", open: 3, filled: 1 },
  { role: "Grid Eng.", open: 2, filled: 2 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-eco-card border border-eco-border rounded-xl px-4 py-3">
        <p className="text-eco-white font-semibold text-sm mb-1">{label}</p>
        <p className="text-eco-green text-xs">Open: {payload[0]?.value}</p>
        <p className="text-teal-400 text-xs">Filled: {payload[1]?.value}</p>
      </div>
    )
  }
  return null
}

export default function TalentGap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">Talent Gap Overview</h3>
      <p className="text-eco-muted text-sm mb-8">Open vs filled roles by category</p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barSize={28} barGap={4}>
          <XAxis dataKey="role" tick={{ fill: '#4B6B55', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#4B6B55', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,255,135,0.05)' }} />
          <Bar dataKey="open" fill="#00FF87" radius={[6, 6, 0, 0]} />
          <Bar dataKey="filled" fill="#00C9A7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-6 border-t border-eco-border flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-eco-green" />
          <span className="text-eco-muted text-xs">Open roles</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-400" />
          <span className="text-eco-muted text-xs">Filled roles</span>
        </div>
        <div className="ml-auto text-eco-muted text-xs">
          <span className="text-eco-green font-bold">6</span> roles filled this month
        </div>
      </div>
    </motion.div>
  )
}