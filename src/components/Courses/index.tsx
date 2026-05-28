import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";

interface CourseItem {
  id: string;
  name: string;
  category: "all" | "civil-services" | "banking-insurance" | "technical-ssc";
  duration: string;
  level: string;
  capacity: string;
  description: string;
  introPoints: string[];
  features: string[];
  syllabus: string[];
  color: string;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "upsc-civil-services",
    name: "UPSC Civil Services Examination Coaching",
    category: "civil-services",
    duration: "Integrated Regular / Weekend",
    level: "Degree Level",
    capacity: "Personal Care Focused Batches",
    color: "#1E40AF",
    description: "Specialized premium training for all 27 categories of premier central posts (IAS, IPS, IFS, and Central Services Group A & B). The curriculum emphasizes framing public policies, mental composition, and conceptual clarity required to crack the premier evaluation board.",
    introPoints: [
      "Coaching for IAS, IPS, IFS & Group A/B posts",
      "Conceptual clarity & disciplined approach",
      "Comprehensive Preliminary & Main integration"
    ],
    features: [
      "Daily, Weekly, and Monthly diagnostic tests",
      "Answer writing practice and evaluation under active panel codes",
      "Detailed mock interviews guided by Dr. P. Annamalai, IAS & Mr. C. Kamaraj, IAS"
    ],
    syllabus: [
      "Stage 1: Preliminary Exam (General Studies & Qualifying CSAT)",
      "Stage 2: Main Examination (2 Eligibility Papers + 7 Descriptive Merit Papers)",
      "Stage 3: Personality Test / Interview Panel (275 Marks Marks Management)"
    ]
  },
  {
    id: "tnpsc-group-1-2-4",
    name: "TNPSC Combined Civil Services (Group 1, 2, 2A & 4)",
    category: "civil-services",
    duration: "Syllabus Milestone Based",
    level: "10th Standard to Degree Level",
    capacity: "Bilingual Integrated Batches",
    color: "#065F46",
    description: "Comprehensive state commission path mapping out Group 1 (Deputy Collector, DSP), Group 2/2A (Municipal Commissioner, Sub-Registrar, Assistant), and Group 4 (VAO, Junior Assistant). Covers comprehensive General Studies grids and deep regional Tamil language modules.",
    introPoints: [
      "Covers Deputy Collector, DSP, VAO & Assistant posts",
      "Deep focus on Unit 8 & Unit 9 administration systems",
      "Tamil Language eligibility & General Studies synthesis"
    ],
    features: [
      "Custom printed books and model papers mapped per standard syllabi",
      "Comparative mock test leaderboards matching state Commission criteria",
      "Single-stage and multi-tier tracking arrays tailored per target exam tier"
    ],
    syllabus: [
      "Module I: History, Culture, Heritage and Socio-Political Movements in TN",
      "Module II: Development Administration in Tamil Nadu (Unit 9 Grid)",
      "Module III: General Studies (Polity, Geography, Economy, Mental Ability, Current Affairs)",
      "Module IV: Tamil Language Eligibility and Scoring Components"
    ]
  },
  {
    id: "banking-ibps-sbi-rbi",
    name: "Banking Services Recruitment (IBPS, SBI & RBI)",
    category: "banking-insurance",
    duration: "Intensive Crack Course",
    level: "Any Degree Level",
    capacity: "Speed-Drill Specialized Batches",
    color: "#5B21B6",
    description: "Rigorous computer-based training for Probationary Officers (PO), Specialist Officers (SO), Clerks, and RBI Assistants / Grade A & B Officers. Focuses heavily on high-speed quantitative aptitude, analytical reasoning shortcuts, and financial awareness parameters.",
    introPoints: [
      "Targeting IBPS, SBI, and RBI Officer & Clerical posts",
      "High-speed computer-based simulation environments",
      "Comprehensive shortcuts for quantitative and verbal sections"
    ],
    features: [
      "Daily computer-based testing (CBT) assessing real-time speed parameters",
      "Descriptive analytical test series exclusively engineered for PO candidates",
      "Custom reference frameworks for banking awareness and general economics"
    ],
    syllabus: [
      "Phase I: Preliminary Exam (Reasoning, Quantitative Aptitude, Verbal Aptitude)",
      "Phase II: Main Exam CBT (Data Interpretation, General Awareness, Verbal, Reasoning)",
      "Phase III: Specialized PO Descriptive Test & Mock Interview Boards"
    ]
  },
  {
    id: "insurance-recruitment",
    name: "Insurance Corporation Recruitment (LIC, GIC, NIACL, UIIC)",
    category: "banking-insurance",
    duration: "Regular Selection Batches",
    level: "Any Degree Standard",
    capacity: "Targeted Merit Groups",
    color: "#B45309",
    description: "Specialized curriculum for Assistant Administrative Officer (AAO) and Assistant Grade posts across top participating firms including LIC, NICL, OIC, UIIC, NIACL, and GIC. Combines objective scoring accuracy with dedicated professional interview training panels.",
    introPoints: [
      "Coaching for Assistant Administrative Officer (AAO) & Assistant Grades",
      "Integrated multi-stage computer-based test curriculum",
      "Specialized modules on financial and insurance awareness metrics"
    ],
    features: [
      "Model notes and custom documentation addressing core insurance patterns",
      "Weekly qualifying sectional simulations spanning logical aptitude and English",
      "Viva-voce alignment protocols overseen by veteran academy heads"
    ],
    syllabus: [
      "Stage 1: Preliminary Exam CBT (Reasoning, Quantitative Aptitude, English Qualifying)",
      "Stage 2: Main Examination Final Merit CBT (Objective Content + Descriptive Frameworks)",
      "Stage 3: Personality Interview and Document Verification Rounds"
    ]
  },
  {
    id: "rrb-technical-popular",
    name: "Railway Recruitment Board (RRB NTPC, JE, SSE & ALP)",
    category: "technical-ssc",
    duration: "Multi-Tier Dedicated Path",
    level: "10th / ITI to Any Degree",
    capacity: "Technical & Non-Technical Batches",
    color: "#9A3412",
    description: "Targeted curriculum for Non-Technical Popular Posts (NTPC Traffic Assistants, etc.), Junior Engineer (JE), Senior Section Engineer (SSE), Assistant Loco Pilot (ALP), and Group-D. Built around high-yield mathematics matrices, reasoning diagnostics, and general awareness maps.",
    introPoints: [
      "Coaching for RRB NTPC, JE, SSE, ALP, and Group-D tracks",
      "Focus on General Intelligence, Test of Reasoning, and General Awareness",
      "Comprehensive strategy for multi-stage Computer Based Tests (CBT-1 & CBT-2)"
    ],
    features: [
      "Customized printed books and notes mapped accurately to RRB criteria",
      "Specialized shortcut classes for Mathematics and analytical logic puzzles",
      "Guidance for subsequent stages including Typing Tests, PET, and skill alignments"
    ],
    syllabus: [
      "Stage 1: CBT-1 Preliminary Exam (Qualifying Math, Reasoning, General Awareness)",
      "Stage 2: CBT-2 Main Exam (Advanced Difficulty Core Technical / Applied Syllabus)",
      "Stage 3: Exam-Specific Skill Test / Typing Drill / Physical Efficiency Test (PET)",
      "Stage 4: Final Document Verification and Medical Examination Strategy"
    ]
  },
  {
    id: "ssc-cgl-chsl-mts",
    name: "Staff Selection Commission (CGL, CHSL, MTS & JE)",
    category: "technical-ssc",
    duration: "Integrated Tier-1 & Tier-2 Model",
    level: "Matric to Any Degree Level",
    capacity: "Central Ministries Core Batches",
    color: "#0369A1",
    description: "Premier training program for various key ministerial, department, and organizational posts within the Government of India. Prepares candidates comprehensively for CGL, CHSL, MTS (Non-Technical), Stenographer Grade C & D, Junior Engineer (JE), CAPF, and CISF.",
    introPoints: [
      "Recruitment path for central ministries and organizations",
      "Rigorous tracking of Tier-1 and Compulsory Tier-2 paper parameters",
      "Data Entry Speed Test (DEST) and computer knowledge mapping"
    ],
    features: [
      "Bilingual class architecture providing precise subject delivery",
      "Daily evaluations addressing mathematical abilities and english comprehension tracking",
      "Specialized modules for statistical additions (JSO / Paper II & III components)"
    ],
    syllabus: [
      "Tier 1 CBT: General Intelligence, General Awareness, Quantitative Aptitude, English Comprehension",
      "Tier 2 CBT Paper I: Mathematical Abilities, Reasoning, English Language, Computer Knowledge",
      "Tier 2 DEST: Data Entry Speed Test and technical typing verification protocols",
      "Specialized Tiers: Paper II & III Statistics frameworks tailored for Junior Statistical Officers"
    ]
  },
  {
    id: "tnusrb-police-si",
    name: "TNUSRB Police Sub-Inspector (SI) Examination",
    category: "technical-ssc",
    duration: "6 Months Comprehensive",
    level: "Any Degree Level",
    capacity: "Uniformed Services Dedicated Batches",
    color: "#1E3A8A",
    description: "Targeted physical and academic model tailored to address Tamil Nadu Uniformed Services Recruitment Board SI parameters. Maximizes score output across objective written metrics, qualifying benchmarks, and administrative viva-voce rounds.",
    introPoints: [
      "Specialized preparation for Sub-Inspector of Police positions",
      "Integrated balance between objective written metrics and physical strategies",
      "Viva-voce performance coaching under experienced advisory panels"
    ],
    features: [
      "Complete study books and printed evaluation content as per TNUSRB syllabus",
      "Performance benchmarking across objective parameters and current affairs summaries",
      "Exclusive guidance for physical test metrics (PMT, ET, and Physical Efficiency Tests)"
    ],
    syllabus: [
      "Stage 1: Written Examination (70 Marks Objective Evaluation Structure)",
      "Stage 2: Physical Measurement Test (PMT), Endurance Test (ET), and Physical Efficiency Test (PET)",
      "Stage 3: Viva-Voce Assessment Board Panel (10 Marks Core Metrics)",
      "Stage 4: Special Marks Optimization (5 Marks allocation for NCC, NSS, and Sports Profiles)"
    ]
  }
];

const CoursesHero = () => {
  return (
    <div className="relative pt-36 pb-16 w-full overflow-hidden bg-[#FAFBFD] border-b border-gray-150/70 select-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/3 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-slate-400/3 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="text-[10px] font-bold text-blue-700 bg-white border border-gray-150/60 px-4 py-1.5 rounded-full uppercase tracking-[0.45em] shadow-sm inline-block">
            ACADEMIC PROGRAMS & ADMISSIONS
          </span>
          
          <h1 className="text-4xl md:text-5.5xl font-display font-medium text-dark tracking-tight leading-tight">
            Integrated Curriculums & <br/>
            Strategic <span className="italic font-normal font-serif text-[#1e40af]">Competitive Classrooms</span>
          </h1>
          
          <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Explore our specialized state and central examination modules under a single roof, engineered for consistent academic success.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const CoursesList = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "civil-services" | "banking-insurance" | "technical-ssc">("all");
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const filteredCourses = selectedTab === "all" 
    ? COURSES_DATA 
    : COURSES_DATA.filter(course => course.category === selectedTab);

  const handleCourseClick = (id: string) => {
    setActiveCourseId(activeCourseId === id ? null : id);
  };

  const handleEnquireClick = (e: React.MouseEvent, courseName: string) => {
    e.stopPropagation(); // Avoid triggering accordion toggle
    alert(`Redirecting to admissions desk for: ${courseName}. Please call 8015390090 or email admin@drpannamalaiiasacademy.com`);
  };

  return (
    <section className="py-20 bg-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        
        {/* Course Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 pb-8">
          {(["all", "civil-services", "banking-insurance", "technical-ssc"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer border ${
                selectedTab === tab
                  ? "bg-[#1E40AF] text-white border-transparent shadow-sm"
                  : "bg-gray-50 text-gray-400 border-gray-150 hover:bg-gray-100 hover:text-dark"
              }`}
            >
              {tab === "all" ? "All Streams" : tab === "civil-services" ? "Civil Services (UPSC/TNPSC)" : tab === "banking-insurance" ? "Banking & Insurance" : "Technical & SSC / Railways"}
            </button>
          ))}
        </div>

        {/* Courses Stack Accordion List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredCourses.map((c) => {
            const isExpanded = activeCourseId === c.id;
            return (
              <div 
                key={c.id}
                className={`border border-gray-150 rounded-[28px] overflow-hidden bg-white transition-all duration-300 ${isExpanded ? 'shadow-lg border-[#1e4fc0]/20' : 'hover:border-gray-300'}`}
              >
                {/* Header block */}
                <div 
                  onClick={() => handleCourseClick(c.id)}
                  className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-white px-2.5 py-1 rounded uppercase tracking-widest" style={{ backgroundColor: c.color }}>
                        {c.category === 'civil-services' ? 'Civil Services' : c.category === 'banking-insurance' ? 'Banking & Insurance' : 'Technical & Civil'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {c.duration}
                      </span>
                    </div>
                    <h3 className="text-md md:text-lg font-display font-medium text-dark leading-snug">
                      {c.name}
                    </h3>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1.5 text-[11px] text-gray-400 font-light list-none pl-0">
                      {c.introPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex gap-1.5 items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enquire CTA Block replacing price text */}
                  <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                    <button
                      type="button"
                      onClick={(e) => handleEnquireClick(e, c.name)}
                      className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-dark hover:bg-[#1E40AF] rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                    >
                      Enquire Now
                    </button>
                    
                    <button
                      type="button"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'bg-[#1E40AF] text-white rotate-90' : 'bg-[#FAFBFD] text-gray-400 border border-gray-150'}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded modules / features details */}
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-t border-gray-150 bg-[#FAFBFD]"
                  >
                    <div className="p-8 space-y-8">
                      {/* Course Strategy Overview */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">STREAM STRATEGY OVERVIEW</h4>
                        <p className="text-[#4b5563] text-xs md:text-sm font-light leading-relaxed">
                          {c.description}
                        </p>
                      </div>

                      {/* Split pillars */}
                      <div className="grid md:grid-cols-2 gap-8 pt-4">
                        {/* Features */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            ACADEMY TRAINING FEATURES
                          </h4>
                          <ul className="space-y-2.5 text-xs text-[#4b5563] font-light pl-0 list-none">
                            {c.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex gap-2 items-start">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Modules syllabus */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                            EXAMINATION CORES & MODULES
                          </h4>
                          <ul className="space-y-2.5 text-xs text-[#4b5563] font-light pl-0 list-none">
                            {c.syllabus.map((syll, sIdx) => (
                              <li key={sIdx} className="flex gap-2 items-start">
                                <span className="font-semibold text-dark shrink-0">0{sIdx+1}.</span>
                                <span>{syll}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Parameters Footer */}
                      <div className="border-t border-gray-150 pt-6 flex flex-wrap gap-y-4 gap-x-12 text-xs text-gray-400 font-light">
                        <div className="flex gap-2 items-center">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Structure: <strong className="text-dark font-medium">{c.duration}</strong></span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Users className="w-4 h-4 text-primary" />
                          <span>Training Environment: <strong className="text-dark font-medium">{c.capacity}</strong></span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Standard Mapped: <strong className="text-dark font-medium">{c.level}</strong></span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

const Courses = () => {
  return (
    <>
      <CoursesHero />
      <CoursesList />
    </>
  );
};

export default Courses;