import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, Sparkles } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  achievement: string;
  year: string;
}

const TestimonialsSection = () => {
  const allTestimonials: Testimonial[] = [
    {
      quote: "The personalized coaching and rigorous feedback loops entirely restructured my mains writing pattern. Dr. P. Annammalai's personal insight into GS Paper IV case studies was the defining edge.",
      author: "Swathi S.",
      role: "UPSC Civil Services",
      achievement: "Rank 42, UPSC CSE",
      year: "Cohort 25"
    },
    {
      quote: "The qualitative answer diagnostics here are unmatched. Unlike commercial centers, Dr. Annamalai’s academy treats you as an aspiring administrator whose ethics and logic are actively built day by day.",
      author: "Vigneshwaran K.",
      role: "State Services Academy",
      achievement: "Deputy Collector, TNPSC Group I",
      year: "Cohort 24"
    },
    {
      quote: "Joining the Anna Nagar campus turned my preparation around. Sincere mentorship, exhaustive mock exam analysis, and dedicated optional guidance built absolute mental clarity.",
      author: "Priyadharshini M.",
      role: "Civil Services Aspirant",
      achievement: "Mains Selected Candidate",
      year: "Current Cohort"
    },
    {
      quote: "Dr. P. Annammalai IAS Academy taught me that the Civil Services is not about rote memory, but absolute clarity of character. Daily feedback sheets helped me pinpoint weak areas in GS III.",
      author: "Ranganathan G.",
      role: "UPSC Civil Services",
      achievement: "IRS Officer, CSE Merit Rank",
      year: "Cohort 24"
    },
    {
      quote: "The SCAT merit scholarship program provided a level playing field for standard tier-2 city aspirants like me. Premium resources, mock evaluation criteria, and direct counselor support changed my life.",
      author: "Arulmozhi P.",
      role: "State Civil Services",
      achievement: "Municipal Commissioner Grade-I",
      year: "Cohort 23"
    },
    {
      quote: "Our answer diagnostics sessions didn't just point out mistakes; they offered structural and conceptual corrections. This level of precise mentoring is extremely rare in India today.",
      author: "Meera K.",
      role: "UPSC Civil Sevices",
      achievement: "IAS Aspirant, AIPMTS Topper",
      year: "Current Cohort"
    },
    {
      quote: "Every single evaluation sheet returned tells you exactly where your structural alignment lacked coherence. This feedback mechanism is a gold standard for serious candidates.",
      author: "Balaji Swaminathan",
      role: "State Services Aspirant",
      achievement: "Selected Group-II Officer",
      year: "Cohort 24"
    },
    {
      quote: "A quiet, highly specialized crucible of learning. The selective induction policy ensures that the peer dashboard stays incredibly competitive, keeping you constantly driven.",
      author: "Fathima Rizwana",
      role: "Civil Services",
      achievement: "IPS Candidate, Upsc Mains Selected",
      year: "Cohort 25"
    }
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Sync state to ref to avoid triggering useEffect re-runs
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    
    // speed constants (pixels per frame)
    const speedNormal = 0.95; // Relaxed elegant default scroll speed
    const speedHover = 0.12;  // Slowed down speed for comfortable reading when hovered
    
    let currentSpeed = speedNormal;
    const el = marqueeRef.current;
    if (!el) return;

    const animate = () => {
      if (!el) return;
      const limit = el.scrollWidth / 2; // Loop at half width (after the first set of items)
      
      const targetSpeed = isHoveredRef.current ? speedHover : speedNormal;
      // Linear interpolation (lerp) for beautiful deceleration/acceleration transitions
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      currentX -= currentSpeed;
      if (Math.abs(currentX) >= limit) {
        currentX = 0;
      }
      
      el.style.transform = `translate3d(${currentX}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden select-none border-t border-b border-gray-100">
      {/* Dynamic Grid Background Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]" 
        style={{ 
          backgroundImage: "linear-gradient(#1e40af 1.5px, transparent 1.5px), linear-gradient(90deg, #1e40af 1.5px, transparent 1.5px)", 
          backgroundSize: "60px 60px" 
        }}
      ></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-primary uppercase tracking-[0.25em] text-[10px] font-bold mb-4 bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/10"
          >
            Aspirant Testimonials
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark tracking-tight leading-tight mt-2"
          >
            Voices of <span className="font-serif italic font-medium text-primary">academic triumph.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Real testimonies of diligence, strategic transformation, and character refinement shared by civil service aspirants who paved their way to administrative success.
          </motion.p>
        </div>
      </div>

      {/* Looping Marquee Wrapper */}
      <div 
        className="relative z-20 w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={marqueeRef}
          className="flex gap-6 w-max will-change-transform"
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {/* First set of cards */}
          {allTestimonials.map((item, index) => (
            <div key={`orig-${index}`} className="flex-shrink-0">
              <div 
                className="w-[340px] sm:w-[420px] h-[300px] sm:h-[320px] bg-[#fbfbfd] border border-gray-150/70 p-6 sm:p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 hover:border-primary/20 hover:shadow-[0_15px_30px_rgba(30,64,175,0.03)] hover:bg-white cursor-pointer select-none"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary border border-primary/5">
                      <Quote className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-gray-600 font-sans font-light text-sm sm:text-base leading-relaxed whitespace-normal line-clamp-3 sm:line-clamp-4 overflow-hidden text-ellipsis">
                    “{item.quote}”
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-6 flex justify-between items-start">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-dark font-sans font-semibold text-sm truncate">
                      {item.author}
                    </h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5 truncate">
                      {item.role}
                    </p>
                  </div>
                  <div className="bg-primary-light border border-primary/10 rounded-full px-3 py-1 flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {item.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Second duplicate set of cards for seamless infinite looping */}
          {allTestimonials.map((item, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0">
              <div 
                className="w-[340px] sm:w-[420px] h-[300px] sm:h-[320px] bg-[#fbfbfd] border border-gray-150/70 p-6 sm:p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 hover:border-primary/20 hover:shadow-[0_15px_30px_rgba(30,64,175,0.03)] hover:bg-white cursor-pointer select-none"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary border border-primary/5">
                      <Quote className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-gray-600 font-sans font-light text-sm sm:text-base leading-relaxed whitespace-normal line-clamp-3 sm:line-clamp-4 overflow-hidden text-ellipsis">
                    “{item.quote}”
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-6 flex justify-between items-start">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-dark font-sans font-semibold text-sm truncate">
                      {item.author}
                    </h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5 truncate">
                      {item.role}
                    </p>
                  </div>
                  <div className="bg-primary-light border border-primary/10 rounded-full px-3 py-1 flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {item.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-100"></div>
    </section>
  );
};

export default TestimonialsSection;