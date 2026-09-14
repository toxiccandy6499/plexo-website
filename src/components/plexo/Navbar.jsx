import React, { useState } from 'react';
import { PlexoLogo } from './PlexoLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Navbar({ onOpenWaitlist }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Card', href: '#card' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F6F4EE]/90 backdrop-blur-md border-b border-[#E8E3D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Interactive Hover-Tear */}
        <div className="flex items-center">
          <a href="#hero" className="flex items-center h-16 sm:h-18 py-1">
            <PlexoLogo className="h-16 sm:h-18" />
          </a>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = activeNav === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(link.name)}
                className={`relative text-sm font-semibold tracking-wide transition-colors py-1 ${
                  isActive ? 'text-black' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-plexo-red rounded-full transform -rotate-1" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenWaitlist}
            className="group relative inline-flex items-center gap-1.5 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-extrabold text-sm px-6 py-2.5 rounded-full transition-all duration-150 shadow-[1px_2px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.9)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:bg-[#ECE8DC] rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F4EE] border-b border-[#D8D3C5] px-6 py-5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveNav(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`text-base font-bold tracking-wide py-1.5 ${
                  activeNav === link.name ? 'text-plexo-red pl-2 border-l-4 border-plexo-red' : 'text-neutral-800'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWaitlist();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFE600] text-black font-extrabold text-sm px-5 py-3 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.9)] active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
