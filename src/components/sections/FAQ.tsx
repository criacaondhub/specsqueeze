import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-slate-200 last:border-0 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full py-6 md:py-8 flex items-center justify-between gap-6 text-left group transition-all"
            >
                <span className={cn(
                    "text-lg md:text-xl font-medium transition-colors duration-300",
                    isOpen ? "text-primary-accent" : "text-slate-900 group-hover:text-primary-accent"
                )}>
                    {question}
                </span>

                <div className={cn(
                    "relative w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-500",
                    isOpen ? "rotate-45" : "rotate-0"
                )}>
                    {/* Vertical line of the + */}
                    <div className={cn(
                        "absolute w-0.5 h-6 bg-current rounded-full transition-all duration-300",
                        isOpen ? "bg-primary-accent" : "bg-slate-300"
                    )} />
                    {/* Horizontal line of the + */}
                    <div className={cn(
                        "absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300",
                        isOpen ? "bg-primary-accent" : "bg-slate-300"
                    )} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-8 text-slate-600 text-base md:text-lg leading-relaxed max-w-[90%]">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqData = [
        {
            question: "Vocês vendem unidade avulsa?",
            answer: "Não. Atendemos somente empresas, com pedido mínimo de 300 unidades. Nosso foco é escala industrial e parcerias corporativas."
        },
        {
            question: "Vocês são fabricantes?",
            answer: "Sim, temos estrutura própria de fabricação em solo nacional, o que garante total controle sobre prazos, qualidade e padronização premium."
        },
        {
            question: "Quais linhas vocês recomendam?",
            answer: "Depende do seu objetivo: Linha Automática para diferencial premium, Promocional para grandes volumes com ótimo custo-benefício, e Linha Pro para uma percepção de valor superior e durabilidade máxima."
        },
        {
            question: "Fazem personalização?",
            answer: "Sim. Realizamos personalização completa conforme a identidade visual do seu projeto, incluindo impressão em cores vivas e alta definição."
        },
        {
            question: "Quanto tempo leva?",
            answer: "O prazo varia de acordo com a linha, quantidade e complexidade da personalização. Preencha nosso formulário acima e retornaremos com um prazo realista e otimizado."
        }
    ];

    return (
        <section className="relative py-20 bg-white overflow-hidden text-slate-900 border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-[1000px] relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[64px] font-normal leading-tight tracking-tight">
                        <span className="text-primary-accent">Perguntas</span> Frequentes
                    </h2>
                    <p className="mt-6 text-slate-500 text-lg max-w-xl mx-auto">
                        Tire suas dúvidas rápidas sobre como funciona nossa parceria B2B.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-50/50 rounded-[40px] p-8 md:p-12 border border-slate-100"
                >
                    <div className="flex flex-col">
                        {faqData.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Subtle Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-accent/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-accent/5 rounded-full blur-[100px] pointer-events-none" />
            </div>
        </section>
    );
};
