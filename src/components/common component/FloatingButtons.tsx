import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import Whatsapp from "../../assets/images/whatsapp.png";

const FloatingButtons = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    // Linked directly to the Dr P. Annamalai IAS Academy admissions desk line
    window.open("https://wa.me/918015390090", "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 bottom-6 z-[999] flex flex-col space-y-4 items-center">
      {/* Phone/Call Button */}
      <button
        onClick={handlePhoneClick}
        className="flex items-center justify-center w-14 h-14 bg-[#1e40af] hover:bg-[#1e3a8a] text-white rounded-full shadow-[0_4px_14px_rgba(30,64,175,0.4)] hover:shadow-[0_6px_20px_rgba(30,64,175,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none outline-none select-none"
        aria-label="Call/Contact Us"
      >
        <Phone className="w-6 h-6" />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none outline-none select-none"
        aria-label="Contact on WhatsApp"
      >
        <img src={Whatsapp} className="w-8 h-8 object-contain" alt="WhatsApp logo" />
      </button>
    </div>
  );
};

export default FloatingButtons;