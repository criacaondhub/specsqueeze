import { motion } from "framer-motion"

interface DifferentialCardProps {
    icon: string
    title: string
    description: string
    index: number
}

const DifferentialCard = ({ icon, title, description, index }: DifferentialCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-2xl cursor-pointer flex flex-col h-full relative overflow-hidden"
            variants={{
                hover: {
                    y: -8,
                    borderColor: "rgba(59, 158, 255, 0.3)",
                    boxShadow: "0 20px 40px rgba(59, 158, 255, 0.1)",
                    transition: { duration: 0.3, ease: "easeOut" }
                }
            }}
        >
            <motion.div
                className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 transition-colors duration-300"
                variants={{
                    hover: {
                        backgroundColor: "rgba(59, 158, 255, 0.15)",
                        scale: 1.1
                    }
                }}
            >
                <motion.i
                    className={`fi ${icon} text-slate-400 text-2xl transition-colors duration-300`}
                    variants={{
                        hover: {
                            color: "#3b9eff"
                        }
                    }}
                ></motion.i>
            </motion.div>
            <h3 className="font-sans font-bold text-slate-900 text-xl mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
                {description}
            </p>

            {/* Linha de destaque na base */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary-accent"
                initial={{ scaleX: 0 }}
                variants={{
                    hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export const Differentials = () => {
    const blocks = [
        {
            icon: "fi-rr-box-alt",
            title: "Fabricação Própria",
            description: "Controle absoluto de ponta a ponta. Do design industrial à expedição final, garantimos o padrão Spec em cada milímetro."
        },
        {
            icon: "fi-rr-shield-check",
            title: "Qualidade Percebida",
            description: "Acabamento impecável, vedação à prova de vazamentos e materiais certificados para uso esportivo e corporativo de alto nível."
        },
        {
            icon: "fi-rr-palette",
            title: "Impressão Colorida",
            description: "Tecnologia de ponta para impacto visual máximo. Cores vibrantes e fidelidade total à paleta da sua marca no brinde."
        },
        {
            icon: "fi-rr-bolt",
            title: "Produção + Rápida",
            description: "Capacidade produtiva escalável para atender grandes demandas em prazos que o mercado convencional de brindes não alcança."
        },
        {
            icon: "fi-rr-comment-check",
            title: "Atendimento Ágil",
            description: "Comunicação B2B sem ruído. Consultores focados em viabilizar sua estratégia com agilidade técnica e soluções práticas."
        },
        {
            icon: "fi-rr-layers",
            title: "Portfólio Amplo",
            description: "Múltiplas linhas e variações para atender de ações promocionais massivas a presentes executivos exclusivos."
        }
    ]

    return (
        <section className="relative bg-white py-[100px] px-6 overflow-hidden">
            {/* Squeeze Silhouette Watermark */}
            <div className="absolute top-1/2 -right-24 -translate-y-1/2 h-[120%] pointer-events-none opacity-[0.02] select-none hidden md:block">
                <img
                    src="assets/squeeze-700.svg"
                    alt=""
                    className="h-full w-auto object-contain rotate-[5deg]"
                />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* HEADER */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-900 text-[42px] leading-none md:text-[64px] font-normal md:leading-tight mb-4"
                    >
                        Por que <span className="text-primary-accent">empresas grandes</span> escolhem a Spec?
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-primary-accent mx-auto rounded-full"
                    />
                </div>

                {/* GRID DE BLOCOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blocks.map((block, index) => (
                        <DifferentialCard
                            key={index}
                            index={index}
                            icon={block.icon}
                            title={block.title}
                            description={block.description}
                        />
                    ))}
                </div>

                {/* DISCLAIMER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-20 p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center"
                >
                    <p className="text-slate-600 text-lg">
                        Nem todo fornecedor de brinde é fabricante. <strong className="text-slate-900 font-bold">E isso muda prazo, padrão e consistência.</strong>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
