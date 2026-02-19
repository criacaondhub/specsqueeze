import { Hero } from "@/components/sections/Hero"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <main>
        <Hero />
        {/* Outras dobras serão adicionadas aqui */}
      </main>

      {/* Footer simples por enquanto */}
      <footer className="py-8 text-center text-foreground/20 text-xs border-t border-white/5">
        &copy; {new Date().getFullYear()} Spec Squeeze. Todos os direitos reservados.
      </footer>
    </div>
  )
}

export default App
