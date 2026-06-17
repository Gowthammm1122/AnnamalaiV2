import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Calendar, ChevronRight, X, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface GalleryEvent {
  id: string;
  title: string;
  category: "test-series" | "workshops" | "special-events";
  date: string;
  badge: string;
  description: string;
  mode: string;
  venueOrPlatform: string;
  timeLine: string;
  features: string[];
  registrationUrl?: string;
}

const GalleryHero = () => {
  return (
    <div className="relative pt-36 pb-16 w-full overflow-hidden bg-[#FAFBFD] border-b border-gray-150/70">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/3 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-slate-400/3 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="text-[10px] font-bold text-blue-700 bg-white border border-gray-150/60 px-4 py-1.5 rounded-full uppercase tracking-[0.45em] shadow-sm inline-block">
            ACADEMIC EVENT REGISTRY
          </span>
          
          <h1 className="text-4xl md:text-5xl font-display font-medium text-dark tracking-tight leading-tight">
            Event Gallery & <br/>
            Active <span className="italic font-normal font-serif text-[#1e40af]">Mock Program Hub</span>
          </h1>
          
          <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Participate in our curated academic events, specialized test series, scholarship admission tests (SCAT), and interactive civil servant panels.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const GalleryContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "test-series" | "workshops" | "special-events">("all");

  const SHOW_CARDS = true; // Set to true to restore the interactive search, category filters, and cards

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["test-series", "workshops", "special-events"].includes(tab)) {
      setSelectedCategory(tab as any);
    } else {
      setSelectedCategory("all");
    }
  }, [location.search]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  const galleryEvents: GalleryEvent[] = [
    {
      id: "upsc-scholarship-test",
      title: "UPSC Free Scholarship Test Registration",
      category: "special-events",
      date: "Limited Time Registration",
      badge: "UPSC Scholarship",
      description: "Register for the UPSC Free Scholarship Test. Exceptional performers can qualify for program scholarships and fee waivers at Dr P. Annamalai IAS Academy.",
      mode: "Online Only",
      venueOrPlatform: "Proctored Online Exam Portal",
      timeLine: "Registrations Open",
      features: [
        "Full or partial tuition fee waivers for top scorers",
        "Comprehensive syllabus mapping and logic questions",
        "Detailed performance dashboard analytics"
      ],
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdwlHArLLAk40LkMygslX0QnSk4Ylyoygp5_y2P0b6FgYiboA/viewform?usp=dialog"
    },
    {
      id: "upsc-orientation-program",
      title: "UPSC Free Orientation Program",
      category: "workshops",
      date: "Upcoming Session",
      badge: "UPSC Orientation",
      description: "Join our comprehensive orientation session to map out your civil services preparation strategy, booklists, and timeline milestones.",
      mode: "Offline & Online",
      venueOrPlatform: "Main Seminar Boardroom & Online Stream",
      timeLine: "Live Interactive Session",
      features: [
        "Detailed analysis of UPSC Civil Services syllabus maps",
        "Interactive Q&A with experienced academic counselors",
        "Strategic reference booklets and planning blueprints"
      ],
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf6oXl-ItT0T7j61t9FYImHS1rPYJkfdFN9uRAFsN7OqN4Xww/viewform?usp=dialog"
    },
    {
      id: "tnpsc-scholarship-test",
      title: "TNPSC Scholarship Test Registration",
      category: "special-events",
      date: "Limited Time Registration",
      badge: "TNPSC Scholarship",
      description: "Register for the TNPSC Free Scholarship Test. Qualify for tuition waivers and dedicated mentoring for Group I, II/IIA, and IV examinations.",
      mode: "Online Only",
      venueOrPlatform: "Academy Online Portal",
      timeLine: "Registrations Open",
      features: [
        "Tiered admissions fee waiver based on performance",
        "Focus diagnostic checklists for TNPSC exam syllabus",
        "One-on-one preparation planning with academic experts"
      ],
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfQn5ue9NRnMLR6E6awLbBfKkeSeecx0cPZ8aM23FW45SGiOw/viewform?usp=dialog"
    }
  ];

  const filteredEvents = galleryEvents.filter((evt) => {
    const matchesCategory = selectedCategory === "all" || evt.category === selectedCategory;
    const matchesKeyword = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           evt.badge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  const closeOverlay = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        
        {SHOW_CARDS ? (
          <>
            {/* Minimal Category Selector and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-gray-150">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {(["all", "test-series", "workshops", "special-events"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer border ${
                      selectedCategory === cat
                        ? "bg-[#1E40AF] text-white border-transparent shadow-sm"
                        : "bg-gray-50 text-gray-400 border-gray-150 hover:bg-gray-100 hover:text-dark"
                    }`}
                  >
                    {cat === "all" ? "All Programs" : cat === "test-series" ? "Test Series" : cat === "workshops" ? "Workshops & Talks" : "Scholarships"}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E40AF] text-dark placeholder-gray-400 bg-[#FAFBFD]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Dynamic Event Grid */}
            {filteredEvents.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-gray-400 font-light text-sm">No matching events found. Please try another search term.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                {filteredEvents.map((evt) => (
                  <motion.div
                    key={evt.id}
                    layoutId={`card-container-${evt.id}`}
                    onClick={() => setSelectedEvent(evt)}
                    className="group flex flex-col justify-between p-6 rounded-3xl border border-gray-150 bg-white hover:border-[#1E40AF]/40 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-[#1E40AF] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {evt.badge}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {evt.mode}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-md font-display font-medium text-dark leading-snug group-hover:text-[#1E40AF] transition-colors duration-200">
                          {evt.title}
                        </h3>
                        <p className="text-gray-400 font-light text-xs line-clamp-3 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-light flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500/80" />
                        {evt.date}
                      </span>
                      <span className="text-[10px] font-bold text-[#1E40AF] tracking-widest uppercase flex items-center gap-1">
                        Details
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md p-8 rounded-3xl border border-gray-150 bg-gradient-to-br from-white to-[#FAFBFD] shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-[#1e40af]" />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E40AF] mx-auto mb-6">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-display font-semibold text-dark mb-3">
                Event Gallery Coming Soon
              </h3>
              <p className="text-gray-400 font-light text-xs leading-relaxed mb-6">
                We are currently organizing our upcoming workshops, test series, and interactive civil servant panels. Stay tuned for registration updates!
              </p>
              <button
                type="button"
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto cursor-pointer group"
              >
                Get Notified
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}

        {/* Quick Help Callout */}
        <div className="mt-16 p-6 rounded-2xl border border-blue-100/60 bg-blue-50/20 text-center">
          <p className="text-xs text-blue-900 font-light">
            💡 <strong>Note about mock events:</strong> All mock exams are curated by the core evaluation cell of Dr P. Annamalai IAS Academy. If you encounter issues accessing the proctored test portal, please phone our direct helpline immediately.
          </p>
        </div>

      </div>

      {/* Event Details and Direct Registry Overlay (Modal) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-dark/40 backdrop-blur-sm transition-opacity"
            onClick={closeOverlay}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative w-full max-w-2xl transform overflow-hidden rounded-[28px] bg-white p-6 md:p-8 text-left shadow-xl transition-all border border-gray-150 z-10"
            >
              {/* Corner Design Block */}
              <div className="absolute top-0 right-0 left-0 h-[4px] bg-gradient-to-r from-blue-500 to-indigo-600" />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={closeOverlay}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-bold text-[#1E40AF] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
                    {selectedEvent.badge}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-dark leading-snug">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-gray-400 font-light text-xs mt-1 leading-relaxed">
                    Category: <span className="text-dark font-medium capitalize">{selectedEvent.category.replace("-", " ")}</span> &bull; Mode: <span className="text-dark font-medium">{selectedEvent.mode}</span>
                  </p>
                </div>

                <div className="border-t border-b border-gray-150 py-4 grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex gap-2.5 items-start">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Schedule Days</p>
                      <p className="text-dark font-semibold">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Timeline Hours</p>
                      <p className="text-dark font-semibold">{selectedEvent.timeLine}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start sm:col-span-2">
                    <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Physical Venue / Portal Room</p>
                      <p className="text-dark font-semibold">{selectedEvent.venueOrPlatform}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-dark uppercase tracking-wider">What you will benefit</h4>
                  <ul className="space-y-2 text-xs text-gray-500 font-light pl-0 list-none">
                    {selectedEvent.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2 items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enroll Now Section inside modal overlay */}
                <div className="pt-6 border-t border-gray-150 flex flex-col items-center gap-4">
                  <p className="text-xs text-gray-500 font-light text-center">
                    Ready to participate? Secure your seat by registering today.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedEvent.registrationUrl) {
                        window.open(selectedEvent.registrationUrl, "_blank", "noopener,noreferrer");
                      } else {
                        navigate("/contact");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="w-full py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    Register Now
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

const Gallery = () => {
  return (
    <>
      <GalleryHero />
      <GalleryContent />
    </>
  );
};

export default Gallery;
export type { GalleryEvent };
