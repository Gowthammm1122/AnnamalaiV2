import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";

interface CourseItem {
  id: string;
  name: string;
  category: "all" | "foundation" | "optional" | "interview" | "test-series";
  duration: string;
  level: string;
  capacity: string;
  price: string;
  description: string;
  introPoints: string[];
  features: string[];
  syllabus: string[];
  color: string;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "upsc-foundation",
    name: "UPSC Civil Services Foundation (Target 2025)",
    category: "foundation",
    duration: "12 Months Regular",
    level: "Beginner to Advanced",
    capacity: "45 Candidates / Batch",
    price: "₹85,000 / Year",
    color: "#1E40AF",
    description: "Our hallmark master program. Reconstructs administrative study from basic NCERT levels up to high-yield analytical answer drafting modules. Features strict checklist monitoring under our senior coordinators cell.",
    introPoints: [
      "GS Prelims (Paper I & II) fully synthesized",
      "Mains structural outline draft checks",
      "Comprehensive digital tracker subscription"
    ],
    features: [
      "Weekly diagnostic MCQ mock evaluations",
      "Exclusive current affairs summary briefs (The Hindu/PIB)",
      "Daily personal copy evaluations under Dr. P. Annamalai"
    ],
    syllabus: [
      "Module I: Ancient & Medieval Historical Heritage (GS I)",
      "Module II: Indian Polity, Global Geo-Political Maps (GS II)",
      "Module III: Economic Planning, Digital Bio-Tech Trends (GS III)",
      "Module IV: Administrative Integrity, Ethics Case Solves (GS IV)"
    ]
  },
  {
    id: "tamil-literature",
    name: "Tamil Literature Optional Specialization",
    category: "optional",
    duration: "4.5 Months Support",
    level: "Graduation Depth",
    capacity: "30 Scholars",
    price: "₹18,500 Single",
    color: "#5B21B6",
    description: "Tailored personally under Dr. P. Annamalai's native literary expertise. The course navigates classical Sangam poetry, medieval dramas, modern novels, and historical folklore trends, securing massive score boosts.",
    introPoints: [
      "Rigorous structural sheet drills",
      "Exclusive self-authored classical dictionary notes",
      "Complete question bank spanning 25 years"
    ],
    features: [
      "Bi-weekly detailed optional answer sheet markings",
      "One-on-one virtual face counsel times",
      "Model reference frameworks for classical grammar items"
    ],
    syllabus: [
      "Module I: History of Tamil Language & Classical Literature",
      "Module II: Sangam Poetry, Epic Dramaturgy, Folklore",
      "Module III: Critical Essays & Analysis on Modern Novels",
      "Module IV: Answer Framing with Quotes & Verse Citations"
    ]
  },
  {
    id: "tnpsc-group-one",
    name: "TNPSC Group I & II Advanced Program",
    category: "foundation",
    duration: "8 Months Focus",
    level: "Intermediate Depth",
    capacity: "60 Candidates",
    price: "₹45,000 Package",
    color: "#065F46",
    description: "Optimized syllabus path designed specifically to address standard state commission requirements. Core coverage spans Tamil Nadu historical developments, Unit 8 & 9 governance matrices, and extensive aptitude sets.",
    introPoints: [
      "Complete Unit 8 & 9 specific draft keys",
      "Thirukkural analytical references",
      "Aptitude & Mental Ability shortcut systems"
    ],
    features: [
      "In-depth bilingual lectures (Tamil & English)",
      "State-level comparative mock leaderboards",
      "Regular interactions with selected state officers"
    ],
    syllabus: [
      "Module I: History & Social Movements of Tamil Nadu",
      "Module II: Unit 9 Development Administration System",
      "Module III: Indian National Movement with State Relevance",
      "Module IV: General Mental Aptitude & Shortcut Formulae"
    ]
  },
  {
    id: "aipmts-series",
    name: "All India Prelims Mock Test Series (AIPMTS)",
    category: "test-series",
    duration: "6 Months Weekend",
    level: "Exam Simulation",
    capacity: "150 Core Seats",
    price: "₹12,500 Full",
    color: "#9A3412",
    description: "Highly structural exam simulation framework. Features exact UPSC style questions, diagnostic error spreadsheets, negative scoring analysis, and detailed video answers post-exam.",
    introPoints: [
      "22 Sectional Tests & 8 Full Mock Papers",
      "Detailed visual scorecard metrics",
      "Bilingual video answer key access"
    ],
    features: [
      "Real-time state and national rank percentages",
      "Subject-wise weaknesses checklist charts",
      "CSAT special full papers with shortcuts"
    ],
    syllabus: [
      "Sectional Series I: Polity, Governance & Constitutions",
      "Sectional Series II: Economy Planning, Modern Budgets",
      "Sectional Series III: Environment, Ecology & Current Affairs",
      "Sectional Series IV: Integrated CSAT & Full-Length Mocks"
    ]
  },
  {
    id: "interview-prep",
    name: "UPSC Mock Interview & Personality Program",
    category: "interview",
    duration: "4 Weeks Boot-camp",
    level: "Personal Tuning",
    capacity: "20 Select Finalists",
    price: "Free for Mains Selected",
    color: "#1E3A8A",
    description: "Complete polish program. Designed for aspirants who cleared Mains written tests. Consists of deep DAF analysis, body language counseling, and mock panels with retired IAS/IPS board officers.",
    introPoints: [
      "Detailed Application Form (DAF) line-by-line review",
      "Video recorded mock trials with analysis",
      "Current state and homeland topic counseling"
    ],
    features: [
      "Mock panels with veteran civil servants & psychologists",
      "Personalized DAF-based question lists",
      "Pressure handling, voice moderation & posture coaching"
    ],
    syllabus: [
      "Sprint I: DAF Analysis, Hobby Profile & Home State Prep",
      "Sprint II: National Policy Positions & Administrative Crisis",
      "Sprint III: Body Language, Attire, and Demeanor Drill",
      "Sprint IV: Final Simulated Board Mock Trial and Feedback"
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
            Curated Curriculums & <br/>
            Strategic <span className="italic font-normal font-serif text-[#1e40af]">Aspirations Classrooms</span>
          </h1>
          
          <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Filter through our regular foundation programs, optional specializations, simulated mock trials and final interview matrices.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const CoursesList = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "foundation" | "optional" | "interview" | "test-series">("all");
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const filteredCourses = selectedTab === "all" 
    ? COURSES_DATA 
    : COURSES_DATA.filter(course => course.category === selectedTab);

  const handleCourseClick = (id: string) => {
    setActiveCourseId(activeCourseId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        
        {/* Course Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-gray-150 pb-8">
          {(["all", "foundation", "optional", "test-series", "interview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer border ${
                selectedTab === tab
                  ? "bg-[#1E40AF] text-white border-transparent shadow-sm"
                  : "bg-gray-50 text-gray-400 border-gray-150 hover:bg-gray-100 hover:text-dark"
              }`}
            >
              {tab === "all" ? "All Programs" : tab === "foundation" ? "Foundation" : tab === "optional" ? "Optional Special" : tab === "test-series" ? "Test Series" : "Mock Interviews"}
            </button>
          ))}
        </div>

        {/* Courses Stack Accordion / List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredCourses.map((c) => {
            const isExpanded = activeCourseId === c.id;
            return (
              <div 
                key={c.id}
                className={`border border-gray-150 rounded-[28px] overflow-hidden bg-white transition-all duration-300 ${isExpanded ? 'shadow-lg border-[#1e4fc0]/20' : 'hover:border-gray-300'}`}
              >
                {/* Header block (clickable summary) */}
                <div 
                  onClick={() => handleCourseClick(c.id)}
                  className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-white px-2.5 py-1 rounded uppercase tracking-widest" style={{ backgroundColor: c.color }}>
                        {c.category === 'foundation' ? 'Foundation' : c.category === 'optional' ? 'Optional' : c.category === 'test-series' ? 'Test Series' : 'Interview'}
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

                  <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                    <div className="text-right">
                      <p className="text-[9px] text-[#9ca3af] uppercase tracking-wider font-bold">FEES SLAB</p>
                      <p className="text-sm font-semibold text-dark">{c.price}</p>
                    </div>
                    
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
                      {/* Desc block */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">COURSE STRATEGY OVERVIEW</h4>
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
                            COMPREHENSIVE FEATURES
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
                            SYLLABUS MODULES
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

                      {/* Mini parameters */}
                      <div className="border-t border-gray-150 pt-6 flex flex-wrap gap-y-4 gap-x-12 text-xs text-gray-400 font-light">
                        <div className="flex gap-2 items-center">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Duration: <strong className="text-dark font-medium">{c.duration}</strong></span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Users className="w-4 h-4 text-primary" />
                          <span>Batch Capacity: <strong className="text-dark font-medium">{c.capacity}</strong></span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Course Standard: <strong className="text-dark font-medium">{c.level}</strong></span>
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
