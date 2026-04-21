import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Home from './pages/Home'
import ScopeMap from './pages/ScopeMap'
import CareerShift from './pages/CareerShift'
import Connector from './pages/Connector'
import About from './pages/About'
import Join from './pages/Join'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const followRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }
      raf = requestAnimationFrame(followRing)
    }
    raf = requestAnimationFrame(followRing)

    const grow = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2.5)'
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px' }
    }
    const shrink = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px' }
    }

    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
        <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
        <Route path="/scopemap"   element={<PageTransition><ScopeMap /></PageTransition>} />
        <Route path="/careershift"element={<PageTransition><CareerShift /></PageTransition>} />
        <Route path="/connector"  element={<PageTransition><Connector /></PageTransition>} />
        <Route path="/about"      element={<PageTransition><About /></PageTransition>} />
        <Route path="/join"       element={<PageTransition><Join /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App