import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";

interface FinalCTAProps {
  onApply?: () => void;
  onRegisterDemo?: () => void;
}

const FinalCTA = ({ onApply, onRegisterDemo }: FinalCTAProps) => {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[850px] h-[850px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 lg:p-24 overflow-hidden relative group">
          {/* Grain texture for the card */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
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

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative aspect-square lg:aspect-[4/3] lg:min-h-[460px] rounded-3xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
              >
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover grayscale brightness-50"
                  alt="Academy atmosphere"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-dark overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                        </div>
                      ))}
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Join 500+ Active Aspirants</span>
                  </div>
                  <div className="h-px w-full bg-white/20"></div>
                </div>
              </motion.div>
              
              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl hidden md:block animate-none"
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
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
