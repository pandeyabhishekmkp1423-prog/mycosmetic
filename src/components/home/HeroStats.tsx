import React from 'react';
import { 
  ShieldCheck, 
  Users,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

export const HeroStats: React.FC = () => {
  const stats = [
    {
      icon: ShieldCheck,
      number: '25+',
      label: 'Years',
      sublabel: 'Experience',
      color: '#1769AA'
    },
    {
      icon: Users,
      number: '30,000+',
      label: 'Successful',
      sublabel: 'Surgeries',
      color: '#1769AA'
    },
    {
      icon: GraduationCap,
      number: 'USA & Taiwan',
      label: 'International',
      sublabel: 'Training',
      color: '#1769AA'
    },
    {
      icon: HeartHandshake,
      number: 'NABH',
      label: 'Patient-Centred',
      sublabel: 'Care & Safety',
      color: '#1769AA'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 pt-6 sm:pt-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx}
            className="group px-4 py-5 sm:px-5 sm:py-6 bg-white border border-[#DCE7F0] rounded-2xl hover:border-[#1769AA]/30 hover:shadow-md transition-all duration-300 space-y-3"
          >
            {/* Icon Container */}
            <div className="inline-flex p-2.5 bg-[#EEF7FC] rounded-[10px] text-[#1769AA] group-hover:bg-[#E1EFF8] transition-colors">
              <Icon className="w-5 h-5" />
            </div>

            {/* Number & Label */}
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-editorial font-bold text-[#003366]">
                {stat.number}
              </p>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-semibold text-[#102A43] leading-tight">
                  {stat.label}
                </p>
                <p className="text-xs text-[#52677D] font-medium">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
