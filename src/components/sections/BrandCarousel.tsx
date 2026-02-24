import { motion } from "framer-motion";

export const BrandCarousel = () => {
    const brands = [
        "bradesco.svg",
        "cinemark.svg",
        "dna-suplementos.svg",
        "gatorade.svg",
        "neo-quimica.svg",
        "oxer.svg",
        "reebok.svg",
        "wilson.svg"
    ];

    return (
        <section className="relative pt-[10px] pb-10 md:py-10 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-[42px] tracking-normal md:tracking-tight md:text-[64px] font-normal leading-none uppercase">
                        ELES <span className="text-primary-accent">ESCOLHERAM</span> A SPEC
                    </h2>
                </motion.div>
            </div>

            {/* CSS-based Carousel (Coding with Robby style) */}
            <div className="logos-container">
                <div className="logos-group">
                    {/* First slide */}
                    <div className="logos-slide">
                        {brands.map((brand, index) => (
                            <img
                                key={`slide1-${index}`}
                                src={`assets/${brand}`}
                                alt="Brand Logo"
                                className="brand-logo"
                            />
                        ))}
                    </div>
                    {/* Second slide (copy for seamless loop) */}
                    <div className="logos-slide">
                        {brands.map((brand, index) => (
                            <img
                                key={`slide2-${index}`}
                                src={`assets/${brand}`}
                                alt="Brand Logo"
                                className="brand-logo"
                            />
                        ))}
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes slide {
                        from { transform: translateX(0); }
                        to { transform: translateX(-100%); }
                    }

                    .logos-container {
                        overflow: hidden;
                        padding: 10px 0;
                        background: transparent;
                        white-space: nowrap;
                        position: relative;
                        width: 100%;
                    }

                    .logos-container:before,
                    .logos-container:after {
                        position: absolute;
                        top: 0;
                        width: 150px;
                        height: 100%;
                        content: "";
                        z-index: 2;
                    }

                    /* Adapting for dark/parallax background */
                    .logos-container:before {
                        left: 0;
                        background: linear-gradient(to right, rgb(10, 10, 10), rgba(10, 10, 10, 0));
                    }

                    .logos-container:after {
                        right: 0;
                        background: linear-gradient(to left, rgb(10, 10, 10), rgba(10, 10, 10, 0));
                    }

                    .logos-group {
                        display: flex;
                        width: max-content;
                    }

                    .logos-group:hover .logos-slide {
                        animation-play-state: paused;
                    }

                    .logos-slide {
                        display: flex;
                        align-items: center;
                        animation: 45s slide infinite linear;
                    }

                    .brand-logo {
                        height: 45px;
                        margin: 0 50px;
                        opacity: 0.5;
                        filter: brightness(0) invert(1);
                        transition: all 0.4s ease;
                        cursor: pointer;
                    }

                    /* Only opacity and scale on hover, keeping it white */
                    .brand-logo:hover {
                        opacity: 1;
                        filter: brightness(0) invert(1);
                        transform: scale(1.1);
                    }

                    @media (max-width: 768px) {
                        .brand-logo {
                            height: 35px;
                            margin: 0 30px;
                        }
                        .logos-container:before,
                        .logos-container:after {
                            width: 60px;
                        }
                    }
                `}} />
            </div>
        </section>
    );
};
