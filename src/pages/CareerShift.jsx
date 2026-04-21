import { motion } from 'framer-motion'
import { useState } from 'react'
import SkillMatch from '../components/careershift/SkillMatch'
import CareerCards from '../components/careershift/CareerCards'
import ReskillRoadmap from '../components/careershift/ReskillRoadmap'

const workers = {
  automotive: {
    label: "🔧 Automotive Tech",
    name: "Jordan",
    skills: [
      { name: "Mechanical Systems", match: 95 },
      { name: "QA / QC", match: 88 },
      { name: "CAD Basics", match: 72 },
      { name: "Team Leadership", match: 85 },
      { name: "Electrical Basics", match: 60 },
    ],
    careers: [
      { title: "EV Battery Technician", match: 91, salary: "+12%", timeline: "4 months", icon: "⚡" },
      { title: "Solar Panel Installer", match: 84, salary: "+8%", timeline: "2 months", icon: "☀️" },
      { title: "Wind Turbine Technician", match: 78, salary: "+15%", timeline: "6 months", icon: "🌬️" },
    ],
    roadmap: [
      { step: 1, skill: "EV Systems Fundamentals", provider: "Coursera", weeks: 4, color: "bg-eco-green" },
      { step: 2, skill: "High-Voltage Safety Cert", provider: "OSHA", weeks: 2, color: "bg-teal-400" },
      { step: 3, skill: "Battery Management Systems", provider: "edX", weeks: 6, color: "bg-cyan-400" },
    ]
  },
  construction: {
    label: "🏗️ Construction Worker",
    name: "Marcus",
    skills: [
      { name: "Structural Systems", match: 90 },
      { name: "Safety Compliance", match: 92 },
      { name: "Project Management", match: 75 },
      { name: "Blueprint Reading", match: 80 },
      { name: "Electrical Basics", match: 55 },
    ],
    careers: [
      { title: "Solar Farm Installer", match: 93, salary: "+10%", timeline: "3 months", icon: "☀️" },
      { title: "Green Building Inspector", match: 86, salary: "+18%", timeline: "5 months", icon: "🏢" },
      { title: "Wind Farm Technician", match: 80, salary: "+14%", timeline: "4 months", icon: "🌬️" },
    ],
    roadmap: [
      { step: 1, skill: "Solar PV Installation", provider: "NABCEP", weeks: 3, color: "bg-eco-green" },
      { step: 2, skill: "Green Building Standards", provider: "LEED", weeks: 4, color: "bg-teal-400" },
      { step: 3, skill: "Electrical Systems Basics", provider: "Coursera", weeks: 5, color: "bg-cyan-400" },
    ]
  },
  driver: {
    label: "🚛 Truck Driver",
    name: "Maria",
    skills: [
      { name: "Vehicle Operations", match: 88 },
      { name: "Route Optimization", match: 82 },
      { name: "Safety Protocols", match: 90 },
      { name: "Logistics Planning", match: 78 },
      { name: "EV Basics", match: 40 },
    ],
    careers: [
      { title: "EV Fleet Operator", match: 89, salary: "+9%", timeline: "2 months", icon: "⚡" },
      { title: "Hydrogen Truck Driver", match: 83, salary: "+12%", timeline: "3 months", icon: "💧" },
      { title: "Drone Delivery Operator", match: 74, salary: "+20%", timeline: "6 months", icon: "🚁" },
    ],
    roadmap: [
      { step: 1, skill: "EV Vehicle Certification", provider: "DMV", weeks: 2, color: "bg-eco-green" },
      { step: 2, skill: "Fleet Management Software", provider: "Udemy", weeks: 3, color: "bg-teal-400" },
      { step: 3, skill: "Hydrogen Safety Training", provider: "OSHA", weeks: 2, color: "bg-cyan-400" },
    ]
  },
  office: {
    label: "💼 Office Admin",
    name: "Priya",
    skills: [
      { name: "Data Analysis", match: 85 },
      { name: "Project Coordination", match: 88 },
      { name: "Reporting & Compliance", match: 80 },
      { name: "Stakeholder Management", match: 90 },
      { name: "Sustainability Basics", match: 65 },
    ],
    careers: [
      { title: "ESG Analyst", match: 92, salary: "+22%", timeline: "3 months", icon: "📊" },
      { title: "Carbon Accountant", match: 85, salary: "+18%", timeline: "4 months", icon: "🌍" },
      { title: "Sustainability Coordinator", match: 88, salary: "+15%", timeline: "2 months", icon: "♻️" },
    ],
    roadmap: [
      { step: 1, skill: "ESG Reporting Frameworks", provider: "Coursera", weeks: 4, color: "bg-eco-green" },
      { step: 2, skill: "Carbon Accounting Basics", provider: "edX", weeks: 3, color: "bg-teal-400" },
      { step: 3, skill: "GRI Standards Certification", provider: "GRI", weeks: 5, color: "bg-cyan-400" },
    ]
  },
}

export default function CareerShift() {
  const [selected, setSelected] = useState('automotive')
  const data = workers[selected]

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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 mb-4">
            For Workers
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-eco-white mb-6">
            Career<span className="text-eco-green">Shift</span>
          </h1>
          <p className="text-eco-muted text-xl max-w-2xl mx-auto">
            Your skills are greener than you think.
            Pick your current role to see your green career matches.
          </p>
        </motion.div>

        {/* Role Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {Object.entries(workers).map(([key, val]) => (
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

        {/* Worker name badge */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-eco-green/30 bg-eco-green/10">
            <div className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
            <span className="text-eco-green text-sm font-medium">
              Showing results for {data.name}
            </span>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SkillMatch data={data} />
          <CareerCards data={data} />
        </div>
        <ReskillRoadmap data={data} />

      </div>
    </main>
  )
}