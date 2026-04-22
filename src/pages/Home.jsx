import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ParticleHero from '../components/ParticleHero'
import NetworkViz from '../components/NetworkViz'

// ── SCENE WRAPPER ──
function Scene({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

// ── PROBLEM SCENE ──
function ProblemScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const split = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <Scene>
      <div ref={ref} className="absolute inset-0">
        <NetworkViz split={true} />
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(2,5,4,0.7), transparent, rgba(2,5,4,0.7))' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: 'rgba(255,80,80,0.8)' }}>
            ⚠ System Alert
          </div>
          <h2 className="font-syne font-bold mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em', color: '#e8fff2' }}>
            Disconnected.<br />
            <span style={{ color: 'rgba(232,255,242,0.25)' }}>Broken.</span>
          </h2>
          <p className="font-mono text-sm mb-16 leading-relaxed max-w-lg mx-auto"
            style={{ color: 'rgba(232,255,242,0.4)' }}>
            14M workers have no path forward. 70% of businesses are blind to their emissions.
            2.5M green jobs go unfilled. The system is failing — on both sides.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { stat: '70%', label: 'businesses blind to Scope 3', color: 'rgba(255,80,80,0.8)' },
              { stat: '14M', label: 'workers at risk',              color: 'rgba(255,160,0,0.8)'  },
              { stat: '2.5M', label: 'green jobs unfilled',         color: 'rgba(0,229,255,0.8)'  },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl text-center glass"
              >
                <div className="font-syne font-bold text-4xl mb-1" style={{ color: s.color }}>
                  {s.stat}
                </div>
                <div className="font-mono text-xs" style={{ color: 'rgba(232,255,242,0.4)' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Scene>
  )
}

// ── BRIDGE MOMENT SCENE ──
function BridgeScene() {
  const [phase, setPhase] = useState(0) // 0=frozen, 1=connecting, 2=explosion
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      if (v > 0.3 && phase === 0) setPhase(1)
      if (v > 0.5 && phase === 1) setPhase(2)
    })
    return unsub
  }, [phase, scrollYProgress])

  return (
    <Scene>
      <div ref={ref} className="absolute inset-0">
        <NetworkViz split={phase < 2} lit={phase === 2} />
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,5,4,0.75) 100%)' }} />

      {/* Bridge flash */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.3), transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {phase < 2 ? (
            <motion.div key="pre" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
              <div className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: 'rgba(232,255,242,0.3)' }}>
                Establishing connection...
              </div>
              <h2 className="font-syne font-bold"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em', color: 'rgba(232,255,242,0.2)' }}>
                Bridging...
              </h2>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <div className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: '#00FF88' }}>
                ✓ Bridge formed
              </div>
              <h2 className="font-syne font-bold glow-text"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.03em',
                  color: '#00FF88',
                }}>
                Connected.
              </h2>
              <p className="font-mono text-sm mt-4" style={{ color: 'rgba(232,255,242,0.4)' }}>
                The entire network lights up. Every connection creates impact.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}

// ── PRODUCTS SCENE ──
function ProductsScene() {
  const navigate = useNavigate()
  const products = [
    {
      id:      "scopemap",
      icon:    "◈",
      name:    "ScopeMap",
      tag:     "For Businesses",
      tagline: "See your emissions. Own your compliance.",
      desc:    "AI-powered emissions intelligence. Identify Scope 1, 2 & 3 hotspots instantly. Stay ahead of CSRD, SEC Climate Rule, and more.",
      color:   "#00FF88",
      link:    "/scopemap",
    },
    {
      id:      "careershift",
      icon:    "◉",
      name:    "CareerShift",
      tag:     "For Workers",
      tagline: "Your skills are greener than you think.",
      desc:    "Map your existing skills to in-demand green careers. Get a step-by-step reskilling roadmap tailored to you.",
      color:   "#00E5FF",
      link:    "/careershift",
    },
    {
      id:      "connector",
      icon:    "◎",
      name:    "Connector",
      tag:     "For Both",
      tagline: "Close the green talent gap.",
      desc:    "AI matches transitioning workers with businesses that need green talent. Match scores, skill gaps, readiness timelines.",
      color:   "#a78bfa",
      link:    "/connector",
    },
  ]

  return (
    <Scene>
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.03), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(0,255,136,0.6)' }}>
            The Platform
          </div>
          <h2 className="font-syne font-bold"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
            Three tools.{' '}
            <span className="font-display italic" style={{ color: '#00FF88' }}>One ecosystem.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => navigate(p.link)}
              className="group relative p-8 rounded-3xl cursor-pointer overflow-hidden scan-sweep"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${p.color}10, transparent 60%)` }} />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ border: `1px solid ${p.color}25` }} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full"
                    style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}20`, letterSpacing: '0.1em' }}>
                    {p.tag}
                  </span>
                  <span className="text-3xl" style={{ color: p.color }}>{p.icon}</span>
                </div>

                <div className="font-syne font-bold text-3xl text-white mb-2 tracking-tight">
                  {p.name}
                </div>
                <div className="font-mono text-sm mb-5"
                  style={{ color: p.color, letterSpacing: '0.02em' }}>
                  {p.tagline}
                </div>
                <p className="text-sm leading-relaxed mb-8"
                  style={{ color: 'rgba(232,255,242,0.4)' }}>
                  {p.desc}
                </p>

                {/* Arrow CTA */}
                <div className="flex items-center gap-2 font-mono text-xs font-semibold transition-all group-hover:gap-3"
                  style={{ color: p.color, letterSpacing: '0.1em' }}>
                  EXPLORE {p.name.toUpperCase()}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >→</motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  )
}

// ── HOW IT WORKS SCENE ──
function HowScene() {
  const steps = [
    { num: '01', icon: '◈', label: 'ScopeMap', desc: 'Business maps emissions & identifies open green roles', color: '#00FF88' },
    { num: '02', icon: '◉', label: 'CareerShift', desc: 'Worker maps skills & completes reskilling roadmap', color: '#00E5FF' },
    { num: '03', icon: '◎', label: 'Connector', desc: 'AI matches workers to roles — 48hrs from login to hire', color: '#a78bfa' },
  ]

  return (
    <Scene>
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(2,5,4,0), rgba(0,255,136,0.02), rgba(2,5,4,0))' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(0,255,136,0.6)' }}>
            System Architecture
          </div>
          <h2 className="font-syne font-bold"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
            How the loop<br />
            <span className="font-display italic" style={{ color: '#00FF88' }}>closes itself.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-12 left-0 right-0 h-px hidden md:block"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), rgba(0,229,255,0.1), rgba(167,139,250,0.1), transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                {/* Node */}
                <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full spin-slow"
                    style={{ border: `1px solid ${s.color}20` }} />
                  <div className="absolute inset-3 rounded-full spin-rev"
                    style={{ border: `1px solid ${s.color}30` }} />
                  <div className="relative w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}30` }}>
                    <span className="text-2xl" style={{ color: s.color }}>{s.icon}</span>
                  </div>
                </div>

                <div className="font-mono text-xs mb-2" style={{ color: 'rgba(232,255,242,0.2)', letterSpacing: '0.2em' }}>
                  {s.num}
                </div>
                <div className="font-syne font-bold text-xl text-white mb-3">{s.label}</div>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(232,255,242,0.4)' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center mt-20"
        >
          <div className="font-mono text-xs"
            style={{ color: 'rgba(0,255,136,0.5)', letterSpacing: '0.1em' }}>
            The whole loop runs in{' '}
            <span style={{ color: '#00FF88' }}>under 48 hours</span>
            {' '}from first login to first match.
          </div>
        </motion.div>
      </div>
    </Scene>
  )
}

// ── IMPACT SCENE ──
function ImpactScene() {
  const stats = [
    { value: '18,400+', label: 'Tonnes CO₂ identified', icon: '🌍', color: '#00FF88' },
    { value: '94%',     label: 'Match accuracy',         icon: '🎯', color: '#00E5FF' },
    { value: '2,800+',  label: 'Workers reskilled',      icon: '🌱', color: '#00FF88' },
    { value: '340+',    label: 'Green jobs filled',       icon: '⚡', color: '#a78bfa' },
  ]

  return (
    <Scene>
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,136,0.04), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-syne font-bold"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>
            Numbers that{' '}
            <span className="font-display italic glow-text" style={{ color: '#00FF88' }}>matter.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', bounce: 0.3 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="scan-sweep glass p-8 rounded-3xl text-center"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="font-syne font-bold text-4xl mb-2" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="font-mono text-xs" style={{ color: 'rgba(232,255,242,0.4)', letterSpacing: '0.05em' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  )
}

// ── FINAL CTA SCENE ──
function FinalScene() {
  const navigate = useNavigate()

  return (
    <Scene>
      <div className="absolute inset-0">
        <NetworkViz split={false} lit={true} />
      </div>
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(2,5,4,0.3) 0%, rgba(2,5,4,0.85) 100%)' }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: 'rgba(0,255,136,0.5)' }}>
            The future is green
          </div>

          <h2 className="font-syne font-bold mb-8"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Build the<br />
            <span className="font-display italic glow-text" style={{ color: '#00FF88' }}>bridge.</span>
          </h2>

          <p className="font-mono text-sm mb-14 leading-relaxed"
            style={{ color: 'rgba(232,255,242,0.4)', letterSpacing: '0.03em' }}>
            Join Himanshu, Piyush, Mahi, and Nandani — and hundreds of businesses and workers
            already building the green economy together.
          </p>

          {/* Email + CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-6 py-4 rounded-full text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,255,136,0.12)',
                color: '#e8fff2',
                fontFamily: 'DM Mono, monospace',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,255,136,0.12)'}
            />
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(0,255,136,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/join')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #00FF88, #00C9A7)', color: '#020504', letterSpacing: '0.05em' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">GET EARLY ACCESS</span>
            </motion.button>
          </div>

          <p className="font-mono text-xs" style={{ color: 'rgba(232,255,242,0.2)', letterSpacing: '0.1em' }}>
            FREE DURING BETA · NO CREDIT CARD · CANCEL ANYTIME
          </p>

          {/* Mini stats */}
          <div className="flex items-center justify-center gap-10 mt-16 pt-10"
            style={{ borderTop: '1px solid rgba(0,255,136,0.06)' }}>
            {[
              { val: '500+', label: 'Beta users' },
              { val: '12',   label: 'Countries' },
              { val: '4.9★', label: 'Pilot rating' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-syne font-bold text-2xl" style={{ color: '#00FF88' }}>{s.val}</div>
                <div className="font-mono text-xs mt-1" style={{ color: 'rgba(232,255,242,0.3)', letterSpacing: '0.1em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Scene>
  )
}

// ── MAIN HOME ──
export default function Home() {
  return (
    <main>
      <ParticleHero />
      <ProblemScene />
      <BridgeScene />
      <ProductsScene />
      <HowScene />
      <ImpactScene />
      <FinalScene />
    </main>
  )
}