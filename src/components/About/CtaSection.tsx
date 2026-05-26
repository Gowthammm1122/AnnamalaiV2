import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import Lanyard from "../Lanyard/Lanyard";

interface CtaSectionProps {
    onApply?: () => void;
    onRegisterDemo?: () => void;
}

const CtaSection = ({ onApply, onRegisterDemo }: CtaSectionProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isInteractive, setIsInteractive] = React.useState(true);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        setIsInteractive(relativeX > rect.width * 0.45); // Active in the right 55%
    };

    return (
        <section className="py-24 bg-dark relative overflow-hidden select-none">
            {/* Decorative HSL Gradient Ambient Glows */}
            <div className="absolute top-0 right-0 w-[850px] h-[850px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

            <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10">
                <div 
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setIsInteractive(false)}
                    className="bg-white/5 border border-white/10 rounded-[40px] p-12 lg:p-24 overflow-hidden relative group"
                >
                    {/* Subtle Grid Grain texture for premium look */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-0">
                        {/* Left Content Column */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Admissions Open 2024-25</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-display text-white leading-tight mb-8">
                                    Your <span className="italic text-primary-light font-medium">Legacy</span> Begins Here.
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
                                    Join the academy where dreams transform into service. Start your journey with expert mentorship and a community of high-achievers.
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <button
                                        onClick={onApply}
                                        className="px-10 py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all hover:scale-105 shadow-xl shadow-primary/20 cursor-pointer"
                                    >
                                        Apply Online
                                    </button>
                                    <button
                                        onClick={onRegisterDemo}
                                        className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all cursor-pointer"
                                    >
                                        Register for Demo
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column Grid Placeholder to preserve spacing */}
                        <div className="hidden lg:block h-[480px] lg:h-[550px]"></div>
                    </div>

          {/* Absolute overlay for Lanyard spanning the entire container width to prevent clipping, z-20 to float on top of text */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden lg:block">
            <Lanyard position={[-1.5, -0.5, 14]} gravity={[0, -40, 0]} fov={18} interactive={isInteractive} />
          </div>

          {/* Visual indicator that card is interactive */}
          <div className="absolute bottom-6 right-6 bg-dark/80 px-4 py-2 border border-white/10 rounded-full pointer-events-none backdrop-blur-md shadow-lg z-30">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light animate-pulse">Drag & Throw the Badge</p>
          </div>
          
          {/* Floating Stat Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-6 bg-white p-6 rounded-2xl shadow-2xl hidden md:block animate-none z-30"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-display text-dark">85%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Success Rate</div>
              </div>
            </div>
          </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;