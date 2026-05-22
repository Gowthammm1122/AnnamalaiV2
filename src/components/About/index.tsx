import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Briefcase, 
  Shield, 
  Award, 
  BookText, 
  Activity, 
  CheckCircle2, 
  Target, 
  Users, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  FileCheck,
  Compass,
  Lightbulb
} from "lucide-react";
import Image1 from "../../assets/images/banner1.png";
import Image2 from "../../assets/images/banner2.png";

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const gridOffsetRef = useRef(0);

  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);

  const isLoaded1 = useRef(false);
  const isLoaded2 = useRef(false);

  // Preload images once on mount
  useEffect(() => {
    const img1 = new Image();
    img1.src = Image1; 
    img1.onload = () => {
      isLoaded1.current = true;
      console.debug("AboutHero: img1 loaded", img1.src, img1.naturalWidth, img1.naturalHeight);
    };
    img1.onerror = (err) => {
      console.error("AboutHero: img1 failed to load", img1.src, err);
    };

    const img2 = new Image();
    img2.src = Image2;
    img2.onload = () => {
      isLoaded2.current = true;
      console.debug("AboutHero: img2 loaded", img2.src, img2.naturalWidth, img2.naturalHeight);
    };
    img2.onerror = (err) => {
      console.error("AboutHero: img2 failed to load", img2.src, err);
    };

    img1Ref.current = img1;
    img2Ref.current = img2;
  }, []);

  // Helper utility to draw the image at its original size centered on the canvas.
  // If the image is larger than the canvas, scale it down proportionally to fit.
  const drawOriginalCentered = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number
  ) => {
    const iw = (img.naturalWidth as number) || img.width;
    const ih = (img.naturalHeight as number) || img.height;

    let drawW = iw;
    let drawH = ih;

    // If image is larger than canvas, scale down to fit while preserving aspect ratio
    if (drawW > w || drawH > h) {
      const ratio = Math.min(w / drawW, h / drawH);
      drawW = Math.round(drawW * ratio);
      drawH = Math.round(drawH * ratio);
    }

    const dx = Math.round((w - drawW) / 2);
    const dy = Math.round((h - drawH) / 2);

    // Draw the full source image into the centered rectangle
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, drawW, drawH);
  };

  // Central draw call for dynamic rendering in rendering cycle
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    const rect = canvas.getBoundingClientRect();
    const cursorX = smoothRef.current.x - rect.left;
    const cursorY = smoothRef.current.y - rect.top;

    // 1. Draw base layer (Image 1) at original size centered
    if (isLoaded1.current && img1Ref.current) {
      drawOriginalCentered(ctx, img1Ref.current, w, h);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Composite reveal layer (Image 2) on offscreen canvas masked with radial spotlight gradient
    if (isLoaded2.current && img2Ref.current) {
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      }
      const offCanvas = offscreenCanvasRef.current;
      offCanvas.width = w;
      offCanvas.height = h;

      const offCtx = offCanvas.getContext("2d");
      if (offCtx) {
        offCtx.clearRect(0, 0, w, h);

        // Draw reveal image onto offscreen canvas at original size centered
        drawOriginalCentered(offCtx, img2Ref.current, w, h);

        // Apply radial pattern mask using destination-in
        offCtx.globalCompositeOperation = "destination-in";

        const grad = offCtx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          260
        );
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.4, "rgba(255,255,255,1)");
        grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
        grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
        grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
        grad.addColorStop(1, "rgba(255,255,255,0)");

        offCtx.beginPath();
        offCtx.arc(cursorX, cursorY, 260, 0, 2 * Math.PI);
        offCtx.fillStyle = grad;
        offCtx.fill();

        // Reset composite operation
        offCtx.globalCompositeOperation = "source-over";

        // Draw masked layer over base layer
        ctx.drawImage(offCanvas, 0, 0);
      }
    }
  };

  // Mouse tracking listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Set initial mouse/smooth coordinates to center of viewport
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current = { x: centerX, y: centerY };
      smoothRef.current = { x: centerX, y: centerY };
    }
  }, []);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        // set CSS size
        canvasRef.current.style.width = `${Math.round(rect.width)}px`;
        canvasRef.current.style.height = `${Math.round(rect.height)}px`;
        // set backing store size for crisp rendering
        canvasRef.current.width = Math.max(1, Math.round(rect.width * dpr));
        canvasRef.current.height = Math.max(1, Math.round(rect.height * dpr));

        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // Map drawing operations to CSS pixels
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }
    };

    handleResize(); // Initial sizing
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loop update cycle (60FPS)
  useEffect(() => {
    let animId: number;

    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        // Ease "smooth" ref toward mouse position with factor 0.1
        const dx = mouseRef.current.x - smoothRef.current.x;
        const dy = mouseRef.current.y - smoothRef.current.y;

        smoothRef.current.x += dx * 0.1;
        smoothRef.current.y += dy * 0.1;

        // Compute normalized coordinates
        const cx = (smoothRef.current.x - rect.left) / (rect.width || 1) - 0.5;
        const cy = (smoothRef.current.y - rect.top) / (rect.height || 1) - 0.5;

        // Ease gridOffset toward cx * 16 / cy * 16 with factor 0.06
        const den = cy === 0 ? 0.001 : cy;
        const targetOffset = (cx * 16) / den;

        // Clamp values to prevent infinity/extreme shifts when den approaches zero
        const clampedTarget = Math.max(-50, Math.min(50, targetOffset));
        const gridDiff = clampedTarget - gridOffsetRef.current;
        gridOffsetRef.current += gridDiff * 0.06;

        // Dynamic attribute injection directly to target node bypassing React re-render
        if (patternRef.current) {
          patternRef.current.setAttribute("y", String(gridOffsetRef.current));
        }

        // Trigger render
        draw();
      }
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-hero-section"
      className="relative w-full h-[calc(100vh-72px)] bg-white border-b border-gray-150/70 select-none overflow-hidden mt-[72px]"
    >
      {/* Offscreen images are preloaded inside refs, visible canvas is rendered here */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 block"
      />

      {/* 1. Grid background - inline SVG with SVGPatternElement ref */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-10">
        <defs>
          <pattern
            id="about-hero-grid-svg"
            ref={patternRef}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            y="0"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#67448b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-hero-grid-svg)" />
      </svg>

      {/* 4. CONTENT LAYER: Headline text & description in bottom left corner with custom offset positioning */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-end bg-transparent">
        {/* Slightly more to the left and slightly to the bottom via adjusted padding */}
        <div className="w-full pl-6 sm:pl-10 xl:pl-12 pb-6 md:pb-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-xs md:max-w-xl space-y-3"
          >
            <h1
              id="about-hero-headline"
              className="text-2xl md:text-4.5xl font-display font-semibold text-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            >
              Nurturing India's <br className="hidden md:block" />
              Officers <span className="italic font-normal font-serif text-blue-300">Since Two Decades</span>
            </h1>
            <p
              id="about-hero-bottom-text"
              className="text-gray-200 font-medium text-xs md:text-sm leading-relaxed max-w-md drop-shadow-[0_1px_5px_rgba(0,0,0,0.95)]"
            >
              Dr. P. Annamalai IAS Academy is committed to transforming civil service aspirations into structured achievements, leveraging continuous subjective mentorship and personal guidance plans.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AboutContent = () => {
  const [activeStrategyTab, setActiveStrategyTab] = useState<"phase1" | "phase2" | "phase3">("phase1");

  const strategies = {
    phase1: {
      phase: "01",
      badge: "CONCEPTS & PRE-FOUNDATION",
      title: "Structural Syllabus Grid Rooting",
      subtitle: "Focus: Core Static Foundations & Analytical Comprehension",
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      desc: "Before jumping into answer-writing drafts, candidates must master core conceptual mechanics. We dissect history, economy, polity, and geography into fundamental logical blocks, paired with intense daily objective diagnostics.",
      points: [
        "100% NCERT and standard primary reference key integration lectures.",
        "Weekly simulated micro-tests strictly diagnosing active conceptual recall.",
        "Custom, bite-sized visual subject mindmaps for frictionless revision."
      ],
      achievement: "Complete autonomy over static reference materials within 30 days."
    },
    phase2: {
      phase: "02",
      badge: "MAINS SYLLABUS PENETRATION",
      title: "Subjective Craft & Analytical Correlation",
      subtitle: "Focus: Inter-disciplinary Answer Writing & Fact Correlators",
      icon: <BookText className="w-5 h-5 text-blue-600" />,
      desc: "UPSC Mains demands linking local governance acts directly with constitutional indices. Our strategy bridges current editorial issues to static units, training answers under extreme time constraints.",
      points: [
        "Daily Answer Writing Practice (DAWP) evaluated by standard panel codes.",
        "Detailed digital copy feedback returned with personalized progression cards.",
        "Micro-syllabus milestones to prevent candidate fatigue."
      ],
      achievement: "Structure clean, complete mains answers in under 7 minutes."
    },
    phase3: {
      phase: "03",
      badge: "BUREAUCRATIC PROTOCOLS",
      title: "Administrative Grace & Interview Poise",
      subtitle: "Focus: Mental Equilibrium, Ethical reasoning & Presentation",
      icon: <Award className="w-5 h-5 text-amber-600" />,
      desc: "Our interactive training simulation replicates exact UPSC board panels. We train aspirants on mental endurance, quick ethical issue identification, vocabulary discipline, and confident body-language presentation.",
      points: [
        "Detailed Application Form (D.A.F.) dissection by active practitioners.",
        "Simulated real-life administration crisis handling mocks.",
        "High-definition video review playback sessions for posture fine-tuning."
      ],
      achievement: "Outstanding communication confidence and elite panel grades."
    }
  };

  const currentStrategy = strategies[activeStrategyTab];

  return (
    <section id="about-content-section" className="relative py-24 bg-[#FCFCFD] select-none text-dark overflow-hidden">
      {/* Premium sub-texture dot pattern background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 space-y-28">
        
        {/* EDITORIAL NARRATIVE & CORE VISION: ABOUT ANAMALA IAS ACADEMY */}
        <div className="space-y-16 border-b border-gray-150/80 pb-20">
          
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E40AF]/5 border border-[#1E40AF]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span className="text-[9px] font-bold text-[#1E40AF] tracking-[0.2em] uppercase">
                THE FOUNDATION VISION
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-dark tracking-tight leading-tight">
              About Anamala IAS Academy
            </h2>
            
            <div className="w-24 h-1 bg-[#1E40AF] rounded-full mx-auto" />
            
            <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
              Dr. P. Annamalai IAS Academy is built on a legacy of absolute academic dedication, training candidates to analyze, think, and lead with unwavering ethical integrity.
            </p>
          </div>

          {/* Core Values & Mission Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Card: Our Mission */}
            <div className="lg:col-span-12 xl:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-[#1E40AF]/5 to-indigo-500/5 rounded-3xl border border-[#1E40AF]/10 shadow-[0_4px_24px_rgba(30,64,175,0.02)] flex flex-col justify-between space-y-8 group transition-all duration-300 hover:border-[#1E40AF]/25">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#1E40AF]/10 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-[#1E40AF]" />
                </div>
                
                <h3 className="text-2xl font-display font-medium text-dark tracking-tight">Our Dedicated Mission</h3>
                
                <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                  Our mission is to establish a world-class training ecosystem that goes beyond teaching simple rot-learning modules. We strive to instill critical leadership capacity, robust policy-analytical skills, and high administrative ethics in every aspirant, transforming dreamers into capable decision-makers of India.
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-200/50 flex items-center justify-between text-[#1E40AF]">
                <span className="text-xs font-semibold tracking-wider uppercase">DR. P. ANNAMALAI IAS FRAMEWORK</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Right Side: Core Values Grid (4 Core Values) */}
            <div className="lg:col-span-12 xl:col-span-7 grid sm:grid-cols-2 gap-6">
              
              {/* Core Value 1 */}
              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Ethical Integrity First</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  We emphasize absolute moral strength, teaching candidates that true authority must respect civic welfare, human compassion, and constitutional justice rules.
                </p>
              </div>

              {/* Core Value 2 */}
              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Personalized Mentorship Cycle</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  Continuous 1-on-1 performance reviews tailored to identify static learning gaps, fine-tune dynamic core answer drafting, and guide motivation.
                </p>
              </div>

              {/* Core Value 3 */}
              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Analytical Syllabus Correlation</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  We empower candidates to systematically link static subjects with live global affairs, transforming raw information storage into deep comprehension.
                </p>
              </div>

              {/* Core Value 4 */}
              <div className="p-8 bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#1E40AF]/20 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-base font-semibold text-dark tracking-tight">Accessible Quality Guidance</h4>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  Dedicated to preparing students from diverse economic origins, providing premium teaching support so that top civil ranks are attainable for everyone.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: THE DETAILED COURSE STRATEGY BLUEPRINT */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase block">
                THE PREPARATION PATHWAY
              </span>
              <h3 className="text-2xl md:text-3.5xl font-display font-medium text-dark tracking-tight">
                Course Strategy & Academic Phases
              </h3>
              <p className="text-gray-400 font-light text-xs max-w-xl">
                UPSC exams are highly sequential. Our 3-stage strategic pathway ensures that aspirants transform step-by-step from base understanding to outstanding bureaucratic precision.
              </p>
            </div>

            {/* Stage selectors with micro animations */}
            <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 self-start md:self-auto shrink-0 z-40 relative">
              {(["phase1", "phase2", "phase3"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStrategyTab(tab)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-305 ${
                    activeStrategyTab === tab
                      ? "bg-white text-dark shadow-sm border border-gray-150"
                      : "text-gray-400 hover:text-dark"
                  }`}
                >
                  Stage {tab === "phase1" ? "I" : tab === "phase2" ? "II" : "III"}
                </button>
              ))}
            </div>
          </div>

          {/* Strategic Details panel */}
          <div className="bg-white rounded-3xl border border-gray-150/70 shadow-[0_6px_24px_rgba(0,0,0,0.015)] overflow-hidden grid lg:grid-cols-12 relative z-10">
            
            {/* Card Left: Core Details */}
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
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">PRIMARY STRATEGIC MILESTONE:</span>
                </div>
                <p className="text-xs font-semibold text-dark mt-1">
                  {currentStrategy.achievement}
                </p>
              </div>
            </div>

            {/* Card Right: Actionable Points */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white">
              <div className="space-y-6">
                <h5 className="text-xs font-bold text-dark uppercase tracking-widest">
                  STAGE PROTOCOLS & SYSTEMATIC IMPLEMENTATION
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
                  <span className="text-[10px] font-semibold tracking-wider text-gray-400">
                    Curriculum guided by Dr. P. Annamalai IAS mentorship team.
                  </span>
                </div>
                
                <ChevronRight className="w-4 h-4 text-[#1E40AF]" />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: MILESTONES & PROOF OF RIGOR */}
        <div className="border-t border-gray-150/70 pt-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/70 border border-emerald-150/40">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[9px] font-bold text-emerald-700 tracking-[0.2em] uppercase">
                THE RECORD OF OUTSTANDING RIGOR
              </span>
            </div>

            <h3 className="text-2xl md:text-4.25xl font-display font-medium text-dark tracking-tight leading-snug">
              Two Decades of Tangible <br />
              Administrative Impact
            </h3>

            <p className="text-gray-400 font-light text-xs max-w-lg leading-relaxed">
              We do not measure our credentials by grand marketing brochures. Our legacy is live and active in every serving district administrator, police chief, and sub-collector nurtured in our academic nurseries.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <span className="font-display font-bold text-3xl md:text-4xl text-[#1e40af]">
                  1,200+
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  OFFICERS APPOINTED
                </p>
              </div>
              
              <div className="space-y-1">
                <span className="font-display font-bold text-3xl md:text-4xl text-indigo-600">
                  20+
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  YEARS OF EXCELLENCE
                </p>
              </div>
            </div>
          </div>

          {/* Elegant List Card */}
          <div className="lg:col-span-6 p-8 md:p-10 bg-white border border-gray-150 rounded-3xl shadow-[0_4px_28px_rgba(0,0,0,0.025)] space-y-6">
            <h4 className="text-xs font-bold text-dark uppercase tracking-widest leading-none border-b border-gray-100 pb-4">
              THE ACADEMIC STANDARDS AT A GLANCE
            </h4>

            <ul className="space-y-5">
              <li className="flex gap-3.5 items-start">
                <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-dark tracking-tight">Best Civil Servants Nursery</h5>
                  <p className="text-gray-400 font-light text-[11px] leading-relaxed mt-0.5">
                    Consistently recognized in state profiles for high scoring subjective ratios and solid ethical orientations.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-dark tracking-tight">Active Advisory Resource Board</h5>
                  <p className="text-gray-400 font-light text-[11px] leading-relaxed mt-0.5">
                    Our mock interviews are chaired by retired IAS, IPS, and IRS dignitaries who recreate exact simulated panel pressures.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-dark tracking-tight">Structured Library Infrastructure</h5>
                  <p className="text-gray-400 font-light text-[11px] leading-relaxed mt-0.5">
                    15,000+ specialized volumes, complete digital paper terminals, and silent study zones open 24 hours.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <>
      <AboutHero />
      <AboutContent />
    </>
  );
};

export default About;
