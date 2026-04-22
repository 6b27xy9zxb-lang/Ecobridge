import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGS = [
  "Initializing EcoBridge v2.4.1...",
  "Loading emissions database...",
  "Mapping workforce nodes...",
  "Calibrating AI matcher...",
  "Connecting supply chain graph...",
  "Analyzing 14M worker profiles...",
  "Scanning compliance frameworks...",
  "Building Connector layer...",
  "System ready.",
]

export default function Preloader({ onDone }) {
  const [progress, setProgress]   = useState(0)
  const [logs, setLogs]           = useState([])
  const [done, setDone]           = useState(false)

  useEffect(() => {
    let p = 0
    let logIdx = 0
    const iv = setInterval(() => {
      p += Math.random() * 4 + 1
      if (p >= 100) { p = 100; clearInterval(iv) }
      setProgress(Math.min(p, 100))

      if (logIdx < LOGS.length && p > (logIdx / LOGS.length) * 100) {
        setLogs(prev => [...prev, LOGS[logIdx]])
        logIdx++
      }
    }, 80)

    const t = setTimeout(() => {
      setDone(true)
      setTimeout(onDone, 900)
    }, 3400)

    return () => { clearInterval(iv); clearTimeout(t) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="fixed inset-0 z-[99000] flex flex-col items-center justify-center"
          style={{ background: '#020504' }}
        >
          {/* Scanning grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,136,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,136,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Scan sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: ['-100%', '100vh'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.8), transparent)' }}
            />
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo mark */}
            <div className="relative w-20 h-20 mb-10">
              <div className="absolute inset-0 rounded-full border border-[rgba(0,255,136,0.2)] spin-slow" />
              <div className="absolute inset-3 rounded-full border border-[rgba(0,255,136,0.3)] spin-rev" />
              <div className="absolute inset-6 rounded-full bg-[#00FF88] pulse-glow" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-syne text-3xl font-bold text-white mb-1 tracking-tight"
            >
              Eco<span style={{ color: '#00FF88' }}>Bridge</span>
            </motion.div>
            <div className="font-mono text-xs text-[#2a4a33] tracking-[0.3em] uppercase mb-10">
              System Initializing
            </div>

            {/* Progress bar */}
            <div className="w-64 h-px bg-[#0a1a0c] relative mb-6">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00FF88, #00E5FF)',
                  boxShadow: '0 0 10px #00FF88',
                  transition: 'width 0.1s ease',
                }}
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00FF88]"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)', boxShadow: '0 0 8px #00FF88' }} />
            </div>

            {/* Progress number */}
            <div className="font-mono text-[#00FF88] text-sm mb-10 tabular-nums">
              {Math.round(progress).toString().padStart(3, '0')}%
            </div>

            {/* Log stream */}
            <div className="w-72 h-28 overflow-hidden flex flex-col justify-end">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i === logs.length - 1 ? 1 : 0.2, x: 0 }}
                  className="font-mono text-xs py-0.5"
                  style={{ color: i === logs.length - 1 ? '#00FF88' : '#2a4a33' }}
                >
                  <span style={{ color: '#2a4a33' }}>&gt; </span>{log}
                  {i === logs.length - 1 && <span className="blink">_</span>}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}