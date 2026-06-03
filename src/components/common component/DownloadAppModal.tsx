import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import RocketImg from "../../assets/images/Rocket.png";
import PlayStoreLogo from "../../assets/images/playstore.png";

const DownloadAppModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [timerFired, setTimerFired] = useState(false);

  useEffect(() => {
    // Preload the main rocket card image to prevent text-first loading lag
    const img = new Image();
    img.src = RocketImg;
    img.onload = () => {
      setIsImageLoaded(true);
    };

    // Preload the playstore icon
    const playStoreImg = new Image();
    playStoreImg.src = PlayStoreLogo;

    // Check if the user has already seen or closed it during this session
    const hasSeenAppModal = sessionStorage.getItem("annamalai_download_app_seen");

    if (!hasSeenAppModal) {
      const timer = setTimeout(() => {
        setTimerFired(true);
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  // Synchronize: Only open the modal when the timer has fired AND the image is fully loaded/cached
  useEffect(() => {
    if (timerFired && isImageLoaded) {
      setIsOpen(true);
    }
  }, [timerFired, isImageLoaded]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("annamalai_download_app_seen", "true");
  };

  const handleDownload = () => {
    window.open("https://play.google.com/store/apps/details?id=my.classroom.app&hl=en_IN", "_blank", "noopener,noreferrer");
    setIsOpen(false);
    sessionStorage.setItem("annamalai_download_app_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[340px] overflow-visible z-10 pointer-events-auto flex flex-col items-center select-none"
          >
            {/* Close Button placed at the dark top section, below/left of rocket tip */}
            <button
              onClick={handleClose}
              className="absolute top-[17%] right-[8%] p-1.5 text-white/70 hover:text-white bg-black/35 hover:bg-black/50 rounded-full transition-colors cursor-pointer z-20 border-none outline-none"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Custom Rocket.png Card Image */}
            <img
              src={RocketImg}
              alt="Download Academy App"
              className="w-full h-auto object-contain block drop-shadow-2xl"
            />

            {/* Content overlay matching the white area of the card */}
            <div className="absolute bottom-[5%] left-0 right-0 h-[38%] flex flex-col items-center justify-between px-6 text-center z-10">
              <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="text-[19px] font-display font-normal text-gray-800 leading-tight mb-1.5">
                  Start Your <span className="italic text-[#1e4fc0] font-serif">Learning Journey</span>
                </h3>
                <p className="text-[10px] font-sans text-gray-500 font-light leading-relaxed max-w-[230px]">
                  Download the official academy app from Play Store to unlock premium learning resources and daily prep materials.
                </p>
              </div>

              {/* Separator Line */}
              <div className="w-[85%] h-[1px] bg-gray-100 my-1" />

              {/* Theme Blue CTA Download Button with Play Store Symbol */}
              <button
                onClick={handleDownload}
                className="w-[85%] py-2.5 bg-[#1e4fc0] hover:bg-[#1a44a5] text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md active:scale-[0.97] transition-all cursor-pointer border-none outline-none flex items-center justify-center gap-2"
              >
                <img src={PlayStoreLogo} alt="Play Store logo" className="w-3.5 h-3.5 object-contain" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadAppModal;

