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
    prazo: string;
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
    prazo: '',
    observacoes: '',
    confirmacao: false,
};

const normalize = (str: string) =>
    str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

export const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);
    // const [companyName, setCompanyName] = useState('');
    // const [isValidatingCnpj, setIsValidatingCnpj] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cities, setCities] = useState<string[]>([]);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    // Filtra as cidades garantindo que só apareçam as que COMEÇAM com o texto e ignorando acentos
    const filteredCities = React.useMemo(() => {
        const query = normalize(formData.cidadeUf);
        if (query.length < 1) return [];

        return cities
            .filter(city => normalize(city).startsWith(query))
            .slice(0, 50); // Limita a 50 para o navegador não travar
    }, [cities, formData.cidadeUf]);

    // Fetch cities from IBGE
    React.useEffect(() => {
        const fetchCities = async () => {
            try {
                // Tenta carregar do cache para ser instantâneo
                const cached = localStorage.getItem('ibge-cities-cache');
                if (cached) {
                    setCities(JSON.parse(cached));
                }

                const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
                if (response.ok) {
                    const data = await response.json();
                    const formatted = data.map((c: any) => `${c.nome} - ${c.microrregiao?.mesorregiao?.UF?.sigla || ''}`);
                    setCities(formatted);
                    localStorage.setItem('ibge-cities-cache', JSON.stringify(formatted));
                }
            } catch (error) {
                console.error('Erro IBGE:', error);
            }
        };
        fetchCities();
    }, []);

    const validateField = (name: keyof FormData, value: any) => {
        if (name === 'observacoes') return false;
        if (name === 'confirmacao') return !value;
        return !value || value.toString().trim() === '';
    };

    // CNPJ API Validation
    /*
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
    */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<Record<keyof FormData, boolean>> = {};
        let hasErrors = false;

        (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
            // Ignora campos comentados/opcionais na validação
            const skipValidation = [
                'observacoes', 'confirmacao', 'atuacao', 'prazo', 'cnpj'
            ].includes(key);

            if (!skipValidation) {
                if (validateField(key, formData[key])) {
                    newErrors[key] = true;
                    hasErrors = true;
                }
            }
        });

        // Validação de CNPJ comentada
        /*
        if (errors.cnpj || companyName === 'CNPJ Inválido') {
            newErrors.cnpj = true;
            hasErrors = true;
        }
        */

        if (!formData.confirmacao) {
            setShowCheckboxError(true);
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            setIsSubmitting(true);

            const emailContent = `OLÁ, *SPEC SQUEEZE*

${formData.nome} de Empresa preencheu o formulário da landing page. Confira os dados de ${formData.nome} e entre em contato o mais breve possível.

Nome: ${formData.nome}
E-mail: ${formData.email}
Whatsapp: ${formData.whatsapp}
Localização: ${formData.cidadeUf}`;

            try {
                const activeKey = import.meta.env.VITE_WEB3FORMS_KEY;
                const destinationEmail = "contato@squeeze.com.br,criacao@novadimensaodigital.com.br";

                // Dispara ambas as chamadas em paralelo sem bloquear o feedback
                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        access_key: activeKey,
                        from_name: "Spec Squeeze Leads",
                        subject: `Novo Orçamento: ${formData.nome} (B2B)`,
                        to: destinationEmail,
                        message: emailContent,
                        ...Object.fromEntries(
                            Object.entries(formData).map(([key, val]) =>
                                key === 'email' ? ['lead_email', val] : [key, val]
                            )
                        ),
                    })
                }).catch(() => {});

                const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
                if (sheetsUrl) {
                    fetch(sheetsUrl, {
                        method: "POST",
                        body: JSON.stringify({
                            nome: formData.nome,
                            email: formData.email,
                            whatsapp: formData.whatsapp,
                            cidadeUf: formData.cidadeUf,
                        }),
                    }).catch(() => {});
                }

                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            } catch (error) {
                console.error("Erro no envio:", error);
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
            /*
            if (finalValue.length === 14) {
                validateCnpj(finalValue);
            } else {
                setCompanyName('');
                setErrors(prev => ({ ...prev, cnpj: false }));
            }
            */
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
        <section id="orcamento" className="relative py-24 px-6">
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
                            <h2 className="text-[42px] leading-none md:text-5xl lg:text-[64px] font-normal mb-6 text-center lg:text-left text-balance mx-auto lg:mx-0">
                                Sua marca em<br />
                                <span className="highlight">escala industrial</span><br />
                                e design premium.
                            </h2>
                            <p className="text-xl text-foreground/80 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                Para acelerar seu atendimento, preencha com o máximo de clareza.
                            </p>

                            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 max-w-sm mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
                                <p className="text-primary-accent font-bold uppercase tracking-widest text-xs">Atenção</p>
                                <p className="text-foreground/70 text-sm leading-relaxed text-center lg:text-left">
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
                            className="p-4 md:p-12 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm relative"
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
                                {/* 
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
                                */}

                                {/* 5. Área de Atuação */}
                                {/* 
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
                                */}

                                {/* 6. Cidade / UF Custom Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Cidade / UF</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ex: São Paulo - SP"
                                            className={cn("w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-accent transition-colors", errors.cidadeUf && "border-red-500/50 bg-red-500/5")}
                                            value={formData.cidadeUf}
                                            onChange={(e) => {
                                                handleChange('cidadeUf', e.target.value);
                                                setShowCityDropdown(true);
                                            }}
                                            onFocus={() => setShowCityDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                                        />

                                        <AnimatePresence>
                                            {showCityDropdown && filteredCities.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 right-0 mt-2 bg-[#0a0f1d] border border-white/10 rounded-xl shadow-2xl z-[999] max-h-[250px] overflow-y-auto custom-scrollbar"
                                                >
                                                    {filteredCities.map((city, idx) => (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            className="w-full text-left px-4 py-3 text-sm text-foreground/80 hover:bg-primary-accent/10 hover:text-primary-accent transition-colors border-b border-white/5 last:border-0"
                                                            onClick={() => {
                                                                handleChange('cidadeUf', city);
                                                                setShowCityDropdown(false);
                                                            }}
                                                        >
                                                            {city}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>


                                {/* 11. Custom Field (Full Width) */}
                                {/* 
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
                                */}

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
                                                "button-cta w-full md:w-auto md:scale-110 !font-bold transition-all duration-300 md:min-w-[280px]",
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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 158, 255, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 158, 255, 0.5);
                }

            `}} />
        </section>
    );
};
