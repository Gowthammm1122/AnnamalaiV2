import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import whitelogoImg from "../../assets/images/whitelogo.png";

const Footer = () => {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleNavClick = (page: 'home' | 'about' | 'courses' | 'contact' | 'gallery' | 'resources', e: React.MouseEvent) => {
    e.preventDefault();
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section bg-white pt-12 pb-12 px-6 sm:px-12 xl:px-[120px] font-dmsans text-[#2d3148]">
      <div className="footer-wrapper max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-stretch">
        
        {/* Left Card */}
        <div className="footer-left relative min-h-[340px] rounded-[28px] p-8 overflow-hidden flex flex-col justify-between shadow-[0_12px_40px_rgba(21,76,189,0.25)] bg-[#1e4fc0]">
          <video className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" autoPlay muted loop playsInline preload="auto">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>
          
          <div className="footer-logo flex items-center gap-3 relative z-10">
            <img src={whitelogoImg} alt="Dr P. Annamalai IAS Academy Logo" className="h-12 w-auto object-contain drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[13px] font-black uppercase text-white tracking-[0.12em] leading-none">
                Dr P. Annamalai
              </span>
              <span className="text-[9px] font-bold uppercase text-white/80 tracking-[0.26em] mt-1 leading-none">
                IAS Academy
              </span>
            </div>
          </div>

          <div className="footer-tagline-container mt-auto mb-7 relative z-10">
            <p className="footer-tagline text-[19px] font-normal text-white leading-[1.45]">
              Shaping future leaders,<br />
              <span className="text-white/65">mentored by experts.</span>
            </p>
          </div>

          <div className="footer-social-row flex items-center justify-between gap-3 relative z-10">
            <span className="footer-social-label font-caveat text-[17px] font-semibold text-white/90 tracking-[0.3px]">Stay in touch!</span>
            <div className="footer-social-icons flex gap-[7px]">
              {[
                { Icon: Instagram, link: "https://www.instagram.com/drpannamalaiiasacademy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { Icon: Facebook, link: "https://www.facebook.com/1114147231770669?ref=PROFILE_EDIT_xav_ig_profile_page_web" },
                { Icon: Youtube, link: "https://www.youtube.com/@annamalaiiasacademy" }
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-black hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-[15px] h-[15px] text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="footer-right bg-[#f0f1f5] rounded-[28px] p-10 flex flex-col justify-between relative shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          
          {/* Floating Badge */}
          <div className="footer-lucky-graphic absolute -top-9 right-10 z-10 flex flex-col items-start gap-1.5">
            <div className="lucky-cube w-24 h-24 rounded-[22px] -rotate-[10deg] bg-gradient-to-br from-[#5b9ffb] via-[#1e5dd7] to-[#1448be] shadow-[inset_3px_3px_8px_rgba(255,255,255,0.35),inset_-3px_-3px_12px_rgba(0,0,0,0.18),8px_14px_28px_rgba(20,72,200,0.35)] flex items-center justify-center">
              <img src={whitelogoImg} alt="Dr P. Annamalai IAS Academy Logo" className="w-14 h-14 object-contain rotate-[10deg] drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]" />
            </div>
            <div className="lucky-text-row flex items-center gap-1.5 -rotate-1 mt-1">
              <svg className="w-5.5 h-5.5 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 20 C 6 14, 10 9, 18 5" />
                <path d="M18 5 L 12 5" />
                <path d="M18 5 L 18 11" />
              </svg>
              <span className="lucky-text font-caveat text-xl font-semibold text-[#9ca3af] whitespace-nowrap">Join the elite</span>
            </div>
          </div>

          <div className="footer-right-top flex flex-wrap gap-[72px] pt-2">
            <div className="footer-col min-w-[120px]">
              <h4 className="footer-col-title font-caveat text-2xl font-semibold italic text-[#9ca3af] mb-[18px]">Navigation</h4>
              <nav className="flex flex-col gap-3.5">
                <a href="#" onClick={(e) => handleNavClick('home', e)} className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors">Home</a>
                <a href="#" onClick={(e) => handleNavClick('about', e)} className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors">About Academy</a>
                <a href="#" onClick={(e) => handleNavClick('courses', e)} className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors">Our Courses</a>
                <a href="#" onClick={(e) => handleNavClick('gallery', e)} className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors">Event Gallery</a>
                <a href="#" onClick={(e) => handleNavClick('contact', e)} className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors">Contact</a>
              </nav>
            </div>
            <div className="footer-col min-w-[120px]">
              <h4 className="footer-col-title font-caveat text-2xl font-semibold italic text-[#9ca3af] mb-[18px]">Academics</h4>
              <nav className="flex flex-col gap-3.5">
                {[
                  { name: "UPSC CSE", target: "courses" as const },
                  { name: "TNPSC", target: "courses" as const },
                  { name: "Current Affairs", target: "gallery" as const },
                  { name: "Test Series", target: "gallery" as const },
                  { name: "Resources", target: "resources" as const }
                ].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    onClick={(e) => handleNavClick(link.target, e)}
                    className="font-dmsans text-sm font-semibold text-[#111827] hover:text-[#1f65d6] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="footer-bottom flex flex-col sm:flex-row items-end justify-between mt-12 gap-8 sm:gap-0">
            <p className="footer-copyright font-dmsans text-[12.5px] font-medium text-[#9ca3af] leading-relaxed">
              © 2025 Dr P. Annamalai IAS Academy. All rights reserved.<br />
              Designed and developed by{" "}
              <a
                href="https://www.instagram.com/behind_brief?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1f65d6] hover:underline"
              >
                BehindBrief
              </a>
            </p>
            
            <div className="footer-cta-mini flex flex-col gap-3.5 w-full sm:w-auto">
              <h4 className="text-[15px] font-normal text-[#6b7280] leading-[1.45]">
                Excellence in education.<br />
                <strong className="block text-[19px] font-bold text-[#111827]">Stay ahead with Annamalai.</strong>
              </h4>
              {subscribed ? (
                <div className="flex items-center justify-center w-full sm:w-[310px] py-[11px] px-3.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200/50 font-dmsans text-[13.5px] font-semibold tracking-wide">
                  Subscribed
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="footer-subscribe-row flex items-center w-full sm:w-[310px] bg-white border border-[#e5e7eb] rounded-xl p-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address" 
                    className="flex-1 px-3.5 py-[11px] bg-transparent border-none outline-none font-dmsans text-[13.5px] text-[#111827] placeholder-[#9ca3af]" 
                  />
                  <button type="submit" className="px-[22px] py-[11px] bg-[#111214] text-white font-dmsans text-[13.5px] font-semibold rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-2xl hover:-translate-y-px transition-all cursor-pointer">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-wrapper { grid-template-columns: 1fr; }
          .footer-left { min-height: auto; gap: 40px; }
        }
        @media (max-width: 560px) {
          .footer-right { padding: 24px; }
          .footer-right-top { gap: 40px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 24px; }
          .footer-subscribe-row { width: 100%; }
          .footer-lucky-graphic { right: 12px; top: -28px; }
          .lucky-cube { width: 72px; height: 72px; }
          .lucky-cube-mark { font-size: 32px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
