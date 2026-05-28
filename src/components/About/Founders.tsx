import React from "react";
import { motion } from "framer-motion";
import FounderImage from '../../assets/Faculties/expanded1.png'
import KamarajImage from '../../assets/Faculties/KamarajIASnew.png'

const Founders = () => {
  // Custom high-end transition preset for a non-AI feeling animation curve
  const premiumTransition = {
    duration: 1.1,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  };

  return (
    <section id="founders-section" className="relative py-32 bg-[#FAFBFD] text-dark overflow-hidden">
      {/* Decorative Subtle Line Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] flex justify-between max-w-[1440px] mx-auto px-[120px]">
        <div className="w-[1px] h-full bg-dark"></div>
        <div className="w-[1px] h-full bg-dark hidden md:block"></div>
        <div className="w-[1px] h-full bg-dark"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10">
        
        {/* Editorial Offset Header Layout */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-white border border-gray-200/80 shadow-sm">
              <span className="text-[10px] font-mono tracking-widest text-gray-700">ACADEMY DIRECTORS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-dark tracking-tight leading-none">
              Led by Experienced <br />
              <span className="font-serif italic font-normal text-[#1E40AF]">Administrative Officers</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <p className="text-gray-400 font-light text-sm leading-relaxed border-l-2 border-gray-200 pl-4">
              With over 30 years of governance experience in the Government of Tamil Nadu, our founders bridge academic preparation with practical administrative clarity.
            </p>
          </div>
        </div>

        {/* Asymmetric Alternating Card Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto items-start pt-6">
          
          {/* Founder 1 - Dr. P. Annamalai */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={premiumTransition}
            className="flex flex-col group"
          >
            {/* Image Box with Custom Cut Shape and Border Accent */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-3 rounded-[32px] border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(30,64,175,0.06)]">
              <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                <img 
                  src={FounderImage} 
                  alt="Dr. P. Annamalai, IAS., PhD." 
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              </div>

              {/* Identity Footer Contextual Blocks */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-[9px] font-mono tracking-[0.25em] text-blue-300 uppercase mb-1.5 font-bold">FOUNDER & CO-PROMOTER</div>
                <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                  Dr. P. Annamalai, <span className="font-serif italic font-normal text-white/90 text-lg sm:text-xl">IAS., PhD.</span>
                </h3>
              </div>
            </div>
            
            {/* Text Bio */}
            <div className="mt-6 px-3 space-y-3">
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                A distinguished civil servant from Tamil Nadu bringing deep expertise in governance, policy, and public administration[cite: 30]. With a strong commitment to mentoring aspirants, he focuses heavily on building conceptual clarity and a disciplined approach to cracking the UPSC examination.
              </p>
              <div className="h-[1px] w-12 bg-[#1E40AF]/40 transition-all duration-500 group-hover:w-20" />
            </div>
          </motion.div>

          {/* Founder 2 - Mr. C. Kamaraj (Intentionally Offset Vertically for Editorial feel) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...premiumTransition, delay: 0.1 }}
            className="flex flex-col group md:translate-y-16 mt-12 md:mt-0"
          >
            {/* Image Box with Custom Cut Shape and Border Accent */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-3 rounded-[32px] border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(30,64,175,0.06)]">
              <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                <img 
                  src={KamarajImage} 
                  alt="Mr. C. Kamaraj, IAS." 
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              </div>
              
              {/* Identity Footer Contextual Blocks */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-[9px] font-mono tracking-[0.25em] text-blue-300 uppercase mb-1.5 font-bold">CO-PROMOTER & MENTOR</div>
                <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                  Mr. C. Kamaraj, <span className="font-serif italic font-normal text-white/90 text-lg sm:text-xl">IAS.</span>
                </h3>
              </div>
            </div>
            
            {/* Text Bio */}
            <div className="mt-6 px-3 space-y-3">
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                An accomplished IAS officer from Tamil Nadu known for practical insights and strategic guidance. He mentors aspirants with a clear focus centered on consistency, answer writing, and understanding the real demands of the civil services journey.
              </p>
              <div className="h-[1px] w-12 bg-[#1E40AF]/40 transition-all duration-500 group-hover:w-20" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Founders;