"use client";

import { useState } from "react";

import { AboutLocation } from "./site/about-location";
import { EarlyAccessDrawer } from "./site/early-access-drawer";

import { Hero } from "./site/hero";
import { NewsletterCta } from "./site/newsletter-cta";
import { SectionBreakBanner } from "./site/section-break-banner";

import { SiteFooter } from "./site/site-footer";
import { SiteHeader } from "./site/site-header";
import { Opportunities } from "./site/oppurtunities";
import { AboutSection } from "./site/hero/about-section";
import EventSection from "./site/event";
import FoundersSection from "./site/founder-section";
import SponsorsSection from "./site/sponsor-section";
import { FightCard } from "./site/fight-card-section";
import { StorySplash } from "./site/story-splash";


export function LandingPageWrapper() {
  const isLocked = false;
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  return (
    <>
      {/* IG Story Splash Overlay (Plays mobile-splash.mp4 -> fight-card-poster.png on load) */}
      <StorySplash />


      <SiteHeader
        isLocked={isLocked}
        onOpenEarlyAccess={() => setEarlyAccessOpen(true)}
      />

      <main>
        {/* Pass down isLocked and the drawer trigger to Hero */}
        <Hero
          isLocked={isLocked}
          onOpenEarlyAccess={() => setEarlyAccessOpen(true)}
        />

        <SectionBreakBanner />

        <AboutSection />

        <FightCard
          onOpenEarlyAccess={() => setEarlyAccessOpen(true)}
        />

        <FoundersSection />
        <SponsorsSection />
        <EventSection />
        <AboutLocation />
        <Opportunities />

        <NewsletterCta isLocked={isLocked} />
      </main>

      <SiteFooter />

      <EarlyAccessDrawer
        open={earlyAccessOpen}
        onOpenChange={setEarlyAccessOpen}
      />
    </>
  );
}