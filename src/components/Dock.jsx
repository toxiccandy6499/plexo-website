import React, { useEffect, useState } from 'react';
import { ArrowRight, X, Plus } from 'lucide-react';
import { SOCIALS, SocialIcon } from './ui';

const links = [
  ['Home', '#top'],
  ['Features', '#how'],
  ['Rewards', '#rewards'],
];

const faqs = [
  ['What is PLEXO?', 'A personal finance app for college students and graduates: UPI, your own student debit card, savings, investing and rewards in one place.'],
  ['Who can join?', 'Anyone 18+ who is in college or has graduated.'],
  ['Does it cost anything?', 'No. Zero account and card fees.'],
  ['When does it launch?', 'We’re onboarding in waves. Join the waitlist for early access.'],
];

function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <div className={`fixed inset-0 z-40 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <div
        role="dialog"
        aria-label={title}
        className={`absolute left-1/2 bottom-24 w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-[24px] bg-beige shadow-2xl p-5 max-h-[calc(100svh-120px)] overflow-y-auto transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Dock({ onJoin }) {
  const [sheet, setSheet] = useState(null); // 'menu' | 'faq' | null
  const [openFaq, setOpenFaq] = useState(-1);
  const close = () => setSheet(null);

  return (
    <>
      <Sheet open={sheet === 'menu'} onClose={close} title="Menu">
        <nav className="grid">
          {links.map(([name, href]) => (
            <a key={name} href={href} onClick={close} className="flex items-center justify-between py-2 text-[15px] font-medium tracking-tight border-b border-neutral-100 last:border-0 hover:text-plexo-red hover:pl-1 transition-all">
              {name}
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </a>
          ))}
        </nav>
        <div className="mt-4 flex gap-2">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}
              className="w-9 h-9 rounded-xl bg-paper flex items-center justify-center hover:bg-plexo-yellow transition-colors">
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </Sheet>

      <Sheet open={sheet === 'faq'} onClose={close} title="Questions">
        <div className="grid  overflow-y-auto -mx-1 px-1">
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-neutral-100 last:border-0">
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between py-3 text-left font-medium">
                {q}
                <Plus className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${openFaq === i ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden text-sm text-neutral-500 leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <button
          onClick={() => { close(); onJoin(); }}
          className="h-14 w-52 sm:w-60 rounded-[20px] bg-gradient-to-b from-[#2a2a2a] to-[#111111] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.12)] hover:from-[#333] active:scale-[.98] transition"
        >
          <span className="w-2 h-2 rounded-full bg-plexo-yellow" />
          Join waitlist
        </button>
        <button
          onClick={() => setSheet(sheet === 'menu' ? null : 'menu')}
          aria-label="Menu"
          className="h-14 w-14 rounded-[20px] bg-beige shadow-[0_10px_30px_rgba(0,0,0,.15)] ring-1 ring-black/5 flex items-center justify-center text-xl active:scale-95 transition"
        >
          {sheet === 'menu' ? <X className="w-5 h-5" /> : <span className="block w-4 border-t-2 border-b-2 border-ink h-[7px]" />}
        </button>
        <button
          onClick={() => setSheet(sheet === 'faq' ? null : 'faq')}
          aria-label="FAQ"
          className="h-14 w-14 rounded-[20px] bg-beige shadow-[0_10px_30px_rgba(0,0,0,.15)] ring-1 ring-black/5 flex items-center justify-center text-lg font-semibold active:scale-95 transition"
        >
          {sheet === 'faq' ? <X className="w-5 h-5" /> : '?'}
        </button>
      </div>
    </>
  );
}
