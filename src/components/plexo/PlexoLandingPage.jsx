import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeatureRibbon } from './FeatureRibbon';
import { BentoGridRow1 } from './BentoGridRow1';
import { BentoGridRow2 } from './BentoGridRow2';
import { ShowcaseBanner } from './ShowcaseBanner';
import { Footer } from './Footer';
import { WaitlistModal } from './WaitlistModal';
import { CardStudioModal } from './CardStudioModal';

export function PlexoLandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [cardStudioOpen, setCardStudioOpen] = useState(false);

  const handleOpenWaitlist = () => {
    setWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setWaitlistOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#111111] font-sans selection:bg-[#FFE600] selection:text-black relative overflow-x-hidden w-full">
      {/* Paper grain background overlay effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#d5cebe_1px,transparent_1px)] [background-size:24px_24px] -z-10" />

      {/* Navigation Header */}
      <Navbar onOpenWaitlist={handleOpenWaitlist} />

      {/* Main Landing Sections */}
      <main>
        {/* Section 1: Hero with Distressed Title & 3D Phone Mockup */}
        <HeroSection onOpenWaitlist={handleOpenWaitlist} />

        {/* Section 2: 7-Column Feature Ribbon */}
        <FeatureRibbon />

        {/* Section 3: Bento Grid Row 1 (Spend Smarter, Student Card, Custom Cards) */}
        <BentoGridRow1 
          onOpenWaitlist={handleOpenWaitlist} 
          onOpenCardStudio={() => setCardStudioOpen(true)}
        />

        {/* Section 4: Bento Grid Row 2 (Save & Invest, Plexo Coins) */}
        <BentoGridRow2 onOpenWaitlist={handleOpenWaitlist} />

        {/* Section 5: Bottom Split Showcase Banner ("More Than Just A Card") */}
        <ShowcaseBanner onOpenWaitlist={handleOpenWaitlist} />
      </main>

      {/* Footer */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={waitlistOpen} onClose={handleCloseWaitlist} />

      {/* Card Studio Modal */}
      <CardStudioModal 
        isOpen={cardStudioOpen} 
        onClose={() => setCardStudioOpen(false)} 
        onOpenWaitlist={handleOpenWaitlist}
      />
    </div>
  );
}
