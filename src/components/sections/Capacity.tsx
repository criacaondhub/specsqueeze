import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

interface CapacityBlockProps {
    imagePlaceholder: string
    title: string
    index: number
}

const CapacityBlock = ({ imagePlaceholder, title, index }: CapacityBlockProps) => {
    // Parsing bold markers
    const parts = title.split('*');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col space-y-6 group text-center"
        >
            {/* IMAGE PLACEHOLDER (800x600px suggested) */}
            <div className="relative aspect-[4/3] w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary-accent/30 transition-colors duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-xl uppercase tracking-widest">
                    {imagePlaceholder}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
            </div>

            {/* TEXT CONTENT */}
            <div className="px-2">
                <p className="text-xl md:text-2xl font-normal leading-tight text-foreground/90">
                    {parts.map((part, i) => (
                        i % 2 === 1 ? <strong key={i} className="text-primary-accent border-b border-primary-accent/30">{part}</strong> : part
                    ))}
                </p>
            </div>
        </motion.div>
    )
}

export const Capacity = () => {
    return (
        <section className="relative py-[80px] px-6 ">
            <div className="container mx-auto max-w-6xl relative z-10">

                {/* TÍTULO CENTRALIZADO */}
                <div className="text-center mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-[64px] font-normal"
                    >
                        Estrutura de verdade para <span className="highlight">entregar volume</span>
                    </motion.h2>
                </div>

                {/* BLOCOS LATERALIZADOS (GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
                    <CapacityBlock
                        index={0}
                        imagePlaceholder="FOTO ESTRUTURA 01"
                        title="Capacidade produtiva e *portfólio amplo*"
                    />
                    <CapacityBlock
                        index={1}
                        imagePlaceholder="FOTO ATUAÇÃO 02"
                        title="Atuação forte em *bike, esportes e corporativo;*"
                    />
                    <CapacityBlock
                        index={2}
                        imagePlaceholder="FOTO PROCESSO 03"
                        title="Processo pensado para *grandes tiragens.*"
                    />
                </div>

                {/* CTA CENTRALIZADO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <CtaButton
                        label="Solicitar Orçamento Agora"
                        className="scale-110"
                    />
                </motion.div>

            </div>
        </section>
    )
}
