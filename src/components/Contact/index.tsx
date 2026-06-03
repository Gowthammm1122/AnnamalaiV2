import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Youtube, CheckCircle2 } from "lucide-react";
import BannerImg from "../../assets/images/ctabg.jpg"; // Use your existing hero ctabg asset
import FAQSection from "../Home/FAQSection";

// EmailJS Credentials Configuration (Loaded from your .env file)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactHero = () => {
  return (
    <div className="relative pt-36 pb-6 w-full bg-[#FAFBFD] px-4 sm:px-6 lg:px-8">
      {/* Curved Edge High-End Image Banner Wrapper */}
      <div className="max-w-[1340px] mx-auto h-[260px] md:h-[320px] rounded-[32px] overflow-hidden relative shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.01]"
          style={{ backgroundImage: `url(${BannerImg})` }}
        />
        {/* Subtle color grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10" />
        
        {/* Banner Core Typography */}
        <div className="absolute inset-y-0 left-8 md:left-16 z-20 flex items-center">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
            Contact us
          </h1>
        </div>
       {/* Home / Contacts Pill Badge */}
        <div className="absolute bottom-0 right-12 z-20 bg-white px-6 py-2.5 rounded-t-2xl border-t border-x border-gray-150/40 hidden sm:block">
          <div className="flex items-center gap-2 text-[11px] font-medium text-black tracking-wider uppercase">
            <span>DR P. Annamalai IAS Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if EmailJS is configured
    if (
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATE_ID &&
      EMAILJS_PUBLIC_KEY &&
      EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
      EMAILJS_TEMPLATE_ID !== "YOUR_CONTACT_TEMPLATE_ID" &&
      EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
    ) {
      try {
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              message: formData.message,
            },
          }),
        });
      } catch (error) {
        console.error("EmailJS: Network/API Error during contact form submission:", error);
      }
    } else {
      console.warn("EmailJS: Contact Page keys are not configured yet. Skipping API call.");
    }

    setIsSubmitting(false);
    setIsSent(true);
    setFormData({ name: "", phone: "", email: "", message: "" });

    // Reset success state back to normal after 4 seconds
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto">
        
        {/* Content Two-Column Split Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column Text Block & Parameters Block (7/12 Span) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="text-[11px] font-semibold text-[#1E40AF] tracking-widest uppercase block">
              Get in touch
              </span>
              <h2 className="text-4xl md:text-5.5xl font-display font-medium text-dark tracking-tight leading-[1.15] max-w-xl">
                We are always ready to help you and answer your questions
              </h2>
              <p className="text-gray-400 font-light text-sm leading-relaxed max-w-md">
                Connect directly with our veteran administrative counsels to map out your structural preparation timeline and batch details.
              </p>
            </div>

            {/* Structured Info Sub-Grid Layout */}
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 pt-4 border-t border-gray-150/60">
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-dark uppercase tracking-widest">Call Center</h4>
                <div className="text-sm font-light text-gray-500 space-y-1">
                  <p className="hover:text-[#1E40AF] transition-colors font-medium text-dark">80153 90090</p>
                  <p className="hover:text-[#1E40AF] transition-colors font-medium text-dark">63837 90090</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-dark uppercase tracking-widest">Our Location</h4>
                <p className="text-sm font-light text-gray-500 leading-relaxed">
                  Plot 12&13, Main road,<br />Anthony Nagar Main Road, <br />
                  Kolathur, Chennai - 600099
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-dark uppercase tracking-widest">Email</h4>
                <p className="text-sm font-medium text-dark hover:text-[#1E40AF] transition-colors">
                  admin@drpannamalaiiasacademy.com
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-dark uppercase tracking-widest">Social Network</h4>
                <div className="flex items-center gap-4 pt-1 text-gray-400">
                  <a href="https://www.instagram.com/drpannamalaiiasacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E40AF] transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href="https://www.facebook.com/1114147231770669?ref=PROFILE_EDIT_xav_ig_profile_page_web" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E40AF] transition-colors"><Facebook className="w-4 h-4" /></a>
                  <a href="https://www.youtube.com/@annamalaiiasacademy" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E40AF] transition-colors"><Youtube className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Custom Framed Input Box (5/12 Span) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="p-10 sm:p-12 bg-[#FAFBFD] rounded-[32px] border border-gray-150/40 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
              <div className="mb-10 space-y-2">
                <h3 className="text-2xl font-display font-medium text-dark tracking-tight">Get in Touch</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Define your competitive goals and select targeted state or central level portals.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-dark transition-colors"
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile number"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-dark transition-colors"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-dark transition-colors"
                  />
                </div>

                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-dark transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSent}
                    className={`inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-sm transition-all active:scale-[0.98] cursor-pointer group ${
                      isSent
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-dark hover:bg-[#1E40AF] text-white"
                    }`}
                  >
                    {isSent ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span>{isSubmitting ? "Sending message..." : "Send message"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Global Landscape Map Embed Alignment (Bottom Layer) */}
        <div className="mt-24 relative w-full h-[360px] md:h-[420px] rounded-[32px] overflow-hidden border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] bg-gray-50">
          <iframe
            title="Academy Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.84606316857264!2d80.20822711649167!3d13.128490628213727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265db431c9ad7%3A0xaf862b50db759c2b!2sDr%20P.Annamalai%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1779988236921!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactContent />
      <FAQSection />
    </div>
  );
};

export default Contact;