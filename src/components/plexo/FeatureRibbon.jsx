import React from 'react';
import { Zap, GraduationCap, PiggyBank, TrendingUp, Layers } from 'lucide-react';

export function FeatureRibbon() {
  const features = [
    {
      id: 'cards',
      title: 'Debit & Credit Cards',
      subtitle: 'For everyday spending.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform -rotate-3 scale-90" />
          <div className="relative z-10 w-10 h-7 border-2 border-black rounded bg-white flex flex-col justify-between p-1 shadow-xs">
            <div className="w-3 h-1.5 bg-black rounded-xs" />
            <div className="flex justify-between items-center">
              <div className="w-3 h-1 bg-neutral-300" />
              <div className="w-2 h-1 bg-black rounded-xs" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Fast. Secure. Easy.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform rotate-3 scale-90" />
          <div className="relative z-10 w-9 h-9 border-2 border-black rounded-lg bg-white flex items-center justify-center font-black text-black shadow-xs">
            <Zap className="w-5 h-5 fill-black stroke-black" />
          </div>
        </div>
      ),
    },
    {
      id: 'student-benefits',
      title: 'Student Benefits',
      subtitle: 'Verified with your college. Exclusive discounts.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform -rotate-6 scale-90" />
          <div className="relative z-10 text-black">
            <GraduationCap className="w-8 h-8 stroke-[2.2]" />
          </div>
        </div>
      ),
    },
    {
      id: 'savings-goals',
      title: 'Savings Goals',
      subtitle: 'Small steps. Big dreams.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform rotate-6 scale-90" />
          <div className="relative z-10 text-black">
            <PiggyBank className="w-8 h-8 stroke-[2.2]" />
          </div>
        </div>
      ),
    },
    {
      id: 'investments',
      title: 'Gold & Mutual Funds',
      subtitle: 'Grow your wealth, your way.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform -rotate-2 scale-90" />
          <div className="relative z-10 text-black">
            <TrendingUp className="w-8 h-8 stroke-[2.5]" />
          </div>
        </div>
      ),
    },
    {
      id: 'custom-cards',
      title: 'Custom Cards',
      subtitle: 'Design it. Live it.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-xl transform rotate-2 scale-90" />
          <div className="relative z-10 text-black">
            <Layers className="w-8 h-8 stroke-[2.2]" />
          </div>
        </div>
      ),
    },
    {
      id: 'plexo-coins',
      title: 'Plexo Coins',
      subtitle: 'Earn. Redeem. Play.',
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FFE600] rounded-full transform scale-90" />
          <div className="relative z-10 w-9 h-9 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-xs">
            <span className="text-black font-black text-sm">★</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="border-y border-[#D8D3C5] py-8 bg-[#FAF8F5]/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4 text-center">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center group transition-transform hover:-translate-y-1 duration-150"
            >
              <div className="mb-2.5 transition-transform group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-sm text-neutral-900 leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed max-w-[150px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
