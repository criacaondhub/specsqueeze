import { motion } from "framer-motion"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <main>
        {/* Sections will be added here */}
        <section className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          >
            Spec Squeeze
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4"
          >
            Aguardando a estrutura das dobras para começar o desenvolvimento.
          </motion.p>
        </section>
      </main>
    </div>
  )
}

export default App
