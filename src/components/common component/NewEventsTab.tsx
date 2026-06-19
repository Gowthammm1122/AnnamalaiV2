import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

const NewEventsTab = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex items-center gap-2 px-6 py-4 bg-[#1e4fc0] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest shadow-md cursor-pointer select-none border-none outline-none group floating-vertical-btn"
      aria-label="New Events"
    >
      <span>New Events</span>
      <Calendar className="w-3.5 h-3.5" />
    </button>
  );
};

export default NewEventsTab;
