import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  BookText,
  Award,
  Sparkles,
  Target,
  Shield,
  Compass,
  Lightbulb,
  Users,
  ChevronRight,
} from "lucide-react";
import bgImage from "../../assets/images/bgimage.jpg";

const AboutContent: React.FC = () => {
  const [activeStrategyTab, setActiveStrategyTab] = useState<"phase1" | "phase2" | "phase3">("phase1");

  const strategies = {
    phase1: {
      phase: "01",
      badge: "PRELIMINARY STAGE",
      title: "Conceptual Clarity & Objective Training",
      subtitle: "Focus: Foundation Notes, Printed Books & Daily Diagnostics",
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      desc: "Aspirants are trained thoroughly on core subject fundamentals. We emphasize building absolute conceptual clarity across the multi-subject syllabi, reinforced by systematic daily and weekly objective testing to measure active memory recall.",
      points: [
        "Comprehensive coaching utilizing custom-prepared notes and specialized printed books mapped directly to the official syllabi.",
        "Rigorous Daily Tests and Weekly Tests designed to evaluate subject-matter grasp and speed.",
        "Syllabus coverage tracking across history, polity, geography, economics, mental ability, and general sciences.",
      ],
      achievement: "Build a rock-solid foundation to comfortably clear objective preliminary cutoff benchmarks.",
    },
    phase2: {
      phase: "02",
      badge: "MAIN EXAMINATIONS",
      title: "Descriptive Mastery & Advanced Evaluation",
      subtitle: "Focus: Monthly Tests, Mock Exams & Detailed Feedback",
      icon: <BookText className="w-5 h-5 text-blue-600" />,
      desc: "For multi-stage examinations like UPSC and TNPSC Group 1, 2, & 2A, we transition candidates into high-level descriptive answer preparation. Evaluation is handled strictly to meet the precise structural demands of competitive mains boards.",
      points: [
        "Rigorous training under real exam parameters via structured Monthly Tests and full simulated Mock Tests.",
        "Detailed answer-sheet evaluation providing critical insights on consistency, presentation, and answer writing style.",
        "Specialized guidance tailored for both conventional descriptive papers and computer-based tests.",
      ],
      achievement: "Master descriptive presentation and time management to secure maximum final merit scores.",
    },
    phase3: {
      phase: "03",
      badge: "PERSONALITY TEST",
      title: "Interview Preparation & Viva-Voce Poise",
      subtitle: "Focus: Personal Care, Strategic Guidance & Confidence",
      icon: <Award className="w-5 h-5 text-amber-600" />,
      desc: "The final phase prepares candidates for the definitive viva-voce and interview panels. Spearheaded by experienced retired administrators, this training refines delivery, administrative orientation, and mental composition under pressure.",
      points: [
        "One-on-one personal care and attention to identify individual presentation strengths and communication gaps.",
        "Practical, strategic insights regarding real-world governance demands and public policy administration.",
        "Simulated mock interviews replicating authentic board behaviors to maximize final selection panel marks.",
      ],
      achievement: "Project top-tier administrative confidence to secure exceptional marks in the final interview.",
    },
  } as const;

  const currentStrategy = strategies[activeStrategyTab];

  return (
    <section id="about-content-section" className="relative py-24 bg-[#FCFCFD] select-none text-dark overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 space-y-28">
        <div>
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5">
              <span className="text-[9px] font-bold text-[#1E40AF] tracking-[0.2em] uppercase">
                LEARN • EXCEL • ACHIEVE • SERVE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-dark tracking-tight leading-tight pb-5">
              About Dr. P. Annamalai IAS Academy
            </h2>

            <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
              Dr. P. Annamalai IAS Academy has been promoted by two retired IAS officers with more than 30 years of distinguished service and deep experience in the field of administration within the Government of Tamil Nadu. We provide specialized, integrated coaching across major competitive streams under a single roof.
            </p>
          </div>

          {/* Infrastructure & Mission Core */}
          <div className="grid lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-12 xl:col-span-5 h-full p-8 sm:p-10 rounded-3xl border border-gray-150/70 shadow-[0_4px_24px_rgba(0,0,0,0.015)] flex flex-col justify-between space-y-8 group transition-all duration-300 hover:border-[#1E40AF]/25 relative overflow-hidden text-white min-h-[380px]">
              {/* Background Image with elegant brand overlay */}
              <div
                className="absolute inset-0 w-full h-full z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${bgImage})` }}
              />

              <div className="space-y-5 relative z-20">
                <h3 className="text-2xl font-display font-medium text-black tracking-tight">
                  Our Integrated Academy
                </h3>

                <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
                 Promoted by veteran IAS officers with 30+ years of service. Delivering custom study materials, comprehensive facilities, and intensive test frameworks for assured exam success.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-black relative z-20">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  30+ YEARS ADMINISTRATIVE SERVICE
                </span>
              </div>
            </div>

            {/* Key Value Pillars */}
            <div className="lg:col-span-12 xl:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Experienced Faculty</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  Aspirants are guided by an exceptional team of subject-wise faculties possessing vast experience in teaching for various state and central competitive streams.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Personal Care & Attention</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  We maintain a rigorous focus on individual development, tracking progress closely so that every student is equipped to overcome concept gaps.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Complete Test Matrix</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  Our comprehensive routine drives consistency through an organized sequence of Daily Tests, Weekly Tests, Monthly Tests, and mock environments.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Affordable Fees</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  We are deeply committed to offering premium administrative and government job exam guidance at highly accessible and affordable fee structures.
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Phases Section */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase block">
                  THE PREPARATION PATHWAY
                </span>
                <h3 className="text-2xl md:text-3.5xl font-display font-medium text-dark tracking-tight">
                  Coaching Strategy & Examination Stages
                </h3>
                <p className="text-gray-400 font-light text-xs max-w-xl">
                  Whether attempting single-stage exams or major multi-tier selections, our structured strategic phases ensure clear, step-by-step progress toward secure rankings.
                </p>
              </div>

              <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 self-start md:self-auto shrink-0 z-40 relative">
                {(["phase1", "phase2", "phase3"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveStrategyTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-305 ${activeStrategyTab === tab
                        ? "bg-white text-dark shadow-sm border border-gray-150"
                        : "text-gray-400 hover:text-dark"
                      }`}
                  >
                    {tab === "phase1" ? "Stage I" : tab === "phase2" ? "Stage II" : "Stage III"}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Stage Card */}
            <div className="bg-white rounded-3xl border border-gray-150/70 shadow-[0_6px_24px_rgba(0,0,0,0.015)] overflow-hidden grid lg:grid-cols-12 relative z-10">
              <div className="lg:col-span-5 p-8 md:p-12 bg-gray-50/70 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-150/70">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-serif italic text-4xl font-bold text-gray-300 leading-none">
                      {currentStrategy.phase}
                    </span>
                    <div className="h-4 w-[1px] bg-gray-300" />
                    <span className="text-[9px] font-bold text-[#1E40AF] bg-blue-50/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {currentStrategy.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-display font-medium text-dark leading-tight">
                      {currentStrategy.title}
                    </h4>
                    <p className="text-[10.5px] font-mono uppercase tracking-widest text-[#1E40AF] font-bold">
                      {currentStrategy.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-500 font-light text-xs leading-relaxed">
                    {currentStrategy.desc}
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-150 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                      TARGET STRATEGIC OUTCOME:
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-dark mt-1">
                    {currentStrategy.achievement}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-6">
                  <h5 className="text-xs font-bold text-dark uppercase tracking-widest">
                    SYSTEMATIC TRAINING & IMPLEMENTATION PROTOCOLS
                  </h5>

                  <div className="space-y-4">
                    {currentStrategy.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-250 cursor-default"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#1E40AF] mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                          {pt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-150/70 mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                      {currentStrategy.icon}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-gray-400 max-w-md">
                      Specialized coaching for UPSC, TNPSC, Banking, Insurance, RRB, SSC, and TNUSRB.
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#1E40AF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;