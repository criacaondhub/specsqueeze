import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#070d16] pt-16 md:pt-24 pb-20">
            {/* Background Image - Ocupa tudo de ponta a ponta */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url('/assets/background.webp')` }}
            />

            {/* Glow / Overlay sutil para destacar conteúdo */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#070d16]/30 to-[#070d16]" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 flex flex-col items-center text-center">

                {/* Logo - Tamanho equilibrado */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12"
                >
                    <img src="/assets/logo-spec.svg" alt="Spec Squeeze Logo" className="h-10 md:h-12 lg:h-14" />
                </motion.div>

                {/* Squeezes Display - Grande no Centro, sem distorção */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="mb-10 md:mb-14 w-full max-w-5xl"
                >
                    <img src="/assets/squeeze.webp" alt="Spec Squeezes" className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                </motion.div>

                {/* Heading - Fonte Fearless com leading extremamente apertado como no print */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col items-center mb-10"
                >
                    <h1 className="font-fearless text-[32px] md:text-[56px] lg:text-[76px] text-white uppercase leading-[0.85] tracking-tight text-center max-w-[1200px]">
                        REEBOK, GATORADE, BRADESCO E +50 GRANDES MARCAS
                    </h1>
                    <h2 className="font-fearless text-[32px] md:text-[56px] lg:text-[76px] text-white uppercase leading-[0.85] tracking-tight text-center max-w-[1200px]">
                        ESCOLHERAM A SPEC. <span className="text-[#3b9eff]">SEU BRINDE MERECE O MESMO NÍVEL.</span>
                    </h2>
                </motion.div>

                {/* Subtitle - Figtree Regular, maior para impacto */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="font-figtree text-base md:text-lg lg:text-[22px] text-white/90 max-w-4xl mb-12 leading-tight font-normal"
                >
                    Fabricação própria, impressão colorida e estrutura para grandes volumes, <br className="hidden md:block" />
                    que fornecedores comuns não conseguem entregar.
                </motion.p>

                {/* CTA Button - Figtree Bold com Glow Externo e Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 0px 40px 0px rgba(0, 222, 115, 0.6)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="group flex flex-col items-center justify-center bg-[#00de73] px-10 py-5 md:px-14 md:py-6 rounded-xl shadow-lg border-b-4 border-[#00ba60] active:border-b-0 active:translate-y-1 transition-all"
                    >
                        <span className="font-figtree font-bold text-black text-lg md:text-xl lg:text-[24px] leading-none mb-1">
                            SOLICITAR ORÇAMENTO PARA MINHA EMPRESA
                        </span>
                        <span className="font-figtree text-[9px] md:text-[11px] text-black/50 font-bold uppercase tracking-[0.05em]">
                            Atendimento exclusivo para empresas. Não vendemos unidade avulsa.
                        </span>
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
