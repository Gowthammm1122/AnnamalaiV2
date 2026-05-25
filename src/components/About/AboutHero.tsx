import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import Image1 from "../../assets/images/banner1.png";
import Image2 from "../../assets/images/banner2.png";

const AboutHero: React.FC = () => {
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

    if (drawW > w || drawH > h) {
      const ratio = Math.min(w / drawW, h / drawH);
      drawW = Math.round(drawW * ratio);
      drawH = Math.round(drawH * ratio);
    }

    const dx = Math.round((w - drawW) / 2);
    const dy = Math.round((h - drawH) / 2);

    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, drawW, drawH);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const rect = canvas.getBoundingClientRect();
    const cursorX = smoothRef.current.x - rect.left;
    const cursorY = smoothRef.current.y - rect.top;

    if (isLoaded1.current && img1Ref.current) {
      drawOriginalCentered(ctx, img1Ref.current, w, h);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    if (isLoaded2.current && img2Ref.current) {
      if (!offscreenCanvasRef.current) offscreenCanvasRef.current = document.createElement("canvas");
      const offCanvas = offscreenCanvasRef.current;
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext("2d");
      if (offCtx) {
        offCtx.clearRect(0, 0, w, h);
        drawOriginalCentered(offCtx, img2Ref.current, w, h);
        
        // Use destination-in to mask the second image
        offCtx.globalCompositeOperation = "destination-in";

        // CHANGED HERE: Replaced the feathered gradient with a flat, sharp circle path fill
        offCtx.beginPath();
        offCtx.arc(cursorX, cursorY, 260, 0, 2 * Math.PI);
        offCtx.fillStyle = "#ffffff"; 
        offCtx.fill();

        offCtx.globalCompositeOperation = "source-over";
        ctx.drawImage(offCanvas, 0, 0);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current = { x: centerX, y: centerY };
      smoothRef.current = { x: centerX, y: centerY };
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.style.width = `${Math.round(rect.width)}px`;
        canvasRef.current.style.height = `${Math.round(rect.height)}px`;
        canvasRef.current.width = Math.max(1, Math.round(rect.width * dpr));
        canvasRef.current.height = Math.max(1, Math.round(rect.height * dpr));
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animId: number;
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dx = mouseRef.current.x - smoothRef.current.x;
        const dy = mouseRef.current.y - smoothRef.current.y;
        smoothRef.current.x += dx * 0.1;
        smoothRef.current.y += dy * 0.1;

        const cx = (smoothRef.current.x - rect.left) / (rect.width || 1) - 0.5;
        const cy = (smoothRef.current.y - rect.top) / (rect.height || 1) - 0.5;

        const den = cy === 0 ? 0.001 : cy;
        const targetOffset = (cx * 16) / den;
        const clampedTarget = Math.max(-50, Math.min(50, targetOffset));
        const gridDiff = clampedTarget - gridOffsetRef.current;
        gridOffsetRef.current += gridDiff * 0.06;

        if (patternRef.current) patternRef.current.setAttribute("y", String(gridOffsetRef.current));
        draw();
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-hero-section"
      className="relative w-full h-[calc(100vh-72px)] bg-white border-b border-gray-150/70 select-none overflow-hidden mt-[72px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 block" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-10">
        <defs>
          <pattern id="about-hero-grid-svg" ref={patternRef} width="48" height="48" patternUnits="userSpaceOnUse" y="0">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#67448b" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-hero-grid-svg)" />
      </svg>

      <div className="absolute inset-0 z-30 pointer-events-none flex items-end bg-transparent">
        <div className="w-full pl-6 sm:pl-10 xl:pl-12 pb-6 md:pb-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-xs md:max-w-xl space-y-3"
          >
            <h1 id="about-hero-headline" className="text-2xl md:text-4.5xl font-display font-semibold text-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Nurturing India's <br className="hidden md:block" />
              Officials <span className="italic font-normal font-serif text-blue-300">Since Two Decades</span>
            </h1>
            <p id="about-hero-bottom-text" className="text-gray-200 font-medium text-xs md:text-sm leading-relaxed max-w-md drop-shadow-[0_1px_5px_rgba(0,0,0,0.95)]">
              Dr. P. Annamalai IAS Academy is committed to transforming civil service aspirations into structured achievements, leveraging continuous subjective mentorship and personal guidance plans.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;