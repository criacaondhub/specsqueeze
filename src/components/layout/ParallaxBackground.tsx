import LiquidEther from '../ui/LiquidEther';

export const ParallaxBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#070d16]">
            <div className="absolute inset-0 opacity-50 hidden md:block">
                <LiquidEther
                    colors={['#09325d', '#23619f', '#90c7fe']}
                    mouseForce={15}
                    cursorSize={150}
                    isViscous
                    viscous={70}
                    iterationsViscous={32}
                    iterationsPoisson={60}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.4}
                    autoIntensity={3.0}
                    takeoverDuration={0.25}
                    autoResumeDelay={2000}
                    autoRampDuration={0.6}
                />
            </div>
            {/* Aqui podemos adicionar outros grafismos PNG fixos no futuro */}
        </div>
    );
};
