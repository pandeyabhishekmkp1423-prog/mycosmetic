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
                    <p className="text-base sm:text-lg font-editorial font-bold leading-tight">
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
        </div>
      </div>
    </div>
  );
};
