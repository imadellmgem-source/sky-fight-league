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

function TacticalGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent sm:h-24" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-24" />
    </div>
  );
}

export function SponsorsSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-black/10 bg-white py-16 text-black selection:bg-primary selection:text-white sm:py-24 lg:py-36">
      <TacticalGridBackground />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 xl:px-12">
        {/* =========================================================
            1. HEADER: SCALES CLEANLY FROM 375PX MOBILE TO 4K
        ========================================================= */}
        <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:gap-8 sm:pb-12 lg:flex-row lg:items-end">
          <div>
            <Reveal y={20}>
              <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:gap-3 sm:text-xs sm:tracking-[0.25em]">
                <span className="h-1.5 w-1.5 shrink-0 bg-primary sm:h-2 sm:w-2" />
                <span>SFL 001 // Official Fight Alliances</span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={30}>
              <h2 className="display mt-3 flex flex-col text-[2.85rem] uppercase leading-[0.88] tracking-tight sm:mt-4 sm:text-[5.5rem] sm:leading-[0.85] lg:text-[7rem]">
                <span className="text-black">POWERED BY</span>
                <span className="text-transparent [-webkit-text-stroke:1.25px_black] sm:[-webkit-text-stroke:2px_black]">
                  THE INDUSTRY.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={20} className="max-w-sm">
            <p className="text-[11px] font-medium uppercase leading-relaxed tracking-wider text-black/60 sm:text-xs">
              Backing Toronto&apos;s premier combat sports showcase. Built in
              partnership with industry leaders committed to MMA &amp; Muay Thai
              excellence.
            </p>
          </Reveal>
        </div>
      </div>

      {/* =========================================================
          2. INFINITE KINETIC TICKER (MOBILE-TUNED)
      ========================================================= */}
      <Reveal delay={0.25} y={20}>
        <div className="relative mt-8 border-y border-black/10 bg-neutral-50/80 py-5 backdrop-blur-sm sm:mt-12 sm:py-8">
          {/* Narrower gradient masks on mobile so center screen stays clear */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white to-transparent sm:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white to-transparent sm:w-36" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 items-center gap-10 pr-10 sm:gap-20 sm:pr-20"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                duration: 24,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {MARQUEE_ITEMS.map((sponsor, idx) => (
                <div
                  key={`${sponsor.id}-${idx}`}
                  className="group flex shrink-0 items-center justify-center"
                >
                  {/* Full color on mobile; grayscale-to-color hover on desktop (lg:) */}
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="h-10 w-24 object-contain transition-all duration-300 sm:h-14 sm:w-36 lg:opacity-75 lg:grayscale lg:group-hover:scale-110 lg:group-hover:opacity-100 lg:group-hover:grayscale-0"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* =========================================================
          3. ARCHITECTURAL BENTO GRID (NO OVERLAP ON SMALL PHONES)
      ========================================================= */}
      <div className="relative z-10 mx-auto mt-10 max-w-[90rem] px-4 sm:mt-16 sm:px-6 lg:mt-20 xl:px-12">
        <Reveal delay={0.3} y={40}>
          <div className="grid grid-cols-2 gap-px bg-black/10 shadow-xl ring-1 ring-black/10 sm:grid-cols-3 sm:shadow-2xl lg:grid-cols-4">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group relative flex flex-col justify-between overflow-hidden bg-white p-3.5 transition-colors duration-300 hover:bg-neutral-50 sm:p-6 lg:p-8"
              >
                {/* Top-Left & Bottom-Right Tactical Corner Brackets */}
                <div className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 border-primary opacity-0 transition-all duration-300 group-hover:opacity-100 sm:left-3 sm:top-3 sm:h-3 sm:w-3" />
                <div className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-primary opacity-0 transition-all duration-300 group-hover:opacity-100 sm:bottom-3 sm:right-3 sm:h-3 sm:w-3" />

                {/* Top Meta Row (In-flow so it never collides with logo on mobile) */}
                <div className="flex w-full items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-black/35 sm:text-[10px] sm:tracking-[0.2em]">
                  <span>// {sponsor.id}</span>
                  <span className="text-primary opacity-100 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
                    SFL
                  </span>
                </div>

                {/* Sponsor Logo Center Container */}
                <div className="my-4 flex h-20 w-full items-center justify-center sm:my-6 sm:h-28">
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className="max-h-16 w-auto max-w-[115px] object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:max-h-24 sm:max-w-[175px]"
                  />
                </div>

                {/* Bottom Name Row */}
                <div className="flex w-full items-center justify-between border-t border-black/5 pt-2.5">
                  <span className="truncate text-[9px] font-bold uppercase tracking-[0.15em] text-black/70 transition-colors group-hover:text-black sm:text-[10px] sm:tracking-[0.2em]">
                    {sponsor.name}
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80 lg:bg-black/15 lg:transition-colors lg:group-hover:bg-primary" />
                </div>

                {/* Subtle red bottom border sweep */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* =========================================================
            4. BOTTOM SPONSORSHIP CTA BANNER (STACKS CLEANLY ON MOBILE)
        ========================================================= */}
        <Reveal delay={0.4} y={30} className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 overflow-hidden shadow-2xl md:grid-cols-12">
            {/* Left Red Accent Block */}
            <div className="relative flex flex-col justify-between bg-primary p-6 text-white sm:p-10 md:col-span-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Sponsorship Deck Open</span>
              </div>

              <div className="my-4 sm:my-6">
                <h3 className="display text-3xl uppercase leading-[0.9] sm:text-5xl">
                  JOIN THE
                  <br />
                  CORNER.
                </h3>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                Limited Ringside &amp; Broadcast Inventory
              </span>

              {/* Signature Corner Bracket */}
              <div className="absolute bottom-5 right-5 h-5 w-5 border-b-2 border-r-2 border-white/40 sm:bottom-6 sm:right-6 sm:h-6 sm:w-6" />
            </div>

            {/* Right Dark Tactical Block */}
            <div className="relative flex flex-col justify-between gap-6 bg-[#111] p-6 text-white sm:gap-8 sm:p-10 md:col-span-8 md:flex-row md:items-center">
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
                <h4 className="display mt-2 text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
                  Put your brand inside the cage at SFL 001.
                </h4>
                <p className="mt-2.5 text-xs leading-relaxed text-white/50 sm:mt-3">
                  Custom activations, canvas branding, fighter kit placements,
                  and VIP hospitality tables available for November 28, 2026.
                </p>
              </div>

              {/* Full-width button on mobile, auto-width on tablet/desktop */}
              <div className="relative z-10 w-full shrink-0 sm:w-auto">
                <a
                  href="#contact"
                  className="group flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-primary hover:text-white sm:inline-flex sm:w-auto sm:px-7"
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