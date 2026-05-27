import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "./components/common component/Navbar";
import Footer from "./components/common component/Footer";
import LoadingScreen from "./components/common component/LoadingScreen";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

function AppContent() {
  const [showLoading, setShowLoading] = useState(false);

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
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
