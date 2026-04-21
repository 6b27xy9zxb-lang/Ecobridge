import { motion } from 'framer-motion'
import { useState } from 'react'
import EmissionsChart from '../components/scopemap/EmissionsChart'
import HotspotTable from '../components/scopemap/HotspotTable'
import ComplianceAlerts from '../components/scopemap/ComplianceAlerts'

const companies = {
  manufacturing: {
    label: "🏭 Manufacturing",
    scope1: 4200, scope2: 1800, scope3: 12400,
    hotspots: [
      { category: "Supply Chain", pct: 52, trend: "↑", trendColor: "text-red-400" },
      { category: "Energy Use", pct: 27, trend: "→", trendColor: "text-yellow-400" },
      { category: "Logistics", pct: 14, trend: "↓", trendColor: "text-eco-green" },
      { category: "Facilities", pct: 7, trend: "→", trendColor: "text-yellow-400" },
    ]
  },
  retail: {
    label: "🛒 Retail",
    scope1: 1200, scope2: 3400, scope3: 8900,
    hotspots: [
      { category: "Logistics", pct: 45, trend: "↑", trendColor: "text-red-400" },
      { category: "Facilities", pct: 30, trend: "→", trendColor: "text-yellow-400" },
      { category: "Supply Chain", pct: 18, trend: "↓", trendColor: "text-eco-green" },
      { category: "Packaging", pct: 7, trend: "↑", trendColor: "text-red-400" },
    ]
  },
  tech: {
    label: "💻 Tech Company",
    scope1: 400, scope2: 2100, scope3: 6200,
    hotspots: [
      { category: "Cloud & Servers", pct: 48, trend: "↑", trendColor: "text-red-400" },
      { category: "Business Travel", pct: 28, trend: "↓", trendColor: "text-eco-green" },
      { category: "Supply Chain", pct: 16, trend: "→", trendColor: "text-yellow-400" },
      { category: "Facilities", pct: 8, trend: "↓", trendColor: "text-eco-green" },
    ]
  },
  energy: {
    label: "⚡ Energy Company",
    scope1: 18000, scope2: 4200, scope3: 22000,
    hotspots: [
      { category: "Operations", pct: 58, trend: "↑", trendColor: "text-red-400" },
      { category: "Supply Chain", pct: 24, trend: "→", trendColor: "text-yellow-400" },
      { category: "Distribution", pct: 12, trend: "↓", trendColor: "text-eco-green" },
      { category: "Facilities", pct: 6, trend: "→", trendColor: "text-yellow-400" },
    ]
  },
}

export default function ScopeMap() {
  const [selected, setSelected] = useState('manufacturing')
  const data = companies[selected]

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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 mb-4">
            For Businesses
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-eco-white mb-6">
            Scope<span className="text-eco-green">Map</span>
          </h1>
          <p className="text-eco-muted text-xl max-w-2xl mx-auto">
            See your emissions. Own your compliance.
            Pick a company type below to see a live demo.
          </p>
        </motion.div>

        {/* Company Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {Object.entries(companies).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                selected === key
                  ? 'bg-eco-green text-eco-dark border-eco-green glow'
                  : 'border-eco-border text-eco-muted hover:border-eco-green/40 hover:text-eco-white'
              }`}
            >
              {val.label}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <EmissionsChart data={data} />
          <HotspotTable data={data} />
        </div>
        <ComplianceAlerts />

      </div>
    </main>
  )
}