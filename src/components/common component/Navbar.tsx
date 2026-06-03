import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"gallery" | "resources" | null>(null);

  const dropdownData = {
    gallery: [
      { name: "Test Series", tab: "test-series" },
      { name: "Workshops and Talks", tab: "workshops" },
      { name: "Scholarships", tab: "special-events" },
    ],
    resources: [
      { name: "PYQs and Mocks", tab: "pyqs" },
      { name: "Current Affairs", tab: "current-affairs" },
      { name: "Optional Subjects", tab: "optional-lit" },
    ],
  };

  // Monitors scroll position to add depth and shadow dynamically
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", key: "home", path: "/" },
    { name: "About", key: "about", path: "/about" },
    { name: "Courses", key: "courses", path: "/courses" },
    { name: "Event Gallery", key: "gallery", path: "/gallery" },
    { name: "Resources", key: "resources", path: "/resources" },
  ];

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path === "/about") return "about";
    if (path === "/courses") return "courses";
    if (path === "/gallery") return "gallery";
    if (path === "/resources") return "resources";
    if (path === "/contact") return "contact";
    return "home";
  };

  const activeKey = getActiveKey();

  const handleNavigation = (path: string) => {
    if (mobileMenuOpen) {
      // Step 1: Close the mobile drawer first
      setMobileMenuOpen(false);
      // Step 2: Delay route transitions slightly to let the glass drawer slide-out smoothly
      setTimeout(() => {
        navigate(path);
        window.scrollTo(0, 0); // Instantly jump to top for fresh page loads
      }, 250);
    } else {
      // Direct transition on desktop
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center justify-center select-none pointer-events-none px-4 sm:px-6">
      {/* 
        Centralized Glassmorphic Dock 
        Responsive behavior: Spans full width on mobile, locks into a beautifully balanced pill dock on desktop
      */}
      <div
        className={`w-full max-w-full md:max-w-fit flex items-center justify-between md:justify-center md:space-x-2 p-1.5 rounded-full border transition-all duration-500 ease-out pointer-events-auto ${mobileMenuOpen
          ? "bg-transparent border-transparent shadow-none" // Dissolve container bubbles when mobile drawer is open
          : scrolled
            ? "bg-white/80 backdrop-blur-md border-gray-200/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "bg-white/40 backdrop-blur-sm border-white/20 shadow-none"
          }`}
      >

        {/* Minimalist Logo Anchor */}
        <div
          onClick={() => handleNavigation("/")}
          className="flex items-center pl-3 pr-2 md:pr-4 cursor-pointer transition-transform duration-300 hover:scale-105 z-50"
        >
          <img
            src={Logo}
            alt="Academy Logo"
            className="w-12 h-12 md:w-12 md:h-12 object-contain"
          />
        </div>

        {/* Desktop Central Integrated Navigation Array */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = link.key === activeKey;
            const hasDropdown = link.key === "gallery" || link.key === "resources";
            
            if (hasDropdown) {
              return (
                <div
                  key={link.name}
                  onMouseEnter={() => setActiveDropdown(link.key as any)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative py-2"
                >
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-300 flex items-center space-x-1.5 ${
                      isActive
                        ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                        : "text-gray-500 hover:text-gray-900 hover:bg-white/40"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronUp className={`w-3 h-3 opacity-60 transition-transform duration-300 ${
                      activeDropdown === link.key ? "rotate-180" : "rotate-0"
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl py-2 z-50 overflow-hidden flex flex-col pointer-events-auto"
                      >
                        {dropdownData[link.key as "gallery" | "resources"].map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleNavigation(`${link.path}?tab=${item.tab}`)}
                            className="w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 transition-colors"
                          >
                            {item.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/40"
                }`}
              >
                {link.name}
              </button>
            );
          })}
          
          {/* Integrated Internal CTA Contact Link */}
          <button
            onClick={() => handleNavigation("/contact")}
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-300 flex items-center space-x-1 group ${
              activeKey === "contact"
                ? "bg-primary text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                : "bg-gray-900 text-white hover:bg-primary"
            }`}
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Student Portal Button */}
          <button
            onClick={() => {
              window.open("https://web.classplusapp.com/login?orgCode=quzwnf", "_blank", "noopener,noreferrer");
            }}
            className="px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-300 bg-white/60 hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200/60 flex items-center space-x-1 group shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <span>Student Portal</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-gray-700" />
          </button>

          {/* Download App Button */}
          <button
            onClick={() => {
              window.open("https://play.google.com/store/apps/details?id=my.classroom.app&hl=en_IN", "_blank", "noopener,noreferrer");
            }}
            className="px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-300 bg-primary-light hover:bg-primary text-primary hover:text-white border border-primary/20 flex items-center space-x-1.5 group shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <span>Download App</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary/60 group-hover:text-white" />
          </button>
        </div>

        {/* Modern Mobile Trigger - Icons enlarged to w-6 h-6 for pristine legibility */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-900 focus:outline-none z-50 rounded-full transition-colors hover:bg-white/60 mr-1 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 animate-fade-in" /> : <Menu className="w-6 h-6 animate-fade-in" />}
        </button>
      </div>

      {/* Clean Premium Mobile Fullscreen Blur Sheet (Explicitly captures pointers to resolve broken navigation bugs) */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 ease-in-out md:hidden pointer-events-auto ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Navigation Section */}
        <div className="flex flex-col pt-32 px-10 space-y-6">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gray-400 border-b border-gray-100 pb-2">
            Navigation Hub
          </p>
          {navLinks.map((link) => {
            const isActive = link.key === activeKey;
            const hasDropdown = link.key === "gallery" || link.key === "resources";
            return (
              <div key={link.name} className="flex flex-col space-y-2">
                <button
                  onClick={() => handleNavigation(link.path)}
                  className={`text-left text-4xl uppercase tracking-tight transition-all duration-300 outline-none ${
                    isActive ? "text-primary translate-x-3" : "text-gray-900 hover:text-primary"
                  }`}
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {link.name}
                </button>
                {hasDropdown && (
                  <div className="flex flex-col pl-4 py-1 space-y-3">
                    {dropdownData[link.key as "gallery" | "resources"].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(`${link.path}?tab=${item.tab}`)}
                        className="text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-primary transition-colors outline-none"
                      >
                        — {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Drawer Area */}
        <div className="p-8 bg-gray-50/80 border-t border-gray-100 backdrop-blur-md flex flex-col space-y-3">
          <button
            onClick={() => handleNavigation("/contact")}
            className="w-full py-3.5 bg-gray-900 hover:bg-primary text-white font-bold text-xs tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer outline-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span>Contact us</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              window.open("https://web.classplusapp.com/login?orgCode=quzwnf", "_blank", "noopener,noreferrer");
            }}
            className="w-full py-3.5 bg-white border border-gray-200/80 hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-widest uppercase rounded-full shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer outline-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span>Student Portal</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              window.open("https://play.google.com/store/apps/details?id=co.classplusapp", "_blank", "noopener,noreferrer");
            }}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs tracking-widest uppercase rounded-full shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer outline-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span>Download App</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;