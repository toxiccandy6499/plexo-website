import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { Wordmark } from './ui';
import { PixelFlow } from './PixelFlow';

/*
 * Temporary home screen: headline + subtitle only, while the new design is decided.
 * Lines rise in on load; on scroll the copy lifts and fades so "Pay. Save. Grow. Play." takes over.
 */
const SUB = 'Your own student debit card, UPI, savings, and investing that starts at just ₹100. Built for college students and grads.';

export function Hero() {
  const root = useRef(null);
  const copy = useRef(null);
  const sub = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current.querySelectorAll('[data-line]'), { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.1 });
      gsap.fromTo(sub.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' });
      gsap.fromTo(copy.current, { yPercent: 0, opacity: 1 }, {
        yPercent: -40, opacity: 0, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.25 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative min-h-[88svh] flex items-center justify-center overflow-hidden px-4 pt-10">
      <PixelFlow />
      <div ref={copy} className="relative text-center">
        <h1 className="text-[clamp(38px,calc(14.2vw_-_4.5px),58px)] leading-[1.04] sm:text-7xl md:text-[96px] font-semibold tracking-tightest">
          <span className="block overflow-hidden pb-[0.06em]"><span data-line className="block">Spend smarter,</span></span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-line className="inline-flex items-center gap-3 sm:gap-4">the <Wordmark className="h-[0.95em] translate-y-[0.04em]" /> way.</span>
          </span>
        </h1>
        <p ref={sub} className="mt-6 text-neutral-600 text-base sm:text-lg max-w-md mx-auto">{SUB}</p>
      </div>
    </section>
  );
}
