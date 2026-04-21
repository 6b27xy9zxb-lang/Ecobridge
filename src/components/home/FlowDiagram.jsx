import { motion } from 'framer-motion'

export default function FlowDiagram() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-eco-green text-sm font-semibold uppercase tracking-widest">
            The Ecosystem
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-eco-white mt-4 mb-6">
            Everything connects
          </h2>
          <p className="text-eco-muted text-lg max-w-2xl mx-auto">
            EcoBridge is one living system — each product feeds the next,
            closing the loop between emissions data and green talent.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* ScopeMap Node */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center group hover:border-emerald-500/60 transition-all"
          >
            <div className="text-4xl mb-3">🗺️</div>
            <div className="font-display text-xl font-bold text-eco-white mb-2">ScopeMap</div>
            <p className="text-eco-muted text-xs leading-relaxed mb-4">
              Business identifies emissions hotspots and open green roles
            </p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
              For Businesses
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-1 px-2"
          >
            <div className="hidden md:block text-eco-green text-2xl">→</div>
            <div className="md:hidden text-eco-green text-2xl">↓</div>
            <span className="text-eco-muted text-xs text-center">talent gaps</span>
          </motion.div>

          {/* Connector Node — center */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 p-6 rounded-2xl border border-eco-green/40 bg-eco-green/5 text-center relative group hover:border-eco-green/70 transition-all"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-eco-green/5 blur-xl group-hover:bg-eco-green/10 transition-all" />

            <div className="relative z-10">
              <div className="text-4xl mb-3">🔗</div>
              <div className="font-display text-xl font-bold text-eco-green mb-2">Connector</div>
              <p className="text-eco-muted text-xs leading-relaxed mb-4">
                AI matches transitioning workers with open green roles in real time
              </p>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-eco-green/10 text-eco-green">
                The Bridge
              </div>
            </div>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-1 px-2"
          >
            <div className="hidden md:block text-eco-green text-2xl">←</div>
            <div className="md:hidden text-eco-green text-2xl">↓</div>
            <span className="text-eco-muted text-xs text-center">ready workers</span>
          </motion.div>

          {/* CareerShift Node */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 p-6 rounded-2xl border border-teal-500/30 bg-teal-500/5 text-center group hover:border-teal-500/60 transition-all"
          >
            <div className="text-4xl mb-3">🌱</div>
            <div className="font-display text-xl font-bold text-eco-white mb-2">CareerShift</div>
            <p className="text-eco-muted text-xs leading-relaxed mb-4">
              Worker maps skills, gets reskilling roadmap, becomes match-ready
            </p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400">
              For Workers
            </div>
          </motion.div>

        </div>

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl border border-eco-border bg-eco-card text-center"
        >
          <p className="text-eco-muted text-sm">
            The result?{' '}
            <span className="text-eco-green font-semibold">Businesses meet compliance goals.</span>
            {' '}Workers get better jobs.{' '}
            <span className="text-eco-green font-semibold">The planet wins.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}