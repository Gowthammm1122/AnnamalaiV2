import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import civilImg from '../../assets/images/civil.png';
import tnpscImg from '../../assets/images/Tnpsc 1 &2.png';
import optionalImg from '../../assets/images/optional.png';
import csatImg from '../../assets/images/csat.png';
import ethicsImg from '../../assets/images/ethics.png';
import interviewImg from '../../assets/images/Interview ready.png';

interface OurCoursesProps {
  onDiscoverMore?: () => void;
}

const OurCourses = ({ onDiscoverMore }: OurCoursesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  const COURSES = [
    {
      name: 'Civil Services (IAS/IPS)',
      src: civilImg,
      bg: '#1e40af',
      desc: 'Our flagship program providing comprehensive coaching for Prelims, Mains, and Interview.'
    },
    {
      name: 'TNPSC Group I & II',
      src: tnpscImg,
      bg: '#166534',
      desc: 'Specialized coaching for Tamil Nadu Public Service Commission exams with expert local faculty.'
    },
    {
      name: 'Optional Specialization',
      src: optionalImg,
      bg: '#5b21b6',
      desc: 'Deep dive into History, Geography, PSIR, and Sociology with our dedicated subject experts.'
    },
    {
      name: 'CSAT & Aptitude',
      src: csatImg,
      bg: '#9a3412',
      desc: 'Master logical reasoning, analytical ability, and basic numeracy for the CSAT paper.'
    },
    {
      name: 'Ethics & Integrity',
      src: ethicsImg,
      bg: '#854d0e',
      desc: 'Focused sessions on General Studies Paper IV, covering ethics, integrity, and case studies.'
    },
    {
      name: 'Interview Ready',
      src: interviewImg,
      bg: '#1e3a8a',
      desc: 'Personality development and mock interview sessions with former board members and bureaucrats.'
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    COURSES.forEach(course => {
      const img = new Image();
      img.src = course.src;
    });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % 6);
    } else {
      setActiveIndex((prev) => (prev + 5) % 6);
    }
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 5) % 6) return 'left';
    if (index === (activeIndex + 1) % 6) return 'right';
    if (index === (activeIndex + 4) % 6) return 'back-left';
    if (index === (activeIndex + 2) % 6) return 'back-right';
    return 'back';
  };

  const getStyle = (role: string) => {
    const base: any = {
      position: 'absolute',
      aspectRatio: '0.8 / 1',
      transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, filter, opacity, left',
    };

    switch (role) {
      case 'center':
        return {
          ...base,
          left: '50%',
          transform: `translateX(-50%) scale(${isMobile ? 1.2 : 1.25})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 30,
          height: isMobile ? '45%' : '65%',
          bottom: isMobile ? '22%' : '6%',
        };
      case 'left':
        return {
          ...base,
          left: isMobile ? '15%' : '25%',
          transform: 'translateX(-50%) scale(0.9)',
          filter: 'blur(1px)',
          opacity: 0.8,
          zIndex: 20,
          height: isMobile ? '14%' : '22%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'right':
        return {
          ...base,
          left: isMobile ? '85%' : '75%',
          transform: 'translateX(-50%) scale(0.9)',
          filter: 'blur(1px)',
          opacity: 0.8,
          zIndex: 20,
          height: isMobile ? '14%' : '22%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'back-left':
        return {
          ...base,
          left: isMobile ? '0%' : '10%',
          transform: 'translateX(-50%) scale(0.75)',
          filter: 'blur(3px)',
          opacity: 0.4,
          zIndex: 10,
          height: isMobile ? '10%' : '16%',
          bottom: isMobile ? '38%' : '18%',
        };
      case 'back-right':
        return {
          ...base,
          left: isMobile ? '100%' : '90%',
          transform: 'translateX(-50%) scale(0.75)',
          filter: 'blur(3px)',
          opacity: 0.4,
          zIndex: 10,
          height: isMobile ? '10%' : '16%',
          bottom: isMobile ? '38%' : '18%',
        };
      default: // back
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%) scale(0.55)',
          filter: 'blur(5px)',
          opacity: 0,
          zIndex: 5,
          height: isMobile ? '8%' : '12%',
          bottom: '20%',
        };
    }
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden transition-colors duration-[650ms] cubic-bezier(0.4,0,0.2,1)"
      style={{ backgroundColor: COURSES[activeIndex].bg, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Brand Label */}

      {/* Giant Ghost Text */}
      <div className="absolute inset-x-0 top-[15%] flex items-center justify-center pointer-events-none select-none z-[1]">
        <h2 
          className="font-display uppercase text-white opacity-5 whitespace-nowrap leading-none tracking-[-0.04em]"
          style={{ fontSize: 'clamp(100px, 32vw, 500px)', fontFamily: "'Anton', sans-serif" }}
        >
          COURSES
        </h2>
      </div>

      {/* Carousel */}
      <div className="absolute inset-0 z-[10]">
        {COURSES.map((course, i) => (
          <div key={i} style={getStyle(getRole(i)) as any}>
            <img
              src={course.src}
              alt={course.name}
              className="w-full h-full object-contain object-bottom select-none drop-shadow-2xl"
              style={{ maxWidth: isMobile ? '160px' : '420px', maxHeight: '100%' }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Bottom Left Content & Nav */}
      <div className="absolute bottom-10 left-6 sm:bottom-20 sm:left-24 xl:left-[120px] z-[60] max-w-[400px] text-white">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-1 bg-white/30 mb-6"></div>
          <p className="text-2xl sm:text-5xl font-black uppercase tracking-tight mb-4 sm:mb-6 leading-tight">
            {COURSES[activeIndex].name}
          </p>
          <p className="hidden sm:block text-sm sm:text-base opacity-70 leading-relaxed mb-10 font-light italic">
            "{COURSES[activeIndex].desc}"
          </p>
        </motion.div>

        <div className="flex space-x-6">
          <button 
            onClick={() => navigate('prev')}
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
          >
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 rotate-180 group-active:scale-95" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => navigate('next')}
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
          >
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-active:scale-95" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Bottom Right Discover Link */}
      <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-12 z-[60]">
        <button 
          onClick={onDiscoverMore} 
          className="flex items-center space-x-6 group text-white transition-all duration-300 cursor-pointer bg-transparent border-none outline-none text-right"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-1 font-sans font-bold">Registration Open</span>
            <span className="text-3xl sm:text-7xl uppercase tracking-tighter opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
              EMBARK NOW
            </span>
          </div>
          <div className="w-14 h-14 sm:w-24 sm:h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all backdrop-blur-md">
            <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
          </div>
        </button>
      </div>

      {/* Page Progress for 6 courses */}
      <div className="absolute top-0 right-0 h-full w-1 flex flex-col z-[100]">
        {COURSES.map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 transition-all duration-500 ${i === activeIndex ? 'bg-white opacity-40' : 'bg-transparent border-r border-white/10'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurCourses;
