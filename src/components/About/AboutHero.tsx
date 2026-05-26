import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import Image1 from "../../assets/images/banner1.png";
import Image2 from "../../assets/images/banner3.png";

const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track coordinates in standard CSS pixels relative to viewport
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const gridOffsetRef = useRef(0);

  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);

  const isLoaded1 = useRef(false);
  const isLoaded2 = useRef(false);

  // Interactive state timers for triggering floating idle animation
  const lastInteractionTime = useRef(Date.now());
  
  // Spotlight load-in scale animation (starts at 0, grows to 1)
  const revealScaleRef = useRef(0);

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

  // Cover Scaling Function: Scales and centers image to fully cover target dimensions
  const drawOriginalCentered = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number
  ) => {
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    // Cover math: Calculate size to completely fill container, cropping excess
    const ratio = Math.max(w / iw, h / ih);
    const drawW = iw * ratio;
    const drawH = ih * ratio;

    const dx = (w - drawW) / 2;
    // Align vertical coordinates to the top (dy = 0) if cropped, to prevent head cut-off
    const dy = drawH > h ? 0 : (h - drawH) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, drawW, drawH);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use physical canvas resolution for all drawing operations
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Scale CSS coordinates to match the physical resolution of the canvas
    const cursorX = (smoothRef.current.x - rect.left) * dpr;
    const cursorY = (smoothRef.current.y - rect.top) * dpr;

    // 1. Draw base background image (img1)
    if (isLoaded1.current && img1Ref.current) {
      drawOriginalCentered(ctx, img1Ref.current, w, h);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Draw masked comparison image (img2)
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
        drawOriginalCentered(offCtx, img2Ref.current, w, h);
        
        // Mask using destination-in compositing
        offCtx.globalCompositeOperation = "destination-in";

        // Dynamic Spotlight Radius: Base 260px CSS scaled by DPR, capped at 35% of canvas min-dimension
        const baseRadiusCSS = 260;
        const minDim = Math.min(w, h);
        const maxRadius = Math.min(baseRadiusCSS * dpr, minDim * 0.35);
        const radius = maxRadius * revealScaleRef.current;

        if (radius > 0) {
          // Soft feathered radial gradient mask
          const gradient = offCtx.createRadialGradient(
            cursorX, cursorY, radius * 0.4, // central fully-opaque comparison core
            cursorX, cursorY, radius      // outer soft transition boundary
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
          gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.95)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          offCtx.beginPath();
          offCtx.arc(cursorX, cursorY, radius, 0, 2 * Math.PI);
          offCtx.fillStyle = gradient; 
          offCtx.fill();
        }

        offCtx.globalCompositeOperation = "source-over";
        ctx.drawImage(offCanvas, 0, 0);
      }
    }
  };

  // Cursor & Touch Interaction Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastInteractionTime.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastInteractionTime.current = Date.now();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Snap smooth coordinates on initial touch to prevent sliding in from outside
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        smoothRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastInteractionTime.current = Date.now();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // Set initial spotlight center position relative to the container
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current = { x: centerX, y: centerY };
      smoothRef.current = { x: centerX, y: centerY };
    }
  }, []);

  // Monitor screen size changes and update physical resolution coordinates
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.style.width = `${Math.round(rect.width)}px`;
        canvasRef.current.style.height = `${Math.round(rect.height)}px`;
        canvasRef.current.width = Math.max(1, Math.round(rect.width * dpr));
        canvasRef.current.height = Math.max(1, Math.round(rect.height * dpr));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update Animation Loop (Handles organic float pathing, easing, and intro expander)
  useEffect(() => {
    let animId: number;
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const now = Date.now();
        const time = now * 0.001; // seconds

        // 1. Calculate default float orbit trajectory (centered in viewport)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Elegant Lissajous dual-frequency trajectory for natural wandering path
        const floatX = centerX + Math.sin(time * 0.7) * (rect.width * 0.18);
        const floatY = centerY + Math.cos(time * 0.5) * (rect.height * 0.15);

        // 2. Determine and apply active-inactivity state blend factor
        const timeSinceInteraction = now - lastInteractionTime.current;
        const idleDelay = 2500; // 2.5s threshold
        const fadeDuration = 1500; // 1.5s visual blend phase
        
        let idleBlend = 0;
        if (timeSinceInteraction > idleDelay) {
          idleBlend = Math.min(1, (timeSinceInteraction - idleDelay) / fadeDuration);
        }

        // Interpolate target coordinate between cursor tracking and floating path
        const targetX = (1 - idleBlend) * mouseRef.current.x + idleBlend * floatX;
        const targetY = (1 - idleBlend) * mouseRef.current.y + idleBlend * floatY;

        // 3. Easing: Interpolate smoothRef coordinates toward target coordinate
        const dx = targetX - smoothRef.current.x;
        const dy = targetY - smoothRef.current.y;
        smoothRef.current.x += dx * 0.08;
        smoothRef.current.y += dy * 0.08;

        // 4. Parallax Grid Offset math
        const cx = (smoothRef.current.x - rect.left) / (rect.width || 1) - 0.5;
        const cy = (smoothRef.current.y - rect.top) / (rect.height || 1) - 0.5;

        const den = cy === 0 ? 0.001 : cy;
        const targetOffset = (cx * 16) / den;
        const clampedTarget = Math.max(-50, Math.min(50, targetOffset));
        const gridDiff = clampedTarget - gridOffsetRef.current;
        gridOffsetRef.current += gridDiff * 0.06;

        if (patternRef.current) {
          patternRef.current.setAttribute("y", String(gridOffsetRef.current));
        }

        // 5. Expand spotlight radius from 0 to 1 on load (Iris Reveal transition)
        if (revealScaleRef.current < 1) {
          revealScaleRef.current += (1 - revealScaleRef.current) * 0.04;
          if (revealScaleRef.current > 0.999) {
            revealScaleRef.current = 1;
          }
        }

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
      {/* Primary Canvas Render Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 block" />

      {/* Cinematic Vignette: Vertical Gradient Overlay for Text Readability Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-20" />

      {/* Typography Overlay Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-end bg-transparent">
        <div className="w-full pl-6 sm:pl-10 xl:pl-12 pb-8 md:pb-16 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-xs md:max-w-xl space-y-3"
          >
            <h1 id="about-hero-headline" className="text-2xl md:text-4.5xl font-sans font-black text-white tracking-tighter leading-none uppercase">
              Nurturing India's <br className="hidden md:block" />
              Officials <span className="italic font-extrabold text-blue-300">Since Two Decades</span>
            </h1>
            <p id="about-hero-bottom-text" className="text-gray-200 font-normal text-xs md:text-sm leading-relaxed max-w-md">
              Dr. P. Annamalai IAS Academy is committed to transforming civil service aspirations into structured achievements, leveraging continuous subjective mentorship and personal guidance plans.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;