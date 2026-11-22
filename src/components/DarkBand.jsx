import React, { useLayoutEffect, useRef } from 'react';
import { Utensils, Tv, Zap, Film, Plane, ShoppingBag, Music, Bus } from 'lucide-react';
import { gsap } from '../lib/motion';

const categories = [
  [Utensils, 'Food & Dining'], [Tv, 'Streaming'], [Zap, 'Quick commerce'], [Film, 'Movies'],
  [Plane, 'Travel'], [ShoppingBag, 'Shopping'], [Music, 'Music'], [Bus, 'Cabs & rides'],
];

/** Eight category tiles that light up one by one while the section is held. */
function CategoryGrid() {
  return (
    <div className="mt-10 sm:mt-12 lg:mt-14 mx-auto w-full max-w-4xl lg:max-w-6xl px-4 grid grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4 lg:gap-6">
      {categories.map(([I, label]) => (
        <div key={label} data-tile className="flex flex-col items-center gap-2 text-center">
          <span data-tile-box className="w-[64px] h-[64px] sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] rounded-2xl sm:rounded-3xl bg-white/[.06] ring-1 ring-white/10 flex items-center justify-center">
            <I className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
          </span>
          <span className="text-[11px] sm:text-sm text-white/80 leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function DarkBand() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Enter: stays black (no grey in-between). It rises as a curved dome and spreads to fill
      // the screen; the content follows in once it's covered. Mirrors the white curve on the way out.
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: 0.25 } })
        .fromTo(root.current,
          { clipPath: 'ellipse(58% 100% at 50% 100%)' },
          { clipPath: 'ellipse(160% 100% at 50% 100%)', ease: 'none', duration: 0.85 }, 0)   // curved top widens
        .to(root.current, { clipPath: 'ellipse(220% 200% at 50% 100%)', ease: 'none', duration: 0.15 }, 0.85)  // corners fill
        .fromTo(root.current.querySelector('[data-binner]'),
          { y: 120, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, 0.4);

      // Hold: the screen pins while the words light up one by one and the category rings turn.
      const words = root.current.querySelectorAll('[data-hw]');
      const sub = root.current.querySelector('[data-hsub]');
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=120%', pin: true, scrub: 0.1 } });
      tl.fromTo(words, { opacity: 0.12, y: 20 }, { opacity: 1, y: 0, stagger: 0.25, ease: 'none' }, 0)
        .fromTo(sub, { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: 'none' }, '>-0.1');
      const tiles = root.current.querySelectorAll('[data-tile]');
      const boxes = root.current.querySelectorAll('[data-tile-box]');
      tl.fromTo(tiles, { opacity: 0.2, y: 12 }, { opacity: 1, y: 0, stagger: 0.12, ease: 'none' }, '>-0.05')
        .fromTo(boxes, { backgroundColor: 'rgba(255,255,255,0.06)', color: '#ffffff' },
          { backgroundColor: '#FFE600', color: '#111111', stagger: 0.12, ease: 'none' }, '<');
      tl.to({}, { duration: 0.35 }); // short pause with everything lit before the section releases

      // Exit: the white curve starts rising the moment the hold ends (no flat edge first).
      // Timed from the next section so it can only start after the hold has fully ended.
      const next = (root.current.closest('.pin-spacer') || root.current).nextElementSibling;
      gsap.fromTo(root.current.querySelector('[data-curve]'),
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: '50% 100%',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 45%', scrub: 0.25 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="rewards" className="relative bg-ink text-white overflow-hidden min-h-[100svh] flex flex-col justify-center py-16 -mt-px scroll-mt-0">
      <div data-binner>
      <div className="text-center px-4">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tightest leading-[1]">
          <span data-hw className="inline-block">Rewards</span> <span data-hw className="inline-block">on</span>
          <br />
          <span data-hw className="inline-block">everything.</span>
        </h2>
        <p data-hsub className="mt-5 text-white/60 text-lg max-w-xl mx-auto [text-wrap:balance]">
          Food, movies, rides, shopping and more. Get rewarded at the places you already spend.
        </p>
      </div>

      <CategoryGrid />
      </div>

      {/* the white curve that rises on the way out */}
      <div data-curve className="absolute -left-[10%] -right-[10%] bottom-0 h-[34%] bg-paper rounded-t-[50%] pointer-events-none" aria-hidden="true" />
    </section>
  );
}
