import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Award, GraduationCap, BookText, Globe, Microscope, Sparkles, ArrowRight } from "lucide-react";

const WhyChooseUs = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the precise transform based on container width vs viewport width
  // This value will be mapped to the actual translation in px or %
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  
  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Faculty",
      desc: "Learn from top-tier educators with years of experience in civil services coaching.",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Personalized Mentorship",
      desc: "One-on-one guidance to tailor study plans according to your strengths and weaknesses.",
    },
    {
      icon: <BookText className="w-6 h-6" />,
      title: "Comprehensive Material",
      desc: "Meticulously curated study resources covering all aspects of the UPSC syllabus.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Current Affairs Analysis",
      desc: "Daily updates and in-depth analysis of national and international importance.",
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Regular Mock Tests",
      desc: "Simulated examination environment to track progress and improve time management.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Interview Guidance",
      desc: "Mock interview sessions with former civil servants to polish your personality.",
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-primary-light/20 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-display text-dark mb-4">
              Why Choose <span className="italic text-primary font-medium">Dr. P. Annamalai IAS Academy?</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto opacity-30 mt-6"></div>
          </motion.div>
        </div>

        <div className="flex items-center">
          <motion.div 
            ref={scrollContainerRef}
            style={{ x }}
            className="flex gap-10 px-6 sm:px-12 xl:px-[120px] pr-[400px]"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[380px] p-10 bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-2xl group"
              >
                <div className="w-14 h-14 bg-primary-light flex items-center justify-center text-primary mb-8 rounded-2xl ring-1 ring-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-4 leading-tight">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm italic">
                  {f.desc}
                </p>
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center text-primary text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Read More <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Improved Indicator - Moved down and styled better to avoid overlap */}
        <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-[1px] bg-gray-200">
              <motion.div 
                style={{ scaleX: scrollYProgress }} 
                className="h-full bg-primary origin-left"
              />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Section Progress</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Scroll to Navigate
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
