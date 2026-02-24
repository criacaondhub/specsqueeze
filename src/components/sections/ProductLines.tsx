import React from 'react';
import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

const ProductLine = ({
    image,
    reverse = false,
    icon,
    tag,
    title,
    points,
    disclaimer,
    ctaLabel
}: {
    image: string,
    reverse?: boolean,
    icon: string,
    tag: string,
    title: string,
    points: string[],
    disclaimer: string,
    ctaLabel: string
}) => {
    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-0 mb-[60px] last:mb-0`}>
            {/* IMAGEM */}
            <motion.div
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 cursor-pointer"
            >
                <div className="relative">
                    <motion.div
                        className="absolute -inset-4 bg-primary-accent/10 rounded-3xl blur-2xl pointer-events-none"
                        variants={{
                            hover: { opacity: 1, scale: 1.1 }
                        }}
                        initial={{ opacity: 0 }}
                    />
                    <motion.img
                        variants={{
                            hover: { scale: 1.05 }
                        }}
                        src={`assets/${image}`}
                        alt={tag}
                        className="relative w-full h-auto rounded-3xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500"
                    />
                </div>
            </motion.div>

            {/* TEXTO */}
            <motion.div
                initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
            >
                {/* CONTAINER COM BORDAS ARREDONDADAS (MOBILE SOMENTE) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 bg-white/[0.03] backdrop-blur-sm border border-white/10 p-4 rounded-[40px] md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none w-full">
                    {/* TAG - ABRAÇADA PELO CÍRCULO (PILL) */}
                    <div className="flex justify-center md:justify-start w-full">
                        <div className="flex items-center gap-2 bg-primary-accent/20 px-4 py-2 rounded-full border border-primary-accent/30">
                            <i className={`fi ${icon} text-primary-accent text-sm leading-none hidden md:flex items-center`}></i>
                            <span className="font-sans font-bold text-xs tracking-normal text-primary-accent uppercase leading-none mt-[1px]">{tag}</span>
                        </div>
                    </div>

                    {/* TITULO (H1) */}
                    <h3 className="text-[38px] md:text-4xl lg:text-5xl font-normal leading-[1.05]">
                        {title}
                    </h3>

                    {/* TÓPICOS (ALINHADOS À ESQUERDA) */}
                    <ul className="space-y-4 text-left self-start md:self-auto">
                        {points.map((point, index) => {
                            // Process bold markers between * *
                            const parts = point.split('*');
                            return (
                                <li key={index} className="flex items-start gap-3 text-lg text-foreground/80">
                                    <span className="text-primary-accent mt-1">•</span>
                                    <p>
                                        {parts.map((part, i) => (
                                            i % 2 === 1 ? <strong key={i} className="text-foreground font-bold">{part}</strong> : part
                                        ))}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>

                    {/* DISCLAIMER */}
                    <p className="text-sm text-foreground/60">
                        {(() => {
                            const parts = disclaimer.split('*');
                            return parts.map((part, i) => {
                                const content = part.split('|').map((sub, j, arr) => (
                                    <React.Fragment key={j}>
                                        {sub}
                                        {j < arr.length - 1 && <br className="md:hidden" />}
                                    </React.Fragment>
                                ));
                                return i % 2 === 1 ? (
                                    <strong key={i} className="text-foreground font-bold">
                                        {content}
                                    </strong>
                                ) : (
                                    content
                                );
                            });
                        })()}
                    </p>

                    {/* CTA */}
                    <div className="flex justify-center md:justify-start pt-4 w-full">
                        <CtaButton
                            label={ctaLabel}
                            className="scale-90 origin-center md:origin-left"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export const ProductLines = () => {
    return (
        <section className="py-[80px] px-6 relative">
            <div className="container mx-auto max-w-6xl">
                {/* TÍTULO DA SEÇÃO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-[80px]"
                >
                    <h2 className="text-[42px] leading-none md:text-6xl md:leading-[1.05]">
                        Escolha a <span className="highlight">linha ideal</span> <br className="md:hidden" /> para sua necessidade
                    </h2>
                </motion.div>

                {/* LINHAS DE PRODUTO */}
                <ProductLine
                    image="linha-auto.webp"
                    icon="fi-rr-star"
                    tag="O squeeze que vende por você"
                    title="LINHA AUTOMÁTICA"
                    points={[
                        "Produto *exclusivo no Brasil*;",
                        "Forte *presença* no mercado esportivo;",
                        "Usado por *atletas e jogadores*."
                    ]}
                    disclaimer="Ideal para: Marcas que querem| *diferencial e percepção premium.*"
                    ctaLabel="Quero Garantir a Automática"
                />

                <ProductLine
                    reverse
                    image="linha-promo.webp"
                    icon="fi-rr-calendar"
                    tag="Mais unidades. Melhor custo por peça"
                    title="LINHA PROMO"
                    points={[
                        "Feita para *eventos, ativações, ações de grande tiragem*;",
                        "Perfeita para *reforçar a sua marca*;",
                        "Ótima opção para *fomentar o engajamento em massa*."
                    ]}
                    disclaimer="Ideal para: Campanhas de *volume| e distribuição massiva.*"
                    ctaLabel="Quero Garantir a Promocional"
                />

                <ProductLine
                    image="linha-pro.webp"
                    icon="fi-rr-running"
                    tag="Posicionamento de Alta Performance"
                    title="LINHA PRO"
                    points={[
                        "Linha *intermediária/avançada*;",
                        "Ajuda marcas a *subirem o nível de posicionamento*;",
                        "O brinde de *alta performance para parcerias estratégicas*."
                    ]}
                    disclaimer="Ideal para: Marcas que *não querem| “cara de brinde comum”.*"
                    ctaLabel="Quero Garantir a Pro"
                />
            </div>
        </section>
    )
}
