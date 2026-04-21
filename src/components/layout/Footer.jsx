import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t mt-20 overflow-hidden"
      style={{ borderColor: 'rgba(0,255,135,0.06)', background: 'linear-gradient(to bottom, #030806, #050a07)' }}
    >
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00FF87, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-eco-green glow-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-eco-dark" />
              </div>
              <span className="font-display font-bold text-xl text-eco-white">
                Eco<span className="text-eco-green">Bridge</span>
              </span>
            </div>
            <p className="text-eco-muted text-sm leading-relaxed max-w-xs">
              The open innovation platform bridging the gap between emissions compliance and green talent.
            </p>
          </div>

          {/* Products */}
          <div>
            <div className="text-eco-green text-xs font-bold tracking-[0.2em] uppercase mb-4">Products</div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'ScopeMap',    to: '/scopemap'    },
                { label: 'CareerShift', to: '/careershift' },
                { label: 'Connector',   to: '/connector'   },
              ].map(l => (
                <Link key={l.to} to={l.to}
                  className="text-eco-muted text-sm hover:text-eco-green transition-colors w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-eco-green text-xs font-bold tracking-[0.2em] uppercase mb-4">Company</div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'About',       to: '/about' },
                { label: 'Join Waitlist', to: '/join' },
              ].map(l => (
                <Link key={l.to} to={l.to}
                  className="text-eco-muted text-sm hover:text-eco-green transition-colors w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(0,255,135,0.06)' }}
        >
          <p className="text-eco-muted text-xs tracking-wide">
            © 2024 EcoBridge — Building the green economy, together.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-eco-green pulse-ring" />
            <span className="text-eco-green text-xs font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}