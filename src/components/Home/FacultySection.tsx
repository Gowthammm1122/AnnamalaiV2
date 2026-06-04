import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import Founder from "../../assets/Faculties/1.png"
import Gunasekaran from "../../assets/Faculties/2.png"
import Rajiv from "../../assets/Faculties/4.png"
import Kamaraj from "../../assets/Faculties/6.png"
import Vetrivel from "../../assets/Faculties/5.png"
import Rahman from "../../assets/Faculties/3.png"
// Sub-component for individual stacking image
interface FacultyImageProps {
  key?: any;
  image: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  isActive: boolean;
}

const FacultyImage = ({ image, index, total, scrollProgress, isActive }: FacultyImageProps) => {
  const segmentWidth = 1 / total;
  const startOfSegment = (index - 1) / total;
  const slideDuration = segmentWidth * 0.55; // 65% sliding time, 35% static holding/waiting time
  const slideUpEnd = startOfSegment + slideDuration;
  
  // Create a spring-smoothed version of the scroll progress for this specific image
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, 
    [index === 0 ? 0 : startOfSegment, index === 0 ? 0 : slideUpEnd], 
    [index === 0 ? "0%" : "100%", "0%"]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ 
        y,
        zIndex: index + 10,
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <motion.img 
          src={image} 
          alt=""
          className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
        {/* Decorative corner */}
        <div className="absolute bottom-12 left-12 border-l border-b border-white/20 w-32 h-32 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

const FacultySection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const FACULTY = [
    {
      name: "Dr P. Annamalai",
      role: "Chairman of Dr P. Annamalai IAS Academy",
      desc: "15+ years of experience in mentoring over 1,000 successful IAS officers. Expert in General Studies and Strategy.",
      image: Founder ,
    },
    {
      name: "C.Kamaraj IAS(R)",
      role: "C.E.O of Dr P. Annamalai IAS Academy",
      desc: "Distinguished historian with a decade of expertise in Indian Culture and World History modules.",
      image: Kamaraj,
    },
    {
      name: "Vetrivel D",
      role: "Faculty - Indian Economy",
      desc: "Education: BA, ME. Specializes in Indian Economy with 5 years of teaching and mentoring experience.",
      image: Vetrivel,
    },
    {
      name: "Rahman",
      role: "Faculty - History",
      desc: "Qualification: B.E. Electrical and Electronics Engineering. 7 years of experience in mentoring students in History.",
      image: Rahman,
    },
    {
      name: "P. Rajiv Gandhi",
      role: "Faculty - Tamil Society & TN Development",
      desc: "Qualification: MA History, DEEE. 5 years of experience specializing in Tamil Society and TN Development.",
      image: Rajiv,
    },
    {
      name: "Gunasekaran V",
      role: "Maths & Reasoning Faculty",
      desc: "Qualification: B.E. - EEE. 5 years of experience in simplifying Maths and Logical Reasoning.",
      image: Gunasekaran,
    },
  ];

  // Update active index based on scroll progress
  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      const segmentWidth = 1 / FACULTY.length;
      const slideDuration = segmentWidth * 0.55; // aligned with slideDuration in FacultyImage
      
      let index = 0;
      for (let i = 1; i < FACULTY.length; i++) {
        const startOfSegment = (i - 1) / FACULTY.length;
        const slideUpEnd = startOfSegment + slideDuration;
        if (v >= slideUpEnd) {
          index = i;
        }
      }
      setActiveIndex(index);
    });
  }, [scrollYProgress, FACULTY.length, isMobile]);

  if (isMobile) {
    return (
      <section className="bg-white py-14 px-4 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-primary-light text-primary text-[9px] font-bold tracking-[0.3em] uppercase rounded-full mb-3">
              MEET THE MENTORS
            </div>
            <h2 className="text-3xl font-display text-dark leading-tight">
              Our Distinguished <span className="italic text-primary font-medium font-display">Faculty</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto opacity-30 mt-4"></div>
          </div>

          <div className="flex flex-col gap-4">
            {FACULTY.map((f, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                  <img src={f.image} className="w-full h-full object-cover" alt={f.name} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase">{f.role}</span>
                  <h3 className="text-md font-bold text-dark mt-0.5 leading-snug">{f.name}</h3>
                  <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative bg-white" style={{ height: `${FACULTY.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Editorial Text */}
        <div className="w-full lg:w-1/2 h-full flex flex-col pt-32 px-6 sm:px-12 xl:px-[120px] bg-white z-20 border-b lg:border-b-0 lg:border-r border-gray-100 relative">
          <div className="max-w-xl w-full text-left mr-auto">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-4 py-1.5 bg-primary-light text-primary text-[10px] font-bold tracking-[0.4em] uppercase rounded-full mb-10">
                MEET THE MENTORS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[50px] font-display text-dark leading-tight mb-8 font-normal tracking-tight">
                {FACULTY[activeIndex].name}
              </h2>
              <div className="flex flex-col items-start space-y-8">
                <span className="text-2xl font-display italic text-primary/80">{FACULTY[activeIndex].role}</span>
                <p className="text-gray-500 leading-relaxed text-base lg:text-lg max-w-sm font-light">
                  {FACULTY[activeIndex].desc}
                </p>
                <div className="pt-10 flex items-center gap-12">
                   <div className="flex -space-x-3">
                      {FACULTY.map((f, i) => (
                        <div 
                          key={i} 
                          className={`w-10 h-10 rounded-full border-2 border-white overflow-hidden transition-all duration-500 ${i === activeIndex ? 'scale-125 z-10 border-primary' : 'opacity-40'}`}
                        >
                          <img src={f.image} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vertical Counter - Moved to right side of left panel for balance */}
          <div className="absolute right-12 bottom-12 flex flex-col gap-12 font-display text-4xl lg:text-7xl opacity-5">
            {FACULTY.map((_, i) => (
              <span key={i} className={`transition-opacity duration-500 ${i === activeIndex ? 'opacity-100' : 'opacity-20'}`}>
                0{i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Stacking images */}
        <div className="w-full lg:w-1/2 h-full relative bg-gray-50 overflow-hidden">
          {FACULTY.map((f, i) => {
            return (
              <FacultyImage 
                key={i} 
                image={f.image} 
                index={i} 
                total={FACULTY.length} 
                scrollProgress={scrollYProgress}
                isActive={i === activeIndex}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
