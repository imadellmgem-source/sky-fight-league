"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

// ============================================================================
// SPONSOR DATA (Mapped directly from your public/sponsors directory)
// ============================================================================
const SPONSORS = [
  { id: "01", name: "220 Services", src: "/sponsors/220.png", tier: "Official Partner" },
  { id: "02", name: "1800 Tequila", src: "/sponsors/1800.png", tier: "Official Partner" },
  { id: "03", name: "Duma Energy Drink", src: "/sponsors/duma.png", tier: "Official Partner" },
  { id: "04", name: "JRs Hair", src: "/sponsors/jr-hair.jpg", tier: "Official Partner" },
  { id: "05", name: "Khold", src: "/sponsors/khold.jpg", tier: "Official Partner" },
  { id: "06", name: "Budo Canada", src: "/sponsors/kudo.jpg", tier: "Official Partner" },
  { id: "07", name: "Pasha Co", src: "/sponsors/pasha-co.png", tier: "Official Partner" },
  { id: "08", name: "Project Health & Performance", src: "/sponsors/project-health.png", tier: "Official Partner" },
];

// Duplicated array for seamless infinite marquee loop
const MARQUEE_ITEMS = [...SPONSORS, ...SPONSORS, ...SPONSORS];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function TacticalGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Static architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Top & bottom soft fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

export function SponsorsSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-black/10 bg-white py-24 text-black selection:bg-primary selection:text-white lg:py-36">
      <TacticalGridBackground />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 xl:px-12">
        {/* =========================================================
            1. HEADER: BRUTALIST TYPOGRAPHY
        ========================================================= */}
        <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-12 lg:flex-row lg:items-end">
          <div>
            <Reveal y={20}>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                <span className="h-2 w-2 bg-primary" />
                <span>SFL 001 // Official Fight Alliances</span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={30}>
              <h2 className="display mt-4 flex flex-col text-[3.75rem] uppercase leading-[0.85] tracking-tight sm:text-[5.5rem] lg:text-[7rem]">
                <span className="text-black">POWERED BY</span>
                <span className="text-transparent [-webkit-text-stroke:1.5px_black] sm:[-webkit-text-stroke:2px_black]">
                  THE INDUSTRY.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={20} className="max-w-sm">
            <p className="text-xs font-medium uppercase leading-relaxed tracking-wider text-black/60">
              Backing Toronto&apos;s premier combat sports showcase. Built in
              partnership with industry leaders committed to MMA &amp; Muay Thai
              excellence.
            </p>
          </Reveal>
        </div>
      </div>

      {/* =========================================================
          2. INFINITE KINETIC TICKER (FULL-BLEED)
      ========================================================= */}
      <Reveal delay={0.25} y={20}>
        <div className="relative mt-12 border-y border-black/10 bg-neutral-50/70 py-8 backdrop-blur-sm">
          {/* Left & Right edge gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-white to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-white to-transparent sm:w-40" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {MARQUEE_ITEMS.map((sponsor, idx) => (
                <div
                  key={`${sponsor.id}-${idx}`}
                  className="group flex shrink-0 items-center justify-center"
                >
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="h-14 w-36 object-contain opacity-75 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 sm:h-16 sm:w-44"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* =========================================================
          3. ARCHITECTURAL BENTO GRID + CTA BLOCK
      ========================================================= */}
      <div className="relative z-10 mx-auto mt-16 max-w-[90rem] px-4 sm:px-6 lg:mt-20 xl:px-12">
        <Reveal delay={0.3} y={40}>
          {/* 1px Hairline Grid Architecture */}
          <div className="grid grid-cols-2 gap-px bg-black/10 shadow-2xl ring-1 ring-black/10 sm:grid-cols-3 lg:grid-cols-4">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-10"
              >
                {/* Top Meta Bar */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 transition-colors group-hover:text-black/70">
                  <span>// {sponsor.id}</span>
                  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primary">
                    VERIFIED
                  </span>
                </div>

                {/* Top-Left & Bottom-Right Tactical Corner Brackets on Hover */}
                <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-primary opacity-0 transition-all duration-300 group-hover:left-2.5 group-hover:top-2.5 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-primary opacity-0 transition-all duration-300 group-hover:bottom-2.5 group-hover:right-2.5 group-hover:opacity-100" />

                {/* Sponsor Logo */}
                <div className="relative z-10 flex h-full w-full items-center justify-center p-2">
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="max-h-20 w-auto max-w-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-110 sm:max-h-24 sm:max-w-[190px]"
                  />
                </div>

                {/* Bottom Name Reveal */}
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 transition-colors group-hover:text-black">
                    {sponsor.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-black/10 transition-colors group-hover:bg-primary" />
                </div>

                {/* Subtle red bottom border sweep */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* =========================================================
            4. BOTTOM SPONSORSHIP INQUIRY BANNER (MATCHES YOUR 3-COL STYLE)
        ========================================================= */}
        <Reveal delay={0.4} y={30} className="mt-12">
          <div className="grid grid-cols-1 overflow-hidden shadow-2xl md:grid-cols-12">
            {/* Left Red Accent Block */}
            <div className="relative flex flex-col justify-between bg-primary p-8 text-white sm:p-10 md:col-span-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]">
                <ShieldCheck className="h-4 w-4" />
                <span>Sponsorship Deck Open</span>
              </div>

              <div className="my-6">
                <h3 className="display text-4xl uppercase leading-[0.9] sm:text-5xl">
                  JOIN THE
                  <br />
                  CORNER.
                </h3>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Limited Ringside &amp; Broadcast Inventory
              </span>

              {/* Signature Corner Bracket */}
              <div className="absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-white/40" />
            </div>

            {/* Right Dark Tactical Block */}
            <div className="relative flex flex-col justify-between gap-8 bg-[#111] p-8 text-white sm:p-10 md:col-span-8 md:flex-row md:items-center">
              {/* Diagonal Hatch Texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                  backgroundSize: "8px 8px",
                }}
              />

              <div className="relative z-10 max-w-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Corporate &amp; Brand Partnerships
                </span>
                <h4 className="display mt-2 text-2xl uppercase tracking-tight sm:text-3xl">
                  Put your brand inside the cage at SFL 001.
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-white/50">
                  Custom activations, canvas branding, fighter kit placements,
                  and VIP hospitality tables available for November 28, 2026.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <a
                  href="/opportunities"
                  className="group inline-flex items-center gap-3 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-primary hover:text-white"
                >
                  <span>Become A Sponsor</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default SponsorsSection;