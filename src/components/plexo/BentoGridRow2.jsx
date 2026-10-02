import React from 'react';
import { ArrowRight, ChevronLeft, SlidersHorizontal, Laptop, TrendingUp } from 'lucide-react';
import { DoodleStar, DoodleCrown, DoodleGoldBar, DoodleTrendArrow } from './Doodles';
import { PixelPlexoCoin } from './PixelPlexoCoin';

export function BentoGridRow2({ onOpenWaitlist }) {
  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SAVE & INVEST (Span 7) */}
        <div id="save-invest" className="lg:col-span-7 relative bg-[#FAF8F5] border border-[#D8D3C5] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm flex flex-col justify-between min-h-[500px] scroll-mt-24">
          <span id="save" className="absolute -top-24" />
          
          {/* Top Yellow Scotch Tape Badge */}
          <div className="absolute -top-1 left-8 z-20 transform -rotate-1">
            <div className="bg-[#FFE600] text-black font-plexo-mono font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 shadow-[2px_2px_0px_#000000]">
              SAVE &amp; INVEST
            </div>
          </div>

          <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-6 flex-1">
            
            {/* Left Copy */}
            <div className="w-full lg:w-[38%] space-y-4 z-10">
              <h3 className="font-plexo-headline text-3xl sm:text-4xl lg:text-[2.5rem] leading-[0.92] text-black tracking-tight uppercase">
                BIG DREAMS<br />START WITH<br />SMALL STEPS.
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                Set your savings goals, or let Plexo round up your spare change (₹1&ndash;₹10) and invest it in gold or mutual funds.
              </p>
            </div>

            {/* Center: BIG Phone Mockup (Authentic Phone Sizing) */}
            <div className="w-full lg:w-[38%] flex justify-center z-10">
              <div className="w-[230px] sm:w-[250px] bg-black rounded-[42px] p-2 border-2 border-neutral-800 shadow-2xl">
                <div className="bg-[#FAF8F5] rounded-[34px] p-3.5 text-neutral-900 text-xs">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-neutral-700 mb-3 px-1">
                    <ChevronLeft className="w-4 h-4" />
                    <span className="font-bold text-xs">Savings Goal</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                  </div>

                  {/* Goal Card */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-3 shadow-xs mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-extrabold text-neutral-900 leading-tight">New Laptop</p>
                        <p className="text-[10px] font-bold text-neutral-600">₹25,000 / ₹50,000</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-neutral-900 h-full w-1/2 rounded-full" />
                    </div>
                    <p className="text-right text-[9px] font-bold text-neutral-500 mt-1">50%</p>
                  </div>

                  <p className="text-[10px] font-semibold text-neutral-500 mb-2 px-1">Save more, worry less.</p>

                  {/* Micro Investing */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-neutral-700 px-1">Micro Investing</p>
                    
                    <div className="bg-white border border-neutral-200 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xs">
                      <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 shadow-2xs">
                        <PixelPlexoCoin size={20} variant="gold-p" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">Gold</span>
                        <span className="text-[8px] text-neutral-500 font-medium">99.9% 24K Digital Gold</span>
                      </div>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xs">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 shadow-2xs">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">Mutual Funds</span>
                        <span className="text-[8px] text-neutral-500 font-medium">Auto-roundup baskets</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right: Doodles & Text (Positioned with plenty of space - No cutoff) */}
            <div className="w-full lg:w-[24%] flex flex-col items-center justify-center space-y-2 z-10 select-none">
              
              {/* Crown Doodle */}
              <div className="transform -rotate-6">
                <DoodleCrown className="w-8 h-6 text-black" strokeWidth={2.4} />
              </div>

              {/* Handwritten Note - Clean and never clipped */}
              <div className="font-plexo-script text-2xl sm:text-3xl font-bold text-black leading-tight text-center -rotate-3 whitespace-nowrap">
                Tiny amounts.<br />Big future.
              </div>

              {/* Hand-drawn Gold Ingot */}
              <div className="pt-1 transform rotate-2">
                <DoodleGoldBar className="w-24 h-14" />
              </div>

              {/* Green Trend Arrow */}
              <div className="transform -rotate-6 -mt-1">
                <DoodleTrendArrow className="w-20 h-12 text-[#10B981]" />
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: PLEXO COINS (Span 5) */}
        <div 
          id="earn" className="lg:col-span-5 relative bg-[#121214] text-white rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl flex flex-col justify-between min-h-[430px] sm:min-h-[470px] lg:min-h-[500px]"
          style={{
            backgroundImage: `radial-gradient(#252528 1px, transparent 1px)`,
            backgroundSize: '18px 18px'
          }}
        >
          
          {/* Top Yellow Doodle Crown */}
          <div className="absolute top-5 left-6 transform -rotate-6 z-20">
            <DoodleCrown className="w-8 h-6 text-[#FFE600]" strokeWidth={2.4} />
          </div>

          {/* Star Doodle Top Right */}
          <div className="absolute top-5 right-6 z-20">
            <DoodleStar className="w-5 h-5 text-neutral-400" strokeWidth={2} />
          </div>

          {/* Heading & User-Requested Description */}
          <div className="pt-4 sm:pt-6 space-y-3 z-10">
            <h3 className="font-plexo-headline text-4xl sm:text-5xl tracking-tight leading-[0.92] text-[#FFE600] uppercase">
              PLEXO<br />
              <span className="text-white">COINS</span>
            </h3>

            {/* Exact copy requested by user */}
            <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed max-w-sm">
              Use Plexo Coins in Plexo's coupon store and minigames in the app to get gifts, coupons and more.
            </p>
          </div>

          {/* Bottom Graphic: Unified Composition (Checklist Note + Clustered Coins) */}
          <div className="relative mt-6 pt-2 w-full flex justify-center sm:justify-end z-10">
            <div className="relative w-[285px] sm:w-[330px] h-[185px] sm:h-[205px]">
              
              {/* Floating Torn Parchment Checklist Note (Upper-Right - 100% UNBLOCKED) */}
              <div 
                className="absolute right-0 sm:right-2 top-1 z-10 bg-[#FAF8F5] text-black py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl shadow-xl transform rotate-3 border border-neutral-300 w-[136px] sm:w-[150px]"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 2%, 98% 98%, 2% 100%)'
                }}
              >
                <ul className="space-y-1 sm:space-y-1.5 font-plexo-script font-bold text-[15px] sm:text-lg leading-tight">
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black rounded-xs flex items-center justify-center text-[9px] sm:text-[10px] bg-[#FFE600] text-black font-black shrink-0">✓</span>
                    <span className="truncate">Coupons</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black rounded-xs flex items-center justify-center text-[9px] sm:text-[10px] bg-[#FFE600] text-black font-black shrink-0">✓</span>
                    <span className="truncate">Games</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black rounded-xs flex items-center justify-center text-[9px] sm:text-[10px] bg-[#FFE600] text-black font-black shrink-0">✓</span>
                    <span className="truncate">Gifts</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-neutral-800">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black rounded-xs flex items-center justify-center text-[9px] sm:text-[10px] bg-[#FFE600] text-black font-black shrink-0">✓</span>
                    <span className="truncate">&amp; more!</span>
                  </li>
                </ul>
              </div>

              {/* Clustered Pixel Coins (Bottom-Left - Overlaps only blank corner, ZERO text overlap) */}
              {/* Coin 1: Gold Pixel Smiley Coin (Top Center of Coin Cluster) */}
              <div className="absolute left-7 sm:left-12 top-3 z-20 transform -rotate-6 hover:scale-105 transition-transform">
                <PixelPlexoCoin size={92} variant="smiley" />
              </div>

              {/* Coin 2: Gold Pixel Star Coin (Bottom Left) */}
              <div className="absolute left-0 bottom-2 z-10 transform rotate-6 hover:scale-105 transition-transform">
                <PixelPlexoCoin size={82} variant="star" />
              </div>

              {/* Coin 3: Vibrant Red Pixel Plexo 'P' Coin (Bottom Right of Coin Cluster) */}
              <div className="absolute left-16 sm:left-22 bottom-1 z-30 transform rotate-12 hover:scale-105 transition-transform">
                <PixelPlexoCoin size={78} variant="red-p" />
              </div>

              {/* Star doodle at bottom right */}
              <div className="absolute -right-1 -bottom-2 transform -rotate-12 z-20">
                <DoodleStar className="w-4 h-4 text-[#FFE600]" strokeWidth={2} />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
