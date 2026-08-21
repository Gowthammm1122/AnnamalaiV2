import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Pause, Volume2, VolumeX, Video } from "lucide-react";

interface HeroProps {
  onViewCourses?: () => void;
  onEnrollNow?: () => void;
}

const Hero = ({ onViewCourses, onEnrollNow }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.error("Video play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
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

          {/* Featured Card Column - Option B: Premium Video Card */}
          <div className="w-full lg:w-1/3 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-auto min-h-[360px] aspect-auto lg:aspect-[4/5] bg-black border border-gray-150/10 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-500 rounded-[32px] p-8 md:p-10"
            >
              {/* HTML5 video element */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://res.cloudinary.com/crua0mce/video/upload/f_auto,q_auto/v1787316670/Showreel.mp4"
                loop
                muted={isMuted}
                autoPlay
                playsInline
              />

              {/* Gradient Overlay for high readability of text/controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 z-10 pointer-events-none" />

              {/* Top Row: Decorative badge & video icon */}
              <div className="relative z-20 flex justify-between items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">Academy Tour</span>
                </div>
                
              </div>

              {/* Middle Section: Subtle visual play hint on hover */}
              <div className="relative z-20 my-auto py-4 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </div>
              </div>

              {/* Footer Row: Academy name & controls */}
              <div className="relative z-20 flex items-center justify-between">
                
                <div className="flex items-center gap-2">
                  {/* Play / Pause Toggle */}
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>

                  {/* Mute / Unmute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
                    aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
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
