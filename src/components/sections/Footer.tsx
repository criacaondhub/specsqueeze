import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="relative py-[60px] md:py-24 px-6 overflow-hidden">
            <div className="container mx-auto max-w-[1200px] relative z-10">
                <div className="flex flex-col items-center text-center space-y-12">

                    {/* LOGO */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="assets/logo-spec.svg"
                            alt="Logo Spec Squeeze"
                            className="h-10 md:h-12 w-auto brightness-0 invert opacity-80"
                        />
                    </motion.div>

                    {/* SUBTITLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-none"
                    >
                        <p className="text-foreground/60 text-base md:text-lg leading-relaxed md:leading-none">
                            <span className="text-primary-accent font-bold">Spec Squeeze</span>, fabricação e personalização para empresas (B2B). <br className="md:hidden" /> Pedido mínimo: 300 unidades.
                        </p>
                    </motion.div>

                    {/* CREDITS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="pt-12 border-t border-white/5 w-full flex flex-col items-center"
                    >
                        <p className="text-base md:text-[10px] uppercase tracking-normal md:tracking-[0.2em] text-foreground/30 font-medium leading-relaxed md:leading-none">
                            DESENVOLVIDO POR <br className="md:hidden" />
                            <a
                                href="https://novadimensaohub.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-400 font-bold transition-colors duration-300"
                            >
                                NOVA DIMENSÃO
                            </a>
                        </p>

                        <div className="mt-8 text-xs md:text-[9px] text-foreground/30 uppercase tracking-[0.1em]">
                            &copy; {new Date().getFullYear()} Spec Squeeze. <br className="md:hidden" /> Todos os direitos reservados.
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Background elements */}
            <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square bg-primary-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </footer>
    );
};
