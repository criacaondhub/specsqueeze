import { lazy, Suspense } from "react"
import { Hero } from "@/components/sections/Hero"
import { BrandCarousel } from "@/components/sections/BrandCarousel"
import { ParallaxBackground } from "@/components/layout/ParallaxBackground"

// Lazy load seções abaixo da dobra (below-the-fold)
const TargetAudience = lazy(() => import("@/components/sections/TargetAudience").then(m => ({ default: m.TargetAudience })))
const ProductLines = lazy(() => import("@/components/sections/ProductLines").then(m => ({ default: m.ProductLines })))
const Differentials = lazy(() => import("@/components/sections/Differentials").then(m => ({ default: m.Differentials })))
const Capacity = lazy(() => import("@/components/sections/Capacity").then(m => ({ default: m.Capacity })))
const OtherLines = lazy(() => import("@/components/sections/OtherLines").then(m => ({ default: m.OtherLines })))
const ContactForm = lazy(() => import("@/components/sections/ContactForm").then(m => ({ default: m.ContactForm })))
const FAQ = lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })))
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })))

function App() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans antialiased overflow-x-hidden">
      <ParallaxBackground />
      <main className="relative z-10">
        {/* Above-the-fold: carregamento imediato */}
        <Hero />
        <BrandCarousel />

        {/* Below-the-fold: lazy loading */}
        <Suspense fallback={null}>
          <TargetAudience />
          <ProductLines />
          <Differentials />
          <Capacity />
          <OtherLines />
          <ContactForm />
          <FAQ />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default App
