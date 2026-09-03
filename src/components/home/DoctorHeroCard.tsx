import React from 'react';
import { MapPin, Award } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface DoctorHeroCardProps {
  doctorName: string;
  doctorTitle: string;
  hospitalName: string;
  hospitalAddress: string;
  qualifications: string;
  doctorImageUrl: string;
}

export const DoctorHeroCard: React.FC<DoctorHeroCardProps> = ({
  doctorName,
  doctorTitle,
  hospitalName,
  hospitalAddress,
  qualifications,
  doctorImageUrl
}) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 rounded-lg bg-[#F5FAFD]" />
        <svg 
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="150" stroke="#1769AA" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="200" cy="200" r="200" stroke="#1769AA" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md">
        
        {/* Main Doctor Image Container */}
        <div className="relative group">
          
          {/* Outer frame with subtle shadow */}
          <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/50">
            {/* Inner frame with padding */}
            <div className="relative p-2 sm:p-3 bg-white rounded-3xl">
              {/* Image container */}
              <div className="relative w-full overflow-hidden rounded-2xl aspect-3/4 bg-linear-to-b from-[#F5FAFD] to-[#EEF7FC]">
                <SafeImage
                  src={doctorImageUrl}
                  alt={`${doctorName} profile`}
                  fallbackCategory="Clinical Profile"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                />
                
                {/* Subtle dark overlay at bottom with name and title */}
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-linear-to-t from-[#0B2A5B]/90 via-[#0B2A5B]/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white space-y-1.5">
                  <div>
                    <p className="text-base sm:text-lg font-serif font-bold leading-tight">
                      {doctorName}
                    </p>
                    <p className="text-xs text-[#EEF7FC] font-medium opacity-95 leading-tight mt-0.5">
                      {doctorTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Credential Badge (Top Right) - Mobile friendly */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white/98 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl shadow-lg border border-[#DCE7F0] space-y-2 animate-in fade-in zoom-in-95 duration-500 max-w-[140px] sm:max-w-xs">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-[#071D3B] leading-snug line-clamp-2">
                  {doctorName}
                </p>
                <p className="text-[9px] sm:text-xs text-[#52677D] font-medium leading-snug line-clamp-2 mt-0.5">
                  {qualifications}
                </p>
              </div>
            </div>
          </div>

          {/* Floating Location Card (Bottom Left) - Mobile friendly */}
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white/98 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl shadow-lg border border-[#DCE7F0] flex items-start gap-2 animate-in fade-in zoom-in-95 duration-500 delay-100 max-w-[140px] sm:max-w-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-[#071D3B] leading-snug">
                {hospitalName}
              </p>
              <p className="text-[9px] sm:text-xs text-[#52677D] font-medium leading-snug line-clamp-2 mt-0.5">
                {hospitalAddress}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
