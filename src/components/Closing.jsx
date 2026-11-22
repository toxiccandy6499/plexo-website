import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { SOCIALS, SocialIcon } from './ui';
import { Playground } from './Playground';
import { PinnedWords } from './Timeline';

/**
 * "Join our journey." — same big pinned word-by-word heading as "Pay. Save. Grow. Play." —
 * with the line under it and the icon-only socials fading in after the words.
 */
export function Closing() {
  return (
    <section id="join" className="relative z-[1] -mt-[3px] bg-paper pt-8 pb-24 sm:pt-12 sm:pb-40">
      <PinnedWords words={['Join', 'our', 'journey.']} breakAfter={1} sub="Follow along as we build PLEXO." exit={false}>
        <div className="mt-7 flex justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`PLEXO on ${s.name} (${s.handle})`}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-1 ring-ink/25 flex items-center justify-center text-ink hover:bg-ink hover:text-plexo-yellow hover:ring-ink transition-colors"
            >
              <SocialIcon name={s.name} className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          ))}
        </div>
      </PinnedWords>
    </section>
  );
}

/**
 * The black ending, pinned underneath the page: the page above slides away like a curtain to reveal it.
 * Just the shapes playground resting on a thin line, with the PLEXO logo under it.
 */
export function SiteFooter() {
  const ref = useRef(null);
  // As the page slides away, the footer's content rises up into place (layered reveal).
  useLayoutEffect(() => {
    const footer = ref.current;
    const main = document.querySelector('main');
    if (!footer || !main) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(footer.querySelector('[data-footer-inner]'), { y: 120, opacity: 0.2 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: main, start: 'bottom bottom', end: () => `bottom ${window.innerHeight - footer.offsetHeight}px`, scrub: 0.25, invalidateOnRefresh: true },
      });
    }, footer);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="sticky bottom-0 z-0 bg-ink text-white overflow-hidden h-[100svh] min-h-[620px] flex flex-col pt-6 pb-28 sm:pb-32">
      {/* faint white dot grid */}
      <div className="absolute inset-0 opacity-[.12] bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:22px_22px] pointer-events-none" aria-hidden="true" />
      <div data-footer-inner className="relative flex-1 min-h-0 flex flex-col">
        {/* shapes resting on a line, logo underneath */}
        <div className="flex-1 min-h-0 mx-4 sm:mx-[8%] border-b border-white/40 flex flex-col">
          <Playground />
        </div>
        <a href="#top" aria-label="PLEXO, back to the top" className="mt-5 sm:mt-6 mx-auto">
          {/* The PLEXO sticker, cut out from the original artwork with its solid white border */}
          <img src="/logo-sticker.webp" alt="PLEXO" className="h-28 sm:h-32 w-auto" draggable="false" />
        </a>
      </div>
    </footer>
  );
}
