import React from 'react';
import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

interface CapacityBlockProps {
    image: string
    title: string
    index: number
}

const CapacityBlock = ({ image, title, index }: CapacityBlockProps) => {
    // Parsing bold markers
    const parts = title.split('*');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col space-y-4 md:space-y-6 group text-center"
        >
            {/* IMAGE CONTAINER */}
            <div className="relative h-[220px] md:h-auto md:aspect-[4/3] w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary-accent/40 transition-all duration-500 shadow-2xl">
                <img
                    src={image}
                    alt={title.replace(/\*/g, '').replace(/\|/g, '')}
                    className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* TEXT CONTENT */}
            <div className="px-2">
                <p className="text-xl md:text-2xl font-normal leading-tight text-foreground/90">
                    {parts.map((part, i) => {
                        const isBold = i % 2 === 1;
                        const content = part.split('|').map((sub, j, arr) => (
                            <React.Fragment key={j}>
                                {sub}
                                {j < arr.length - 1 && <br className="md:hidden" />}
                            </React.Fragment>
                        ));

                        return isBold ? (
                            <strong key={i} className="text-primary-accent border-b border-primary-accent/30 font-medium">
                                {content}
                            </strong>
                        ) : (
                            content
                        );
                    })}
                </p>
            </div>
        </motion.div>
    )
}

export const Capacity = () => {
    return (
        <section id="capacidade" className="relative py-[80px] px-6 ">
            <div className="container mx-auto max-w-6xl relative z-10">

                {/* TÍTULO CENTRALIZADO */}
                <div className="text-center mb-8 md:mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[42px] leading-none md:text-6xl lg:text-[64px] font-normal md:leading-tight"
                    >
                        Estrutura de verdade para <span className="highlight">entregar volume</span>
                    </motion.h2>
                </div>

                {/* BLOCOS LATERALIZADOS (GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
                    <CapacityBlock
                        index={0}
                        image="assets/foto-1.webp"
                        title="Capacidade produtiva| e *portfólio amplo*"
                    />
                    <CapacityBlock
                        index={1}
                        image="assets/foto-2.webp"
                        title="Atuação forte em bike,| *esportes e corporativo*"
                    />
                    <CapacityBlock
                        index={2}
                        image="assets/foto-3.webp"
                        title="Processo pensado para| *grandes tiragens*"
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
