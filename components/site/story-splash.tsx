"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, X } from "lucide-react";

// ============================================================================
// UNIFIED 9:16 MEDIA ASSETS IN /public
// ============================================================================
const LOGO_SRC = "/footer-logo.png";

type StorySlide =
  | {
      id: string;
      type: "video";
      src: string;
      label: string;
    }
  | {
      id: string;
      type: "image";
      src: string;
      label: string;
      durationMs: number;
    };

const STORY_SLIDES: StorySlide[] = [
  {
    id: "splash-video",
    type: "video",
    src: "/mobile-splash.mp4",
    label: "SFL 001 // Official Teaser",
  },
  {
    id: "fight-card-poster",
    type: "image",
    src: "/fight-card-poster.png",
    label: "SFL 001 // Official Fight Card",
    durationMs: 7500,
  },
];

export function StorySplash() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef(false);

  const activeSlide = STORY_SLIDES[currentIndex];

  // Lock background scroll on mount; only unlock AFTER exit animation finishes
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    // Pause video immediately so audio doesn't linger during exit fade
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex < STORY_SLIDES.length - 1) {
      setProgress(0);
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  }, [currentIndex, handleClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setProgress(0);
      setCurrentIndex((prev) => prev - 1);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  }, [currentIndex]);

  // Timer for Slide 2 (fight-card-poster.png)
  useEffect(() => {
    if (!isOpen || activeSlide.type !== "image" || isPaused) return;

    const intervalMs = 50;
    const step = (intervalMs / activeSlide.durationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          goNext();
          return 100;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isOpen, activeSlide, isPaused, goNext]);

  // Sync Video Play/Pause & Mute
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || activeSlide.type !== "video") return;

    vid.muted = isMuted;
    if (isPaused) {
      vid.pause();
    } else {
      vid.play().catch(() => {
        vid.muted = true;
        setIsMuted(true);
        vid.play().catch(() => {});
      });
    }
  }, [activeSlide, isMuted, isPaused]);

  // IG Story Press & Hold to Pause / Tap Left-Right to Navigate
  const handlePointerDown = () => {
    isHoldingRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      isHoldingRef.current = true;
      setIsPaused(true);
    }, 180);
  };

  const handlePointerUp = (side: "left" | "right") => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

    if (isHoldingRef.current) {
      setIsPaused(false);
      isHoldingRef.current = false;
      return;
    }

    if (side === "left") {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Unlock scroll only after the full cinematic exit completes (prevents scrollbar snap glitch!)
        document.body.style.overflow = "";
      }}
    >
      {isOpen && (
        <motion.div
          key="story-splash-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* =========================================================
              CINEMATIC SPLIT-SHUTTER BACKDROP (Opens Top & Bottom on Exit)
          ========================================================= */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.8,
                delay: 0.08,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/2 border-b border-primary/40 bg-[#050505]"
          />
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "100%",
              transition: {
                duration: 0.8,
                delay: 0.08,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 border-t border-primary/40 bg-[#050505]"
          />

          {/* Center Red Laser Flash Line that fires as the shutters split open */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0, scaleX: 0 }}
            exit={{
              opacity: [0, 1, 0],
              scaleX: [0.2, 1.1, 1.2],
              transition: {
                duration: 0.55,
                ease: "easeOut",
              },
            }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-primary shadow-[0_0_35px_4px_rgba(220,38,38,0.95)]"
          />

          {/* =========================================================
              DESKTOP SIDE ATMOSPHERE (Subtle black bg + grid + faint glow)
          ========================================================= */}
          <motion.div
            onClick={handleClose}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.06,
              transition: { duration: 0.45, ease: "easeOut" },
            }}
            className="pointer-events-auto absolute inset-0 z-0 hidden overflow-hidden sm:block"
          >
            {/* Subtle architectural grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: "56px 56px",
              }}
            />

            {/* Soft breathing crimson aura behind the 9:16 frame */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]"
              animate={{
                scale: [0.95, 1.12, 0.95],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle ghosted SFL logos on left & right wings */}
            <img
              src={LOGO_SRC}
              alt=""
              className="pointer-events-none absolute left-[8%] top-1/2 hidden w-48 -translate-y-1/2 select-none object-contain opacity-[0.03] xl:block"
            />
            <img
              src={LOGO_SRC}
              alt=""
              className="pointer-events-none absolute right-[8%] top-1/2 hidden w-48 -translate-y-1/2 select-none object-contain opacity-[0.03] xl:block"
            />

            {/* Radial vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#030303_85%)]" />
          </motion.div>

          {/* =========================================================
              9:16 IG STORY CONTAINER (Zooms + Blurs Out Smoothly on Exit)
          ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              y: -28,
              filter: "blur(14px)",
              transition: {
                duration: 0.48,
                ease: [0.32, 0, 0.67, 0],
              },
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-black sm:h-[92dvh] sm:max-h-[880px] sm:w-auto sm:aspect-[9/16] sm:border sm:border-white/15 sm:shadow-[0_0_80px_rgba(0,0,0,0.95)]"
          >
            {/* Top Hazard Stripe Accent */}
            <span
              className="hazard-stripes relative z-30 block h-1 w-full shrink-0"
              aria-hidden="true"
            />

            {/* -------------------------------------------------------
                TOP IG STORY HEADER (Progress Bars + SFL Profile + Controls)
            ------------------------------------------------------- */}
            <div className="pointer-events-none absolute inset-x-0 top-1 z-20 px-3 pt-2.5 sm:px-4 sm:pt-3">
              {/* Segmented Progress Bars */}
              <div className="flex gap-1.5">
                {STORY_SLIDES.map((slide, idx) => {
                  const fill =
                    idx < currentIndex
                      ? 100
                      : idx === currentIndex
                      ? progress
                      : 0;

                  return (
                    <div
                      key={slide.id}
                      className="h-[3px] flex-1 overflow-hidden bg-white/25"
                    >
                      <div
                        className="h-full bg-primary transition-[width] duration-75 ease-linear"
                        style={{ width: `${fill}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Account Row + Mute & Skip */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary bg-black p-1">
                    <img
                      src={LOGO_SRC}
                      alt="SFL"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="display truncate text-sm uppercase tracking-wider text-white">
                        Sky Fight League
                      </span>
                      <span className="bg-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white">
                        001
                      </span>
                    </div>
                    <p className="truncate text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {isPaused ? "PAUSED" : activeSlide.label}
                    </p>
                  </div>
                </div>

                {/* Right Controls (Mute + Skip/Close) */}
                <div className="pointer-events-auto flex shrink-0 items-center gap-1.5">
                  {activeSlide.type === "video" && (
                    <button
                      type="button"
                      onClick={() => setIsMuted((m) => !m)}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="flex h-8 w-8 items-center justify-center border border-white/20 bg-black/75 text-white transition-colors hover:border-primary"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Skip and close"
                    className="flex h-8 items-center gap-1.5 border border-white/20 bg-black/75 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-primary hover:bg-primary"
                  >
                    <span>Skip</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------
                MEDIA STAGE (mobile-splash.mp4 -> fight-card-poster.png)
            ------------------------------------------------------- */}
            <div className="relative flex-1 overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                {activeSlide.type === "video" ? (
                  <motion.video
                    key={activeSlide.id}
                    ref={videoRef}
                    src={activeSlide.src}
                    autoPlay
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration > 0) {
                        setProgress((v.currentTime / v.duration) * 100);
                      }
                    }}
                    onEnded={goNext}
                    onError={goNext}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full w-full items-center justify-center bg-black pt-14"
                  >
                    <img
                      src={activeSlide.src}
                      alt="SFL 001 Official Fight Card"
                      onError={handleClose}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top Readability Gradient */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

              {/* IG Story Left (30% Back) / Right (70% Next) Tap & Hold Zones */}
              <div className="absolute inset-0 z-10 flex">
                <div
                  className="h-full w-[30%] cursor-pointer select-none"
                  onPointerDown={handlePointerDown}
                  onPointerUp={() => handlePointerUp("left")}
                  onPointerCancel={() => setIsPaused(false)}
                />
                <div
                  className="h-full w-[70%] cursor-pointer select-none"
                  onPointerDown={handlePointerDown}
                  onPointerUp={() => handlePointerUp("right")}
                  onPointerCancel={() => setIsPaused(false)}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}