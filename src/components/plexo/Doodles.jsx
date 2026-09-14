import React from 'react';

// Hand-drawn 5-pointed hollow star doodle
export function DoodleStar({ className = "w-6 h-6 text-black", strokeWidth = 2.2 }) {
  return (
    <svg 
      aria-hidden="true"
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M20 4L24.2 14.8L35.8 15.6L27 23.2L29.6 34.6L20 28.8L10.4 34.6L13 23.2L4.2 15.6L15.8 14.8L20 4Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

// Hand-drawn 3-point crown doodle
export function DoodleCrown({ className = "w-8 h-6 text-plexo-red", strokeWidth = 2.4 }) {
  return (
    <svg 
      aria-hidden="true"
      viewBox="0 0 50 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M4 28L8 10L20 20L25 6L30 20L42 10L46 28H4Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="25" cy="4" r="2" fill="currentColor" />
      <circle cx="42" cy="8" r="2" fill="currentColor" />
      <path d="M7 25H43" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn graduation cap doodle
export function DoodleGraduationCap({ className = "w-12 h-10 text-black", strokeWidth = 2 }) {
  return (
    <svg 
      aria-hidden="true"
      viewBox="0 0 60 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Cap diamond */}
      <path 
        d="M30 8L54 20L30 32L6 20L30 8Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinejoin="round" 
        fill="#FFE600"
        fillOpacity="0.15"
      />
      {/* Cap skull cap under */}
      <path 
        d="M16 25V35C16 35 21 42 30 42C39 42 44 35 44 35V25" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
      />
      {/* Tassel */}
      <path 
        d="M48 23V37C48 37 49 41 46 43" 
        stroke="currentColor" 
        strokeWidth={strokeWidth * 0.9} 
        strokeLinecap="round" 
      />
      <circle cx="46" cy="43" r="2" fill="currentColor" />
    </svg>
  );
}

// Curved Arrow with text annotation
export function AnnotationArrow({ 
  text, 
  direction = "down-left", 
  className = "", 
  textClass = "text-xl font-plexo-script font-bold leading-tight" 
}) {
  return (
    <div className={`flex flex-col items-center pointer-events-none select-none ${className}`}>
      <span className={textClass}>{text}</span>
      {direction === "down-left" && (
        <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="text-black stroke-current -mt-1">
          <path d="M38 4C30 8 16 18 10 32" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M6 25L10 33L18 31" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {direction === "down-right" && (
        <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="text-black stroke-current -mt-1">
          <path d="M10 4C18 8 32 18 38 32" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M42 25L38 33L30 31" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {direction === "up-right" && (
        <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="text-black stroke-current -mt-1">
          <path d="M10 34C18 30 32 18 38 6" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30 6L38 6L40 14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {direction === "curved-hook" && (
        <svg width="54" height="44" viewBox="0 0 54 44" fill="none" className="text-black stroke-current">
          <path d="M42 4C30 2 12 10 14 26C15 32 20 36 28 36" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M22 30L29 36L23 41" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

// Yellow or Red scotch tape badge
export function TapeBadge({ 
  children, 
  color = "yellow", 
  rotation = "-rotate-2", 
  className = "" 
}) {
  const bgClass = color === "red" 
    ? "bg-[#E52320] text-white" 
    : "bg-[#FFE600] text-black";

  return (
    <div className={`inline-block font-plexo-mono font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 shadow-sm transform ${rotation} ${bgClass} ${className}`}>
      {/* jagged tape cut ends */}
      <span className="relative z-10">{children}</span>
    </div>
  );
}

// Hand-drawn gold ingot doodle
export function DoodleGoldBar({ className = "w-24 h-16" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ingot base */}
      <polygon 
        points="15,40 25,18 75,18 85,40" 
        fill="#FFD23F" 
        stroke="#111111" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      <polygon 
        points="15,40 85,40 78,56 22,56" 
        fill="#EEB928" 
        stroke="#111111" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      <polygon 
        points="75,18 85,40 78,56 68,34" 
        fill="#C99414" 
        stroke="#111111" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
      {/* "GOLD" text embossed */}
      <text 
        x="48" 
        y="32" 
        fill="#B8860B" 
        fontSize="11" 
        fontFamily="'Space Mono', monospace" 
        fontWeight="bold" 
        textAnchor="middle"
        letterSpacing="2"
      >
        GOLD
      </text>
    </svg>
  );
}

// Green ascending zigzag trend line
export function DoodleTrendArrow({ className = "w-20 h-14 text-[#10B981]" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="M6 42L28 32L46 38L72 10" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M58 10H72V24" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

// 3D Isometric Gold Bar Ingot with bevels and shine
export function Isometric3DGoldBar({ className = "w-24 h-16" }) {
  return (
    <svg 
      aria-hidden="true" 
      viewBox="0 0 120 70" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="50%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
        <linearGradient id="goldFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FF8F00" />
        </linearGradient>
        <linearGradient id="goldRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <filter id="goldDropShadow" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#goldDropShadow)">
        {/* Front Face */}
        <polygon 
          points="20,44 76,58 76,42 20,28" 
          fill="url(#goldFront)" 
          stroke="#0F0F0F" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Right Side Face */}
        <polygon 
          points="76,58 104,44 104,28 76,42" 
          fill="url(#goldRight)" 
          stroke="#0F0F0F" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Top Face */}
        <polygon 
          points="20,28 76,42 104,28 48,16" 
          fill="url(#goldTop)" 
          stroke="#0F0F0F" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Beveled Top Recess Inscription */}
        <polygon 
          points="30,27 68,37 88,27 50,19" 
          fill="#FFE082" 
          stroke="#E65100" 
          strokeWidth="1" 
          strokeOpacity="0.5" 
        />
        <text 
          x="58" 
          y="29" 
          fill="#8D6E63" 
          fontSize="7" 
          fontFamily="'Space Mono', monospace" 
          fontWeight="900" 
          letterSpacing="1"
          transform="rotate(13, 58, 29)"
        >
          999.9 PLEXO
        </text>
        {/* Sparkle Glint */}
        <path 
          d="M86 16L89 21L94 22L89 23L86 28L83 23L78 22L83 21L86 16Z" 
          fill="#FFFFFF" 
          opacity="0.9" 
        />
      </g>
    </svg>
  );
}

// Realistic EMV Chip
export function EMVChip({ className = "w-10 h-7" }) {
  return (
    <div className={`relative rounded-md p-0.5 border border-amber-400/80 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 shadow-sm flex flex-col justify-between overflow-hidden ${className}`}>
      {/* Circuit contact trace lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1px] h-full bg-amber-700/40" />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-amber-700/40" />
      <div className="w-full h-1 border-b border-amber-600/30" />
      <div className="mx-auto w-2 h-2 rounded-full border border-amber-700/40 bg-amber-100/60" />
      <div className="w-full h-1 border-t border-amber-600/30" />
    </div>
  );
}
