import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, adaptiveReveal } from '../lib/motion';
import { Utensils, Film, Zap, Tv, Lightbulb, Sparkles, Ticket, ShoppingBag, Coffee, Headphones, GraduationCap, Plane, ScanLine } from 'lucide-react';
import { Reveal, RiseText, GoldCoin, PlexoCard, useInView } from './ui';

function Panel({ children, dark = false, className = '' }) {
  return (
    <div className={`relative w-full rounded-[28px] overflow-hidden shadow-[0_30px_80px_-24px_rgba(0,0,0,.28)] ring-1 ${dark ? 'bg-ink ring-white/5 text-white' : 'bg-beige ring-line/60'} ${className}`}>
      {children}
    </div>
  );
}

/* 1. Pay: UPI scan & pay, zero fees */
function PayPanel() {
  const [ref, inView] = useInView(0.4);
  const contacts = [['A', 'Aarav', 'bg-plexo-yellow'], ['P', 'Priya', 'bg-plexo-red text-white'], ['R', 'Rohan', 'bg-ink text-white'], ['+', 'New', 'bg-paper']];
  return (
    <Panel>
      <div ref={ref} className="p-5 sm:p-7 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-500">Your UPI ID</div>
              <div className="text-lg font-semibold">you@plexo</div>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">Zero fees</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-medium">
            {['Scan & pay', 'Pay contacts', 'Split bills'].map((t) => (
              <div key={t} className="rounded-2xl bg-paper py-3">{t}</div>
            ))}
          </div>
          <div className="mt-5 text-xs text-neutral-500">Recent</div>
          <div className="mt-2 flex gap-3">
            {contacts.map(([l, n, c], i) => (
              <div key={n} className="text-center transition-all duration-500" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(10px)', transitionDelay: `${200 + i * 90}ms` }}>
                <span className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold ${c}`}>{l}</span>
                <div className="mt-1 text-[11px]">{n}</div>
              </div>
            ))}
          </div>
        </div>
        {/* scan frame with a moving scan line, then a paid tick */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-ink overflow-hidden">
          <div className="absolute inset-5 grid grid-cols-5 gap-1 opacity-80">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className={`rounded-[2px] ${[0, 1, 3, 4, 5, 9, 12, 15, 19, 20, 21, 23, 24, 7, 17].includes(i) ? 'bg-white' : 'bg-white/15'}`} />
            ))}
          </div>
          <span className="absolute inset-x-4 h-0.5 bg-plexo-yellow shadow-[0_0_12px_#FFE600] top-1/2" />
          <div
            className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center text-white transition-all duration-500"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(.6)', transitionDelay: '1.6s' }}
          >
            <span className="text-3xl">✓</span>
            <span className="text-sm font-semibold">Paid ₹149</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 3. Student perks: verify with college, unlock discounts */
function PerksPanel() {
  const [ref, inView] = useInView(0.3);
  const perks = [
    [Utensils, 'Dining out', 'Up to 40% off'],
    [Film, 'Movies', '20% off tickets'],
    [Tv, 'Streaming', 'Student pricing'],
    [ShoppingBag, 'Shopping', 'Extra 15% off'],
  ];
  return (
    <Panel>
      <div ref={ref} className="p-5 sm:p-7">
        <div className="rounded-2xl bg-paper p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-ink text-plexo-yellow flex items-center justify-center"><GraduationCap className="w-5 h-5" /></span>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-neutral-500">College email</div>
            <div className="text-sm font-semibold truncate">you@college.edu.in</div>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-500"
            style={{ background: inView ? '#ECFDF5' : '#ECE8DC', color: inView ? '#047857' : '#737373', transitionDelay: '450ms' }}
          >
            {inView ? '✓ Verified' : 'Checking…'}
          </span>
        </div>
        <div className="mt-5 text-xs text-neutral-500">Unlocked for you</div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {perks.map(([I, cat, deal], i) => (
            <div
              key={cat}
              className="rounded-2xl ring-1 ring-line/70 p-4 transition-all duration-500"
              style={{ opacity: inView ? 1 : 0.25, transform: inView ? 'none' : 'scale(.95)', transitionDelay: `${600 + i * 95}ms` }}
            >
              <I className="w-5 h-5" />
              <div className="mt-2 text-[11px] text-neutral-500">{cat}</div>
              <div className="text-sm font-semibold">{deal}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* 2. Card: the original site's cards fan out when they scroll in */
function CardsPanel() {
  const [ref, inView] = useInView(0.35);
  const cards = ['sunset', 'smiley', 'student', 'flame'];
  return (
    <Panel dark>
      <div ref={ref} className="relative aspect-[16/10] flex items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(229,35,32,.45),transparent_60%)]">
        {cards.map((v, i) => {
          const off = i - 1.5;
          const t = inView ? `translateX(${off * 58}%) rotate(${off * 9}deg) translateY(${Math.abs(off) * 12}px)` : 'translateX(0) rotate(0) translateY(40px)';
          return (
            <div
              key={v}
              className="absolute w-[38%] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
              style={{ transform: t, transitionDelay: inView ? `${i * 90}ms` : '0ms', zIndex: i === 2 ? 10 : 5 - Math.abs(Math.round(off)) }}
            >
              <div className="transition-transform duration-300 ease-out hover:-translate-y-5">
                <PlexoCard variant={v} className="w-full" shine={false} />
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* Save: one savings goal you add to whenever you like, like the app's Vault */
function SavePanel() {
  const [ref, inView] = useInView(0.3);
  const have = 18000, target = 25000;
  return (
    <Panel>
      <div ref={ref} className="p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-paper flex items-center justify-center"><Plane className="w-5 h-5" /></span>
          <div>
            <div className="text-xs text-neutral-500">Savings goal</div>
            <div className="text-lg font-semibold">Goa trip</div>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div className="text-3xl font-semibold tracking-tight tabular-nums">₹18,000</div>
          <div className="text-sm text-neutral-500 tabular-nums">of ₹25,000</div>
        </div>
        <div className="mt-3 h-3 rounded-full bg-paper-dark overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-plexo-red to-plexo-gold transition-[width] duration-[1200ms] ease-out"
            style={{ width: inView ? `${(have / target) * 100}%` : '0%' }} />
        </div>

        <div className="mt-6 text-xs text-neutral-500">Put a little aside</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {['₹100', '₹500', '₹1,000'].map((v, i) => (
            <span key={v} className="rounded-2xl bg-paper py-3 text-center text-sm font-semibold transition-all duration-500"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(10px)', transitionDelay: `${350 + i * 85}ms` }}>{v}</span>
          ))}
          <span className="rounded-2xl bg-ink text-white py-3 text-center text-sm font-semibold transition-all duration-500"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(10px)', transitionDelay: '605ms' }}>+ Add</span>
        </div>
      </div>
    </Panel>
  );
}

/* Invest: a paper receipt printing out of a slot — a monthly bill for future you */
function InvestPanel() {
  const [ref, inView] = useInView(0.35);
  const paper = useRef(null);
  usePrint(paper, ref);
  const rows = [
    ['Amount', '₹100.00', 'font-bold'],
    ['  Digital gold', '₹50.00', ''],
    ['  Mutual funds', '₹50.00', ''],
    ['Fees', '₹0.00', ''],
  ];
  const line = (i) => ({ opacity: inView ? 1 : 0, transition: 'opacity .25s', transitionDelay: `${700 + i * 160}ms` });
  return (
    <div ref={ref} className="relative w-full rounded-[28px] bg-plexo-red overflow-hidden shadow-[0_30px_80px_-24px_rgba(0,0,0,.28)] px-6 sm:px-10 pt-7 pb-8">
      {/* printer slot */}
      <div className="relative z-20 mx-auto max-w-[340px] h-4 rounded-full bg-[#7A0F0D] shadow-[inset_0_3px_4px_rgba(0,0,0,.45)]" />

      {/* receipt */}
      <div className="relative z-10 mx-auto max-w-[300px] -mt-2 overflow-hidden">
        <div
          className="bg-[#FFFDF6] text-ink font-mono text-[12px] sm:text-[13px] leading-relaxed px-5 pt-6 pb-8 shadow-[0_10px_20px_rgba(0,0,0,.2)] [mask-image:linear-gradient(-45deg,transparent_6px,#000_0),linear-gradient(45deg,transparent_6px,#000_0)] [mask-position:bottom] [mask-size:12px_100%] [mask-repeat:repeat-x] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
          ref={paper}
        >
          <div className="text-center">
            <div className="font-rubik font-black text-xl tracking-tight">PLEXO</div>
            <div className="text-[10px] tracking-[.2em] text-neutral-500">MONTHLY · AUTO-INVEST</div>
          </div>
          <div className="my-3 border-t border-dashed border-neutral-400" />
          {rows.map(([l, v, w], i) => (
            <div key={l} className={`flex justify-between whitespace-pre ${w}`} style={line(i)}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div className="my-3 border-t border-dashed border-neutral-400" />
          <div className="flex justify-between font-bold text-base" style={line(4)}>
            <span>TOTAL</span><span>₹100.00</span>
          </div>
          <div className="mt-1 text-[10px] text-neutral-500" style={line(5)}>Next on the 1st · every month</div>

          {/* barcode */}
          <div className="mt-5 flex h-10 items-stretch justify-center gap-[2px]" style={line(6)}>
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1].map((w, i) => (
              <span key={i} className="bg-ink" style={{ width: w }} />
            ))}
          </div>
          <div className="mt-4 text-center font-hand text-2xl -rotate-2" style={line(7)}>thank you, future you ♥</div>
        </div>
      </div>
    </div>
  );
}

/* 4. Play: mini games from the app */
function Wheel() {
  const wheelRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(wheelRef.current, { rotate: -120 }, { rotate: 240, ease: 'none', transformOrigin: '50% 50%',
        scrollTrigger: { trigger: wheelRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.1 } });
    });
    return () => ctx.revert();
  }, []);
  const colors = ['#E52320', '#FFE600', '#111111', '#FFB800', '#E52320', '#FFE600', '#111111', '#FFB800'];
  return (
    <div className="relative w-full aspect-square">
      <svg ref={wheelRef} viewBox="-50 -50 100 100" className="w-full h-full">
        {colors.map((c, i) => {
          const a1 = (i / 8) * Math.PI * 2, a2 = ((i + 1) / 8) * Math.PI * 2;
          return <path key={i} d={`M0 0 L${45 * Math.cos(a1)} ${45 * Math.sin(a1)} A45 45 0 0 1 ${45 * Math.cos(a2)} ${45 * Math.sin(a2)} Z`} fill={c} stroke="#fff" strokeWidth="1" />;
        })}
        <circle r="9" fill="#fff" />
      </svg>
      <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[12px] border-t-white" />
    </div>
  );
}

function GamesPanel() {
  return (
    <Panel dark>
      <div className="p-5 sm:p-7 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-charcoal p-4 sm:p-5 flex flex-col">
          <div className="text-xs text-white/50">Daily wheel</div>
          <div className="font-semibold">One free spin a day</div>
          <div className="mt-3 w-full max-w-[160px] mx-auto"><Wheel /></div>
        </div>
        <div className="rounded-3xl bg-plexo-red p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-white/70">Money quiz</div>
            <div className="font-semibold text-sm leading-tight">5 questions, 10 coins each</div>
          </div>
          <Lightbulb className="w-10 h-10 self-end" />
        </div>
        <div className="col-span-2 rounded-3xl bg-white/5 p-4">
          <div className="text-xs text-white/50">Coupon store</div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[['₹100 off', 'Food', 80, 'bg-plexo-yellow text-ink'], ['20% off', 'Movies', 120, 'bg-beige text-ink'], ['1 month', 'Streaming', 150, 'bg-plexo-red text-white']].map(([deal, cat, price, tone]) => (
              <div key={cat} className={`relative rounded-xl px-2.5 py-2.5 ${tone}`}>
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-charcoal" />
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-charcoal" />
                <div className="text-sm font-semibold leading-tight">{deal}</div>
                <div className="text-[11px] opacity-70">{cat}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold"><GoldCoin className="w-3.5 h-3.5" /> {price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 5. Coupon store */
function StorePanel() {
  const [ref, inView] = useInView(0.3);
  const items = [
    [Utensils, 'Food & Dining', '₹100 off', 80, 'bg-plexo-yellow'],
    [Film, 'Movies', '20% off tickets', 120, 'bg-plexo-red text-white'],
    [Tv, 'Streaming', '1 month free', 150, 'bg-ink text-white'],
    [Headphones, 'Music', '3 months premium', 200, 'bg-paper'],
    [ShoppingBag, 'Shopping', '₹200 off', 90, 'bg-paper'],
    [Ticket, 'Mystery foil', 'Surprise reward', 60, 'bg-plexo-gold'],
  ];
  return (
    <Panel>
      <div ref={ref} className="p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-neutral-500">Coupon store</div>
            <div className="text-lg font-semibold">Swap coins for coupons</div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-paper rounded-full pl-1.5 pr-3 py-1 text-sm font-semibold tabular-nums"><GoldCoin className="w-5 h-5" /> 1,250</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map(([I, cat, deal, price, bg], i) => (
            <div
              key={cat}
              className={`rounded-2xl p-3.5 ${bg} transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'scale(.85)', transitionDelay: `${i * 90}ms` }}
            >
              <I className="w-5 h-5" />
              <div className="mt-3 text-[11px] opacity-60">{cat}</div>
              <div className="text-sm font-semibold leading-tight">{deal}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold"><GoldCoin className="w-4 h-4" /> {price}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

const steps = [
  { id: 'card', label: 'Pay with UPI or your\nstudent debit card.', sub: 'Zero-fee UPI, plus your own debit card built only for college students and graduates.', panel: <CardsPanel /> },
  { id: 'perks', label: 'Unlock student-only\ndiscounts.', sub: 'Verify with your college email once. Discounts unlock straight away.', panel: <PerksPanel /> },
  { id: 'save', label: 'Save for the\nthings you want.', sub: 'Set goals and put a little aside whenever you like.', panel: <SavePanel /> },
  { id: 'invest', label: 'Start investing from\n₹100 a month.', sub: 'Through spare change from every payment, or one-time deposits.', panel: <InvestPanel /> },
  { id: 'games', label: 'Earn rewards.\nPlay. Treat yourself.', sub: 'Every payment earns rewards as Plexo Coins. Play free daily games and swap them for coupons.', panel: <GamesPanel /> },
]


/**
 * Big heading pins in the middle of the screen while its words light up one by one with the scroll,
 * then the line under it fades in, then it holds for a moment before whatever comes next arrives.
 * Used for "Pay. Save. Grow. Play." and "Your money, finally fun."
 */
export function PinnedWords({ words, breakAfter = -1, sub, exit = true, className = '', children }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ws = root.current.querySelectorAll('[data-hw]');
      const subEl = root.current.querySelectorAll('[data-hsub]'); // the line under it, plus anything extra (fades in together)
      const inner = root.current.querySelector('[data-hinner]');
      // Enter: rises in as it comes up the screen (overlaps the section before, so no empty gap)
      gsap.fromTo(inner, { y: 60 }, { y: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: 0.25 } });
      // Hold in the middle: words light up, then the line under it, then a short pause.
      // The pause is long enough that the next section only starts coming up after the line has appeared.
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'center center', end: '+=120%', pin: true, scrub: 0.1 } });
      tl.fromTo(ws, { opacity: 0.12, y: 24 }, { opacity: 1, y: 0, stagger: 0.25, ease: 'none' })
        .fromTo(subEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none' }, '-=0.1')
        .to({}, { duration: 1.1 });
      if (!exit) return;
      // Exit: scales down and fades as the next section comes up
      const next = (root.current.closest('.pin-spacer') || root.current).nextElementSibling;
      if (!next) return;
      gsap.timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: 0.25 } })
        .to(inner, { scale: 0.9, y: -80, ease: 'none', duration: 1 }, 0)
        .to(inner, { opacity: 0, ease: 'power1.in', duration: 0.6 }, 0.4);
    }, root);
    return () => ctx.revert();
  }, [exit]);
  return (
    <div ref={root} className={`py-10 sm:py-16 flex flex-col items-center justify-center px-4 text-center ${className}`}>
      <div data-hinner>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tightest leading-[1.02]">
          {words.map((w, i) => (
            <React.Fragment key={w}>
              <span data-hw className="inline-block mx-[0.12em]">{w}</span>
              {i === breakAfter && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p data-hsub className="mt-6 text-lg text-neutral-600 max-w-md mx-auto">{sub}</p>
        {children && <div data-hsub>{children}</div>}
      </div>
    </div>
  );
}

/** Panel opens from a smaller rounded window to full size as it reaches the middle of the screen. */
function ClipIn({ className = '', children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      adaptiveReveal(ref.current,
        { clipPath: 'inset(14% 12% 14% 12% round 28px)', scale: 0.94, y: 40 },
        { clipPath: 'inset(0% 0% 0% 0% round 28px)', scale: 1, y: 0 },
        { start: 'top 90%', slow: 1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Receipt slides out of the printer slot as you scroll (and back in if you scroll up). */
function usePrint(paperRef, slotRef) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      adaptiveReveal(paperRef.current, { yPercent: -100 }, { yPercent: 0 },
        { trigger: slotRef.current, start: 'top 75%', slow: 1.4, fast: 0.4 });
    });
    return () => ctx.revert();
  }, [paperRef, slotRef]);
}

/** Fills the vertical line as you scroll through the section. */
function useScrollProgress() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        setP(Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p];
}

export function Timeline() {
  const [lineRef, progress] = useScrollProgress();
  return (
    <section id="how" className="relative pb-32 scroll-mt-0">
      <PinnedWords words={['Pay.', 'Save.', 'Grow.', 'Play.']} sub="Everything your money does, in one app." />

      <div ref={lineRef} className="relative max-w-5xl xl:max-w-6xl mx-auto mt-10 px-5 sm:px-8">
        {/* track + scroll-filled progress (left edge, phone and laptop) */}
        <div className="absolute left-[21px] sm:left-[33px] top-2 bottom-0 w-px bg-line" aria-hidden="true" />
        <div className="absolute left-[20px] sm:left-[32px] top-2 w-[3px] rounded-full bg-gradient-to-b from-plexo-red to-plexo-gold" style={{ height: `${progress * 100}%` }} aria-hidden="true" />

        <div className="grid gap-28 md:gap-44">
          {steps.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24 grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,540px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,580px)] gap-6 md:gap-12 xl:gap-14 items-center pl-8 md:pl-0">
              <Reveal adaptive variant="from-left" className="relative flex items-center gap-5">
                <span className="absolute -left-[37px] md:static md:-ml-[5px] z-10 w-3 h-3 rounded-full bg-ink ring-4 ring-paper shrink-0" />
                <div>
                  <p className="text-2xl md:text-[32px] xl:text-[40px] font-medium tracking-tight leading-[1.08] whitespace-pre-line">{s.label}</p>
                  {s.sub && <p className="mt-3 xl:mt-5 max-w-xs xl:max-w-sm text-[15px] xl:text-lg text-neutral-500 leading-snug">{s.sub}</p>}
                </div>
              </Reveal>
              <ClipIn className="w-full min-w-0 max-w-[540px] xl:max-w-[580px] md:justify-self-end">{s.panel}</ClipIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
