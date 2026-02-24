import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

interface LineBoxProps {
    icon: string
    title: string
    subtitle: string
    points: string[]
    ctaLabel: string
    index: number
}

const LineBox = ({ icon, title, subtitle, points, ctaLabel, index }: LineBoxProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col h-full hover:border-primary-accent/30 transition-all duration-300 group"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors shrink-0">
                    <i className={`fi ${icon} text-primary-accent text-lg leading-none flex items-center justify-center`}></i>
                </div>
                <h4 className="font-sans font-bold text-xl text-foreground">{title}</h4>
            </div>

            <p className="text-foreground/70 text-sm mb-4 leading-relaxed text-left">
                {subtitle.split('*').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-foreground font-bold">{part}</strong> : part
                ))}
            </p>

            <ul className="space-y-3 mb-4 flex-grow">
                {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 text-left">
                        <span className="text-primary-accent mt-1 text-[10px]">•</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <CtaButton
                label={ctaLabel}
                className="w-full scale-90 origin-center"
            />
        </motion.div>
    )
}

export const OtherLines = () => {
    return (
        <section className="relative py-12 px-6 overflow-hidden">
            <div className="container mx-auto max-w-[1440px] relative z-10">

                {/* HEADER CENTRALIZADO */}
                <div className="text-center mb-8 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[42px] leading-none md:text-[64px] font-normal md:leading-[1.05]"
                    >
                        Além das linhas principais, temos <br className="hidden md:block" />
                        <span className="highlight">opções estratégicas para projetos específicos.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto"
                    >
                        Se o seu objetivo é premium, durabilidade, alto volume de consumo <br className="hidden md:block" />
                        ou mais brilho/visibilidade, essas linhas entregam muito bem.
                    </motion.p>
                </div>

                {/* GRID 3 COLUNAS: BOXES | IMAGEM | BOXES */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch w-full mx-auto">

                    {/* COLUNA ESQUERDA (BOX 1 E 3) - 38% */}
                    <div className="w-full lg:w-[38%] flex flex-col gap-4">
                        <LineBox
                            index={0}
                            icon="fi-rr-crown"
                            title="Linha Inox / Alumínio"
                            subtitle="Percepção premium + durabilidade. Ideal para marcas que querem um *brinde que “parece produto”*, não lembrancinha."
                            points={[
                                "Opções com inox e alumínio;",
                                "Modelos com alça/tampa;",
                                "Ótimo para kits corporativos, VIP, atletas e eventos premium."
                            ]}
                            ctaLabel="Quero Inox/Alumínio (B2B)"
                        />
                        <LineBox
                            index={2}
                            icon="fi-rr-gym"
                            title="Galão"
                            subtitle="Para *alta demanda de hidratação* (Academias, times, eventos longos)."
                            points={[
                                "2 litros;",
                                "Tampa com duas funções (Convencional ou tipo squeeze);",
                                "Muito usado para público fitness, trilhas, viagens e esportes."
                            ]}
                            ctaLabel="Quero Galão 2L (B2B)"
                        />
                    </div>

                    {/* COLUNA CENTRAL (IMAGEM) - 24% */}
                    <div className="w-full lg:w-[24%] h-[560px] lg:h-auto overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full h-full"
                        >
                            <img
                                src="assets/big-squeeze.webp"
                                alt="Spec Squeeze Central"
                                className="w-full h-full object-cover rounded-3xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                            />
                        </motion.div>
                    </div>

                    {/* COLUNA DIREITA (BOX 2 E 4) - 38% */}
                    <div className="w-full lg:w-[38%] flex flex-col gap-4">
                        <LineBox
                            index={1}
                            icon="fi-rr-leaf"
                            title="Linha Alumínio"
                            subtitle="Elegância e resistência com *ótimo custo-benefício.*"
                            points={[
                                "Tamanhos: 500ml e 700ml;",
                                "Boa escolha para ações com pegada mais “clean/premium esportivo”;",
                                "Material 100% reciclável, reforçando o compromisso com a sustentabilidade."
                            ]}
                            ctaLabel="Quero Alumínio (B2B)"
                        />
                        <LineBox
                            index={3}
                            icon="fi-rr-sparkles"
                            title="Linha PET"
                            subtitle="Mais *brilho e transparência* (Visual forte em ações promocionais)."
                            points={[
                                "Opções de tampa tipo alça ou cordinha;",
                                "Modelos: 500ml e 600ml;",
                                "Variedade de cores translúcidas para destacar o conteúdo interno."
                            ]}
                            ctaLabel="Quero Linha PET (B2B)"
                        />
                    </div>

                </div>

                {/* BOTTOM DISCLAIMER CENTRALIZADO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-16 max-w-2xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                    <p className="text-slate-400 text-sm leading-relaxed">
                        <strong className="text-foreground font-bold">Atendimento exclusivo para empresas.</strong><br />
                        Pedido mínimo varia por linha. <br className="md:hidden" />
                        Informe a quantidade no formulário para retorno rápido.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}
