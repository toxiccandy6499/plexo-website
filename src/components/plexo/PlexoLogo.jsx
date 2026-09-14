import React from 'react';

export function PlexoLogo({ className = "h-16 sm:h-18", variant = "default" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      title="PLEXO — Hover to tear!"
    >
      {/* Intact Sticker (Default State) */}
      <img 
        src="/logo_intact.png" 
        alt="PLEXO" 
        className="h-full w-auto object-contain transition-all duration-200 transform group-hover:opacity-0 group-hover:scale-95 filter drop-shadow-sm pointer-events-none"
      />

      {/* Torn Sticker (Hover / Active State) */}
      <img 
        src="/logo_torn.png" 
        alt="PLEXO Torn" 
        className="absolute inset-0 h-full w-auto object-contain mx-auto transition-all duration-150 transform opacity-0 scale-95 rotate-[-1deg] group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-[1.5deg] filter drop-shadow-md pointer-events-none"
      />
    </div>
  );
}
