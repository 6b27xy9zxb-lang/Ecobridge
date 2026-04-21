import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const products = [
  {
    link: "/scopemap",
    icon: "🗺️",
    tag: "For Businesses",
    name: "ScopeMap",
    tagline: "See your emissions. Own your compliance.",
    desc: "Identify Scope 1, 2 & 3 emissions hotspots instantly. Get AI-generated compliance insights for CSRD, SEC Climate Rule, and more — before deadlines hit.",
    features: ["Emissions hotspot detection", "Compliance gap analysis", "Regulation deadline tracker", "AI-powered insights"],
    color: "from-emerald-500/10 to-transparent",
    border: "hover:border-emerald-500/40",
    tagColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    link: "/careershift",
    icon: "🌱",
    tag: "For Workers",
    name: "CareerShift",
    tagline: "Your skills are greener than you think.",
    desc: "Map your existing skills to in-demand green careers. Get a personalized reskilling roadmap with courses, certifications, and timelines tailored to you.",
    features: ["Skill-to-career matching", "Personalized roadmaps", "Course recommendations", "Salary delta projections"],
    color: "from-teal-500/10 to-transparent",
    border: "hover:border-teal-500/40",
    tagColor: "bg-teal-500/10 text-teal-400",
  },
  {
    link: "/connector",
    icon: "🔗",
    tag: "For Both",
    name: "Connector",
    tagline: "Close the green talent gap together.",
    desc: "AI matches transitioning workers with businesses that need green talent. See match scores, skill gaps, and readiness timelines — all in one place.",
    features: ["AI-powered talent matching", "Match score rankings", "Skill gap visibility", "Readiness timelines"],
    color: "from-cyan-500/10 to-transparent",
    border: "hover:border-cyan-500/40",
    tagColor: "bg-cyan-500/10 text-cyan-400",
  },
]

export default function ProductTriad() {
  const navigate = useNavigate()
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-eco-green text-sm font-semibold uppercase tracking-widest">
            The Platform
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-eco-white mt-4 mb-6">
            Three tools. One mission.
          </h2>
          <p className="text-eco-muted text-lg max-w-2xl mx-auto">
            EcoBridge is the only platform that connects the business side 
            and the worker side of the green transition in one ecosystem.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative p-8 rounded-2xl border border-eco-border bg-eco-card ${p.border} transition-all group cursor-pointer overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10">
                {/* Tag */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${p.tagColor}`}>
                  {p.tag}
                </span>

                {/* Icon & Name */}
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-display text-2xl font-bold text-eco-white mb-2">
                  {p.name}
                </h3>
                <p className="text-eco-green text-sm font-medium mb-4">
                  {p.tagline}
                </p>
                <p className="text-eco-muted text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-eco-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-eco-green flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => navigate(p.link)}
                  className="mt-8 w-full py-3 rounded-xl border border-eco-border group-hover:border-eco-green/50 group-hover:text-eco-green text-eco-white/70 text-sm font-semibold transition-all"
                >
                  Explore {p.name} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}