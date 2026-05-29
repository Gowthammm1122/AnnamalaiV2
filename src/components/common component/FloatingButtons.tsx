import React from "react";
import Whatsapp from "../../assets/images/whatsapp.png";

const FloatingButtons = () => {
  const handleWhatsAppClick = () => {
    // Linked directly to the Dr. P. Annamalai IAS Academy admissions desk line [cite: 300]
    window.open("https://wa.me/918015390090", "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed right-6 bottom-6 z-[999] flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none outline-none select-none"
      aria-label="Contact on WhatsApp"
    >
      <img src={Whatsapp} className="w-8 h-8 object-contain" alt="WhatsApp logo" />
    </button>
  );
};

export default FloatingButtons;