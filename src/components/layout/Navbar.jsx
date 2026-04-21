import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: "ScopeMap",    to: "/scopemap"    },
  { label: "CareerShift", to: "/careershift" },
  { label: "Connector",   to: "/connector"   },
  { label: "About",       to: "/about"       },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[rgba(0,255,135,0.08)] bg-[rgba(3,8,6,0.85)] backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full bg-eco-green pulse-ring" />
            <div className="relative w-9 h-9 rounded-full bg-eco-green glow-sm flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-eco-dark" />
            </div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-eco-white leading-none tracking-tight">
              Eco<span className="text-eco-green">Bridge</span>
            </div>
            <div className="text-[9px] text-eco-muted tracking-[0.25em] uppercase leading-none mt-0.5">
              Green Economy OS
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="relative px-4 py-2 group">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === l.to ? 'text-eco-green' : 'text-eco-muted group-hover:text-eco-white'
              }`}>
                {l.label}
              </span>
              {location.pathname === l.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-px bg-eco-green"
                  style={{ boxShadow: '0 0 8px #00FF87' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-px h-4 bg-eco-border" />
          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-5 py-2.5 rounded-full text-sm font-bold text-eco-dark overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00FF87, #00C9A7)' }}
            >
              <span className="relative z-10">Get Early Access</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-5 h-px bg-eco-white" />
          <motion.div animate={{ opacity: open ? 0 : 1 }} className="w-5 h-px bg-eco-white" />
          <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-5 h-px bg-eco-white" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-eco-border bg-eco-dark/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-semibold transition-colors ${
                      location.pathname === l.to ? 'text-eco-green' : 'text-eco-muted'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/join" onClick={() => setOpen(false)}>
                <button className="w-full mt-2 py-3 rounded-full bg-eco-green text-eco-dark font-bold text-sm">
                  Get Early Access
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}