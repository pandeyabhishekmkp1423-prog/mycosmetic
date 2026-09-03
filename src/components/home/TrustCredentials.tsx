import React from 'react';
import { Shield, Award, HeartHandshake, Globe } from 'lucide-react';

export const TrustCredentials: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '25+',
      label: 'Years Experience',
      detail: 'M.Ch Plastic Surgery (KGMC, 2000)'
    },
    {
      icon: Shield,
      value: '30,000+',
      label: 'Surgeries Performed',
      detail: 'Aesthetic & Reconstructive Mastery'
    },
    {
      icon: Globe,
      value: 'USA & Taiwan',
      label: 'International Training',
      detail: 'Dallas, NYU & Chang Gung Memorial'
    },
    {
      icon: HeartHandshake,
      value: 'Patient-First',
      label: 'Safety & Hospital Care',
      detail: 'NABH Accredited SIPS Facility'
    }
  ];

  return (
    <section id="trust-credentials-section" className="py-12 sm:py-16 bg-[#EEF7FC]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Editorial Row with Numbers as Focus */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#DCE7F0]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 group"
              >
                <div className="w-10 h-10 rounded-full bg-white text-[#1769AA] flex items-center justify-center shadow-xs mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                
                <p className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#102A43] tracking-tight leading-none mb-1.5">
                  {stat.value}
                </p>
                
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2A5B] mb-1">
                  {stat.label}
                </h3>
                
                <p className="text-xs text-[#52677D] max-w-[200px]">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
