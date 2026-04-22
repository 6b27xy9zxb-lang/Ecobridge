import { useEffect, useRef } from 'react'

export default function NetworkViz({ split = false, lit = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W        = canvas.width  = canvas.offsetWidth
    let H        = canvas.height = canvas.offsetHeight
    let raf

    class Node {
      constructor(side) {
        this.side = side // 'left','right','center'
        this.reset()
      }
      reset() {
        if (!split) {
          this.x = Math.random() * W
          this.y = Math.random() * H
        } else if (this.side === 'left') {
          this.x = Math.random() * (W * 0.4)
          this.y = Math.random() * H
        } else {
          this.x = W * 0.6 + Math.random() * (W * 0.4)
          this.y = Math.random() * H
        }
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r  = Math.random() * 2 + 1
        this.isHot = this.side === 'left' && Math.random() > 0.7
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > W) this.vx *= -1
        if (this.y < 0 || this.y > H) this.vy *= -1
      }
      draw() {
        const color = this.isHot
          ? `rgba(255,60,60,0.8)`
          : lit
            ? `rgba(0,255,136,0.9)`
            : this.side === 'right'
              ? `rgba(0,229,255,0.7)`
              : `rgba(0,255,136,0.7)`

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.fillStyle = color
        ctx.fill()

        if (this.r > 1.5 || this.isHot) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI*2)
          ctx.fillStyle = this.isHot ? 'rgba(255,60,60,0.08)' : 'rgba(0,255,136,0.06)'
          ctx.fill()
        }
      }
    }

    const sides = split
      ? [
          ...Array.from({ length: 18 }, () => new Node('left')),
          ...Array.from({ length: 18 }, () => new Node('right')),
        ]
      : Array.from({ length: 40 }, () => new Node('center'))

    const connDist = split ? 100 : 130

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Connections
      for (let i = 0; i < sides.length; i++) {
        for (let j = i+1; j < sides.length; j++) {
          const a = sides[i]; const b = sides[j]
          if (split && a.side === b.side) {
            const dx = a.x - b.x; const dy = a.y - b.y
            const d  = Math.sqrt(dx*dx + dy*dy)
            if (d < connDist) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
              const alpha = (1 - d/connDist) * 0.2
              ctx.strokeStyle = a.side === 'left'
                ? `rgba(0,255,136,${alpha})`
                : `rgba(0,229,255,${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          } else if (!split) {
            const dx = a.x - b.x; const dy = a.y - b.y
            const d  = Math.sqrt(dx*dx + dy*dy)
            if (d < connDist) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
              const alpha = (1 - d/connDist) * (lit ? 0.35 : 0.15)
              ctx.strokeStyle = `rgba(0,255,136,${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // If lit — cross connections
      if (lit && split) {
        const lefts  = sides.filter(n => n.side === 'left').slice(0,5)
        const rights = sides.filter(n => n.side === 'right').slice(0,5)
        lefts.forEach(a => {
          rights.forEach(b => {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = 'rgba(0,255,136,0.25)'
            ctx.lineWidth = 0.8
            ctx.stroke()
          })
        })
      }

      sides.forEach(n => { n.update(); n.draw() })
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [split, lit])

  return <canvas ref={canvasRef} className="w-full h-full" />
}