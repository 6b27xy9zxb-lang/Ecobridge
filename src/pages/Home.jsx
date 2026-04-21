import Hero from '../components/home/Hero'
import ProblemSection from '../components/home/ProblemSection'
import ProductTriad from '../components/home/ProductTriad'
import HowItWorks from '../components/home/HowItWorks'
import FlowDiagram from '../components/home/FlowDiagram'
import ImpactNumbers from '../components/home/ImpactNumbers'
import CTABanner from '../components/home/CTABanner'

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <ProblemSection />
      <ProductTriad />
      <HowItWorks />
      <FlowDiagram />
      <ImpactNumbers />
      <CTABanner />
    </main>
  )
}