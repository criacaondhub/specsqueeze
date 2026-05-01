import { lazy, Suspense, useEffect, useState } from "react"
import { Hero } from "@/components/sections/Hero"
import { BrandCarousel } from "@/components/sections/BrandCarousel"

// Lazy load do background WebGL (Three.js ~489KB) — só carrega após o render inicial
const ParallaxBackground = lazy(() => import("@/components/layout/ParallaxBackground").then(m => ({ default: m.ParallaxBackground })))

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
  // Atrasa o carregamento do background WebGL para liberar a main thread no LCP
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    // Carrega o Three.js somente após o browser ficar idle (após o LCP)
    const id = requestIdleCallback(() => setShowBackground(true), { timeout: 3000 })
    return () => cancelIdleCallback(id)
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans antialiased overflow-x-hidden">
      {/* Background WebGL: carrega DEPOIS do LCP para não bloquear a main thread */}
      <Suspense fallback={null}>
        {showBackground && <ParallaxBackground />}
      </Suspense>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5511914486142?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-[76px] md:h-[76px] rounded-full shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 md:w-10 md:h-10" fill="white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.46 2.027 7.754L0 32l8.47-2.004A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.852l-.485-.288-5.026 1.189 1.21-4.893-.316-.503A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.875c-.398-.2-2.355-1.162-2.72-1.295-.365-.133-.631-.2-.897.2-.266.398-1.03 1.295-1.263 1.562-.232.266-.465.3-.863.1-.398-.2-1.68-.62-3.2-1.975-1.183-1.055-1.981-2.358-2.213-2.756-.232-.398-.025-.613.174-.812.179-.178.398-.465.597-.697.2-.233.266-.399.399-.665.133-.266.067-.499-.033-.698-.1-.2-.897-2.162-1.23-2.96-.324-.776-.653-.672-.897-.684l-.765-.013c-.266 0-.698.1-.1064.499-.365.398-1.395 1.362-1.395 3.323 0 1.96 1.428 3.855 1.627 4.121.2.266 2.81 4.292 6.81 6.022.952.411 1.695.657 2.274.841.956.304 1.826.261 2.514.158.767-.114 2.355-.963 2.687-1.893.332-.93.332-1.728.232-1.893-.1-.166-.365-.266-.763-.465z" />
        </svg>
      </a>

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
