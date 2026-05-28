import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Compass, CheckCircle2 } from "lucide-react";

const MissionVision = () => {
  return (
    <section id="mission-vision-section" className="relative py-24 bg-white text-dark overflow-hidden">
      {/* Editorial Grid Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#eff6ff]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10">
        
        {/* Understated Elegant Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.25em] text-[10px] font-bold mb-4"
          >
            Academy Core Directives
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark tracking-tight leading-tight mt-2"
          >
            The twin pillars of <span className="font-serif italic font-medium text-primary">our guidance & your success.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4"
          >
            How Dr. P. Annamalai IAS Academy translates elite administrative expertise into proven milestones across state and central examinations.
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FAFAFD] border border-gray-150/70 rounded-[40px] p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_25px_60px_rgba(30,64,175,0.05)] hover:border-primary/20 transition-all duration-500 group"
          >
            <div className="absolute right-8 -bottom-10 text-[180px] font-display font-medium text-primary/[0.015] select-none pointer-events-none group-hover:text-primary/[0.035] group-hover:scale-105 transition-all duration-700 font-serif italic">
              M
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-center">
                <div className="inline-flex py-1.5 text-primary text-[20px] font-bold uppercase tracking-[0.15em] rounded-full">
                  The Mission
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-display text-dark tracking-tight leading-tight">
                  Training aspirants to <span className="italic font-serif text-primary">achieve their mission.</span>
                </h3>
                <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
                  To provide a comprehensive, multi-disciplinary educational roadmap that trains aspirants with systematic, consistent discipline to guarantee undeniable success in public service entry.
                </p>
              </div>

              {/* Scannable Key Points */}
              <div className="space-y-5 pt-4 border-t border-gray-150/50">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Integrated Exam Architecture</h4>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Delivering specialized, tailored coaching across UPSC, TNPSC, Banking, Insurance, RRB, SSC, and TNUSRB programs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Rigorous Evaluative Metrics</h4>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Transforming core learning into proven output via an structured sequence of Daily, Weekly, Monthly, and full Mock Tests.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Personalized Academic Care</h4>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Ensuring every student receives close attention, guidance, and high-quality printed study books aligned strictly to active syllabi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative bg-dark text-white rounded-[40px] p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_25px_60px_rgba(15,23,42,0.15)] transition-all duration-500 group border border-white/5"
          >
            {/* Glowing spot background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px] pointer-events-none -translate-x-12 -translate-y-12"></div>
            
            <div className="absolute right-8 -bottom-10 text-[180px] font-display font-medium text-white/[0.012] select-none pointer-events-none group-hover:text-white/[0.03] group-hover:scale-105 transition-all duration-700 font-serif italic">
              V
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-center">
                <div className="inline-flex py-1.5 text-primary text-[20px] font-bold uppercase tracking-[0.15em] rounded-full">
                  The Vision
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-display text-white tracking-tight leading-tight">
                  Shaping the future elite <span className="italic font-serif text-primary-light">public and civil service sectors.</span>
                </h3>
                <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed">
                  We look forward to building a premier learning destination promoted by veteran administrators where conceptual clarity and structured consistency pave an open highway to government careers.
                </p>
              </div>

              {/* Scannable Key Points */}
              <div className="space-y-5 pt-4 border-t border-white/10">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-light" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">LEARN • EXCEL • ACHIEVE • SERVE</h4>
                    <p className="text-white/60 text-xs font-light leading-relaxed">
                      Instilling our premium organizational motto deeply into the competitive training parameters of every single candidate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-light" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Administrative Legacy Continuity</h4>
                    <p className="text-white/60 text-xs font-light leading-relaxed">
                      Leveraging over 30 years of governance experience to prepare candidates for policy administration and public workflow challenges.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-light" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Democratized Success Hub</h4>
                    <p className="text-white/60 text-xs font-light leading-relaxed">
                      Utilizing premium facilities and experienced faculty to make top administrative ranks attainable and realistic for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;