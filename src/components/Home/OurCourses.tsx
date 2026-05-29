import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

//new images
import Banking from '../../assets/Courses/banking.png';
import Civil from '../../assets/Courses/civilservice.png';
import Combined from '../../assets/Courses/combined.png';
import Insurance from '../../assets/Courses/Insurance.png';
import Railway from '../../assets/Courses/railway.png';
import Sub from '../../assets/Courses/Subinspector.png';
import SSC from '../../assets/Courses/optional.png';



interface OurCoursesProps {
  onDiscoverMore?: () => void;
}

const OurCourses = ({ onDiscoverMore }: OurCoursesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const COURSES = [
    {
      name: 'TNPSC Civil Services',
      src: Combined,
      bg: '#1e4fc0',
      desc: 'Comprehensive state commission path mapping out Group 1 (Deputy Collector, DSP), Group 2/2A, and Group 4 (VAO, Junior Assistant).'
    },
    {
      name: 'Banking Services',
      src: Banking,
      bg: '#1e4fc0',
      desc: 'Rigorous computer-based training for Probationary Officers (PO), Specialist Officers (SO), Clerks, and RBI Assistants / Grade A & B Officers.'
    },
    {
      name: 'Insurance Recruitment',
      src: Insurance,
      bg: '#1e4fc0',
      desc: 'Specialized curriculum for Assistant Administrative Officer (AAO) and Assistant Grade posts across top participating firms.'
    },
    {
      name: 'UPSC Civil Services',
      src: Civil,
      bg: '#1e4fc0',
      desc: 'Specialized premium training for all 27 categories of premier central posts (IAS, IPS, IFS, and Central Services Group A & B).'
    },
    {
      name: 'Railway Board (RRB)',
      src: Railway,
      bg: '#1e4fc0',
      desc: 'Targeted curriculum for Non-Technical Popular Posts, Junior Engineer, Senior Section Engineer, Assistant Loco Pilot, and Group-D.'
    },
    {
      name: 'Staff Selection (SSC)',
      src: SSC,
      bg: '#1e4fc0',
      desc: 'Premier training program for various key ministerial, department, and organizational posts within the Government of India.'
    },
    {
      name: 'TNUSRB Police SI',
      src: Sub,
      bg: '#1e4fc0',
      desc: 'Targeted physical and academic model tailored to address Tamil Nadu Uniformed Services Recruitment Board SI parameters.'
    },
  ];

  // Dynamic window sizing triggers responsive breakpoints
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Preload image assets
    COURSES.forEach(course => {
      const img = new Image();
      img.src = course.src;
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    const len = COURSES.length;
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % len);
    } else {
      setActiveIndex((prev) => (prev + len - 1) % len);
    }
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, COURSES.length]);

  // Drag and Swipe Tracking Engine with Vertical Scroll Isolation
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only track left-clicks for dragging
    if (e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || dragStartRef.current === null) return;
    
    const diffX = e.clientX - dragStartRef.current.x;
    const diffY = e.clientY - dragStartRef.current.y;

    // Isolate vertical drags: If vertical coordinate shift dominates, cancel drag to allow vertical ease
    if (Math.abs(diffY) > Math.abs(diffX) + 20) {
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
      return;
    }

    // Trigger shift if horizontal drag exceeds 80px
    if (diffX > 80) {
      navigate('prev');
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
    } else if (diffX < -80) {
      navigate('next');
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  const handleMouseUpOrLeave = () => {
    dragStartRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      isDraggingRef.current = true;
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || dragStartRef.current === null || e.touches.length === 0) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const diffX = currentX - dragStartRef.current.x;
    const diffY = currentY - dragStartRef.current.y;

    // Isolate vertical scroll: If vertical page scroll gesture dominates horizontal gesture,
    // we immediately cancel horizontal swipe tracking. This lets the browser perform native
    // vertical page scrolling at a fluid 120fps with zero re-renders or component lags!
    if (Math.abs(diffY) > Math.abs(diffX)) {
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
      return;
    }

    // Trigger shift if horizontal swipe exceeds 50px
    if (diffX > 50) {
      navigate('prev');
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
    } else if (diffX < -50) {
      navigate('next');
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const getRole = (index: number) => {
    const len = COURSES.length;
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + len - 1) % len) return 'left';
    if (index === (activeIndex + 1) % len) return 'right';
    if (index === (activeIndex + len - 2) % len) return 'back-left';
    if (index === (activeIndex + 2) % len) return 'back-right';
    return 'back';
  };

  // 3-Tier Card Layout Styling Breakpoints (Adapts perfectly on Mobile, Tablet, and Desktop)
  const getStyle = (role: string) => {
    const base: any = {
      position: 'absolute',
      aspectRatio: '0.8 / 1',
      transition: 'transform 550ms cubic-bezier(0.25, 1, 0.5, 1), opacity 550ms cubic-bezier(0.25, 1, 0.5, 1), left 550ms cubic-bezier(0.25, 1, 0.5, 1), bottom 550ms cubic-bezier(0.25, 1, 0.5, 1)', // Explicit properties instead of heavy 'all'
      willChange: 'transform, opacity, left',
      transform: 'translate3d(0, 0, 0)', // Force GPU layering (3D Acceleration)
    };

    if (isMobile) {
      switch (role) {
        case 'center':
          return {
            ...base,
            left: '50%',
            transform: 'translate3d(-50%, 0, 0) scale(1.35)', // a little bit bigger zoom in view
            filter: 'none', // Remove GPU-heavy blurs on mobile screens for seamless 120Hz frames
            opacity: 1,
            zIndex: 30,
            height: '50%',
            bottom: '22%', // Lowered from 32% to prevent overlap on mobile screens
          };
        case 'left':
          return {
            ...base,
            left: '8%',
            transform: 'translate3d(-50%, 0, 0) scale(0.75)',
            filter: 'none',
            opacity: 0.5,
            zIndex: 20,
            height: '18%',
            bottom: '34%', // Lowered from 44% to align with center image shifts
          };
        case 'right':
          return {
            ...base,
            left: '92%',
            transform: 'translate3d(-50%, 0, 0) scale(0.75)',
            filter: 'none',
            opacity: 0.5,
            zIndex: 20,
            height: '18%',
            bottom: '34%', // Lowered from 44% to align with center image shifts
          };
        case 'back-left':
          return {
            ...base,
            left: '-20%',
            transform: 'translate3d(-50%, 0, 0) scale(0.6)',
            filter: 'none',
            opacity: 0,
            zIndex: 10,
            height: '12%',
            bottom: '36%', // Lowered from 46%
          };
        case 'back-right':
          return {
            ...base,
            left: '120%',
            transform: 'translate3d(-50%, 0, 0) scale(0.6)',
            filter: 'none',
            opacity: 0,
            zIndex: 10,
            height: '12%',
            bottom: '36%', // Lowered from 46%
          };
        default: // back
          return {
            ...base,
            left: '50%',
            transform: 'translate3d(-50%, 0, 0) scale(0.5)',
            filter: 'none',
            opacity: 0,
            zIndex: 5,
            height: '10%',
            bottom: '36%', // Lowered from 46%
          };
      }
    }

    if (isTablet) {
      switch (role) {
        case 'center':
          return {
            ...base,
            left: '50%',
            transform: 'translate3d(-50%, 0, 0) scale(1.2)',
            filter: 'blur(0px)',
            opacity: 1,
            zIndex: 30,
            height: '48%',
            bottom: '30%', // Shifted upward for vertical tablet profiles
          };
        case 'left':
          return {
            ...base,
            left: '20%',
            transform: 'translate3d(-50%, 0, 0) scale(0.85)',
            filter: 'blur(1px)',
            opacity: 0.7,
            zIndex: 20,
            height: '18%',
            bottom: '42%',
          };
        case 'right':
          return {
            ...base,
            left: '80%',
            transform: 'translate3d(-50%, 0, 0) scale(0.85)',
            filter: 'blur(1px)',
            opacity: 0.7,
            zIndex: 20,
            height: '18%',
            bottom: '42%',
          };
        case 'back-left':
          return {
            ...base,
            left: '5%',
            transform: 'translate3d(-50%, 0, 0) scale(0.7)',
            filter: 'blur(2px)',
            opacity: 0.35,
            zIndex: 10,
            height: '14%',
            bottom: '45%',
          };
        case 'back-right':
          return {
            ...base,
            left: '95%',
            transform: 'translate3d(-50%, 0, 0) scale(0.7)',
            filter: 'blur(2px)',
            opacity: 0.35,
            zIndex: 10,
            height: '14%',
            bottom: '45%',
          };
        default: // back
          return {
            ...base,
            left: '50%',
            transform: 'translate3d(-50%, 0, 0) scale(0.55)',
            filter: 'blur(4px)',
            opacity: 0,
            zIndex: 5,
            height: '12%',
            bottom: '45%',
          };
      }
    }

    // Default Widescreen Desktop Styles
    switch (role) {
      case 'center':
        return {
          ...base,
          left: '50%',
          transform: 'translate3d(-50%, 0, 0) scale(1.25)',
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 30,
          height: '65%',
          bottom: '6%',
        };
      case 'left':
        return {
          ...base,
          left: '25%',
          transform: 'translate3d(-50%, 0, 0) scale(0.9)',
          filter: 'blur(1px)',
          opacity: 0.8,
          zIndex: 20,
          height: '22%',
          bottom: '14%',
        };
      case 'right':
        return {
          ...base,
          left: '75%',
          transform: 'translate3d(-50%, 0, 0) scale(0.9)',
          filter: 'blur(1px)',
          opacity: 0.8,
          zIndex: 20,
          height: '22%',
          bottom: '14%',
        };
      case 'back-left':
        return {
          ...base,
          left: '10%',
          transform: 'translate3d(-50%, 0, 0) scale(0.75)',
          filter: 'blur(3px)',
          opacity: 0.4,
          zIndex: 10,
          height: '16%',
          bottom: '18%',
        };
      case 'back-right':
        return {
          ...base,
          left: '90%',
          transform: 'translate3d(-50%, 0, 0) scale(0.75)',
          filter: 'blur(3px)',
          opacity: 0.4,
          zIndex: 10,
          height: '16%',
          bottom: '18%',
        };
      default: // back
        return {
          ...base,
          left: '50%',
          transform: 'translate3d(-50%, 0, 0) scale(0.55)',
          filter: 'blur(5px)',
          opacity: 0,
          zIndex: 5,
          height: '12%',
          bottom: '20%',
        };
    }
  };

  return (
    <section 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[580px] sm:h-screen overflow-hidden transition-colors duration-[650ms] ease-out select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ backgroundColor: COURSES[activeIndex].bg, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative Cinematic Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Decorative Large Background Ghost Typography */}
      <div className="absolute inset-x-0 top-[26%] sm:top-[15%] flex items-center justify-center pointer-events-none select-none z-[1]">
        <h2 
          className="font-display uppercase text-white opacity-5 whitespace-nowrap leading-none tracking-[-0.04em]"
          style={{ fontSize: 'clamp(80px, 32vw, 500px)', fontFamily: "'Anton', sans-serif" }}
        >
          COURSES
        </h2>
      </div>

      {/* Graphic Carousel Deck (Transparent to Mouse events to support section dragging) */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {COURSES.map((course, i) => (
          <div key={i} style={getStyle(getRole(i)) as any} className="pointer-events-none select-none flex items-end justify-center">
            <img
              src={course.src}
              alt={course.name}
              className="mx-auto block w-full h-full object-contain object-bottom select-none drop-shadow-2xl pointer-events-none"
              style={{ 
                maxWidth: isMobile ? '160px' : isTablet ? '260px' : '420px', 
                maxHeight: '100%',
                willChange: 'transform, opacity' // Hardware-accelerate the image texture layers directly
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Unified Bottom Interface Bar (Collision-free responsive container) */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-20 sm:left-24 sm:right-12 xl:left-[120px] z-[60] flex flex-col md:flex-row md:items-end justify-between gap-6 text-white pointer-events-none">
        
        {/* Left Hand: Course Typography & Nav Control Ring */}
        <div className="max-w-[450px] pointer-events-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-1 bg-white/30 mb-4 md:mb-6"></div>
            <p className="text-lg md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight mb-2 md:mb-4 leading-tight">
              {COURSES[activeIndex].name}
            </p>
            <p className="hidden md:block text-sm sm:text-base opacity-70 leading-relaxed mb-6 md:mb-8 font-light italic">
              "{COURSES[activeIndex].desc}"
            </p>
          </motion.div>

          <div className="flex space-x-3 md:space-x-6 mt-3">
            <button 
              onClick={() => navigate('prev')}
              className="w-10 h-10 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 md:w-8 md:h-8 rotate-180 group-active:scale-95" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => navigate('next')}
              className="w-10 h-10 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 md:w-8 md:h-8 group-active:scale-95" strokeWidth={1.5} />
            </button>
          </div>
        </div>

      </div>

      {/* Right Hand: Action Call-to-Action Link (Absolutely positioned to Section to allow floating to top-right on mobile) */}
      <div className="pointer-events-auto flex justify-end absolute top-[96px] right-6 md:top-auto md:bottom-20 md:right-12 z-[60]">
        <button 
          onClick={onDiscoverMore} 
          className="flex items-center space-x-4 md:space-x-6 group text-white transition-all duration-300 cursor-pointer bg-transparent border-none outline-none text-right"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          <div className="flex flex-col items-end">
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-50 mb-1 font-sans font-bold">Registration Open</span>
            <span className="text-xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tighter opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
              APPLY NOW
            </span>
          </div>
          <div className="w-10 h-10 md:w-24 md:h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all backdrop-blur-md">
            <ArrowRight className="w-5 h-5 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
          </div>
        </button>
      </div>

      {/* Side Slide Progress Indicator Bar */}
      <div className="absolute top-0 right-0 h-full w-1 flex flex-col z-[100] pointer-events-none">
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
