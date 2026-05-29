import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, HelpCircle } from "lucide-react";
import Whatsapp from "../../assets/images/whatsapp.png";

const FloatingButtons = () => {
  const navigate = useNavigate();

  const handleEnquireClick = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    // Linked directly to the Dr. P. Annamalai IAS Academy admissions desk line [cite: 300]
    window.open("https://wa.me/918015390090", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2 pointer-events-auto select-none">
      
      {/* Enquire Now Button - Vertical Orientation (Matches Blue Button in Reference Image) */}
      <button
        onClick={handleEnquireClick}
        className="flex flex-row items-center justify-center gap-2 bg-[#007bff] hover:bg-blue-700 text-white font-sans font-medium text-sm py-4 px-5 rounded-l-md transition-all duration-300 transform hover:-translate-x-1 shadow-md border-none outline-none cursor-pointer group"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <span className="tracking-wide select-none rotate-180 whitespace-nowrap">
          Enquire now
        </span>
        <MessageSquare className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform shrink-0 -rotate-90" />
      </button>

      {/* WhatsApp / PYQ Quiz Button - Vertical Orientation (Matches Green Button in Reference Image) */}
      <button
        onClick={handleWhatsAppClick}
        className="flex flex-row items-center justify-center gap-2 bg-[#008000] hover:bg-green-800 text-white font-sans font-medium text-sm py-4 px-5 rounded-l-md transition-all duration-300 transform hover:-translate-x-1 shadow-md border-none outline-none cursor-pointer group"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <span className="tracking-wide select-none rotate-180 whitespace-nowrap">
          WhatsApp
        </span>
        
        {/* Container for your imported WhatsApp asset or alternative placeholder metric */}
        <div className="w-4 h-4 text-white/95 group-hover:scale-110 transition-transform shrink-0 flex items-center justify-center -rotate-90">
          <img src={Whatsapp} className="w-full h-full object-contain" alt="WhatsApp logo" />
        </div>
      </button>

    </div>
  );
};

export default FloatingButtons;