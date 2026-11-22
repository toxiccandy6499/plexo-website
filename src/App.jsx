import React, { useCallback, useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { DarkBand } from './components/DarkBand';
import { Timeline } from './components/Timeline';
import { Closing, SiteFooter } from './components/Closing';
import { Dock } from './components/Dock';
import { WaitlistModal } from './components/WaitlistModal';
import { startSmoothScroll, stopScroll, ScrollTrigger } from './lib/motion';

// Local-preview only (never in the published site): ?waitlist=form or ?waitlist=success opens the
// form / the "you're on the list" screen without sending anything to Supabase.
const PREVIEW = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('waitlist') : null;

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(!!PREVIEW);
  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);

  // Smooth scrolling for the whole page; recalculate scroll positions once fonts/images settle.
  useEffect(() => {
    startSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    // If the page's height changes later (late images, a section updating), the pinned sections'
    // scroll positions go stale and transitions fire at the wrong moment (e.g. the white curve
    // rising over Rewards too early). Recalculate once things settle.
    const main = document.querySelector('main');
    let lastH = main ? main.offsetHeight : 0;
    let t = 0;
    const ro = new ResizeObserver(() => {
      const h = main.offsetHeight;
      if (Math.abs(h - lastH) < 2) return;
      clearTimeout(t);
      t = setTimeout(() => { lastH = main.offsetHeight; ScrollTrigger.refresh(); lastH = main.offsetHeight; }, 200);
    });
    if (main) ro.observe(main);
    return () => { window.removeEventListener('load', refresh); ro.disconnect(); clearTimeout(t); };
  }, []);

  // Don't scroll the page behind the waitlist form.
  useEffect(() => stopScroll(waitlistOpen), [waitlistOpen]);

  // Pause looping animations in any section that is off screen.
  useEffect(() => {
    const sections = document.querySelectorAll('main > section');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('offscreen', !e.isIntersecting)),
      { rootMargin: '200px 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <main className="relative z-10 bg-paper rounded-b-[32px] sm:rounded-b-[48px] shadow-[0_30px_60px_-20px_rgba(0,0,0,.35)]">
        <Hero />
        <Timeline />
        <DarkBand />
        <Closing />
      </main>
      <SiteFooter />
      <Dock onJoin={openWaitlist} />
      <WaitlistModal isOpen={waitlistOpen} onClose={closeWaitlist} preview={PREVIEW} />
    </div>
  );
}
