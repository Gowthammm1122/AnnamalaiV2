import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle } from "lucide-react";

const EnquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "upsc",
  });

  useEffect(() => {
    // Check if the user has already seen or dismissed the enquiry pop-up in this session
    const hasSeenPopup = sessionStorage.getItem("annamalai_enquiry_pop_seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("annamalai_enquiry_pop_seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    sessionStorage.setItem("annamalai_enquiry_pop_seen", "true");
    
    // Simulate API call and success message auto-dismissal
    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
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
            className="relative w-full max-w-[460px] bg-white rounded-[28px] overflow-hidden shadow-2xl border border-gray-150/40 z-10 pointer-events-auto p-8 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6">
                {/* Header Text */}
                <div className="space-y-2 pr-6">
                  <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase block">
                    Direct Admissions Enquiry
                  </span>
                  <h3 className="text-2xl font-display font-medium text-dark tracking-tight">
                    Start Your Civil Service Journey Today
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Leave your details below and our veteran administrative counseling desk will contact you with batch strategies and structural scholarship details.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-gray-200 py-1.5 text-xs text-dark placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-Digit Mobile Number"
                      className="w-full bg-transparent border-b border-gray-200 py-1.5 text-xs text-dark placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Selected Course Dropdown */}
                  <div className="relative">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Target Examination / Course
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-200 py-2 text-xs text-dark/80 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="upsc">UPSC Civil Services Examination</option>
                      <option value="tnpsc">TNPSC Combined Services (Group 1, 2, 4)</option>
                      <option value="banking">Banking & Insurance Services</option>
                      <option value="ssc">Staff Selection (SSC) / Railways (RRB)</option>
                      <option value="tnusrb">TNUSRB Police Inspector & SI</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer group"
                    >
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Success Feedback Screen
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-medium text-dark tracking-tight">
                  Enquiry Submitted!
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been sent. An admissions officer will contact you on <strong>{formData.phone}</strong> shortly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
