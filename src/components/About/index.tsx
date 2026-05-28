import React from "react";
import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
import CtaSection from "./CtaSection";
import MissionVision from "./Missionvison";
import Founders from "./Founders";

const About: React.FC = () => {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <MissionVision />
      <Founders />
      <CtaSection />
    </>
  );
};

export default About;
