import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Home from './pages/Home'
import ScopeMap from './pages/ScopeMap'
import CareerShift from './pages/CareerShift'
import Connector from './pages/Connector'
import About from './pages/About'
import Join from './pages/Join'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Preloader from './components/Preloader'

function CustomCursor() {
  const dot   = useRef(null)
  const ring  = useRef(null)
  const pos   = useRef({ x:0, y:0 })
  const rPos  = useRef({ x:0, y:0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const follow = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.1
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.1
      if (ring.current) {
        ring.current.style.left = rPos.current.x + 'px'
        ring.current.style.top  = rPos.current.y + 'px'
      }
      raf = requestAnimationFrame(follow)
    }
    raf = requestAnimationFrame(follow)

    const enter = () => document.body.classList.add('cursor-hover')
    const leave = () => document.body.classList.remove('cursor-hover')
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches('a,button,[role=button]')) enter()
      else leave()
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="eco-cursor"       ref={dot}  />
      <div id="eco-cursor-trail" ref={ring} />
    </>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:-16 }}
      transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
        <Route path="/scopemap"    element={<PageTransition><ScopeMap /></PageTransition>} />
        <Route path="/careershift" element={<PageTransition><CareerShift /></PageTransition>} />
        <Route path="/connector"   element={<PageTransition><Connector /></PageTransition>} />
        <Route path="/about"       element={<PageTransition><About /></PageTransition>} />
        <Route path="/join"        element={<PageTransition><Join /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <CustomCursor />
      <Preloader onDone={() => setLoaded(true)} />
      <motion.div
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </motion.div>
    </BrowserRouter>
  )
}