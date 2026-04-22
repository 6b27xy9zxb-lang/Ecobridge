import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ParticleHero() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const navigate  = useNavigate()

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    let   W       = canvas.width  = window.innerWidth
    let   H       = canvas.height = window.innerHeight
    let   raf

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      init()
    }
    window.addEventListener('resize', onResize)

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    // Nodes
    class Node {
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * W
        this.y  = Math.random() * H
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.r  = Math.random() * 2 + 1
        this.alpha = Math.random() * 0.6 + 0.2
        this.green = Math.random() > 0.3
      }
      update() {
        const dx = mouse.current.x - this.x
        const dy = mouse.current.y - this.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 150) {
          this.vx -= (dx / dist) * 0.3
          this.vy -= (dy / dist) * 0.3
        }
        this.vx *= 0.98
        this.vy *= 0.98
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > W) this.vx *= -1
        if (this.y < 0 || this.y > H) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.green
          ? `rgba(0,255,136,${this.alpha})`
          : `rgba(0,229,255,${this.alpha * 0.6})`
        ctx.fill()

        if (this.r > 1.5) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = this.green
            ? `rgba(0,255,136,${this.alpha * 0.08})`
            : `rgba(0,229,255,${this.alpha * 0.05})`
          ctx.fill()
        }
      }
    }

    let nodes = []
    const NCOUNT = Math.floor((W * H) / 12000)

    function init() {
      nodes = Array.from({ length: NCOUNT }, () => new Node())
    }

    // Energy pulses
    const pulses = []
    setInterval(() => {
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      const b = nodes[Math.floor(Math.random() * nodes.length)]
      pulses.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0 })
    }, 300)

    function draw() {
      ctx.fillStyle = 'rgba(2,5,4,0.18)'
      ctx.fillRect(0, 0, W, H)

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,255,136,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Energy pulses along random edges
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += 0.02
        if (p.t > 1) { pulses.splice(i, 1); continue }

        const px = p.ax + (p.bx - p.ax) * p.t
        const py = p.ay + (p.by - p.ay) * p.t

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${1 - p.t})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${(1 - p.t) * 0.15})`
        ctx.fill()
      }

      nodes.forEach(n => { n.update(); n.draw() })

      // Center glow
      const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, H * 0.5)
      grad.addColorStop(0, 'rgba(0,255,136,0.04)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      raf = requestAnimationFrame(draw)
    }

    init()
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(2,5,4,0.8) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-12"
          style={{ border: '1px solid rgba(0,255,136,0.15)', background: 'rgba(0,255,136,0.04)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] ring-pulse" style={{ position: 'relative' }} />
          <span className="font-mono text-[#00FF88] text-xs tracking-[0.25em] uppercase">
            Network Online · 2,847 active nodes
          </span>
        </motion.div>

        {/* Headline — staggered lines */}
        <div className="overflow-hidden mb-3">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16,1,0.3,1] }}
            className="font-display italic"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'rgba(232,255,242,0.4)', letterSpacing: '0.1em' }}
          >
            Two crises. One system.
          </motion.div>
        </div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.16,1,0.3,1] }}
            className="font-syne font-bold leading-none"
            style={{
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #e8fff2 0%, #00FF88 50%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EcoBridge.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-mono text-sm mb-16 leading-relaxed"
          style={{ color: 'rgba(232,255,242,0.4)', letterSpacing: '0.05em' }}
        >
          The AI platform connecting emissions compliance ↔ green talent
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(0,255,136,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/scopemap')}
            className="relative px-10 py-4 rounded-full font-bold text-sm overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #00FF88, #00C9A7)', color: '#020504', letterSpacing: '0.05em' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">ENTER THE SYSTEM →</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: 'rgba(0,255,136,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/about')}
            className="px-10 py-4 rounded-full font-semibold text-sm"
            style={{
              border: '1px solid rgba(0,255,136,0.15)',
              background: 'rgba(0,255,136,0.02)',
              color: 'rgba(232,255,242,0.7)',
              letterSpacing: '0.05em',
            }}
          >
            MEET THE TEAM
          </motion.button>
        </motion.div>

        {/* 3 product pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 max-w-xl mx-auto"
        >
          {[
            { name: "ScopeMap",    icon: "◈", link: "/scopemap"    },
            { name: "CareerShift", icon: "◉", link: "/careershift" },
            { name: "Connector",   icon: "◎", link: "/connector"   },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: 'rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)' }}
              onClick={() => navigate(p.link)}
              className="py-3 px-4 rounded-xl cursor-pointer text-center transition-all"
              style={{ border: '1px solid rgba(0,255,136,0.08)', background: 'rgba(0,255,136,0.02)' }}
            >
              <div className="text-lg mb-1" style={{ color: '#00FF88' }}>{p.icon}</div>
              <div className="font-mono text-xs" style={{ color: 'rgba(232,255,242,0.5)', letterSpacing: '0.1em' }}>
                {p.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,255,242,0.2)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1,0.2,1], opacity: [0.6,0.1,0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, #00FF88, transparent)' }}
        />
      </motion.div>
    </div>
  )
}