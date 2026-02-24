import { motion } from "framer-motion"

interface CtaButtonProps {
    label: string
    disclaimer?: string
    className?: string
    onClick?: () => void
}

export const CtaButton = ({ label, disclaimer, className = "", onClick }: CtaButtonProps) => {
    return (
        <div className={`flex flex-col items-center !w-full md:!w-auto ${className}`}>
            <a href="#orcamento" className="block outline-none decoration-none !w-full md:!w-auto">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-cta relative overflow-hidden group !whitespace-normal !leading-[1.1] tracking-normal md:tracking-wider md:!whitespace-nowrap !w-full md:!w-auto"
                    onClick={onClick}
                >
                    <span className="relative z-10 px-4">
                        {/* Texto Mobile Simplificado */}
                        <span className="md:hidden">SOLICITAR ORÇAMENTO</span>

                        {/* Texto Desktop Original */}
                        <span className="hidden md:inline-block">
                            {label}
                        </span>
                    </span>

                    {/* Glow effect on hover handled by CSS class, but can add more here if needed */}
                </motion.button>
            </a>
            {disclaimer && (
                <span className="cta-disclaimer !leading-[1.1] whitespace-normal md:whitespace-nowrap max-w-[280px] md:max-w-none">
                    {disclaimer.includes('empresas.') ? (
                        <>
                            {disclaimer.split('empresas.')[0]}empresas.<br className="md:hidden" />{disclaimer.split('empresas.')[1]}
                        </>
                    ) : disclaimer}
                </span>
            )}
        </div>
    )
}
