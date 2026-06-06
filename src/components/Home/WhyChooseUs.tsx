import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Award, GraduationCap, BookText, ShieldAlert, Layers, Sparkles, CheckSquare } from "lucide-react";

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [xRange, setXRange] = useState([0, 0]);

  useEffect(() => {
    if (isMobile) return;

    const updateXRange = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const maxScroll = Math.max(0, scrollWidth - windowWidth);
        setXRange([0, -maxScroll]);
      }
    };

    updateXRange();
    const timer = setTimeout(updateXRange, 100);

    window.addEventListener("resize", updateXRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateXRange);
    };
  }, [isMobile]);

  // Calculate the precise transform based on container width vs viewport width
  const xRaw = useTransform(scrollYProgress, (value) => value * xRange[1]);
  
  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Subjectwise Experienced Faculties",
      desc: "Aspirants are trained by a highly skilled team of educators with vast experience in coaching for various competitive streams.",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Personal Care and Attention",
      desc: "We maintain a dedicated tracking framework to ensure that every individual gets focused direction to achieve absolute success.",
    },
    {
      icon: <BookText className="w-6 h-6" />,
      title: "Excellently Prepared Materials",
      desc: "Get access to specialized notes and comprehensively printed books curated strictly as per the latest examination syllabi",
    },
    {
      icon: <CheckSquare className="w-6 h-6" />,
      title: "Daily & Weekly Tests",
      desc: "Build continuous consistency and evaluate active subject memory recall with our automated daily and weekly test matrices.",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Monthly & Mock Tests",
      desc: "Acclimatise to strict real-world examination time bounds through integrated monthly assessment structures and full-length mock tests.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: "Affordable Fee Structure",
      desc: "Attain high end, premium administrative career guidance that is completely pocket friendly.",
    },
  ];

  if (isMobile) {
    return (
      <section className="bg-dark py-16 px-4 border-y border-white/5 relative overflow-hidden">
        {/* Mobile Accent Orb */}
        <div className="absolute top-[-20%] left-[-20%] w-72 h-72 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary-light uppercase tracking-[0.25em] text-[9px] font-bold mb-3 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
              THE ASPIRANTS CHOICE
            </div>
            <h2 className="text-2xl sm:text-3xl font-display text-white leading-tight">
              Why Choose <br />
              <span className="font-serif italic text-primary-light font-medium">Dr P. Annamalai IAS Academy?</span>
            </h2>
            <div className="w-16 h-[1px] bg-primary-light/40 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/10 shadow-sm rounded-2xl flex flex-col justify-between group active:bg-white/10"
              >
                <div>
                  <div className="w-10 h-10 bg-white/10 border border-white/10 flex items-center justify-center text-primary-light mb-4 rounded-xl ring-1 ring-white/10 group-active:bg-primary group-active:text-white transition-colors duration-300">
                    {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">{f.title}</h3>
                  <p className="text-[10px] text-white/50 font-light italic leading-relaxed">
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
    <section ref={targetRef} className="relative h-[300vh] bg-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-dark border-y border-white/5">
        {/* Dynamic Glow Elements */}
        <div className="absolute top-0 right-0 w-[850px] h-[850px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-primary-light uppercase tracking-[0.25em] text-[10px] font-bold mb-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              THE ASPIRANTS CHOICE
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-white tracking-tight leading-tight mt-2 pb-8">
              Why Choose <span className="font-serif italic font-medium text-primary-light">Dr P. Annamalai IAS Academy?</span>
            </h2>
          </motion.div>
        </div>

        <div className="flex items-center relative z-10">
          <motion.div 
            ref={scrollContainerRef}
            style={{ x }}
            className="flex gap-10 px-6 sm:px-12 xl:px-[120px] pr-[200px]"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[380px] p-10 bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-2xl hover:border-white/20 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 rounded-3xl group"
              >
                <div className="w-14 h-14 bg-white/10 border border-white/10 flex items-center justify-center text-primary-light mb-8 rounded-2xl ring-1 ring-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{f.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm italic font-light">
                  {f.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Section Navigation Metrics Indicator */}
        <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-[1px] bg-white/10">
              <motion.div 
                style={{ scaleX: scrollYProgress }} 
                className="h-full bg-primary-light origin-left"
              />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Section Progress</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
            Scroll to Navigate
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;