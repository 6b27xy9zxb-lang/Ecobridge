import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function CTABanner() {
  const navigate = useNavigate()
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,135,0.06) 0%, rgba(0,201,167,0.03) 50%, rgba(14,165,233,0.03) 100%)',
            border: '1px solid rgba(0,255,135,0.12)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,255,135,0.1)',
          }}
        >
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-[80px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,255,135,0.15), transparent)' }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 blur-[60px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,201,167,0.1), transparent)' }} />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 blur-[60px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1), transparent)' }} />

          {/* Corner decorations */}
          {['top-6 left-6', 'top-6 right-6 rotate-90', 'bottom-6 left-6 -rotate-90', 'bottom-6 right-6 rotate-180'].map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-5 h-5 opacity-30`}>
              <div className="absolute top-0 left-0 w-3 h-px bg-eco-green" />
              <div className="absolute top-0 left-0 w-px h-3 bg-eco-green" />
            </div>
          ))}

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.15)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-eco-green pulse-ring" />
              <span className="text-eco-green text-xs font-bold tracking-[0.15em] uppercase">Now accepting early access</span>
            </motion.div>

            <h2 className="font-display text-5xl md:text-7xl font-bold text-eco-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.03em' }}>
              Ready to bridge<br />
              <span className="text-eco-green glow-text italic">the gap?</span>
            </h2>

            <p className="text-eco-muted text-lg max-w-lg mx-auto mb-12 leading-relaxed">
              Join hundreds of businesses and workers already using EcoBridge
              to navigate the green economy together.
            </p>

            {/* Email input */}
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-6 py-4 rounded-full text-eco-white placeholder:text-eco-muted text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,255,135,0.1)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,255,135,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,255,135,0.1)'}
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,135,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/join')}
                className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm text-eco-dark whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #00FF87, #00C9A7)' }}
              >
                Get Access →
              </motion.button>
            </div>

            <p className="text-eco-muted text-xs tracking-wide">
              No credit card · Free during beta · Cancel anytime
            </p>

            {/* Mini stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-14 pt-10"
              style={{ borderTop: '1px solid rgba(0,255,135,0.08)' }}
            >
              {[
                { val: "500+", label: "Beta users" },
                { val: "12",   label: "Countries"  },
                { val: "4.9★", label: "Pilot rating" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-mono-display text-2xl font-bold text-eco-green">{s.val}</div>
                  <div className="text-eco-muted text-xs mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}