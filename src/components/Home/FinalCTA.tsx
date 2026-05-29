import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import ctabg2 from "../../assets/images/ctabg2.jpg";
import { useNavigate } from "react-router-dom";

interface FinalCTAProps {
  onApply?: () => void;
  onRegisterDemo?: () => void;
}

const FinalCTA = ({ onApply, onRegisterDemo }: FinalCTAProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[850px] h-[850px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 lg:p-24 overflow-hidden relative group">
          {/* Background Image of the Card */}
          <div
            className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ 
              backgroundImage: `url(${ctabg2})`,
            }}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-20">
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
                  Your <span className="italic text-primary-light font-medium">Legacy</span> Begins Here.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
