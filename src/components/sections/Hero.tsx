import { motion } from "framer-motion"
import { CtaButton } from "@/components/ui/CtaButton"

export const Hero = () => {
    const badges = [
        "Fabricação Própria",
        "Personalização",
        "Alta Produção",
        "Atendimento Ágil",
        "B2B / Atacado"
    ]

    return (
        <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-6 pb-[10px] md:pb-[80px]">

            {/* HERO BACKGROUND OVERLAY */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                {/* Desktop Overlay */}
                <img
                    src="assets/bg-hero-overlay.webp"
                    alt=""
                    loading="lazy"
                    className="hidden md:block w-full h-full object-cover mix-blend-overlay opacity-10"
                />
                {/* Mobile Overlay */}
                <img
                    src="assets/bg-hero-overlay-mobile.webp"
                    alt=""
                    loading="lazy"
                    className="block md:hidden w-full h-full object-cover mix-blend-overlay opacity-[0.07]"
                />
            </div>

            {/* HEADER ROW (Logo + Mini CTA) */}
            <header className="relative z-30 w-full container mx-auto px-6 h-20 flex items-center justify-between mb-4 md:mb-6">
                {/* LOGO LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0"
                >
                    <img
                        src="assets/logo-spec.svg"
                        alt="Logo Spec Squeeze"
                        className="h-[40px] md:h-[54px] w-auto"
                    />
                </motion.div>

                {/* MINI CTA RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <a href="#orcamento">
                        <button className="bg-cta hover:scale-105 active:scale-95 transition-all text-white font-bold text-[10px] md:text-[12px] py-3 px-6 rounded-full shadow-[0_0_20px_rgba(0,208,108,0.3)]">
                            FAZER ORÇAMENTO
                        </button>
                    </a>
                </motion.div>
            </header>

            {/* BADGES — Desktop Only (boxes individuais) */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex items-center justify-center gap-3 relative z-30 mb-4"
            >
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 hover:border-primary-accent/30 hover:bg-white/8 transition-all duration-300"
                    >
                        <i className="fi fi-rr-check text-cta text-[12px] flex items-center"></i>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">{badge}</span>
                    </div>
                ))}
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center -mt-[52px] md:-mt-6 lg:-mt-8">

                {/* ELEMENTO VISUAL (SQUEEZE) - DESKTOP */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="hidden md:block relative w-full max-w-[800px] lg:max-w-[1200px] mb-[-80px] lg:mb-[-120px] z-10"
                >
                    <img
                        src="assets/squeeze.webp"
                        alt="Squeeze Spec"
                        fetchPriority="high"
                        loading="eager"
                        className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                    />
                </motion.div>

                {/* ELEMENTO VISUAL (HERO MOBILE) - MOBILE (FORA A FORA) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="block md:hidden w-[100vw] -mx-4 z-10 mb-2"
                >
                    <img
                        src="assets/hero-mobile.webp"
                        alt="Spec Squeeze Mobile"
                        fetchPriority="high"
                        loading="eager"
                        className="w-full h-auto"
                    />
                </motion.div>

                {/* TÍTULO */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-[38px] md:text-5xl lg:text-[5rem] font-normal leading-[1.05] mb-[30px] md:mb-8 relative z-20 max-w-[1200px]"
                >
                    Reebok, Gatorade, Bradesco e +50 grandes marcas <br className="hidden md:block" />
                    escolheram a Spec. <span className="highlight inline-block leading-none md:leading-inherit">Seu brinde merece o mesmo nível.</span>
                </motion.h1>

                {/* SUBTÍTULO */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-base md:text-xl lg:text-2xl text-foreground font-medium mb-[30px] md:mb-10 max-w-[950px] leading-[1.1] opacity-90"
                >
                    Fabricação própria, impressão colorida e estrutura para grandes volumes, <br className="hidden md:block" />
                    que fornecedores comuns não conseguem entregar.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mb-8 w-full flex justify-center"
                >
                    <CtaButton
                        label="SOLICITAR ORÇAMENTO PARA MINHA EMPRESA"
                        disclaimer="Atendimento exclusivo para empresas. Não vendemos unidade avulsa."
                    />
                </motion.div>

            </div>
        </section>
    )
}
