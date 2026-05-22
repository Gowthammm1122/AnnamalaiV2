import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initiate curtain opening after 4.2 seconds
    const startOpeningTimer = setTimeout(() => {
      setIsOpening(true);
    }, 4200);

    // Completely unmount and notify when animation finishes (5.7 seconds total)
    const endTimer = setTimeout(() => {
      setIsVisible(false);
      onFinished();
    }, 5700);

    return () => {
      clearTimeout(startOpeningTimer);
      clearTimeout(endTimer);
    };
  }, [onFinished]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden flex pointer-events-none">
      {/* Left Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpening ? "-100%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-[50.5%] h-full bg-white relative border-r border-gray-100/50 pointer-events-auto flex justify-end items-center"
      >
        {/* Decorative inner panel line */}
        <div className="absolute top-0 bottom-0 left-0 w-3 lg:w-4 bg-gradient-to-b from-blue-500/10 via-transparent to-indigo-500/10" />
      </motion.div>

      {/* Right Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpening ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-[50.5%] h-full bg-white relative border-l border-gray-100/50 pointer-events-auto flex justify-start items-center"
      >
        {/* Decorative inner panel line */}
        <div className="absolute top-0 bottom-0 right-0 w-3 lg:w-4 bg-gradient-to-b from-blue-500/10 via-transparent to-indigo-500/10" />
      </motion.div>

      {/* Centered Content Overlay (fades out as curtain opens) */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.95 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col justify-center items-center z-[100000] pointer-events-none select-none bg-transparent"
      >
        {/* The beautiful minimalist students illustration with blue/indigo gradients */}
        <div className="relative w-80 h-80 flex items-center justify-center opacity-65 mb-6">
          {/* Blue & Indigo smoky backdrop halos */}
          <div className="absolute top-[25%] left-10 w-44 h-44 rounded-full bg-blue-500/10 blur-[65px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[25%] right-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-[75px] animate-pulse" style={{ animationDuration: '5s' }} />
          
          {/* Pure-drawn vector SVG showing students on target path */}
          <svg className="w-60 h-60 relative z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The peak target / dome */}
            <path d="M125 105 C125 75, 155 75, 155 105 Z" fill="rgba(30, 64, 175, 0.04)" stroke="rgba(30, 64, 175, 0.2)" strokeWidth="1.2" />
            <line x1="140" y1="75" x2="140" y2="60" stroke="rgba(30, 64, 175, 0.25)" strokeWidth="1.2" />
            <circle cx="140" cy="58" r="1.5" fill="#1e40af" />
            
            {/* Glowing path lines */}
            <path d="M10 185 C40 160, 80 145, 140 105" stroke="rgba(110, 115, 130, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M10 188 C40 163, 85 142, 140 105" stroke="url(#loading-path-grad)" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Two detailed human line-art silhouette figures looking up */}
            <g transform="translate(30, 130)">
              {/* Person 1 */}
              <circle cx="20" cy="10" r="4.5" stroke="#1f2937" strokeWidth="1.5" fill="#ffffff" />
              <path d="M20 15 C17 22, 17 38, 20 44" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 20 C10 24, 11 32, 16 35 Z" fill="#1E40AF" opacity="0.1" stroke="#1f2937" strokeWidth="1" />
              <path d="M20 18 C25 20, 29 23, 33 26" stroke="#1f2937" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            
            <g transform="translate(56, 112)">
              {/* Person 2 */}
              <circle cx="15" cy="11" r="4.2" stroke="#1f2937" strokeWidth="1.5" fill="#ffffff" />
              <path d="M12 10 C10 15, 11 20, 12 24" stroke="#1f2937" strokeWidth="1" />
              <path d="M15 15.5 C13 21, 14 36, 15 42" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="15" y="20" width="7" height="10" rx="1" fill="#475569" opacity="0.1" stroke="#1f2937" strokeWidth="1" transform="rotate(-6, 15, 20)" />
            </g>
 
            {/* Radiant Sparkles of guidance */}
            <g transform="translate(130, 15)">
              <circle cx="20" cy="20" r="1.5" fill="#1e40af" />
              <path d="M20 14 L20 26 M14 20 L26 20" stroke="#1e40af" strokeWidth="1.2" opacity="0.5" />
            </g>
            <g transform="translate(165, 35)">
              <circle cx="5" cy="5" r="1" fill="#475569" />
              <path d="M5 1 L5 9 M1 5 L9 5" stroke="#475569" strokeWidth="0.8" opacity="0.4" />
            </g>
            
            <defs>
              <linearGradient id="loading-path-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#1E40AF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
 
        {/* Centered moving/glowing quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center"
        >
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-3.5">
            DR. P. ANNAMALAI IAS ACADEMY
          </span>
          <h2 className="text-2xl md:text-3.5xl font-display text-gray-800 tracking-wide font-normal italic">
            "Your journey begins here."
          </h2>
          
          {/* Progress bar indicator for visual rhythm */}
          <div className="w-48 h-[1.5px] bg-gray-150 rounded-full mx-auto mt-8 overflow-hidden relative">
            <motion.div 
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-blue-500 via-[#1E40AF] to-indigo-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
