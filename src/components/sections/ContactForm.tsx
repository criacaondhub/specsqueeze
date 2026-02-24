import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes merge
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FormData {
    nome: string;
    email: string;
    whatsapp: string;
    cnpj: string;
    atuacao: string;
    cidadeUf: string;
    quantidade: string;
    modelo: string;
    prazo: string;
    personalizacao: string;
    observacoes: string;
    confirmacao: boolean;
}

const initialData: FormData = {
    nome: '',
    email: '',
    whatsapp: '',
    cnpj: '',
    atuacao: '',
    cidadeUf: '',
    quantidade: '',
    modelo: '',
    prazo: '',
    personalizacao: '',
    observacoes: '',
    confirmacao: false,
};

export const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [isValidatingCnpj, setIsValidatingCnpj] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name: keyof FormData, value: any) => {
        if (name === 'observacoes') return false;
        if (name === 'confirmacao') return !value;
        return !value || value.toString().trim() === '';
    };

    // CNPJ API Validation
    const validateCnpj = async (cnpj: string) => {
        const cleanCnpj = cnpj.replace(/\D/g, '');
        if (cleanCnpj.length !== 14) return;

        setIsValidatingCnpj(true);
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
            if (response.ok) {
                const data = await response.json();
                setCompanyName(data.razao_social || data.nome_fantasia || 'Empresa não identificada');
                setErrors(prev => ({ ...prev, cnpj: false }));
            } else {
                setErrors(prev => ({ ...prev, cnpj: true }));
                setCompanyName('CNPJ Inválido');
            }
        } catch (error) {
            console.error('Erro ao validar CNPJ:', error);
            setCompanyName('Erro na validação');
        } finally {
            setIsValidatingCnpj(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<Record<keyof FormData, boolean>> = {};
        let hasErrors = false;

        (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
            if (key !== 'observacoes' && key !== 'confirmacao') {
                if (validateField(key, formData[key])) {
                    newErrors[key] = true;
                    hasErrors = true;
                }
            }
        });

        if (errors.cnpj || companyName === 'CNPJ Inválido') {
            newErrors.cnpj = true;
            hasErrors = true;
        }

        if (!formData.confirmacao) {
            setShowCheckboxError(true);
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            setIsSubmitting(true);

            const emailContent = `OLÁ, *SPEC SQUEEZE*

${formData.nome} da ${companyName || 'Empresa'} preencheu o formulário da landing page. Confira os dados de ${formData.nome} e entre em contato o mais breve possível.

Nome: ${formData.nome}
E-mail: ${formData.email}
Whatsapp: ${formData.whatsapp}
Localização: ${formData.cidadeUf}
Quantidade Desejada: ${formData.quantidade}
Linha/Modelo: ${formData.modelo}
Prazo Ideal: ${formData.prazo}
Personalização: ${formData.personalizacao}
Observações: ${formData.observacoes.trim() || 'NÃO PREENCHEU'}`;

            try {
                // Lógica de Distribuição de Leads 50/50
                const useKeyA = Math.random() < 0.5;
                const activeKey = useKeyA
                    ? import.meta.env.VITE_WEB3FORMS_KEY_A
                    : import.meta.env.VITE_WEB3FORMS_KEY_B;

                const destinationEmail = useKeyA
                    ? "fesmoraes97@gmail.com"
                    : "fesmoraes97.2@gmail.com";

                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        access_key: activeKey,
                        from_name: "Spec Squeeze Leads",
                        subject: `Novo Orçamento: ${formData.nome} (${companyName || 'B2B'})`,
                        to: destinationEmail,
                        message: emailContent,
                        ...Object.fromEntries(
                            Object.entries(formData).map(([key, val]) =>
                                key === 'email' ? ['lead_email', val] : [key, val]
                            )
                        ),
                        empresa: companyName,
                        atendimento_por: useKeyA ? "Consultor A" : "Consultor B"
                    })
                });

                if (response.ok) {
                    setShowSuccess(true);
                    // setFormData(initialData); // Removido para manter os dados no formulário
                    setCompanyName(companyName); // Mantém o nome da empresa visível
                    setTimeout(() => setShowSuccess(false), 5000);
                } else {
                    alert("Erro no envio. Verifique as configurações do formulário.");
                }
            } catch (error) {
                console.error("Erro no envio:", error);
                alert("Erro de conexão ao enviar orçamento.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (name: keyof FormData, value: any) => {
        let finalValue = value;

        // CNPJ restriction (14 chars)
        if (name === 'cnpj') {
            finalValue = value.replace(/\D/g, '').slice(0, 14);
            if (finalValue.length === 14) {
                validateCnpj(finalValue);
            } else {
                setCompanyName('');
                setErrors(prev => ({ ...prev, cnpj: false }));
            }
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
        if (name === 'confirmacao' && value) {
            setShowCheckboxError(false);
        }
    };

    return (
        <section id="orcamento" className="relative py-24 px-6 overflow-hidden">
            <div className="container mx-auto max-w-[1300px] relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* LEFT SIDE: TEXT - Vertical Centering */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] mb-6">
                                Sua marca em<br />
                                <span className="highlight">escala industrial</span><br />
                                e design premium.
                            </h2>
                            <p className="text-xl text-foreground/80 leading-relaxed max-w-md">
                                Para acelerar seu atendimento, preencha com o máximo de clareza.
                            </p>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 max-w-sm">
                                <p className="text-primary-accent font-bold uppercase tracking-widest text-xs">Atenção</p>
                                <p className="text-foreground/70 text-sm leading-relaxed">
                                    Atendimento exclusivo B2B. <br />
                                    Pedido mínimo: 300 unidades.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: FORM */}
                    <div className="w-full lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm relative"
                        >
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* 1. Nome */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors", errors.nome && "border-red-500/50 bg-red-500/5")}
                                        value={formData.nome}
                                        onChange={(e) => handleChange('nome', e.target.value)}
                                    />
                                </div>

                                {/* 2. E-mail */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">E-mail Corporativo</label>
                                    <input
                                        type="email"
                                        placeholder="email@suaempresa.com.br"
                                        className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors", errors.email && "border-red-500/50 bg-red-500/5")}
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>

                                {/* 3. WhatsApp */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">WhatsApp</label>
                                    <div className={cn("phone-input-container w-full bg-white/5 border border-white/10 rounded-xl px-4 py-1 text-foreground focus-within:border-primary-accent transition-colors", errors.whatsapp && "border-red-500/50 bg-red-500/5")}>
                                        <PhoneInput
                                            defaultCountry="BR"
                                            placeholder="Seu número"
                                            value={formData.whatsapp}
                                            onChange={(val) => handleChange('whatsapp', val)}
                                            className="w-full text-foreground"
                                            limitMaxLength={true}
                                        />
                                    </div>
                                </div>

                                {/* 4. CNPJ */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">CNPJ da Empresa</label>
                                        {isValidatingCnpj && <span className="text-[10px] text-primary-accent animate-pulse">Validando...</span>}
                                        {companyName && (
                                            <span className={cn(
                                                "text-[10px] truncate max-w-[150px]",
                                                companyName === 'CNPJ Inválido' || companyName === 'Erro na validação' ? "text-red-500" : "text-green-500"
                                            )}>
                                                {companyName}
                                            </span>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Apenas números (14 dígitos)"
                                        className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors", errors.cnpj && "border-red-500/50 bg-red-500/5")}
                                        value={formData.cnpj}
                                        onChange={(e) => handleChange('cnpj', e.target.value)}
                                    />
                                </div>

                                {/* 5. Área de Atuação */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Área de Atuação</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Marketing, Compras, Eventos"
                                        className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors", errors.atuacao && "border-red-500/50 bg-red-500/5")}
                                        value={formData.atuacao}
                                        onChange={(e) => handleChange('atuacao', e.target.value)}
                                    />
                                </div>

                                {/* 6. Cidade/UF */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Cidade / UF</label>
                                    <input
                                        type="text"
                                        placeholder="São Paulo - SP"
                                        className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors", errors.cidadeUf && "border-red-500/50 bg-red-500/5")}
                                        value={formData.cidadeUf}
                                        onChange={(e) => handleChange('cidadeUf', e.target.value)}
                                    />
                                </div>

                                {/* 7. Quantidade */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Quantidade Desejada</label>
                                    <div className="relative group">
                                        <select
                                            className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-primary-accent transition-colors cursor-pointer", errors.quantidade && "border-red-500/50 bg-red-500/5")}
                                            value={formData.quantidade}
                                            onChange={(e) => handleChange('quantidade', e.target.value)}
                                        >
                                            <option value="" disabled className="bg-slate-900">Selecione...</option>
                                            <option value="300-499" className="bg-slate-900">300 a 499</option>
                                            <option value="500-999" className="bg-slate-900">500 a 999</option>
                                            <option value="1000-2999" className="bg-slate-900">1.000 a 2.999</option>
                                            <option value="+3000" className="bg-slate-900">+3.000</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30 group-hover:text-primary-accent transition-colors flex items-center">
                                            <i className="fi fi-rr-angle-small-down text-xl leading-none"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* 8. Modelo */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Linha / Modelo</label>
                                    <div className="relative group">
                                        <select
                                            className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-primary-accent transition-colors cursor-pointer", errors.modelo && "border-red-500/50 bg-red-500/5")}
                                            value={formData.modelo}
                                            onChange={(e) => handleChange('modelo', e.target.value)}
                                        >
                                            <option value="" disabled className="bg-slate-900">Selecione...</option>
                                            <option value="automatica" className="bg-slate-900">Automática</option>
                                            <option value="promocional" className="bg-slate-900">Promocional</option>
                                            <option value="pro" className="bg-slate-900">Pro</option>
                                            <option value="nessei" className="bg-slate-900">Ainda não sei (quero recomendação)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30 group-hover:text-primary-accent transition-colors flex items-center">
                                            <i className="fi fi-rr-angle-small-down text-xl leading-none"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* 9. Prazo */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Prazo Ideal</label>
                                    <div className="relative group">
                                        <select
                                            className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-primary-accent transition-colors cursor-pointer", errors.prazo && "border-red-500/50 bg-red-500/5")}
                                            value={formData.prazo}
                                            onChange={(e) => handleChange('prazo', e.target.value)}
                                        >
                                            <option value="" disabled className="bg-slate-900">Selecione...</option>
                                            <option value="15" className="bg-slate-900">Até 15 dias</option>
                                            <option value="30" className="bg-slate-900">15 a 30 dias</option>
                                            <option value="45" className="bg-slate-900">30 a 45 dias</option>
                                            <option value="flexivel" className="bg-slate-900">Flexível</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30 group-hover:text-primary-accent transition-colors flex items-center">
                                            <i className="fi fi-rr-angle-small-down text-xl leading-none"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* 10. Personalização */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Personalização</label>
                                    <div className="relative group">
                                        <select
                                            className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-primary-accent transition-colors cursor-pointer", errors.personalizacao && "border-red-500/50 bg-red-500/5")}
                                            value={formData.personalizacao}
                                            onChange={(e) => handleChange('personalizacao', e.target.value)}
                                        >
                                            <option value="" disabled className="bg-slate-900">Selecione...</option>
                                            <option value="1cor" className="bg-slate-900">1 cor</option>
                                            <option value="colorida" className="bg-slate-900">Colorida</option>
                                            <option value="nessei" className="bg-slate-900">Ainda não sei</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30 group-hover:text-primary-accent transition-colors flex items-center">
                                            <i className="fi fi-rr-angle-small-down text-xl leading-none"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* 11. Custom Field (Full Width) */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Observações (Opcional)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Conte mais sobre seu projeto..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-accent transition-colors resize-none"
                                        value={formData.observacoes}
                                        onChange={(e) => handleChange('observacoes', e.target.value)}
                                    />
                                </div>

                                {/* CHECKBOX & ERROR */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className={cn(
                                        "p-4 rounded-xl border transition-all duration-300",
                                        showCheckboxError ? "border-red-500 bg-red-500/10" : "border-white/10 bg-white/5"
                                    )}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded border-white/20 bg-transparent text-primary-accent focus:ring-primary-accent/50 cursor-pointer"
                                                checked={formData.confirmacao}
                                                onChange={(e) => handleChange('confirmacao', e.target.checked)}
                                            />
                                            <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                                                Ao enviar, você confirma que é empresa e que o pedido é a partir de 300 unidades.
                                            </span>
                                        </label>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex flex-col items-center gap-4 mt-4">
                                        <button
                                            type="submit"
                                            disabled={!formData.confirmacao || isSubmitting}
                                            className={cn(
                                                "button-cta scale-110 !font-bold transition-all duration-300 min-w-[280px]",
                                                (!formData.confirmacao || isSubmitting) && "opacity-50 grayscale cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ENVIANDO...
                                                </span>
                                            ) : (
                                                "RECEBER MEU ORÇAMENTO"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* SUCCESS MODAL / TOAST */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="absolute inset-0 flex items-center justify-center p-8 bg-slate-900/90 backdrop-blur-md rounded-[32px] z-50 overflow-hidden"
                                    >
                                        <div className="text-center space-y-6">
                                            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                                                <i className="fi fi-rr-check text-green-500 text-4xl"></i>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-normal text-white uppercase tracking-wider">Formulário Enviado!</h3>
                                                <p className="text-green-500 font-bold text-sm leading-relaxed max-w-sm">
                                                    FORMULÁRIO ENVIADO COM ÊXITO. <br />
                                                    NOSSO VENDEDOR ENTRARÁ EM CONTATO COM VOCÊ EM BREVE.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setShowSuccess(false)}
                                                className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                                            >
                                                Fechar
                                            </button>
                                        </div>
                                        {/* Particle background simulation */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-progress-bar" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CHECKBOX POPUP MESSAGE */}
                            <AnimatePresence>
                                {showCheckboxError && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="absolute -top-12 right-0 md:right-12 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xl pulse-red z-50"
                                    >
                                        Por favor, confirme que é empresa e o pedido mínimo.
                                        {/* Tiny arrow */}
                                        <div className="absolute top-full right-10 border-8 border-transparent border-t-red-600" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Global style overrides for PhoneInput */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .phone-input-container .PhoneInputInput {
                    background: transparent;
                    border: none !important;
                    color: white;
                    padding: 0.75rem 0;
                    outline: none !important;
                    font-size: 0.875rem;
                }
                .phone-input-container .PhoneInputCountry {
                    margin-right: 1rem;
                }
                .pulse-red {
                    animation: pulse-red-anim 2s infinite;
                }
                @keyframes pulse-red-anim {
                    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
                }
                .animate-progress-bar {
                    animation: progress 5s linear forwards;
                }
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                select option {
                    background: #0f172a;
                    color: white;
                }
            `}} />
        </section>
    );
};
