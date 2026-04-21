import { motion } from 'framer-motion'

const steps = [
  {
    number: "01",
    icon: "🏭",
    title: "Business maps its emissions",
    desc: "A company plugs into ScopeMap and instantly sees where its Scope 1, 2 & 3 emissions are coming from — and which regulations it's at risk of missing.",
    tag: "ScopeMap",
    tagColor: "text-emerald-400 bg-emerald-400/10",
  },
  {
    number: "02",
    icon: "🌱",
    title: "Workers find their green path",
    desc: "A transitioning worker enters their current role into CareerShift. AI maps their skills to green jobs and generates a step-by-step reskilling roadmap.",
    tag: "CareerShift",
    tagColor: "text-teal-400 bg-teal-400/10",
  },
  {
    number: "03",
    icon: "🔗",
    title: "The Connector closes the loop",
    desc: "EcoBridge matches the business's open green roles with workers who are ready or nearly ready — showing match scores, skill gaps, and hire timelines.",
    tag: "Connector",
    tagColor: "text-cyan-400 bg-cyan-400/10",
  },
]

export default function HowItWorks() {
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
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-eco-white mt-4 mb-6">
            Three steps. One ecosystem.
          </h2>
          <p className="text-eco-muted text-lg max-w-2xl mx-auto">
            EcoBridge connects every part of the green transition — 
            from emissions data to hired green workers.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eco-green/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number bubble */}
                <div className="relative z-10 w-14 h-14 rounded-full border-2 border-eco-green bg-eco-dark flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-eco-green text-lg">{s.number}</span>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-[calc(-50%+28px)] text-eco-green/40 text-xl">
                    →
                  </div>
                )}

                {/* Card */}
                <div className="p-6 rounded-2xl border border-eco-border bg-eco-card hover:border-eco-green/30 transition-all w-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${s.tagColor}`}>
                    {s.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-eco-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-eco-muted text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-eco-muted text-sm">
            The whole loop runs in under{' '}
            <span className="text-eco-green font-semibold">48 hours</span>
            {' '}from first login to first match.
          </p>
        </motion.div>

      </div>
    </section>
  )
}