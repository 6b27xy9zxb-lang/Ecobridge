import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function ConfettiPiece({ delay, x, color }) {
  return (
    <motion.div
      initial={{ y: -20, x: x, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: 300, opacity: 0, rotate: 360, scale: 0.5 }}
      transition={{ duration: 1.5, delay, ease: "easeIn" }}
      className="absolute top-0 w-3 h-3 rounded-sm"
      style={{ backgroundColor: color, left: '50%' }}
    />
  )
}

const confettiColors = ['#00FF87', '#00C9A7', '#0EA5E9', '#F59E0B', '#EC4899']
const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  delay: Math.random() * 0.5,
  x: (Math.random() - 0.5) * 300,
  color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
}))

export default function Join() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  function handleSubmit() {
    if (!email) return
    setShowConfetti(true)
    setTimeout(() => {
      setSubmitted(true)
      setShowConfetti(false)
    }, 800)
  }

  return (
    <main className="pt-28 pb-20 px-6 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">

          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="p-10 rounded-3xl border border-eco-border bg-eco-card relative overflow-hidden"
            >
              {/* Confetti burst */}
              {showConfetti && confettiPieces.map((p) => (
                <ConfettiPiece key={p.id} delay={p.delay} x={p.x} color={p.color} />
              ))}

              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-eco-green/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 rounded-full bg-eco-green glow mx-auto mb-4"
                  />
                  <h1 className="font-display text-4xl font-bold text-eco-white mb-3">
                    Get Early Access
                  </h1>
                  <p className="text-eco-muted">
                    Join the waitlist and be first to experience EcoBridge.
                  </p>
                </div>

                {/* Type selector */}
                <div className="mb-6">
                  <label className="text-eco-white text-sm font-semibold mb-3 block">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Business", "Worker"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                          type === t
                            ? 'border-eco-green bg-eco-green/10 text-eco-green'
                            : 'border-eco-border text-eco-muted hover:border-eco-green/30'
                        }`}
                      >
                        {t === "Business" ? "🏭 Business" : "👷 Worker"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="text-eco-white text-sm font-semibold mb-3 block">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="you@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-eco-dark border border-eco-border text-eco-white placeholder:text-eco-muted focus:outline-none focus:border-eco-green/50 transition-colors text-sm"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!email}
                  className="w-full py-4 rounded-xl bg-eco-green text-eco-dark font-bold text-sm hover:opacity-90 transition-all glow disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Join the Waitlist →
                </button>

                <p className="text-eco-muted text-xs text-center mt-4">
                  Free during beta · No spam · Cancel anytime
                </p>
              </div>
            </motion.div>

          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="p-10 rounded-3xl border border-eco-green/40 bg-eco-card text-center relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-eco-green/5 rounded-3xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-eco-green/20 blur-3xl rounded-full" />

              <div className="relative z-10">
                {/* Big checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 rounded-full bg-eco-green/20 border-2 border-eco-green flex items-center justify-center mx-auto mb-6 glow"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl"
                  >
                    ✅
                  </motion.span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl font-bold text-eco-white mb-3"
                >
                  You're on the list!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-eco-muted mb-2"
                >
                  We'll reach out to{' '}
                  <span className="text-eco-green font-semibold">{email}</span>{' '}
                  when your early access is ready.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-eco-muted text-sm mb-8"
                >
                  {type && `Welcome aboard, ${type === 'Business' ? '🏭 ' : '👷 '}${type}!`}
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-8 pt-6 border-t border-eco-border"
                >
                  {[
                    { val: "501", label: "Beta users" },
                    { val: "12", label: "Countries" },
                    { val: "4.9★", label: "Pilot rating" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="font-display text-2xl font-bold text-eco-green">{s.val}</div>
                      <div className="text-eco-muted text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}