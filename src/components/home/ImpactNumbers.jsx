import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedCounter({ from, to, suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix)

  useEffect(() => {
    if (isInView) animate(count, to, { duration: 2.5, ease: "easeOut" })
  }, [isInView])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const stats = [
  { value: 18400, suffix: "+", label: "Tonnes CO₂ identified",  sub: "across ScopeMap users",       icon: "🌍" },
  { value: 94,    suffix: "%", label: "Career match accuracy",   sub: "on CareerShift placements",   icon: "🎯" },
  { value: 2800,  suffix: "+", label: "Workers reskilled",       sub: "through our roadmaps",        icon: "🌱" },
  { value: 340,   suffix: "+", label: "Green jobs filled",       sub: "via the Connector layer",     icon: "🔗" },
]

export default function ImpactNumbers() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,135,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px w-16 bg-eco-border" />
            <span className="text-eco-green text-xs font-bold uppercase tracking-[0.2em]">Real Impact</span>
            <div className="h-px w-16 bg-eco-border" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-eco-white"
            style={{ letterSpacing: '-0.02em' }}>
            Numbers that <span className="text-eco-green glow-text italic">matter.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="scanline-card glass p-8 rounded-3xl text-center"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="font-mono-display text-5xl font-bold text-eco-green glow-text mb-2">
                <AnimatedCounter from={0} to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-eco-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-eco-muted text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}