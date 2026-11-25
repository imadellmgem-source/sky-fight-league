"use client";

import { useState } from "react";
import { Crown, Ticket, Lock, Bell, Flame } from "lucide-react";
import { motion } from "motion/react";

import { FIGHT_CARD, EVENT, type Bout } from "@/lib/fight-data";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/countdown";

const LOGO_SRC = "/footer-logo.png";

interface FightCardProps {
  onOpenEarlyAccess: () => void;
}

type FilterCategory = "ALL" | "MUAY THAI" | "MMA" | "BJJ";

const FILTERS: { label: string; value: FilterCategory; count: number }[] = [
  { label: "All Bouts", value: "ALL", count: FIGHT_CARD.length },
  {
    label: "Muay Thai",
    value: "MUAY THAI",
    count: FIGHT_CARD.filter((b) => b.discipline.includes("MUAY THAI")).length,
  },
  {
    label: "MMA",
    value: "MMA",
    count: FIGHT_CARD.filter((b) => b.discipline === "MMA").length,
  },
  {
    label: "BJJ",
    value: "BJJ",
    count: FIGHT_CARD.filter((b) => b.discipline === "BJJ").length,
  },
];

/* ===============================================================
   LIVING ARENA BACKGROUND (MOBILE-OPTIMIZED GPU TRANSFORMS)
================================================================ */
function ArenaLogoAtmosphere() {
  // Lighter count so mobile phones stay smooth at 60/120fps
  const tickerRow = Array.from({ length: 6 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-x-clip overflow-y-hidden"
    >
      {/* 1. Ambient Red Arena Spotlights */}
      <motion.div
        className="absolute left-1/2 top-1/4 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[90px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-[100px] sm:h-[480px] sm:w-[480px] sm:blur-[150px]"
        animate={{
          scale: [1.15, 0.95, 1.15],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Diagonal Drifting Multi-Logo Pattern Wall */}
      <div className="absolute -inset-x-24 inset-y-0 flex -rotate-6 flex-col justify-around gap-16 opacity-[0.045] sm:-inset-x-32 sm:gap-24">
        {[0, 1, 2, 3, 4].map((rowIndex) => (
          <motion.div
            key={rowIndex}
            // Hide 2 extra rows on mobile so the phone doesn't look overly busy
            className={`shrink-0 items-center gap-14 sm:gap-24 ${
              rowIndex > 2 ? "hidden sm:flex" : "flex"
            }`}
            animate={{
              x: rowIndex % 2 === 0 ? ["0%", "-25%"] : ["-25%", "0%"],
            }}
            transition={{
              duration: 28 + rowIndex * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {tickerRow.map((_, idx) => (
              <img
                key={idx}
                src={LOGO_SRC}
                alt=""
                className="h-16 w-auto shrink-0 select-none object-contain sm:h-32"
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* 3. Sticky Centerpiece SFL Logo Phasing In & Out (Now works because section uses overflow-x-clip!) */}
      <div className="sticky top-[35vh] flex w-full items-center justify-center sm:top-1/3">
        <div className="relative flex items-center justify-center">
          {/* Separate glow layer instead of animating CSS filter (much smoother on iOS) */}
          <motion.div
            className="absolute h-48 w-48 rounded-full bg-primary/25 blur-[60px] sm:h-80 sm:w-80 sm:blur-[100px]"
            animate={{
              opacity: [0, 0.55, 0],
              scale: [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={LOGO_SRC}
            alt=""
            className="relative z-10 w-[260px] select-none object-contain sm:w-[540px] lg:w-[700px]"
            animate={{
              opacity: [0.04, 0.14, 0.04],
              scale: [0.94, 1.04, 0.94],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* 4. Continuous Vertical Red Laser Scanline */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.8)]"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Top and Bottom Edge Vignette */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent sm:h-32" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent sm:h-32" />
    </div>
  );
}

/* ===============================================================
   MAIN FIGHT CARD SECTION
================================================================ */
export function FightCard({ onOpenEarlyAccess }: FightCardProps) {
  const isLocked = false;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");

  const filteredBouts = FIGHT_CARD.filter((bout) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "MUAY THAI") {
      return bout.discipline.includes("MUAY THAI");
    }
    return bout.discipline === activeFilter;
  });

  return (
    <section
      id="fight-card"
      // overflow-x-clip keeps sticky centerpiece logo alive while preventing horizontal scrollbars
      className="relative overflow-x-clip border-t border-border bg-background py-16 sm:py-28"
    >
      <ArenaLogoAtmosphere />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.35em]">
              {EVENT.number} &mdash; The Card
            </p>

            <h2 className="display mt-2.5 text-5xl sm:mt-3 sm:text-7xl">
              Fight{" "}
              <span className="text-stroke-primary text-transparent">
                Card
              </span>
            </h2>

            <p className="mt-2.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
              {isLocked
                ? "The official fight card is currently classified. Sign up for first access to the card reveal and ticket announcements."
                : "Fifteen bouts. Three disciplines. One night at Demo Room Toronto. Every athlete steps into the Sky cage with everything on the line."}
            </p>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 lg:items-end">
            <Countdown scheduledAt={EVENT.scheduledAt} />

            {isLocked ? (
              <Button
                nativeButton={true}
                type="button"
                onClick={onOpenEarlyAccess}
                className="w-full rounded-none font-bold uppercase tracking-widest sm:w-auto"
              >
                <Bell className="mr-2 h-4 w-4" />
                Get First Access
              </Button>
            ) : (
              <Button
                render={<a href={EVENT.ticketUrl} />}
                nativeButton={false}
                className="w-full rounded-none font-bold uppercase tracking-widest sm:w-auto"
              >
                <Ticket className="mr-2 h-4 w-4" />
                Buy Tickets
              </Button>
            )}
          </div>
        </motion.div>

        {/* =========================================================
            FIGHT LIST / LOCKED STATE
        ========================================================= */}
        {isLocked ? (
          <div className="mt-10 sm:mt-12">
            <LockedCardNotice />
          </div>
        ) : (
          <div className="mt-8 sm:mt-12">
            {/* Discipline Filter Tabs: 2x2 grid on mobile (nothing cut off), inline wrap on sm+ */}
            <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:flex sm:flex-wrap sm:items-center">
              {FILTERS.map((tab) => {
                const active = activeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveFilter(tab.value)}
                    className={`flex items-center justify-between gap-2 border px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all sm:justify-start sm:gap-2.5 sm:px-4 sm:text-xs sm:tracking-[0.22em] ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        : "border-border bg-card/90 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">{tab.label}</span>
                    <span
                      className={`shrink-0 px-1.5 py-0.5 text-[9px] ${
                        active
                          ? "bg-black/25 text-white"
                          : "bg-foreground/5 text-muted-foreground"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bouts */}
            <ul key={activeFilter} className="flex flex-col gap-3 sm:gap-4">
              {filteredBouts.map((bout, idx) => (
                <BoutRow key={bout.boutNumber} bout={bout} index={idx} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===============================================================
   LOCKED CARD NOTICE
================================================================ */
function LockedCardNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center justify-center overflow-hidden border border-border bg-card py-16 sm:py-24"
    >
      <span
        className="hazard-stripes absolute inset-x-0 top-0 h-1.5"
        aria-hidden="true"
      />
      <Lock className="mb-6 h-8 w-8 text-muted-foreground/50 sm:h-10 sm:w-10" />
      <h3 className="display text-center text-3xl sm:text-5xl">
        LINEUP{" "}
        <span className="text-stroke-primary text-transparent">
          CLASSIFIED
        </span>
      </h3>
      <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-primary sm:text-xs">
        Full fight card revealing {EVENT.cardRevealAt}
      </p>
    </motion.div>
  );
}

/* ===============================================================
   BOUT ROW (MOBILE-TUNED TYPOGRAPHY + FAST GPU SCROLL REVEAL)
================================================================ */
function BoutRow({ bout, index }: { bout: Bout; index: number }) {
  const isMain = bout.isMainEvent || bout.isTitle;
  const isCoMain = bout.isCoMain;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // amount: 0.15 ensures fast thumb flicks on mobile always trigger smoothly
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden border transition-colors duration-300 lg:backdrop-blur-md ${
        isMain
          ? "border-primary bg-gradient-to-r from-primary/15 via-card/95 to-primary/15 shadow-[0_0_35px_rgba(220,38,38,0.18)]"
          : isCoMain
          ? "border-primary/60 bg-card/90 sm:hover:border-primary"
          : "border-border bg-card/90 sm:hover:-translate-y-0.5 sm:hover:border-primary/60 sm:hover:bg-card/95"
      }`}
    >
      {/* Broadcast light sheen */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent sm:w-32"
        animate={{
          left: ["-30%", "130%"],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 2.5 + (index % 4),
          ease: "easeInOut",
        }}
      />

      {/* Left & Right Vertical Red Power Bars */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 origin-bottom transition-transform duration-300 ${
          isMain
            ? "scale-y-100 bg-primary"
            : "scale-y-0 bg-primary sm:group-hover:scale-y-100"
        }`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 sm:group-hover:scale-y-100"
      />

      {/* Main Event Top Hazard Stripe */}
      {isMain && (
        <span
          className="hazard-stripes absolute inset-x-0 top-0 h-1.5"
          aria-hidden="true"
        />
      )}

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-border/60 bg-black/20 px-3 py-2 sm:px-6">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.22em]">
            Bout <span className="text-primary">#{bout.boutNumber}</span>
          </span>

          {isMain && (
            <span className="inline-flex items-center gap-1 bg-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:px-2 sm:text-[9px] sm:tracking-[0.2em]">
              <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
              Main Event
            </span>
          )}

          {isCoMain && (
            <span className="inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-primary sm:px-2 sm:text-[9px] sm:tracking-[0.2em]">
              <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
              Co-Main
            </span>
          )}
        </div>

        {/* Discipline Pill */}
        <span
          className={`shrink-0 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] sm:px-2.5 sm:text-[10px] sm:tracking-[0.22em] ${
            bout.discipline === "MMA"
              ? "bg-primary text-primary-foreground"
              : bout.discipline.includes("MUAY THAI")
              ? "bg-foreground text-background"
              : "border border-border bg-background text-foreground"
          }`}
        >
          {bout.discipline}
        </span>
      </div>

      {/* Fighters Face-Off Row */}
      <div className="relative z-10 flex items-center gap-2 px-2.5 py-4 sm:gap-6 sm:px-8 sm:py-7">
        {/* Red Corner */}
        <motion.div
          className="min-w-0 flex-1 text-right"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className={`display leading-[1.08] text-balance uppercase sm:leading-none sm:transition-transform sm:duration-300 sm:group-hover:-translate-x-1.5 ${
              isMain ? "text-[17px] sm:text-4xl" : "text-[14px] sm:text-3xl"
            }`}
          >
            {bout.red.name}
          </p>

          {(bout.red.nickname || bout.red.record) && (
            <p className="mt-1 truncate text-[9px] font-semibold uppercase tracking-widest text-muted-foreground sm:mt-1.5 sm:text-xs">
              {bout.red.record && (
                <span className="text-primary">{bout.red.record}</span>
              )}
              {bout.red.record && bout.red.nickname && " \u00B7 "}
              {bout.red.nickname && (
                <span>&ldquo;{bout.red.nickname}&rdquo;</span>
              )}
            </p>
          )}
        </motion.div>

        {/* VS Badge */}
        <motion.div
          className="relative flex shrink-0 flex-col items-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-primary/35 blur-sm sm:blur-md"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.25, 0.65, 0.25],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % 3) * 0.4,
            }}
          />

          <span
            className={`relative z-10 flex items-center justify-center display sm:transition-transform sm:duration-300 sm:group-hover:scale-110 ${
              isMain
                ? "h-8 w-8 bg-primary text-xs text-primary-foreground sm:h-12 sm:w-12 sm:text-xl"
                : "h-7 w-7 bg-primary text-[11px] text-primary-foreground sm:h-10 sm:w-10 sm:text-base"
            }`}
          >
            VS
          </span>
        </motion.div>

        {/* White Corner */}
        <motion.div
          className="min-w-0 flex-1 text-left"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className={`display leading-[1.08] text-balance uppercase sm:leading-none sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1.5 ${
              isMain ? "text-[17px] sm:text-4xl" : "text-[14px] sm:text-3xl"
            }`}
          >
            {bout.white.name}
          </p>

          {(bout.white.nickname || bout.white.record) && (
            <p className="mt-1 truncate text-[9px] font-semibold uppercase tracking-widest text-muted-foreground sm:mt-1.5 sm:text-xs">
              {bout.white.nickname && (
                <span>&ldquo;{bout.white.nickname}&rdquo;</span>
              )}
              {bout.white.nickname && bout.white.record && " \u00B7 "}
              {bout.white.record && (
                <span className="text-primary">{bout.white.record}</span>
              )}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bout number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-2 display text-3xl leading-none text-foreground/[0.04] sm:right-3 sm:text-6xl sm:transition-colors sm:duration-300 sm:group-hover:text-primary/15"
      >
        {bout.boutNumber}
      </span>
    </motion.li>
  );
}