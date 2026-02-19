import { motion } from "framer-motion"

interface CtaButtonProps {
    label: string
    disclaimer?: string
    className?: string
    onClick?: () => void
}

export const CtaButton = ({ label, disclaimer, className = "", onClick }: CtaButtonProps) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="button-cta relative overflow-hidden group"
                onClick={onClick}
            >
                <span className="relative z-10">{label}</span>

                {/* Glow effect on hover handled by CSS class, but can add more here if needed */}
            </motion.button>
            {disclaimer && (
                <span className="cta-disclaimer">
                    {disclaimer}
                </span>
            )}
        </div>
    )
}
