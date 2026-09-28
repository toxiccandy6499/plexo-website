import React from 'react';
import { ArrowRight, TrendingUp, Gift, Utensils, Music, Film, Coffee, ShieldCheck } from 'lucide-react';
import { DoodleCrown, Isometric3DGoldBar } from './Doodles';
import { PixelPlexoCoin } from './PixelPlexoCoin';

export function ShowcaseBanner({ onOpenWaitlist }) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-[#FAF8F5] border border-[#D8D3C5] rounded-[36px] overflow-hidden shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] sm:min-h-[490px]">
          
          {/* LEFT SECTION: "MORE THAN JUST A CARD." (Span 4) */}
          <div className="lg:col-span-4 p-6 sm:p-10 z-10 flex flex-col justify-center space-y-5">
            
            {/* Yellow Tape Accent */}
            <div className="inline-block bg-[#FFE600] h-2.5 w-16 transform -rotate-2 rounded-xs shadow-xs" />

            {/* Massive Distressed Heading */}
            <h2 className="font-plexo-headline text-3xl sm:text-4xl lg:text-[3rem] leading-[0.92] text-black tracking-tight uppercase">
              MORE<br />THAN JUST<br />A CARD.
            </h2>

            {/* Monospace Description */}
            <p className="font-plexo-mono text-neutral-700 text-xs sm:text-sm leading-relaxed max-w-xs">
              The Plexo app brings together all your money moves &mdash; in one simple, powerful place.
            </p>
          </div>

          {/* CENTER SECTION: COMPACT DUAL OVERLAPPING PHONES (Span 5) */}
          <div className="lg:col-span-5 py-6 sm:py-8 flex justify-center items-center relative select-none">
            
            <div className="relative w-[340px] sm:w-[380px] h-[430px] sm:h-[470px] flex items-center justify-center">
              
              {/* Phone 1: Plexo Coins / Rewards (Left, rotated -5deg) */}
              <div className="absolute left-2 sm:left-6 top-1 z-10 w-[185px] sm:w-[200px] h-[390px] sm:h-[430px] bg-black rounded-[38px] p-2 border-2 border-neutral-800 shadow-[0_16px_40px_rgba(0,0,0,0.3)] transform -rotate-5 transition-transform hover:-translate-y-1">
                <div className="bg-[#FAF8F5] rounded-[32px] p-2.5 sm:p-3 text-neutral-900 text-[10px] h-full flex flex-col justify-between overflow-hidden border border-neutral-200">
                  
                  {/* Top Status & Notch */}
                  <div>
                    <div className="flex justify-between items-center text-[8px] font-bold text-neutral-600 mb-1 px-1 pt-0.5">
                      <span>9:41</span>
                      <div className="w-12 h-2.5 bg-black rounded-full mx-auto -mt-0.5" />
                      <div className="w-2.5 h-1.5 border border-neutral-700 rounded-2xs" />
                    </div>

                    {/* Coin Balance Badge */}
                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-2 mb-2 shadow-2xs mt-1">
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        <PixelPlexoCoin size={28} variant="gold-p" />
                      </div>
                      <div>
                        <p className="text-[7px] text-neutral-500 font-bold uppercase tracking-wider">Plexo Coins</p>
                        <p className="text-sm font-black text-black leading-none">1,250</p>
                      </div>
                    </div>

                    {/* Redeem Button */}
                    <div className="mb-2">
                      <button 
                        onClick={onOpenWaitlist}
                        className="w-full bg-[#E52320] text-white font-extrabold text-[9px] py-1.5 rounded-full text-center shadow-xs hover:bg-red-700 transition-colors tracking-wide"
                      >
                        Redeem
                      </button>
                    </div>

                    {/* Top Rewards Section */}
                    <p className="text-[8px] font-bold text-neutral-800 mb-1 px-0.5">Top Rewards</p>
                    <div className="grid grid-cols-3 gap-1.5 text-center mb-2">
                      <div className="bg-white border border-neutral-200 rounded-xl p-1.5 shadow-3xs">
                        <div className="w-5 h-5 rounded-md bg-red-100 mx-auto flex items-center justify-center text-red-600">
                          <Gift className="w-3 h-3" />
                        </div>
                        <span className="text-[7px] font-bold block mt-1 text-neutral-800 leading-tight">₹100 Off</span>
                      </div>
                      <div className="bg-white border border-neutral-200 rounded-xl p-1.5 shadow-3xs">
                        <div className="w-5 h-5 rounded-md bg-amber-100 mx-auto flex items-center justify-center text-amber-700">
                          <Utensils className="w-3 h-3" />
                        </div>
                        <span className="text-[7px] font-bold block mt-1 text-neutral-800 leading-tight">Burger</span>
                      </div>
                      <div className="bg-white border border-neutral-200 rounded-xl p-1.5 shadow-3xs">
                        <div className="w-5 h-5 rounded-md bg-emerald-100 mx-auto flex items-center justify-center text-emerald-700">
                          <Music className="w-3 h-3" />
                        </div>
                        <span className="text-[7px] font-bold block mt-1 text-neutral-800 leading-tight">Spotify</span>
                      </div>
                    </div>

                    {/* Campus Exclusive Item */}
                    <div className="bg-white p-2 rounded-xl border border-neutral-100 flex items-center justify-between shadow-3xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center text-purple-700">
                          <Film className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-neutral-900 leading-none">PVR Cinemas</p>
                          <p className="text-[7px] text-neutral-400">20% Off Tickets</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-extrabold text-[#E52320]">150 pts</span>
                    </div>

                  </div>

                  {/* Phone Bottom Home Indicator */}
                  <div className="w-14 h-1 bg-neutral-400 rounded-full mx-auto my-0.5" />

                </div>
              </div>

              {/* Phone 2: Micro Investment (Right, rotated +5deg) */}
              <div className="absolute right-2 sm:right-6 top-6 sm:top-8 z-20 w-[185px] sm:w-[200px] h-[390px] sm:h-[430px] bg-black rounded-[38px] p-2 border-2 border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.38)] transform rotate-5 transition-transform hover:-translate-y-1">
                <div className="bg-[#FAF8F5] rounded-[32px] p-2.5 sm:p-3 text-neutral-900 text-[10px] h-full flex flex-col justify-between overflow-hidden border border-neutral-200">
                  
                  {/* Top Status & Notch */}
                  <div>
                    <div className="flex justify-between items-center text-[8px] font-bold text-neutral-600 mb-1 px-1 pt-0.5">
                      <span>9:41</span>
                      <div className="w-12 h-2.5 bg-black rounded-full mx-auto -mt-0.5" />
                      <div className="w-2.5 h-1.5 border border-neutral-700 rounded-2xs" />
                    </div>

                    {/* Toggle Pills: Gold vs Mutual Funds */}
                    <div className="flex bg-neutral-200 rounded-full p-0.5 text-[8px] font-bold mb-2 mt-1">
                      <div className="w-1/2 bg-[#FFE600] text-black text-center py-1 rounded-full shadow-xs">
                        Gold
                      </div>
                      <div className="w-1/2 text-neutral-600 text-center py-1">
                        Mutual Funds
                      </div>
                    </div>

                    {/* Investment Intro */}
                    <div className="text-center py-0.5">
                      <p className="text-[7px] font-bold text-neutral-500 uppercase tracking-wider">Start with just</p>
                      <p className="text-xl font-black text-black mt-0.5 tracking-tight">₹10</p>
                    </div>

                    {/* 3D Isometric Gold Bullion Graphic */}
                    <div className="h-12 flex items-center justify-center my-1">
                      <Isometric3DGoldBar className="w-20 h-11" />
                    </div>

                    {/* Invest Now CTA Button */}
                    <div className="pt-0.5 mb-2">
                      <button 
                        onClick={onOpenWaitlist}
                        className="w-full bg-[#FFE600] text-black font-black text-[9px] py-1.5 rounded-full text-center shadow-[1px_2px_0px_#000000] hover:bg-yellow-400 transition-colors tracking-wide"
                      >
                        Invest Now &rarr;
                      </button>
                    </div>

                    {/* Live Market Ticker Box */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-1.5 space-y-1 shadow-3xs">
                      <div className="flex justify-between items-center text-[7px] text-neutral-500 font-semibold">
                        <span>Live Gold Rate (24K)</span>
                        <span className="text-emerald-600 font-bold">+1.4%</span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-black text-neutral-900">
                        <span>₹7,240 / gm</span>
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                      </div>
                    </div>

                  </div>

                  {/* Phone Bottom Home Indicator */}
                  <div className="w-14 h-1 bg-neutral-400 rounded-full mx-auto my-0.5" />

                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SECTION: RIPPED RED GRAPHIC BANNER (Span 3) */}
          <div className="lg:col-span-3 relative min-h-[360px] lg:min-h-full flex items-center justify-center p-8 sm:p-10 bg-[#E52320] text-white overflow-hidden">
            
            {/* Ragged Left Edge Effect on Desktop */}
            <div 
              className="absolute inset-0 bg-[#E52320] -z-0"
              style={{
                clipPath: 'polygon(6% 0%, 100% 0%, 100% 100%, 3% 100%, 7% 85%, 2% 70%, 6% 55%, 1% 40%, 7% 25%, 2% 10%)'
              }}
            />

            {/* Poster Content */}
            <div className="relative z-10 max-w-xs space-y-4 text-left">
              {/* White Doodle Crown */}
              <div>
                <DoodleCrown className="w-12 h-8 text-white" strokeWidth={2.8} />
              </div>

              {/* Bold White Distressed Statement */}
              <h3 className="font-plexo-headline text-3xl sm:text-4xl xl:text-[2.65rem] leading-[0.92] text-white tracking-tight uppercase drop-shadow-sm">
                GOOD<br />MONEY MOVES<br />LEAD TO<br />GREAT STORIES.
              </h3>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
