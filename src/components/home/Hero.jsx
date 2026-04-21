import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const CHARS = "Bridge the Gap\nGo Green.".split('')

export default function Hero() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Deep background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(0,255,135,0.12) 0%, transparent 60%), #030806' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,135,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Parallax orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full blur-[140px] drift"
          style={{ background: 'radial-gradient(circle, rgba(0,255,135,0.08), transparent)' }} />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full blur-[120px] drift"
          style={{ background: 'radial-gradient(circle, rgba(0,201,167,0.07), transparent)', animationDelay: '3s' }} />
      </motion.div>

      {/* Decorative rings */}
      <div className="absolute top-16 right-16 w-48 h-48 opacity-[0.08] pointer-events-none">
        <div className="w-full h-full rounded-full border border-eco-green spin-slow" />
        <div className="absolute inset-8 rounded-full border border-eco-green/60 spin-rev" />
        <div className="absolute inset-16 rounded-full border border-eco-green/40 spin-slow" style={{ animationDuration: '8s' }} />
      </div>
      <div className="absolute bottom-24 left-16 w-32 h-32 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full rounded-full border border-teal-400 spin-rev" />
      </div>

      {/* Corner brackets */}
      {[
        'top-8 left-8',
        'top-8 right-8 rotate-90',
        'bottom-8 left-8 -rotate-90',
        'bottom-8 right-8 rotate-180',
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls} w-6 h-6 opacity-20 pointer-events-none`}>
          <div className="absolute top-0 left-0 w-3 h-px bg-eco-green" />
          <div className="absolute top-0 left-0 w-px h-3 bg-eco-green" />
        </div>
      ))}

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,135,0.08), rgba(0,201,167,0.04))',
            border: '1px solid rgba(0,255,135,0.15)',
            boxShadow: '0 0 30px rgba(0,255,135,0.05)',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-eco-green pulse-ring" />
          <span className="text-eco-green text-xs font-bold tracking-[0.2em] uppercase">
            Open Innovation Platform
          </span>
          <span className="text-eco-muted text-xs">·</span>
          <span className="text-eco-muted text-xs tracking-wide">Beta Live</span>
        </motion.div>

        {/* Giant headline with staggered reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-eco-white"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            Bridge the Gap
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="font-display font-bold text-eco-green glow-text"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            Go Green.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-eco-muted text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontWeight: 400 }}
        >
          The AI platform connecting businesses navigating{' '}
          <span className="text-eco-white">emissions compliance</span> with workers ready for{' '}
          <span className="text-eco-white">green careers</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,135,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/scopemap')}
            className="relative px-10 py-4 rounded-full font-bold text-base text-eco-dark overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #00FF87 0%, #00C9A7 100%)' }}
          >
            <motion.span
              className="absolute inset-0 bg-white/25"
              initial={{ x: '-100%', skewX: '-20deg' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Explore Platform →</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/about')}
            className="px-10 py-4 rounded-full font-semibold text-base text-eco-white transition-all"
            style={{ border: '1px solid rgba(0,255,135,0.15)', background: 'rgba(0,255,135,0.03)' }}
          >
            Meet the Team
          </motion.button>
        </motion.div>

        {/* Product pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto"
        >
          {[
            { name: "ScopeMap",    desc: "Emissions intelligence",        icon: "🗺️", link: "/scopemap"    },
            { name: "CareerShift", desc: "Green career navigation",       icon: "🌱", link: "/careershift" },
            { name: "Connector",   desc: "AI-powered talent matching",    icon: "🔗", link: "/connector"   },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => navigate(p.link)}
              className="scanline-card glass p-5 rounded-2xl cursor-pointer text-left"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{p.icon}</span>
                <span className="font-bold text-eco-white text-sm">{p.name}</span>
              </div>
              <p className="text-eco-muted text-xs">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-eco-muted text-[10px] tracking-[0.3em] uppercase font-mono">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-eco-green to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}