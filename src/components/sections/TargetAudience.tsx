import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

export const TargetAudience = () => {
    const positivePoints = [
        { text: "Você é ", highlight: "empresa/marca (B2B);" },
        { text: "Quer ", highlight: "personalização e padrão de qualidade;" },
        { text: "Busca fornecedor com produção própria ", highlight: "e prazo confiável.", breakNode: true }
    ]

    const negativePoints = [
        { text: "Você quer ", highlight: "1, 2, 10 unidades;" },
        { text: "Está buscando apenas o mais barato ", highlight: "sem olhar qualidade;", breakNode: true },
        { text: "Precisa \"para ontem\" ", highlight: "sem planejamento mínimo." }
    ]

    return (
        <section id="publico" className="relative py-[80px] px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cta/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto max-w-6xl">
                {/* TÍTULO - Uma linha só e 64px */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-[48px]"
                >
                    <h2 className="text-[42px] md:text-5xl lg:text-[64px] font-normal leading-[1.05] whitespace-normal md:whitespace-nowrap">
                        Antes de solicitar orçamento: <br className="md:hidden" /> <span className="highlight">a Spec é para você?</span>
                    </h2>
                </motion.div>

                {/* BOXES CONTAINER - Espaçamento de 48px */}
                <div className="grid md:grid-cols-2 gap-[48px] mb-[48px]">

                    {/* BOX 1: É PARA VOCÊ */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-full cursor-pointer"
                    >
                        <motion.div
                            variants={{
                                hover: { opacity: 0.4, scale: 1.15 }
                            }}
                            initial={{ opacity: 0 }}
                            className="absolute inset-0 bg-cta/40 blur-3xl rounded-3xl pointer-events-none transition-all duration-500"
                        />
                        <motion.div
                            variants={{
                                hover: { borderColor: "rgba(0, 208, 108, 0.8)", backgroundColor: "rgba(255, 255, 255, 0.12)" }
                            }}
                            className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl h-full flex flex-col transition-all duration-500"
                        >
                            <h3 className="text-[20px] md:text-3xl font-bold font-sans mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-cta/20 flex items-center justify-center">
                                    <i className="fi fi-rr-heart text-cta text-base flex items-center justify-center"></i>
                                </span>
                                É para você se…
                            </h3>

                            <ul className="space-y-6 flex-grow">
                                {positivePoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <i className="fi fi-rr-check text-cta text-xl mt-1 flex-shrink-0"></i>
                                        <p className="text-foreground/80 text-base md:text-lg leading-[1.4]">
                                            {point.text}
                                            {point.breakNode && <br className="hidden md:block" />}
                                            <span className="text-foreground font-bold">{point.highlight}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* BOX 2: NÃO É PARA VOCÊ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-full cursor-pointer"
                    >
                        <motion.div
                            variants={{
                                hover: { opacity: 0.4, scale: 1.15 }
                            }}
                            initial={{ opacity: 0 }}
                            className="absolute inset-0 bg-red-500/40 blur-3xl rounded-3xl pointer-events-none transition-all duration-500"
                        />
                        <motion.div
                            variants={{
                                hover: { borderColor: "rgba(239, 68, 68, 0.8)", backgroundColor: "rgba(255, 255, 255, 0.12)" }
                            }}
                            className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl h-full flex flex-col transition-all duration-500"
                        >
                            <h3 className="text-[20px] md:text-3xl font-bold font-sans mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <i className="fi fi-rr-ban text-red-500 text-base flex items-center justify-center"></i>
                                </span>
                                Não é para você se…
                            </h3>

                            <ul className="space-y-6 flex-grow">
                                {negativePoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <i className="fi fi-rr-cross text-red-500/70 text-base mt-1.5 flex-shrink-0"></i>
                                        <p className="text-foreground/60 text-base md:text-lg leading-[1.4]">
                                            {point.text}
                                            {point.breakNode && <br className="hidden md:block" />}
                                            <span className="text-foreground/80 font-bold">{point.highlight}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>


                </div>

                {/* CTA FINAL */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center w-full"
                >
                    <CtaButton
                        label="Sou empresa e preciso Fazer orçamento"
                        className="scale-110"
                    />
                </motion.div>
            </div>
        </section>
    )
}
