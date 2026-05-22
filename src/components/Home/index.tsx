import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import OurCourses from "./OurCourses";
import FacultySection from "./FacultySection";
import FinalCTA from "./FinalCTA";
import FAQSection from "./FAQSection";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Hero 
        onViewCourses={() => handleNavigation("/courses")} 
        onEnrollNow={() => handleNavigation("/contact")} 
      />
      <WhyChooseUs />
      <OurCourses 
        onDiscoverMore={() => handleNavigation("/courses")} 
      />
      <FacultySection />
      <FinalCTA 
        onApply={() => handleNavigation("/contact")} 
        onRegisterDemo={() => handleNavigation("/contact")} 
      />
      <FAQSection />
    </>
  );
};

export default Home;
