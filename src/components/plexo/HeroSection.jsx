import React from 'react';
import { ArrowRight, Plus, Send, QrCode, MoreHorizontal, CreditCard, Smartphone, PiggyBank, TrendingUp, Home, User } from 'lucide-react';
import { DoodleStar, DoodleCrown, EMVChip } from './Doodles';

export function HeroSection({ onOpenWaitlist }) {
  return (
    <section id="hero" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Distressed Headline & Manifesto */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            
            {/* Top Doodles: Star and Red Crown */}
            {/* Top Doodles: Star and Red Crown */}
            <div className="relative w-full max-w-[360px] sm:max-w-[430px] flex items-center justify-between mb-2">
              <div className="transform -rotate-12 -translate-x-2">
                <DoodleStar className="w-8 h-8 text-black" strokeWidth={2.5} />
              </div>
              <div className="transform rotate-6 -translate-y-1">
                <DoodleCrown className="w-10 h-7 text-plexo-red" strokeWidth={2.8} />
              </div>
            </div>

            {/* Main Headline: Distressed Brutalist Impact */}
            <div className="transform -rotate-1 origin-left mb-6">
              <h1 className="font-plexo-headline text-black text-5xl xs:text-6xl sm:text-7xl xl:text-[5.75rem] tracking-tight leading-[0.92] select-none">
                <span className="block drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">YOUR MONEY.</span>
                <span className="block drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">YOUR WAY.</span>
              </h1>
            </div>

            {/* Monospace Subtitle */}
            <div className="font-plexo-mono text-neutral-800 text-sm sm:text-base leading-relaxed max-w-md mb-8 space-y-1">
              <p className="font-medium">Spend. Save &amp; Invest. Custom Cards. Get rewarded.</p>
              <p className="font-medium">One place for everything you do with your money.</p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={onOpenWaitlist}
                className="group inline-flex items-center gap-2 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-black text-base px-8 py-3.5 rounded-full transition-all duration-150 shadow-[2px_3px_0px_rgba(0,0,0,0.9)] hover:shadow-[3px_5px_0px_rgba(0,0,0,0.9)] active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Mobile App Mockup + Physical Cards + Annotations */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end items-center overflow-hidden lg:overflow-visible w-full">
            
            {/* Rigid Atomic Composite Stage:
                Maintains 100% locked relative coordinates between the iPhone, Red PLEXO Card,
                Sticky Note, Mini Cards, and Annotations. All elements are positioned with left/top
                relative to this single bounding box, preventing any drift or gap on resizing.
                Scales uniformly down on smaller screens via CSS transform without tearing apart. */}
            <div className="relative w-[560px] sm:w-[580px] h-[640px] flex-shrink-0 select-none transform scale-[0.54] xs:scale-[0.66] sm:scale-[0.80] md:scale-[0.90] lg:scale-100 origin-center lg:origin-right -my-28 xs:-my-20 sm:-my-10 lg:my-0">
              
              {/* Yellow torn paper backdrop splash behind phone and card */}
              <div 
                className="absolute left-[90px] top-[40px] w-[450px] h-[570px] bg-[#FFE600] -rotate-2 rounded-3xl opacity-95 -z-10 shadow-lg"
                style={{
                  clipPath: 'polygon(2% 0%, 98% 1%, 100% 97%, 96% 100%, 3% 98%, 0% 50%)'
                }}
              />

              {/* Left Handwritten Annotation: "More control. More freedom." (Generous distance from phone) */}
              <div className="absolute left-0 top-[200px] z-30 transform -rotate-6 select-none pointer-events-none w-[110px] text-right">
                <div className="font-plexo-script text-[21px] font-bold text-black flex flex-col items-end gap-0.5">
                  <span>More</span>
                  <span>control.</span>
                  <span>More</span>
                  <span>freedom.</span>
                </div>
                {/* Curved Arrow pointing toward phone with clean clearance */}
                <svg width="36" height="32" viewBox="0 0 44 40" fill="none" className="text-black ml-auto mt-2 transform scale-x-[-1] rotate-45" aria-hidden="true">
                  <path d="M10 8C20 12 30 20 34 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M25 32L34 32L34 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Central Realistic iPhone Mockup */}
              <div className="absolute left-[135px] top-[48px] z-20 w-[275px] bg-black rounded-[48px] p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-[#222222] transform -rotate-1">
                
                {/* iPhone Frame Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[40px] overflow-hidden text-neutral-900 border border-neutral-200">
                  
                  {/* Status Bar */}
                  <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[10px] font-semibold text-neutral-800">
                    <span>9:41</span>
                    <div className="w-16 h-3 bg-black rounded-full mx-auto -mt-1" />
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2 bg-neutral-800 rounded-sm" />
                      <div className="w-3.5 h-2 border border-neutral-800 rounded-sm" />
                    </div>
                  </div>

                  {/* App Screen Content */}
                  <div className="px-4 py-2.5 space-y-3">
                    
                    {/* User Greeting */}
                    <div>
                      <p className="text-[11px] text-neutral-500 font-medium">Hello,</p>
                      <h4 className="text-sm font-extrabold text-black">Good morning!</h4>
                    </div>

                    {/* Red Balance Card */}
                    <div className="bg-[#E52320] text-white p-3.5 rounded-2xl shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[11px] text-red-100 font-medium tracking-wide">Total Balance</p>
                          <p className="text-xl font-black mt-0.5 tracking-tight">₹48,230</p>
                        </div>
                        <button className="w-8 h-8 bg-[#FFE600] text-black rounded-full flex items-center justify-center font-bold text-sm shadow hover:scale-105 transition-transform cursor-pointer" aria-label="Add money">
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Row of 3 Actions */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                          <Send className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-neutral-800">Send</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                          <QrCode className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-neutral-800">Scan</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                          <MoreHorizontal className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-neutral-800">More</span>
                      </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div>
                      <p className="text-[10px] font-bold text-neutral-700 mb-1.5">Quick Actions</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        <div className="bg-white border border-neutral-200 rounded-xl p-2 flex flex-col items-center shadow-2xs">
                          <CreditCard className="w-4 h-4 text-neutral-800 mb-0.5" />
                          <span className="text-[10px] font-bold text-neutral-700">Card</span>
                        </div>
                        <div className="bg-white border border-neutral-200 rounded-xl p-2 flex flex-col items-center shadow-2xs">
                          <Smartphone className="w-4 h-4 text-neutral-800 mb-0.5" />
                          <span className="text-[10px] font-bold text-neutral-700">UPI</span>
                        </div>
                        <div className="bg-white border border-neutral-200 rounded-xl p-2 flex flex-col items-center shadow-2xs">
                          <PiggyBank className="w-4 h-4 text-neutral-800 mb-0.5" />
                          <span className="text-[10px] font-bold text-neutral-700">Save</span>
                        </div>
                        <div className="bg-white border border-neutral-200 rounded-xl p-2 flex flex-col items-center shadow-2xs">
                          <TrendingUp className="w-4 h-4 text-neutral-800 mb-0.5" />
                          <span className="text-[10px] font-bold text-neutral-700">Invest</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="pt-0.5">
                      <div className="flex justify-between items-center mb-1.5 px-0.5">
                        <span className="text-[11px] font-bold text-neutral-900">Recent Transactions</span>
                        <span className="text-[10px] font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer">See all &rarr;</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        {/* Zomato */}
                        <div className="flex items-center justify-between bg-white/80 p-2 rounded-xl border border-neutral-100 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[10px]">
                              Z
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-neutral-900 leading-tight">Zomato</p>
                              <p className="text-[9px] text-neutral-500">Food & Dining</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-extrabold text-neutral-900">-₹320</span>
                        </div>

                        {/* Spotify */}
                        <div className="flex items-center justify-between bg-white/80 p-2 rounded-xl border border-neutral-100 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-[10px]">
                              S
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-neutral-900 leading-tight">Spotify</p>
                              <p className="text-[9px] text-neutral-500">Entertainment</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-extrabold text-neutral-900">-₹149</span>
                        </div>

                        {/* Café Nero */}
                        <div className="flex items-center justify-between bg-white/80 p-2 rounded-xl border border-neutral-100 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-[10px]">
                              C
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-neutral-900 leading-tight">Café Nero</p>
                              <p className="text-[9px] text-neutral-500">Food & Dining</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-extrabold text-neutral-900">-₹560</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* App Bottom Tab Navigation */}
                  <div className="bg-white border-t border-neutral-200 px-3 py-2.5 flex justify-between items-center text-neutral-400">
                    <div className="flex flex-col items-center text-black">
                      <Home className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold mt-0.5">Home</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-semibold mt-0.5">Card</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <PiggyBank className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-semibold mt-0.5">Savings</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-semibold mt-0.5">Invest</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <User className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-semibold mt-0.5">Profile</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Physical Red PLEXO Card Tucked in PORTRAIT Behind Phone's Right Shoulder */}
              <div 
                className="absolute left-[285px] top-[115px] z-10 transform rotate-[16deg] w-[195px] h-[315px] bg-gradient-to-b from-[#EE2724] via-[#D51E1A] to-[#B01411] rounded-[22px] p-4 text-white shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-red-500/60 flex flex-col justify-between select-none overflow-hidden"
              >
                {/* Subtle metallic gloss sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded-[22px]" />

                {/* Card Top: Chip + Brand Wordmark & Contactless Symbol */}
                <div className="flex justify-between items-start z-10 pt-1">
                  {/* EMV Chip */}
                  <EMVChip className="w-10 h-7" />

                  {/* PLEXO White Wordmark + Contactless Symbol */}
                  <div className="flex flex-col items-end">
                    <div className="font-rubik font-black text-2xl tracking-tight text-white drop-shadow-sm">
                      plexo
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-90 mt-1" aria-hidden="true">
                      <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                      <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                      <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Card Bottom: Contactless / DEBIT */}
                <div className="flex justify-end items-end z-10 pb-1">
                  <span className="font-plexo-mono font-bold text-xs uppercase tracking-widest text-white/90 drop-shadow-sm">
                    DEBIT
                  </span>
                </div>
              </div>

              {/* Annotation pointing to red card: "The card that fits your, vibe." — positioned with generous distance away from phone */}
              <div className="absolute left-[425px] top-[15px] z-30 transform -rotate-2 select-none pointer-events-none">
                <div className="font-plexo-script text-[22px] font-bold text-black flex flex-col items-start gap-0.5 text-left">
                  <span>The card</span>
                  <span>that fits</span>
                  <span>your, vibe.</span>
                </div>
                {/* Arrow pointing down-left to card */}
                <svg width="36" height="30" viewBox="0 0 36 32" fill="none" className="text-black transform rotate-6 mt-1.5" aria-hidden="true">
                  <path d="M28 4C24 11 18 18 8 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M18 24L8 24L10 15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Star doodle at right */}
              <div className="absolute left-[500px] top-[180px] z-30 transform rotate-12">
                <DoodleStar className="w-6 h-6 text-black" strokeWidth={2} />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
