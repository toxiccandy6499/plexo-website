import React from 'react';
import { ArrowRight, ChevronLeft, QrCode } from 'lucide-react';
import { DoodleStar, DoodleGraduationCap, EMVChip } from './Doodles';

export function BentoGridRow1({ onOpenWaitlist, onOpenCardStudio }) {

  return (
    <section id="card" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* CARD 1: SPEND SMARTER (Text placed up at top, sleek compact phone design below) */}
        <div id="spend" className="relative bg-[#FAF8F5] border border-[#D8D3C5] rounded-3xl p-5 sm:p-6 overflow-hidden shadow-sm flex flex-col justify-between min-h-[430px] sm:min-h-[460px]">
          
          {/* Top Yellow Scotch Tape Badge */}
          <div className="absolute -top-1 left-6 z-20 transform -rotate-2">
            <div className="bg-[#FFE600] text-black font-plexo-mono font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 shadow-[2px_2px_0px_#000000]">
              Spend anywhere, anytime.
            </div>
          </div>

          {/* Red decorative scribble behind phone */}
          <div className="absolute bottom-6 left-12 w-48 h-36 bg-red-600/12 -rotate-6 rounded-3xl filter blur-md -z-0" />

          {/* Copy Area (Placed UP at top for prominent hierarchy) */}
          <div className="pt-6 space-y-3 z-10">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#121214] text-[#FFE600] font-plexo-mono text-[9px] font-black px-2 py-0.5 rounded-xs uppercase tracking-wider shadow-2xs">
                0% Fees
              </span>
              <span className="font-plexo-mono text-[10px] text-neutral-500 font-bold">
                UPI &bull; CARDS &bull; REWARDS
              </span>
            </div>

            <h3 className="font-plexo-headline text-3xl sm:text-4xl leading-[0.92] text-black tracking-tight uppercase">
              SPEND<br />SMARTER.
            </h3>

            <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed max-w-sm">
              Cards, UPI, and more &mdash; for all your everyday payments with zero hidden fees and instant rewards.
            </p>
          </div>

          {/* Bottom Area: Sleek Compact Phone Mockup + Handwritten Note Accent */}
          <div className="relative mt-4 pt-1 flex items-center justify-between z-10">
            
            {/* Sleek Compact UPI Phone Mockup */}
            <div className="w-[150px] sm:w-[165px] shrink-0">
              <div className="w-full bg-black rounded-[28px] p-1.5 border-2 border-neutral-800 shadow-xl transform -rotate-2">
                <div className="bg-[#FAF8F5] rounded-[22px] p-2 text-black flex flex-col justify-between h-[220px] sm:h-[230px] overflow-hidden">
                  
                  <div>
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-[8px] font-bold text-neutral-600 mb-1 px-0.5">
                      <span>9:41</span>
                      <div className="w-8 h-1.5 bg-black rounded-full mx-auto -mt-0.5" />
                      <div className="w-2.5 h-1.5 border border-neutral-700 rounded-2xs" />
                    </div>

                    {/* UPI Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1 text-[11px] font-black text-neutral-900">
                        <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>UPI Pay</span>
                      </div>
                      <span className="text-[7px] font-mono text-emerald-700 font-black bg-emerald-100 px-1.5 py-0.5 rounded-2xs">ACTIVE</span>
                    </div>

                    {/* QR Scan Area */}
                    <div className="border border-dashed border-neutral-400 rounded-lg p-1.5 bg-white flex items-center justify-center gap-2 my-1 shadow-2xs">
                      <QrCode className="w-7.5 h-7.5 text-neutral-900 stroke-[2] shrink-0" />
                      <div className="text-left">
                        <span className="block text-[7.5px] font-black text-neutral-900 uppercase leading-tight">
                          Scan &amp; Pay
                        </span>
                        <span className="block text-[6.5px] text-neutral-600 font-bold leading-tight">
                          Any QR code
                        </span>
                      </div>
                    </div>

                    {/* Quick Amount Chips */}
                    <div className="grid grid-cols-3 gap-1 my-1">
                      <div className="bg-white border border-neutral-300 rounded-sm py-0.5 text-center text-[7.5px] font-black text-neutral-900 shadow-2xs">
                        ₹100
                      </div>
                      <div className="bg-white border border-neutral-300 rounded-sm py-0.5 text-center text-[7.5px] font-black text-neutral-900 shadow-2xs">
                        ₹250
                      </div>
                      <div className="bg-white border border-neutral-300 rounded-sm py-0.5 text-center text-[7.5px] font-black text-neutral-900 shadow-2xs">
                        ₹500
                      </div>
                    </div>

                    {/* Recent Contacts List */}
                    <div className="mt-1">
                      <p className="text-[7px] font-black text-neutral-500 mb-0.5">Recent</p>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-4.5 h-4.5 rounded-full bg-blue-100 text-blue-900 font-black text-[7px] flex items-center justify-center border border-blue-300">
                            A
                          </div>
                          <span className="text-[6px] font-black text-neutral-800 mt-0.5">Aarav</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-4.5 h-4.5 rounded-full bg-red-100 text-red-800 font-black text-[7px] flex items-center justify-center border border-red-300">
                            N
                          </div>
                          <span className="text-[6px] font-black text-neutral-800 mt-0.5">Netflix</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-4.5 h-4.5 rounded-full bg-orange-100 text-orange-800 font-black text-[7px] flex items-center justify-center border border-orange-300">
                            S
                          </div>
                          <span className="text-[6px] font-black text-neutral-800 mt-0.5">Swiggy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Home Bar */}
                  <div className="w-10 h-1 bg-neutral-400 rounded-full mx-auto my-0.5" />

                </div>
              </div>
            </div>

            {/* Handwritten Note + Doodle Arrow */}
            <div className="flex flex-col items-center -mr-1">
              <div className="font-plexo-script text-lg sm:text-xl font-bold text-black text-right leading-tight rotate-3">
                Scan &amp; pay.<br />Zero fees.<br />Always.
              </div>
              {/* Arrow pointing to phone */}
              <svg width="32" height="24" viewBox="0 0 30 24" fill="none" className="text-black transform rotate-12 mt-1">
                <path d="M24 4C18 8 10 14 6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 20L6 20L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

          </div>

        </div>

        {/* CARD 2: STUDENT CARD */}
        <div className="relative bg-[#FAF8F5] border border-[#D8D3C5] rounded-3xl p-5 sm:p-6 overflow-hidden shadow-sm flex flex-col justify-between min-h-[430px] sm:min-h-[460px]">
          
          {/* Top Red Sticker Badge (Bigger & Bolder) */}
          <div className="absolute -top-1 left-6 z-20 transform rotate-1">
            <div className="bg-[#E52320] text-white font-plexo-mono font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 shadow-[2px_2px_0px_#000000]">
              STUDENT CARD
            </div>
          </div>

          {/* Copy Area */}
          <div className="pt-6 space-y-3 z-10">
            <h3 className="font-plexo-headline text-3xl sm:text-4xl leading-[0.92] text-black tracking-tight uppercase">
              MORE<br />DISCOUNTS.<br />LESS STRESS.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed max-w-sm">
              Register with your college email, get verified and unlock exclusive student discounts &mdash; faster and simpler.
            </p>
          </div>

          {/* Bottom Card Graphic & Graduation Cap Doodle */}
          <div className="relative mt-6 pt-4 flex items-center justify-between z-10">
            
            {/* Split Red/Yellow Student Physical Card */}
            <div className="w-[185px] sm:w-[205px] h-[115px] sm:h-[130px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-300 relative flex flex-col transform -rotate-3 select-none">
              {/* Top Red Half */}
              <div className="bg-[#E52320] h-[65%] p-3 text-white flex justify-between items-start">
                <EMVChip className="w-8 h-5.5" />
                <div className="font-rubik font-black text-sm text-white tracking-tight">plexo</div>
              </div>
              {/* Bottom Yellow Half */}
              <div className="bg-[#FFE600] h-[35%] px-3 flex items-center justify-between text-black">
                <span className="font-plexo-mono font-black text-[11px] tracking-wider uppercase">
                  STUDENT
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                  <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                  <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Handwritten Note + Doodle Cap */}
            <div className="flex flex-col items-center -mr-2">
              <div className="font-plexo-script text-lg sm:text-xl font-bold text-black text-right leading-tight -rotate-6">
                Your<br />college.<br />Your<br />benefits.
              </div>
              {/* Arrow */}
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" className="text-black transform -scale-x-100 rotate-12">
                <path d="M6 4C12 8 20 14 24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 20L24 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Graduation Cap Doodle */}
              <div className="mt-1">
                <DoodleGraduationCap className="w-12 h-10 text-black" strokeWidth={2.2} />
              </div>
            </div>

          </div>

        </div>

        {/* CARD 3: CUSTOM CARDS (Tightly Overlapping Physical Cards) */}
        <div className="relative bg-[#FAF8F5] border border-[#D8D3C5] rounded-3xl p-5 sm:p-6 overflow-hidden shadow-sm flex flex-col justify-between min-h-[430px] sm:min-h-[460px]">
          
          {/* Top Yellow Sticker Badge (Bigger & Bolder) */}
          <div className="absolute -top-1 left-6 z-20 transform -rotate-1">
            <div className="bg-[#FFE600] text-black font-plexo-mono font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 shadow-[2px_2px_0px_#000000]">
              CUSTOM CARDS
            </div>
          </div>

          {/* Top Doodle Star */}
          <div className="absolute top-4 right-6 z-10">
            <DoodleStar className="w-6 h-6 text-black" strokeWidth={2} />
          </div>

          {/* Side-by-Side Content Area: Copy on Left, 3 Overlapping Cards on Right */}
          <div className="pt-6 flex flex-row items-start justify-between gap-2 z-10 flex-1 relative">
            
            {/* Left Column: Headline, Copy, Button, and Bottom Star */}
            <div className="flex-1 max-w-[150px] sm:max-w-[165px] flex flex-col justify-between h-full z-10">
              <div className="space-y-3">
                <h3 className="font-plexo-headline text-3xl sm:text-[34px] leading-[0.92] text-black tracking-tight uppercase">
                  YOUR<br />DESIGN.<br />YOUR CARD.
                </h3>
                <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                  Create a card that's actually you. Choose from our designs or upload your own.
                </p>
                <div className="pt-1">
                  <button
                    onClick={onOpenCardStudio || onOpenWaitlist}
                    className="group inline-flex items-center gap-1.5 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-extrabold text-xs px-4 sm:px-5 py-2.5 rounded-full transition-all duration-150 shadow-[1px_2px_0px_rgba(0,0,0,0.8)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Design Yours</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Doodle Star */}
              <div className="mt-6 sm:mt-8">
                <DoodleStar className="w-6 h-6 text-black" strokeWidth={2} />
              </div>
            </div>

            {/* Right Column: 3 Real OVERLAPPING Physical Credit Cards (Shifted down, slightly decreased size) */}
            <div className="relative w-[155px] sm:w-[172px] h-[330px] shrink-0 select-none">
              
              {/* Card 1 (Top): Holographic Sunset Purple-Pink Card */}
              <div 
                className="absolute top-[65px] sm:top-[75px] right-0 w-[144px] sm:w-[160px] h-[92px] sm:h-[102px] rounded-[14px] bg-gradient-to-tr from-[#6D28D9] via-[#DB2777] to-[#F59E0B] text-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-white/40 p-2.5 flex flex-col justify-between transform -rotate-6 z-10 overflow-hidden"
              >
                {/* Diagonal subtle gloss sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                
                {/* Top: EMV Chip + Plexo Wordmark */}
                <div className="flex justify-between items-start z-10">
                  <EMVChip className="w-6 h-4.5" />
                  <span className="font-rubik font-black text-xs tracking-tight text-white drop-shadow-sm">
                    plexo
                  </span>
                </div>

                {/* Bottom: Contactless + DEBIT */}
                <div className="flex justify-between items-end z-10">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-90">
                    <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                    <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                    <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                  </svg>
                  <span className="font-plexo-mono font-bold text-[8px] tracking-wider text-white/80 uppercase">
                    DEBIT
                  </span>
                </div>
              </div>

              {/* Card 2 (Middle): Matte Carbon Black with Bright Neon Smiley - OVERLAPPING Card 1 */}
              <div 
                className="absolute top-[135px] sm:top-[150px] right-1.5 w-[144px] sm:w-[160px] h-[92px] sm:h-[102px] rounded-[14px] bg-[#0E0E10] text-white shadow-[0_14px_28px_rgba(0,0,0,0.5)] border border-neutral-700 p-2.5 flex flex-col justify-between transform rotate-3 z-20 overflow-hidden"
              >
                {/* Top: EMV Chip + Plexo Wordmark */}
                <div className="flex justify-between items-start z-10">
                  <EMVChip className="w-6 h-4.5" />
                  <span className="font-rubik font-black text-xs tracking-tight text-white drop-shadow-sm">
                    plexo
                  </span>
                </div>

                {/* Center: Iconic Neon Yellow Smiley Face Badge */}
                <div className="z-10 flex items-center justify-center -my-1">
                  <div className="w-7.5 h-7.5 rounded-full bg-[#FFE600] flex items-center justify-center text-black font-black text-sm shadow-sm">
                    ☺
                  </div>
                </div>

                {/* Bottom: Contactless + DEBIT */}
                <div className="flex justify-between items-end z-10">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-90">
                    <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                    <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                    <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                  </svg>
                  <span className="font-plexo-mono font-bold text-[8px] tracking-wider text-white/80 uppercase">
                    DEBIT
                  </span>
                </div>
              </div>

              {/* Card 3 (Bottom): Vector Inferno Flame Card - OVERLAPPING Card 2 */}
              <div 
                className="absolute top-[205px] sm:top-[225px] right-0 w-[144px] sm:w-[160px] h-[92px] sm:h-[102px] rounded-[14px] bg-[#0A0A0C] text-white shadow-[0_20px_40px_rgba(234,88,12,0.35),0_12px_24px_rgba(0,0,0,0.7)] border border-orange-500/40 p-2.5 flex flex-col justify-between transform -rotate-3 z-30 overflow-hidden"
              >
                {/* 100% Pure Vector Inferno Flame Artwork — Zero raster images */}
                <svg 
                  viewBox="0 0 200 120" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-0"
                  preserveAspectRatio="xMidYMax slice"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="flameBaseGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#7F1D1D" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#991B1B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0A0A0C" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="outerFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="60%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#F97316" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="midFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="coreFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="60%" stopColor="#FFE600" />
                      <stop offset="100%" stopColor="#FFFBEB" />
                    </linearGradient>
                  </defs>

                  {/* Ambient base fire glow */}
                  <rect width="200" height="120" fill="url(#flameBaseGrad)" />

                  {/* Outer Red/Crimson Flame Layer */}
                  <path 
                    d="M-10 120 C10 80, 25 95, 35 60 C45 90, 60 75, 75 45 C90 80, 110 50, 125 35 C140 70, 160 55, 175 70 C190 85, 205 60, 215 120 Z" 
                    fill="url(#outerFlame)" 
                    opacity="0.85"
                  />

                  {/* Mid Orange Blazing Flame Layer */}
                  <path 
                    d="M0 120 C15 95, 30 85, 45 70 C60 100, 80 65, 95 50 C110 90, 130 65, 145 55 C160 85, 180 75, 200 120 Z" 
                    fill="url(#midFlame)" 
                    opacity="0.95"
                  />

                  {/* Inner Solar Yellow Hot Core Layer */}
                  <path 
                    d="M15 120 C30 105, 45 90, 60 85 C75 105, 95 80, 110 68 C125 95, 145 80, 160 78 C175 105, 185 95, 195 120 Z" 
                    fill="url(#coreFlame)" 
                  />

                  {/* White-Hot Flame Center Accents */}
                  <path 
                    d="M40 120 C50 110, 55 100, 65 94 C75 108, 90 95, 105 82 C120 102, 135 94, 145 90 C155 110, 165 105, 170 120 Z" 
                    fill="#FFFFFF" 
                    opacity="0.75"
                  />

                  {/* Floating Glowing Ember Sparks */}
                  <circle cx="35" cy="45" r="1.5" fill="#FFE600" opacity="0.9" />
                  <circle cx="85" cy="30" r="1.8" fill="#FFE600" opacity="0.95" />
                  <circle cx="115" cy="22" r="1.2" fill="#FBBF24" opacity="0.8" />
                  <circle cx="150" cy="38" r="1.6" fill="#F97316" opacity="0.85" />
                  <circle cx="170" cy="50" r="1.2" fill="#FFE600" opacity="0.9" />
                  <circle cx="65" cy="20" r="1" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="130" cy="15" r="1.2" fill="#FFE600" opacity="0.85" />
                </svg>

                {/* Diagonal specular gloss sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none" />

                {/* Top: EMV Chip + Plexo Wordmark */}
                <div className="flex justify-between items-start z-10">
                  <EMVChip className="w-6 h-4.5" />
                  <span className="font-rubik font-black text-xs tracking-tight text-white drop-shadow-sm">
                    plexo
                  </span>
                </div>

                {/* Bottom: Contactless Waves + DEBIT */}
                <div className="flex justify-between items-end z-10">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-90">
                    <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                    <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                    <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                  </svg>
                  <span className="font-plexo-mono font-bold text-[8px] tracking-wider text-white/80 uppercase">
                    DEBIT
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
