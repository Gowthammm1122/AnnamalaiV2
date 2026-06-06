import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";

interface HeroProps {
  onViewCourses?: () => void;
  onEnrollNow?: () => void;
}

const Hero = ({ onViewCourses, onEnrollNow }: HeroProps) => {
  return (
    <section className="relative lg:sticky lg:top-0 lg:left-0 h-auto lg:h-screen w-full flex flex-col justify-between bg-white overflow-hidden z-0">
      {/* Abstract Background Shapes */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-gray-50 rounded-full -z-10"></div>

      <main className="flex-grow flex flex-col max-w-[1440px] px-6 sm:px-12 xl:px-[120px] mx-auto w-full pt-36 pb-12 justify-center">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          {/* Content Column */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 bg-primary-light text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded mb-8">
                LEARN EXCEL ACHIEVE SERVE
              </div>
              <h1 className="text-5xl md:text-[80px] leading-[0.95] font-display text-dark font-normal mb-8">
                Dr P. Annamalai <br/>
                <span className="italic text-primary font-serif">IAS Academy</span>
              </h1>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg mb-12 font-light">
               We provide strategic guidance and comprehensive mentorship to government service Aspirants. Do join a legacy of leaders who have shaped the Nation's future through our rigorous training modules.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={onViewCourses}
                  className="px-10 py-5 bg-[#1e4fc0] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl group cursor-pointer"
                >
                  View All Courses
                  <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onEnrollNow}
                  className="px-10 py-5 border border-dark text-dark text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Featured Card Column - Option B: Modern Typographic Quote Card */}
          <div className="w-full lg:w-1/3 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-auto min-h-[360px] aspect-auto lg:aspect-[4/5] bg-gradient-to-b from-[#FAFBFD] to-[#F1F5F9] border border-gray-150 p-8 md:p-10 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-500 rounded-[32px]"
            >
              {/* Dynamic glowing accent in bottom-right corner */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none"></div>
              
              {/* Top Row: Decorative badge & quote mark */}
              <div className="relative z-10 flex justify-between items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-light border border-blue-150 rounded-full">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1e4fc0]">Vision of Aspirants</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Quote className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>

              {/* Quote Content Section */}
              <div className="relative z-10 my-auto py-4">
                <p className="text-lg md:text-xl font-display text-gray-700 italic leading-relaxed font-normal">
                  "Success in the competitive examinations does not depend upon chance, but on the systematic planning,hard work,perseverance and the clarity of your strategic path."
                </p>
              </div>

              {/* Footer Row: Clean, minimalist academy branding */}
              <div className="relative z-10 flex items-center space-x-3 pt-4 border-t border-gray-150/60">
                
                <p className="text-[10px] font-medium tracking-widest text-[#1e4fc0] font-sans">Dr P. ANNAMALAI IAS ACADEMY</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Stats Bar aligned perfectly inside global layout wrapper bounds */}
      <div className="w-full border-t border-gray-150 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] w-full grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-150/50">
          <div className="p-6 md:p-8 flex flex-col space-y-1.5 group hover:bg-gray-50/50 transition-colors">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">Location</span>
            <span className="text-xs md:text-sm font-semibold text-dark">Plot 12&13, Main road,
              Anthony Nagar Main Road,
              Kolathur, Chennai - 600099</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col space-y-1.5 group hover:bg-gray-50/50 transition-colors">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">Next Batch</span>
            <span className="text-xs md:text-sm font-semibold text-dark">July 1, 2026</span>
          </div>
          <div className="p-6 md:p-8 flex flex-col space-y-1.5 group hover:bg-gray-50/50 transition-colors">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">Students</span>
            <span className="text-xs md:text-sm font-semibold text-dark">500+ Enrolled</span>
          </div>
          <div 
            onClick={() => window.open("https://wa.me/918015390090", "_blank", "noopener,noreferrer")}
            className="p-6 md:p-8 flex flex-col space-y-1.5 bg-[#1E40AF] text-white hover:bg-blue-800 transition-colors cursor-pointer select-none"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-blue-200 font-bold">Call for Inquiry</span>
            <span className="text-xs md:text-sm font-semibold">+91 80153 90090</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
