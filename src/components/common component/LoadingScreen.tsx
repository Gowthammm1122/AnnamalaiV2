import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        {/* Content Box containing backdrop glows and matching typography layout */}
        <div className="relative flex flex-col items-center justify-center p-8">
          {/* Blue & Indigo smoky backdrop halos maintained for high-end aesthetic texture */}
          <div className="absolute top-[-20%] left-[-20%] w-72 h-72 rounded-full bg-blue-500/5 blur-[80px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-20%] right-[-20%] w-72 h-72 rounded-full bg-indigo-500/5 blur-[90px] animate-pulse pointer-events-none" style={{ animationDuration: '5s' }} />
          
          {/* Centered moving/glowing quote layout block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center relative z-10"
          >
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-3.5">
              DR P. ANNAMALAI IAS ACADEMY
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
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;