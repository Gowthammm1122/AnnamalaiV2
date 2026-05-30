import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lanyard from "../Lanyard/Lanyard";
import Ctabg from "../../assets/images/ctabg.jpg";

interface CtaSectionProps {
    onApply?: () => void;
    onRegisterDemo?: () => void;
}

const CtaSection = ({ onApply, onRegisterDemo }: CtaSectionProps) => {
    const navigate = useNavigate();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isInteractive, setIsInteractive] = React.useState(true);
    const [isInView, setIsInView] = React.useState(false);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { 
            rootMargin: "600px 0px 600px 0px", // Pre-render when component is within 600px of viewport
            threshold: 0 
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        setIsInteractive(relativeX > rect.width * 0.45); // Active in the right 55%
    };

    return (
        <section className="py-24 bg-dark relative overflow-hidden">
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
                    {/* Background Image of the Card */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{
                            backgroundImage: `url(${Ctabg})`,
                        }}
                    />
                    {/* Dark gradient overlay for contrast and readability */}
                    <div className="absolute inset-0 z-10 bg-dark/80 transition-opacity duration-300 group-hover:opacity-75 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-20">
                        {/* Left Content Column */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Admissions Open</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-display text-white leading-tight mb-8">
                                    Your <span className="italic text-primary-light font-medium">Mission</span> Achieved Here.
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
                                    Join the academy where dreams transform into service. Start your journey with expert mentorship and a community of high-achievers.
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <button
                                        onClick={() => navigate("/contact")}
                                        className="px-10 py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all hover:scale-105 shadow-xl shadow-primary/20 cursor-pointer"
                                    >
                                        Enquire Now
                                    </button>
                                    <button
                                        onClick={() => navigate("/courses")}
                                        className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all cursor-pointer"
                                    >
                                        View Courses
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column Grid Placeholder to preserve spacing */}
                        <div className="hidden lg:block h-[480px] lg:h-[550px]"></div>
                    </div>

                    {/* Absolute overlay for Lanyard spanning the entire container width to prevent clipping, z-30 to float on top of text */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-30 hidden lg:block">
                        {isDesktop && (
                            <Lanyard 
                                position={[-1.5, -0.5, 14]} 
                                gravity={[0, -40, 0]} 
                                fov={18} 
                                interactive={isInteractive} 
                                isInView={isInView}
                            />
                        )}
                    </div>

                    {/* Visual indicator that card is interactive */}
                    <div className="absolute bottom-6 right-6 px-4 py-2 z-30 hidden lg:block">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light animate-pulse">Drag your card</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;