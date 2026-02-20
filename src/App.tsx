import { Hero } from "@/components/sections/Hero"
import { BrandCarousel } from "@/components/sections/BrandCarousel"
import { TargetAudience } from "@/components/sections/TargetAudience"
import { ProductLines } from "@/components/sections/ProductLines"
import { Differentials } from "@/components/sections/Differentials"
import { Capacity } from "@/components/sections/Capacity"
import { OtherLines } from "@/components/sections/OtherLines"
import { ContactForm } from "@/components/sections/ContactForm"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"
import { ParallaxBackground } from "@/components/layout/ParallaxBackground"

function App() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans antialiased overflow-x-hidden">
      <ParallaxBackground />
      <main className="relative z-10">
        <Hero />
        <BrandCarousel />
        <TargetAudience />
        <ProductLines />
        <Differentials />
        <Capacity />
        <OtherLines />
        <ContactForm />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}

export default App
