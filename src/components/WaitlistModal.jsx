import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X, ArrowRight, Loader2, AlertCircle, Check } from 'lucide-react';
import { gsap } from '../lib/motion';
// Lighter first load: the Supabase code isn't part of the first page download.
// It's fetched quietly in the background once the page has loaded and the device is idle,
// so it's almost always ready before anyone opens the form (and again on open, just in case).
let apiPromise = null;
const loadWaitlistApi = () => {
  if (!apiPromise) apiPromise = import('../lib/supabaseClient').catch((err) => { apiPromise = null; throw err; });
  return apiPromise;
};
// Open the connection to the waitlist server ahead of time (address lookup + secure handshake),
// so the tap on "Get early access" only has to send the data. Re-done when the form opens,
// because browsers drop unused warm connections after a few seconds.
const SUPABASE_ORIGIN = (() => { try { return new URL(import.meta.env.VITE_SUPABASE_URL).origin; } catch { return null; } })();
const warmConnection = () => {
  if (!SUPABASE_ORIGIN || typeof document === 'undefined') return;
  document.querySelectorAll('link[data-waitlist-warm]').forEach((l) => l.remove());
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = SUPABASE_ORIGIN;
  link.crossOrigin = 'anonymous';
  link.dataset.waitlistWarm = '1';
  document.head.appendChild(link);
};
if (typeof window !== 'undefined') {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
  const prefetch = () => idle(() => { warmConnection(); loadWaitlistApi().catch(() => {}); });
  if (document.readyState === 'complete') prefetch();
  else window.addEventListener('load', prefetch, { once: true });
}

// Keep what the visitor typed (this tab only) so a refresh on a bad connection doesn't wipe it.
const DRAFT_KEY = 'plexo-waitlist-draft';
const readDraft = () => {
  try { return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) || {}; } catch { return {}; }
};
const saveDraft = (d) => { try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch { /* storage unavailable */ } };
const clearDraft = () => { try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ } };

// Values must stay the same: the Supabase table only accepts these three.
const occupations = [
  ['Student', 'College student'],
  ['Working Individual', 'Graduate'],
  ['Other', 'Other'],
];
const inputCls =
  'w-full h-11 [@media(max-height:700px)]:h-10 px-4 rounded-xl bg-ivory ring-1 ring-line text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-plexo-yellow focus:bg-white transition';
// Same soft pastels as the PLEXO app's payment success. A different one each time.
const PASTELS = ['#FFEC8A', '#BFEBCF', '#BCDCFF', '#D9CCFF', '#FFCBE0', '#FFD9B8'];
let lastPastel = null;
const nextPastel = () => {
  const choices = PASTELS.filter((c) => c !== lastPastel);
  lastPastel = choices[Math.floor(Math.random() * choices.length)];
  return lastPastel;
};

export function WaitlistModal({ isOpen, onClose, preview = null }) {
  const [draft] = useState(() => (preview ? { fullName: 'Aarav Mehta', email: 'aarav@example.com', phone: '+91 98765 43210', age: '20' } : readDraft()));
  const [fullName, setFullName] = useState(draft.fullName || '');
  const [email, setEmail] = useState(draft.email || '');
  const [phone, setPhone] = useState(draft.phone || '');
  const [age, setAge] = useState(draft.age || '');
  const [occupation, setOccupation] = useState(draft.occupation || 'Student');
  const [honeypot, setHoneypot] = useState(''); // anti-bot trap (unchanged from v1)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(preview === 'success');
  // The server still returns a queue number, but it's deliberately never shown to the visitor.

  // Save the form as they type
  useEffect(() => {
    if (fullName || email || phone || age) saveDraft({ fullName, email, phone, age, occupation });
  }, [fullName, email, phone, age, occupation]);

  useEffect(() => {
    if (!isOpen) return;
    loadWaitlistApi(); // warm it up while the visitor types
    warmConnection();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const sheet = useRef(null);
  const backdrop = useRef(null);
  const success = useRef(null);
  const floodRef = useRef(null);
  const formRef = useRef(null);
  const submitRef = useRef(null);
  const floodAt = useRef(0); // when the colour started spreading (0 = not yet)
  const [flooding, setFlooding] = useState(false);

  // Open: backdrop fades, sheet springs up, fields cascade in
  useLayoutEffect(() => {
    if (!isOpen || !sheet.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(sheet.current, { y: 80, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
      gsap.fromTo(sheet.current.querySelectorAll('[data-field]'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06, delay: 0.15 });
    });
    return () => ctx.revert();
  }, [isOpen]);

  const [pastel, setPastel] = useState(() => nextPastel());

  // The pastel spreads out from a point (the button) as a growing circle until it fills the sheet.
  const startFlood = (origin) => {
    const s = sheet.current, f = floodRef.current;
    if (!s || !f) return;
    const color = nextPastel();
    setPastel(color);
    const w = s.offsetWidth, h = Math.max(s.offsetHeight, 900);
    const r = Math.hypot(Math.max(origin.x, w - origin.x), Math.max(origin.y, h - origin.y)) + 24;
    gsap.killTweensOf(f);
    gsap.set(f, { left: origin.x - r, top: origin.y - r, width: r * 2, height: r * 2, scale: 0, backgroundColor: color });
    gsap.to(f, { scale: 1, duration: 0.75, ease: 'power2.inOut' });
    if (formRef.current) gsap.to(formRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.35, delay: 0.05 });
    floodAt.current = performance.now();
    setFlooding(true);
  };
  // Something went wrong: pull the colour back into the button and show the form again.
  const undoFlood = () => {
    gsap.killTweensOf([floodRef.current, formRef.current].filter(Boolean)); // stop the spread mid-way if it's still going
    if (floodRef.current) gsap.to(floodRef.current, { scale: 0, duration: 0.5, ease: 'power2.inOut' });
    if (formRef.current) gsap.to(formRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
    floodAt.current = 0;
    setFlooding(false);
  };

  // Joined (like a PLEXO app payment): pastel floods up from the button, a tick pops and draws,
  // then slowly spins on its axis and lands as a gold PLEXO coin.
  useLayoutEffect(() => {
    if (!isOpen || !submitted || !success.current) return;
    const q = (sel) => success.current.querySelectorAll(sel);
    // Preview (?waitlist=success) has no tap, so spread from the bottom middle instead.
    // (Kept outside the context below so a re-run of this effect can't undo it.)
    if (!floodAt.current && sheet.current) startFlood({ x: sheet.current.offsetWidth / 2, y: sheet.current.offsetHeight - 48 });
    const ctx = gsap.context(() => {
      const wait = Math.max(0, 0.55 - (performance.now() - floodAt.current) / 1000);
      const tl = gsap.timeline({ delay: wait });
      tl.fromTo(q('[data-tick-circle]'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, ease: 'back.out(2)' })
        .fromTo(q('[data-tick-path]'), { strokeDashoffset: 64 }, { strokeDashoffset: 0, duration: 0.36, ease: 'power3.out' }, '-=0.12')
        .fromTo(q('[data-tick-ring]'), { scale: 1, opacity: 0.45 }, { scale: 1.6, opacity: 0, duration: 0.7, ease: 'power3.out', immediateRender: false }, '<')
        .fromTo(q('[data-rise]'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.07 }, '-=0.3')
        // the slow spin: 2.5 turns, easing in and out, ending on the coin face
        .to(q('[data-spinner]'), { rotateY: 900, duration: 2.4, ease: 'power2.inOut' }, '+=0.35')
        .fromTo(q('[data-coin-ring]'), { scale: 1, opacity: 0.6 }, { scale: 1.7, opacity: 0, duration: 0.8, ease: 'power3.out', immediateRender: false }, '-=0.15')
        .fromTo(q('[data-coin-shine]'), { xPercent: -160 }, { xPercent: 420, duration: 0.8, ease: 'power2.inOut', immediateRender: false }, '<')
        .to(q('[data-spinner]'), { y: -6, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, success);
    return () => ctx.revert();
  }, [isOpen, submitted]);

  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName || !email || !phone || !age) return;
    if (parseInt(age, 10) < 18) {
      setErrorMessage('PLEXO is for people aged 18 and over.');
      return;
    }
    setIsLoading(true);
    // Start the celebration straight away from the button; the server answer arrives while it plays.
    const s = sheet.current, b = submitRef.current;
    if (s && b) {
      const sr = s.getBoundingClientRect(), br = b.getBoundingClientRect();
      startFlood({ x: br.left - sr.left + br.width / 2, y: br.top - sr.top + br.height / 2 });
    }
    let api;
    try {
      api = await loadWaitlistApi();
    } catch {
      undoFlood();
      setErrorMessage('Your connection dropped. Refresh the page and tap Get early access again. Your details are saved.');
      setIsLoading(false);
      return;
    }
    try {
      const { submitWaitlistEntry } = api;
      const result = await submitWaitlistEntry({ fullName, email, phone, age, occupation, honeypot });
      if (result.success) {
        setSubmitted(true);
        clearDraft();
      } else {
        undoFlood();
        setErrorMessage(result.error || 'Failed to submit. Please try again.');
      }
    } catch {
      undoFlood();
      setErrorMessage('Something went wrong. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    floodAt.current = 0;
    setFlooding(false);
    setSubmitted(false);
    setFullName(''); setEmail(''); setPhone(''); setAge('');
    setOccupation('Student'); setHoneypot(''); setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
      <div ref={backdrop} className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Join the waitlist"
        className="relative w-full sm:max-w-md bg-beige rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden"
      >
        {/* pastel colour that spreads out from the button, behind the content (the form fades out as it spreads) */}
        <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden" aria-hidden="true">
          <span ref={floodRef} data-flood className="absolute left-0 top-0 w-0 h-0 rounded-full" style={{ background: pastel, transform: 'scale(0)' }} />
        </div>
        {/* only shows if the server is slow to answer */}
        {flooding && isLoading && (
          <div className="pointer-events-none absolute inset-0 z-[16] flex items-center justify-center" aria-live="polite">
            <span className="wait-in flex items-center gap-2 text-sm font-semibold text-ink/70"><Loader2 className="w-4 h-4 animate-spin" /> Securing your spot…</span>
          </div>
        )}
        <button onClick={onClose} className="absolute z-30 top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-ivory hover:bg-white ring-1 ring-line flex items-center justify-center" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-20 px-4 min-[380px]:px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8 max-h-[92svh] supports-[height:100dvh]:max-h-[92dvh] overflow-y-auto overscroll-contain">
        {/* grab handle (phones) */}
        <div className="sm:hidden mx-auto mb-3 h-1.5 w-11 rounded-full bg-ink/15" />

        {!submitted ? (
          <div key="form" ref={formRef}>
            <span data-field className="inline-block font-mono text-[11px] font-bold tracking-[.2em] bg-ink text-plexo-yellow px-2.5 py-1 rounded-md">EARLY ACCESS</span>
            <h3 data-field className="mt-3 [@media(max-height:700px)]:mt-2 text-[clamp(24px,7.4vw,28px)] leading-[1.02] font-semibold tracking-tightest">Claim your spot.</h3>
            <p data-field className="mt-1.5 [@media(max-height:700px)]:mt-1 text-sm text-neutral-600">Be first in line for PLEXO. Takes 20 seconds.</p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3 [@media(max-height:700px)]:mt-3.5 [@media(max-height:700px)]:gap-2">
              <label data-field className="grid gap-1.5 [@media(max-height:700px)]:gap-1">
                <span className="text-xs font-semibold text-neutral-600">Full name</span>
                <input required autoComplete="name" className={inputCls} placeholder="Maya Sharma" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </label>
              <label data-field className="grid gap-1.5 [@media(max-height:700px)]:gap-1">
                <span className="text-xs font-semibold text-neutral-600">Email</span>
                <input required type="email" autoComplete="email" className={inputCls} placeholder="maya@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <div data-field className="grid grid-cols-[1fr_76px] gap-3">
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-neutral-600">Phone</span>
                  <input required type="tel" autoComplete="tel" className={inputCls} placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-neutral-600">Age</span>
                  <input required type="number" inputMode="numeric" min="18" max="100" className={inputCls} placeholder="20" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
              </div>

              <div data-field className="grid gap-1.5 [@media(max-height:700px)]:gap-1">
                <span className="text-xs font-semibold text-neutral-600">I am a</span>
                {/* One black pill slides between the options (instead of each button switching on/off) */}
                <div className="relative grid grid-cols-3 gap-1 p-1 rounded-2xl bg-ivory ring-1 ring-line">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 bottom-1 left-1 rounded-xl bg-ink shadow-sm transition-transform duration-[450ms] ease-[cubic-bezier(.34,1.3,.5,1)] will-change-transform"
                    style={{
                      width: 'calc((100% - 16px) / 3)',
                      transform: `translateX(calc(${Math.max(0, occupations.findIndex(([v]) => v === occupation))} * (100% + 4px)))`,
                    }}
                  />
                  {occupations.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={occupation === value}
                      onClick={() => setOccupation(value)}
                      className={`relative z-10 min-h-9 py-1 rounded-xl text-[12px] min-[380px]:text-[13px] font-semibold leading-tight transition-colors duration-300 ${occupation === value ? 'text-plexo-yellow' : 'text-neutral-500 hover:text-ink'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* anti-bot trap (unchanged) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="website_honeypot_field" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-plexo-red/10 text-[13px] text-plexo-red font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {errorMessage}
                </div>
              )}

              <button
                ref={submitRef}
                data-field
                type="submit"
                disabled={isLoading}
                className="mt-1 h-12 [@media(max-height:700px)]:h-11 rounded-2xl bg-plexo-yellow text-ink text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_3px_0_#111] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-70 transition"
              >
                {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Securing your spot…</>) : (<>Get early access <ArrowRight className="w-4 h-4" /></>)}
              </button>
              <p data-field className="text-center text-[11px] text-neutral-500">18+ only · We never share your details.</p>
            </form>
          </div>
        ) : (
          <div key="success" ref={success} className="text-center">
            <div className="relative z-20 flex min-h-[min(430px,72svh)] flex-col items-center justify-center pt-6">
              {/* tick that spins into a coin */}
              <div className="relative w-28 h-28 [@media(max-height:700px)]:w-24 [@media(max-height:700px)]:h-24" style={{ perspective: 700 }}>
                <span data-tick-ring className="absolute inset-0 rounded-full bg-[#12A150] opacity-0" />
                <span data-coin-ring className="absolute inset-0 rounded-full ring-4 ring-plexo-gold opacity-0" />
                <div data-spinner className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  <div data-tick-circle className="absolute inset-0 rounded-full bg-[#12A150] flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                      <path data-tick-path d="M29 52 L44 67 L72 36" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="64 64" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <img src="/plexo_coin_gold-p.png" alt="PLEXO coin" className="w-full h-full object-contain" draggable="false" />
                    <span data-coin-shine className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </div>
                </div>
              </div>

              <h3 data-rise className="mt-7 [@media(max-height:700px)]:mt-5 text-[clamp(30px,9vw,40px)] leading-[1.05] font-semibold tracking-tightest">You’re in{fullName ? `, ${fullName.split(' ')[0]}` : ''}.</h3>
              <p data-rise className="mt-3 text-[15px] font-semibold text-ink/70">
                Your spot is saved.
              </p>
              <p data-rise className="mt-1.5 text-[13px] text-ink/55">We’ll email <span className="text-ink/80 font-medium break-all">{email}</span> when it’s your turn.</p>

              <button data-rise onClick={handleDone} className="mt-8 [@media(max-height:700px)]:mt-5 w-full h-12 rounded-2xl bg-ink text-white text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Done
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
