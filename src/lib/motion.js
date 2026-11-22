import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

/**
 * Smooth scrolling (Lenis) driven by GSAP's ticker, so every ScrollTrigger
 * animation stays in sync with the smoothed scroll position.
 */
export function startSmoothScroll() {
  if (lenis) return lenis;
  // Light smoothing for mouse wheels only; phones keep native touch scrolling (most responsive).
  lenis = new Lenis({ lerp: 0.18, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page links (#how, #rewards, …) glide instead of jumping.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = id === '#top' ? 0 : document.querySelector(id);
    if (el === null) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  });
  return lenis;
}

export function stopScroll(stop) {
  if (!lenis) return;
  stop ? lenis.stop() : lenis.start();
}

/**
 * Speed-aware reveal. Plays when `trigger` reaches `start`, at a duration matched to how
 * fast you're scrolling: slow scroll = full, graceful reveal; fast flick = snappy reveal.
 * Always finishes (never frozen half-way) and reverses quickly if you scroll back up past it.
 */
export function adaptiveReveal(targets, from, to, { trigger, start = 'top 88%', slow = 0.9, fast = 0.25, stagger = 0 } = {}) {
  const tween = gsap.fromTo(targets, from, { ...to, paused: true, ease: 'power3.out', duration: slow, stagger });
  const durationFor = (self) => {
    const v = Math.abs(self.getVelocity()); // px per second
    return gsap.utils.clamp(fast, slow, slow - (v / 3000) * (slow - fast));
  };
  const st = ScrollTrigger.create({
    trigger: trigger || (targets.length ? targets[0] : targets),
    start,
    onEnter: (self) => { tween.timeScale(slow / durationFor(self)).play(); },
    onLeaveBack: () => { tween.timeScale(3).reverse(); },
  });
  // Already scrolled past on load (e.g. refresh mid-page): show it finished.
  if (st.progress > 0 || window.scrollY > st.start) tween.progress(1);
  return { tween, st };
}

if (import.meta.env.DEV) window.__motion = { gsap, ScrollTrigger };

export { gsap, ScrollTrigger };
