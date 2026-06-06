import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import RocketImg from "../../assets/images/Rocket.png";
import PlayStoreLogo from "../../assets/images/playstore.png";
import AppStoreLogo from "../../assets/images/app-store.png";

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

    // Preload icons
    const playStoreImg = new Image();
    playStoreImg.src = PlayStoreLogo;

    const appStoreImg = new Image();
    appStoreImg.src = AppStoreLogo;

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

  const handleDownloadAndroid = () => {
    window.open("https://play.google.com/store/apps/details?id=co.diy.syzxw", "_blank", "noopener,noreferrer");
    setIsOpen(false);
    sessionStorage.setItem("annamalai_download_app_seen", "true");
  };

  const handleDownloadIOS = () => {
    window.open("https://apps.apple.com/us/app/classplus/id1324522260", "_blank", "noopener,noreferrer");
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

          {/* Centering Wrapper to account for the transparent right margin of the image */}
          <div className="w-full max-w-[480px] transform translate-x-[4%] z-10 pointer-events-auto flex flex-col items-center">
            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full overflow-visible flex flex-col items-center select-none"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-[12%] right-[14%] md:top-[10%] md:right-[15%] p-1.5 text-white/70 hover:text-white bg-black/35 hover:bg-black/50 rounded-full transition-colors cursor-pointer z-20 border-none outline-none"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 md:w-5 md:h-5" />
              </button>

              {/* Custom Rocket.png Card Image */}
              <img
                src={RocketImg}
                alt="Download Academy App"
                className="w-full h-auto object-contain block drop-shadow-2xl"
              />

              {/* Content overlay matching the white area of the card */}
              <div className="absolute bottom-[4.5%] md:bottom-[4%] left-0 md:left-6 w-[80%] h-[48%] flex flex-col items-center justify-between px-5 md:px-4 text-center z-10">
                <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-display font-medium text-gray-800 leading-tight">
                    Start Your <span className="italic text-[#1e4fc0] font-serif font-semibold">Learning Journey</span>
                  </h3>
                  <p className="text-[10px] sm:text-[11px] md:text-[11.5px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px] sm:max-w-[260px] md:max-w-[270px]">
                    Download our official academy app from Play Store or App Store to unlock premium learning materials.
                  </p>
                </div>

                {/* Dual Download Buttons Grid */}
                <div className="w-[90%] grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-4">
                  {/* Android Button */}
                  <button
                    onClick={handleDownloadAndroid}
                    className="flex items-center justify-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 md:py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl active:scale-[0.97] transition-all cursor-pointer text-left w-full shadow-md border-none outline-none"
                  >
                    <img src={PlayStoreLogo} alt="Play Store" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] object-contain" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[6px] md:text-[7.5px] tracking-wider uppercase text-gray-400 font-medium">Get it on</span>
                      <span className="text-[9px] md:text-[11px] font-bold text-white font-sans">Google Play</span>
                    </div>
                  </button>

                  {/* iOS Button */}
                  <button
                    onClick={handleDownloadIOS}
                    className="flex items-center justify-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 md:py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl active:scale-[0.97] transition-all cursor-pointer text-left w-full shadow-md border-none outline-none"
                  >
                    <img src={AppStoreLogo} alt="App Store" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] object-contain" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[6px] md:text-[7.5px] tracking-wider uppercase text-gray-400 font-medium">Download on</span>
                      <span className="text-[9px] md:text-[11px] font-bold text-white font-sans">App Store</span>
                    </div>
                  </button>
                </div>

                {/* iOS Org Code Note */}
                <p className="text-[9.5px] sm:text-[10px] md:text-[11px] font-sans text-gray-400 font-medium tracking-wide mb-1 leading-normal">
                  * iOS users: Use organization code <span className="font-bold text-[#1e4fc0] uppercase select-all bg-blue-50 px-1 md:px-1.5 py-0.5 rounded">quzwnf</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadAppModal;