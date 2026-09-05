import React from 'react';
import { UserCheck, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const TrustCredentials: React.FC = () => {
  const highlights = [
    {
      title: 'PERSONALIZED SURGICAL CARE',
      desc: 'Tailored treatment plans matching your natural facial and body proportions',
      icon: UserCheck
    },
    {
      title: 'ADVANCED TECHNOLOGY',
      desc: 'VASER ultrasound, microsurgical loupes, and modern laminar airflow OTs',
      icon: Sparkles
    },
    {
      title: 'NATURAL, HARMONIOUS RESULTS',
      desc: 'Subtle anatomical refinement that revamps your looks naturally',
      icon: HeartHandshake
    },
    {
      title: 'NABH ACCREDITED SAFETY',
      desc: 'Round-the-clock emergency support, ICU and complete clinical safety at SIPS',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-[#002244] text-white py-10 sm:py-12 border-y border-[#003366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#003366] border border-[#00A3E0]/30 flex items-center justify-center shrink-0 text-[#00A3E0] group-hover:scale-105 group-hover:border-[#00A3E0] transition-all shadow-sm">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
