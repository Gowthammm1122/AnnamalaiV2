import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

const OrientationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    // Show pop-up after a 15-second delay for a premium entrance feel
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as any);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current as any);
    }
    // Set a new timer to reappear after 15 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 30000);
  };

  const handleRegisterClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSf6oXl-ItT0T7j61t9FYImHS1rPYJkfdFN9uRAFsN7OqN4Xww/viewform?usp=dialog",
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-6 bottom-6 z-[999] w-80 bg-white border border-gray-150/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 flex flex-col gap-3 overflow-hidden select-none animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 transition-all cursor-pointer border-none outline-none"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Content */}
      <div className="flex gap-3 items-start pr-6 pt-1.5">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-dark tracking-wide uppercase">Free UPSC Orientation</h4>
          <p className="text-gray-500 font-light text-[11px] leading-relaxed">
            Register for our upcoming session to map your civil services preparation strategy.
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleRegisterClick}
        className="w-full py-2.5 bg-[#1e4fc0] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none group"
      >
        Register Now
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default OrientationPopup;
