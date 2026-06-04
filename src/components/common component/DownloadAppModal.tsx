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

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[340px] overflow-visible z-10 pointer-events-auto flex flex-col items-center select-none"
          >
            {/* Close Button */}
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
            <div className="absolute bottom-[3.5%] left-0 right-0 h-[42%] flex flex-col items-center justify-between px-5 text-center z-10">
              <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="text-[19px] font-display font-normal text-gray-800 leading-tight mb-0.5">
                  Start Your <span className="italic text-[#1e4fc0] font-serif">Learning Journey</span>
                </h3>
                <p className="text-[10px] font-sans text-gray-500 font-light leading-relaxed max-w-[240px]">
                  Download our official academy app from Play Store or App Store to unlock premium learning materials.
                </p>
              </div>

              {/* Separator Line */}
              <div className="w-[90%] h-[1px] bg-gray-100 my-1.5" />

              {/* Dual Download Buttons Grid */}
              <div className="w-[90%] grid grid-cols-2 gap-2 mb-1.5">
                {/* Android Button */}
                <button
                  onClick={handleDownloadAndroid}
                  className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl border border-gray-800 active:scale-[0.97] transition-all cursor-pointer text-left w-full shadow-sm border-none outline-none"
                >
                  <img src={PlayStoreLogo} alt="Play Store" className="w-4.5 h-4.5 object-contain" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[6px] tracking-wider uppercase text-gray-400 font-medium">Get it on</span>
                    <span className="text-[9px] font-bold text-white font-sans">Google Play</span>
                  </div>
                </button>

                {/* iOS Button */}
                <button
                  onClick={handleDownloadIOS}
                  className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-black hover:bg-gray-900 text-white rounded-xl border border-gray-800 active:scale-[0.97] transition-all cursor-pointer text-left w-full shadow-sm border-none outline-none"
                >
                  <img src={AppStoreLogo} alt="App Store" className="w-4.5 h-4.5 object-contain" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[6px] tracking-wider uppercase text-gray-400 font-medium">Download on</span>
                    <span className="text-[9px] font-bold text-white font-sans">App Store</span>
                  </div>
                </button>
              </div>

              {/* iOS Org Code Note */}
              <p className="text-[10px] font-sans text-gray-400 font-medium tracking-wide mb-1 leading-normal">
                * iOS users: Use organization code <span className="font-bold text-[#1e4fc0] uppercase select-all bg-blue-50 px-1 rounded">quzwnf</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadAppModal;