"use client";

import { useState } from "react";
import { Crown, Ticket, Lock, Bell, Flame } from "lucide-react";
import { motion } from "motion/react";

import { FIGHT_CARD, EVENT, type Bout } from "@/lib/fight-data";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/countdown";
import { Reveal } from "@/components/site/reveal";

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
      className="relative border-t border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={16}>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {EVENT.number} &mdash; The Card
              </p>
            </Reveal>

            <Reveal delay={0.08} y={24} blur={4}>
              <h2 className="display mt-3 text-5xl sm:text-7xl">
                Fight{" "}
                <span className="text-stroke-primary text-transparent">
                  Card
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.16} y={20}>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {isLocked
                  ? "The official fight card is currently classified. Sign up for first access to the card reveal and ticket announcements."
                  : "Fifteen bouts. Three disciplines. One night at Demo Room Toronto. Every athlete steps into the Sky cage with everything on the line."}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <Reveal delay={0.15} scale={0.95} y={16}>
              <Countdown scheduledAt={EVENT.scheduledAt} />
            </Reveal>

            <Reveal delay={0.22} y={16} className="w-full sm:w-auto">
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
            </Reveal>
          </div>
        </div>

        {/* =========================================================
            FIGHT LIST / LOCKED STATE
        ========================================================= */}
        {isLocked ? (
          <div className="mt-12">
            <LockedCardNotice />
          </div>
        ) : (
          <div className="mt-10 sm:mt-12">
            {/* Discipline Filter Tabs */}
            <Reveal delay={0.1} y={16}>
              <div className="no-scrollbar -mx-4 mb-6 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-8 sm:flex-wrap sm:px-0">
                {FILTERS.map((tab) => {
                  const active = activeFilter === tab.value;
                  return (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveFilter(tab.value)}
                      className={`flex shrink-0 items-center gap-2.5 border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-all sm:text-xs ${
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] ${
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
            </Reveal>

            {/* Keyed by activeFilter so cards freshly reveal when switching tabs too */}
            <ul key={activeFilter} className="flex flex-col gap-3.5">
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
    <Reveal
      y={28}
      className="group relative flex flex-col items-center justify-center overflow-hidden border border-border bg-card py-16 sm:py-24"
    >
      <motion.span
        className="hazard-stripes absolute inset-x-0 top-0 h-1.5"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "center",
        }}
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

      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 display text-[10vw] text-foreground/[0.02] sm:text-[8vw]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
      >
        LOCKED
      </motion.span>
    </Reveal>
  );
}

/* ===============================================================
   BOUT ROW (SCROLL-TRIGGERED REVEAL + INTERNAL FIGHTER CLASH MOTION)
================================================================ */

function BoutRow({ bout, index }: { bout: Bout; index: number }) {
  const isMain = bout.isMainEvent || bout.isTitle;
  const isCoMain = bout.isCoMain;

  return (
    <Reveal
      as="li"
      y={32}
      scale={0.985}
      blur={3}
      duration={0.65}
      margin="-40px"
      // Slight stagger for cards that are visible in the same viewport batch
      delay={Math.min(index * 0.04, 0.16)}
      className={`group relative overflow-hidden border transition-all duration-300 ${
        isMain
          ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(220,38,38,0.08)]"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl"
      }`}
    >
      {/* Left vertical power bar that Ignites on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 origin-bottom transition-transform duration-300 ${
          isMain
            ? "scale-y-100 bg-primary"
            : "scale-y-0 bg-primary group-hover:scale-y-100"
        }`}
      />

      {/* Tactical Bottom-Right Corner Bracket on Hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
      />

      {/* Title / Main event hazard stripe */}
      {isMain && (
        <motion.span
          className="hazard-stripes absolute inset-x-0 top-0 h-1.5"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "left",
          }}
        />
      )}

      {/* Top Meta Bar: Bout Number + Main/Co-Main Badge + Discipline */}
      <div className="flex items-center justify-between border-b border-border/60 px-3.5 py-2 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
            Bout <span className="text-primary">#{bout.boutNumber}</span>
          </span>

          {isMain && (
            <span className="inline-flex items-center gap-1 bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
              <Crown className="h-3 w-3" aria-hidden="true" />
              Main Event
            </span>
          )}

          {isCoMain && (
            <span className="inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              <Flame className="h-3 w-3" aria-hidden="true" />
              Co-Main
            </span>
          )}
        </div>

        {/* Discipline Pill */}
        <span
          className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] transition-transform duration-300 group-hover:scale-105 sm:text-[10px] ${
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
      <div className="relative z-10 flex items-center gap-2.5 px-3 py-4 sm:gap-6 sm:px-8 sm:py-6">
        {/* Red Corner (Slides in from Left on Scroll) */}
        <motion.div
          className="min-w-0 flex-1 text-right"
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className={`display leading-none text-balance uppercase transition-transform duration-300 group-hover:-translate-x-1 ${
              isMain ? "text-xl sm:text-4xl" : "text-base sm:text-3xl"
            }`}
          >
            {bout.red.name}
          </p>

          {(bout.red.nickname || bout.red.record) && (
            <p className="mt-1.5 truncate text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
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

        {/* VS Badge (Slams in Center on Scroll) */}
        <motion.div
          className="flex shrink-0 flex-col items-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.5,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className={`flex items-center justify-center display shadow-[0_0_25px_rgba(220,38,38,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.45)] ${
              isMain
                ? "h-10 w-10 bg-primary text-base text-primary-foreground sm:h-12 sm:w-12 sm:text-xl"
                : "h-8 w-8 bg-primary text-xs text-primary-foreground sm:h-10 sm:w-10 sm:text-base"
            }`}
          >
            VS
          </span>
        </motion.div>

        {/* White Corner (Slides in from Right on Scroll) */}
        <motion.div
          className="min-w-0 flex-1 text-left"
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className={`display leading-none text-balance uppercase transition-transform duration-300 group-hover:translate-x-1 ${
              isMain ? "text-xl sm:text-4xl" : "text-base sm:text-3xl"
            }`}
          >
            {bout.white.name}
          </p>

          {(bout.white.nickname || bout.white.record) && (
            <p className="mt-1.5 truncate text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
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

      {/* Bout number watermark (Drifts in from right on scroll) */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-3 display text-4xl leading-none text-foreground/[0.04] transition-colors duration-300 group-hover:text-primary/[0.08] sm:text-6xl"
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {bout.boutNumber}
      </motion.span>
    </Reveal>
  );
}