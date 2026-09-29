import React from 'react';
import { PlexoLogo } from './PlexoLogo';
import { ArrowRight, Instagram, Youtube } from 'lucide-react';

export function Footer({ onOpenWaitlist }) {
  const footerLinks = ['Spend', 'Save', 'Invest', 'Earn'];

  return (
    <footer className="border-t border-[#D8D3C5] bg-[#F6F4EE] py-10 mt-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          {/* Left: Brand Logo with Interactive Hover-Tear */}
          <div className="flex items-center">
            <PlexoLogo className="h-16 sm:h-18" />
          </div>

          {/* Center: Slash Separated Category Links */}
          <div className="flex items-center flex-wrap justify-center gap-3 text-xs sm:text-sm font-bold text-neutral-800 tracking-wide font-plexo-mono">
            {footerLinks.map((item, index) => (
              <React.Fragment key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-plexo-red transition-colors"
                >
                  {item}
                </a>
                {index < footerLinks.length - 1 && (
                  <span className="text-neutral-400 font-normal">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right: Social Icons & Waitlist Button */}
          <div className="flex items-center gap-5">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-black">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/plexopay/" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1 hover:text-plexo-red transition-colors" 
                aria-label="Follow Plexo on Instagram"
              >
                <Instagram className="w-5 h-5 stroke-[2.2]" />
              </a>

              {/* X (Twitter) */}
              <a 
                href="https://x.com/Plexo_Pay" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1 hover:text-plexo-red transition-colors" 
                aria-label="Follow Plexo on X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@PlexoPay" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1 hover:text-plexo-red transition-colors" 
                aria-label="Subscribe to Plexo on YouTube"
              >
                <Youtube className="w-5 h-5 stroke-[2.2]" />
              </a>
            </div>

            {/* Waitlist Button */}
            <button
              onClick={onOpenWaitlist}
              className="group inline-flex items-center gap-1.5 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-150 shadow-[1px_2px_0px_rgba(0,0,0,0.8)] active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Bottom Micro Copy */}
        <div className="mt-8 pt-6 border-t border-[#E8E3D5] text-center text-xs text-neutral-500 font-medium">
          &copy; {new Date().getFullYear()} PLEXO Financial Technologies Inc. Made for students, designed for freedom.
        </div>
      </div>
    </footer>
  );
}
