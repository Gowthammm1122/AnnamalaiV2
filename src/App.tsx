import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "./components/common component/Navbar";
import FloatingButtons from "./components/common component/FloatingButtons";
import EnquiryModal from "./components/common component/EnquiryModal";
import DownloadAppModal from "./components/common component/DownloadAppModal";
import Footer from "./components/common component/Footer";
import LoadingScreen from "./components/common component/LoadingScreen";
const Home = React.lazy(() => import("./components/Home"));
const About = React.lazy(() => import("./components/About"));
const Courses = React.lazy(() => import("./components/Courses"));
const Gallery = React.lazy(() => import("./components/Gallery"));
const Contact = React.lazy(() => import("./components/Contact"));
const Resources = React.lazy(() => import("./components/Resources"));

const RouteLoader = () => (
  <div className="w-full min-h-[60vh] flex items-center justify-center bg-transparent">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-[#1e4fc0]/20 border-t-[#1e4fc0] animate-spin" />
      <span className="text-xs font-semibold text-[#1e4fc0] tracking-wider uppercase opacity-80 animate-pulse">Loading...</span>
    </div>
  </div>
);

function AppContent() {
  const [showLoading, setShowLoading] = useState(false);
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("annamalai_academy_visited");
    if (!hasVisited) {
      setShowLoading(true);
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-light selection:text-primary animate-fade-in">
      {/* Loading Screen Overlay */}
      {showLoading && (
        <LoadingScreen onFinished={() => {
          sessionStorage.setItem("annamalai_academy_visited", "true");
          setShowLoading(false);
        }} />
      )}

      <Navbar />
      <FloatingButtons />
      <EnquiryModal />
      <DownloadAppModal />
      
      <React.Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
