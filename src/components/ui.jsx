import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, adaptiveReveal } from '../lib/motion';

/* ---------- Social accounts (edit handles/links here only) ---------- */
export const SOCIALS = [
  { name: 'Instagram', handle: '@plexopay', href: 'https://instagram.com/plexopay' },
  { name: 'YouTube', handle: '@plexopay', href: 'https://youtube.com/@plexopay' },
  { name: 'X', handle: '@Plexo_Pay', href: 'https://x.com/Plexo_Pay' },
];

export function SocialIcon({ name, className = 'w-4 h-4' }) {
  if (name === 'Instagram')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
    );
  if (name === 'YouTube')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.8 3.1-5.8 3.1z" /></svg>
    );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  );
}

/* ---------- Reveal on scroll ---------- */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/**
 * Scroll-linked reveal: the element eases in as it travels up the screen and plays
 * backwards if you scroll back up (GSAP ScrollTrigger, scrubbed).
 * variant: '' | 'from-left' | 'from-right' | 'zoom'. `instant` = play once on load (for the hero).
 */
export function Reveal({ as: Tag = 'div', delay = 0, variant = '', instant = false, adaptive = false, className = '', children, ...rest }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = { opacity: 0, y: 36 };
    if (variant === 'from-left') Object.assign(from, { y: 0, x: -48 });
    if (variant === 'from-right') Object.assign(from, { y: 0, x: 48 });
    if (variant === 'zoom') Object.assign(from, { y: 0, scale: 0.9 });
    const ctx = gsap.context(() => {
      if (instant) {
        gsap.from(el, { ...from, duration: 1, delay: delay / 1000, ease: 'power3.out' });
      } else {
        const shift = Math.min(6, delay / 60);
        if (adaptive) {
          // speed-aware: plays at a pace matched to how fast you're scrolling (feature steps only)
          adaptiveReveal(el, from, { opacity: 1, x: 0, y: 0, scale: 1 }, { start: `top ${92 - shift}%` });
        } else {
          // scroll-glued: follows your finger exactly
          gsap.fromTo(el, from, {
            opacity: 1, x: 0, y: 0, scale: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: `top ${82 - shift}%`, end: `top ${50 - shift}%`, scrub: 0.25 },
          });
        }
      }
    });
    return () => ctx.revert();
  }, [variant, instant, adaptive, delay]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Headline whose words rise one after another, tied to scroll position. */
export function RiseText({ text, className = '', start = 0 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('[data-w]');
    const ctx = gsap.context(() => {
      const shift = Math.min(6, start / 40);
      gsap.fromTo(words, { yPercent: 110, opacity: 0 }, {
        yPercent: 0, opacity: 1, ease: 'none', stagger: 0.12,
        scrollTrigger: { trigger: el, start: `top ${84 - shift}%`, end: `top ${52 - shift}%`, scrub: 0.25 },
      });
    });
    return () => ctx.revert();
  }, [start]);
  return (
    <span ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span data-w className="inline-block">{w}</span>
          </span>{' '}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ---------- Gold coin ---------- */
export function GoldCoin({ className = 'w-8 h-8', flip = false }) {
  return (
    <span className={`inline-block [perspective:400px] ${className}`}>
      <img src="/plexo_coin_gold-p.png" alt="" className={`pixel w-full h-full object-contain ${flip ? 'coin-flip' : ''}`} />
    </span>
  );
}

/** Round chip with a gold coin, sitting at the end of a headline (Zero-style). */
export function CoinChip({ className = '', delay = 400 }) {
  return (
    <span
      className={`pop-in relative inline-flex align-middle ml-3 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-beige shadow-[0_6px_20px_rgba(0,0,0,.12)] ring-1 ring-black/5 items-center justify-center ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <GoldCoin className="w-[62%] h-[62%]" />
    </span>
  );
}

export function Wordmark({ className = 'h-9' }) {
  return (
    <span className={`group relative inline-block align-middle ${className}`}>
      <img src="/logo.png" alt="PLEXO" className="h-full w-auto object-contain transition-all duration-200 group-hover:opacity-0" />
      <img src="/logo_torn.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-auto object-contain opacity-0 rotate-[-1deg] transition-all duration-200 group-hover:opacity-100 group-hover:rotate-[1.5deg] group-hover:scale-105" />
    </span>
  );
}

/* ---------- Cards from the original site (pure vector, no photos) ---------- */
function Chip() {
  return (
    <div className="w-[18%] aspect-[1.4] rounded-[4px] bg-gradient-to-br from-[#F5D77A] via-[#D4A93C] to-[#B8862A] grid grid-cols-3 gap-px p-[2px] shadow-inner">
      {Array.from({ length: 6 }).map((_, i) => <span key={i} className="bg-black/15 rounded-[1px]" />)}
    </div>
  );
}
function Waves() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-90">
      <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
      <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
      <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
    </svg>
  );
}
function Flame() {
  return (
    <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="fo" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="0%" stopColor="#DC2626" /><stop offset="100%" stopColor="#F97316" stopOpacity=".85" /></linearGradient>
        <linearGradient id="fm" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="0%" stopColor="#EA580C" /><stop offset="100%" stopColor="#FBBF24" /></linearGradient>
        <linearGradient id="fc" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="0%" stopColor="#F59E0B" /><stop offset="60%" stopColor="#FFE600" /><stop offset="100%" stopColor="#FFFBEB" /></linearGradient>
      </defs>
      <path d="M-10 120 C10 80, 25 95, 35 60 C45 90, 60 75, 75 45 C90 80, 110 50, 125 35 C140 70, 160 55, 175 70 C190 85, 205 60, 215 120 Z" fill="url(#fo)" opacity=".85" />
      <path d="M0 120 C15 95, 30 85, 45 70 C60 100, 80 65, 95 50 C110 90, 130 65, 145 55 C160 85, 180 75, 200 120 Z" fill="url(#fm)" />
      <path d="M15 120 C30 105, 45 90, 60 85 C75 105, 95 80, 110 68 C125 95, 145 80, 160 78 C175 105, 185 95, 195 120 Z" fill="url(#fc)" />
      <path d="M40 120 C50 110, 55 100, 65 94 C75 108, 90 95, 105 82 C120 102, 135 94, 145 90 C155 110, 165 105, 170 120 Z" fill="#fff" opacity=".7" />
    </svg>
  );
}

/** variant: 'student' | 'sunset' | 'smiley' | 'flame' */
export function PlexoCard({ variant = 'student', className = '', style, shine = false }) {
  const base = `relative aspect-[1.586] rounded-[14px] overflow-hidden select-none ${shine ? 'shine' : ''} ${className}`;
  if (variant === 'student')
    return (
      <div className={`${base} flex flex-col border border-black/10 shadow-[0_18px_40px_-12px_rgba(0,0,0,.45)]`} style={style}>
        <div className="bg-plexo-red h-[65%] p-[7%] text-white flex justify-between items-start"><Chip /><span className="font-rubik font-black text-[clamp(10px,1.3vw,16px)] tracking-tight">plexo</span></div>
        <div className="bg-plexo-yellow h-[35%] px-[7%] flex items-center justify-between text-black"><span className="font-mono font-bold text-[clamp(8px,0.9vw,11px)] tracking-wider">STUDENT</span><Waves /></div>
      </div>
    );
  const bg = {
    sunset: 'bg-gradient-to-tr from-[#6D28D9] via-[#DB2777] to-[#F59E0B] border-white/40',
    smiley: 'bg-[#0E0E10] border-neutral-700',
    flame: 'bg-[#0A0A0C] border-orange-500/40',
  }[variant];
  return (
    <div className={`${base} ${bg} border text-white p-[7%] flex flex-col justify-between shadow-[0_18px_40px_-12px_rgba(0,0,0,.6)]`} style={style}>
      {variant === 'flame' && <Flame />}
      <div className="relative flex justify-between items-start"><Chip /><span className="font-rubik font-black text-[clamp(10px,1.3vw,16px)] tracking-tight drop-shadow">plexo</span></div>
      {variant === 'smiley' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-[22%] aspect-square rounded-full bg-plexo-yellow text-black font-black flex items-center justify-center text-[clamp(12px,1.6vw,20px)]">☺</span>
        </div>
      )}
      <div className="relative flex justify-between items-end"><Waves /><span className="font-mono font-bold text-[clamp(7px,0.8vw,10px)] tracking-wider text-white/80">DEBIT</span></div>
    </div>
  );
}
