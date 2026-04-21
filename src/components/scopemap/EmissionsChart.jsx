import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { motion } from 'framer-motion'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-eco-card border border-eco-border rounded-xl px-4 py-3">
        <p className="text-eco-white font-semibold">{payload[0].payload.scope}</p>
        <p className="text-eco-green text-sm">{payload[0].value.toLocaleString()} tonnes CO₂e</p>
      </div>
    )
  }
  return null
}

export default function EmissionsChart({ data }) {
  const chartData = [
    { scope: 'Scope 1', value: data.scope1, fill: '#00FF87' },
    { scope: 'Scope 2', value: data.scope2, fill: '#00C9A7' },
    { scope: 'Scope 3', value: data.scope3, fill: '#0EA5E9' },
  ]
  const total = data.scope1 + data.scope2 + data.scope3

  return (
    <motion.div
      key={total}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl border border-eco-border bg-eco-card"
    >
      <h3 className="font-display text-xl font-bold text-eco-white mb-2">
        Emissions Breakdown
      </h3>
      <p className="text-eco-muted text-sm mb-8">FY2024 · tonnes CO₂e</p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} barSize={48}>
          <XAxis dataKey="scope" tick={{ fill: '#4B6B55', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#4B6B55', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,255,135,0.05)' }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-6 border-t border-eco-border flex items-center justify-between">
        <div className="text-eco-muted text-sm">Total emissions</div>
        <div className="font-display text-2xl font-bold text-eco-green">
          {total.toLocaleString()} <span className="text-sm font-normal text-eco-muted">tonnes CO₂e</span>
        </div>
      </div>
    </motion.div>
  )
}