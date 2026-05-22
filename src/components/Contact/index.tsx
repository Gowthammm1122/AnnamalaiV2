import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const ContactHero = () => {
  return (
    <div className="relative pt-36 pb-20 w-full overflow-hidden bg-[#FAFBFD] border-b border-gray-150/70 select-none">
      {/* Editorial backdrop circles matching professional academy vibe */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/3 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-slate-400/3 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[380px] h-[380px] rounded-full bg-[#1e40af]/3 blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-5"
        >
          <span className="text-[10px] font-bold text-blue-700 bg-white border border-gray-150/60 px-4 py-1.5 rounded-full uppercase tracking-[0.45em] shadow-sm inline-block">
            CONNECT WITH THE ADMISSIONS DESK
          </span>
          
          <h1 className="text-4xl md:text-5.5xl font-display font-medium text-dark tracking-tight leading-tight">
            Let's Shape Your <br/>
            Administrative <span className="italic font-normal font-serif text-[#1e40af]">Future Journey</span>
          </h1>
          
          <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Have questions about upcoming batches, optional subjects, or syllabus maps? Our counseling team and expert mentors are in the office to guide you.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: ""
      });
    }, 1200);
  };

  return (
    <section className="py-20 bg-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        {/* Upper Grid: Contact Info & Map (clean and aligned) */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch mb-16">
          {/* Left Column: Direct info nodes & Hours */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#1E40AF] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full inline-block">
                Academy Headquarters
              </span>
              <h2 className="text-2xl font-display font-medium text-dark tracking-tight">
                Our Administrative Desk
              </h2>
              <p className="text-gray-500 font-light text-sm max-w-md leading-relaxed">
                Connect with our academic counsels directly or drop by our Anna Nagar officers corridor. We are here to align your career goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Helpline</h4>
                  <p className="text-sm font-semibold text-dark">+91 94440 22000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100/50">
                  <Mail className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email Courier</h4>
                  <p className="text-sm font-semibold text-dark">admissions@annamalaiias.in</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">HQ Address</h4>
                  <p className="text-sm font-semibold text-dark leading-snug">
                    Y-222, 2nd Avenue, Anna Nagar East, Chennai - 600040
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Hours listing */}
            <div className="pt-6 border-t border-gray-150 text-[11px] text-gray-500 space-y-1">
              <span className="font-semibold text-dark block uppercase tracking-wider mb-1">Office Hours</span>
              <div className="flex justify-between">
                <span>Weekdays (Mon - Sat)</span>
                <span className="font-medium text-dark">08:30 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sundays</span>
                <span className="font-medium text-dark">10:00 AM - 02:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Map */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="relative w-full h-[280px] md:h-full min-h-[250px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Academy Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2996503920955!2d80.2081541!3d13.0801861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263fe57e93fff%3A0xe104b2b64d2bd98a!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716281000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-[11px] text-gray-400 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
              <span className="font-semibold text-dark block mb-0.5">🚇 Nearest Transit</span>
              Anna Nagar East Metro Station (Exit Gate A). 300 meters walking distance next to Indian Overseas Bank block.
            </div>
          </div>
        </div>

        {/* Lower Section: Minimalist Form */}
        <div className="border-t border-gray-150 pt-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-xl font-display font-medium text-dark">Send a Direct Message</h3>
            <p className="text-gray-400 font-light text-xs mt-1">Our academic coordinators reply within a business morning.</p>
          </div>

          {submitSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6 space-y-4 bg-emerald-50/40 rounded-3xl border border-emerald-100 p-8"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-md font-display font-semibold text-dark">Message Dispatched Successfully</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to Dr. P. Annamalai IAS Academy. An administrative guide will reach you at your email or phone line shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-dark text-white rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors cursor-pointer inline-block"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Anandha Selvan"
                    className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-xs text-dark focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g., +91 94440 XXXXX"
                    className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-xs text-dark focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., candidate@academy.com"
                  className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-xs text-dark focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Message / Inquiry</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What would you like to ask or discuss?"
                  className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-xs text-dark focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group border border-blue-400/20"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactContent />
    </>
  );
};

export default Contact;
