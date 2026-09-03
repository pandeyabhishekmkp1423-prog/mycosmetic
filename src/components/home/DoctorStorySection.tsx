import React from 'react';
import { ArrowRight, Award, GraduationCap, Globe, CheckCircle2, Quote } from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { SafeImage } from '../common/SafeImage';

interface DoctorStorySectionProps {
  onNavigate: (route: string) => void;
}

export const DoctorStorySection: React.FC<DoctorStorySectionProps> = ({ onNavigate }) => {
  return (
    <section id="meet-dr-mishra-story" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-[#DCE7F0]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Portrait & Credentials */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background layered shape */}
            <div className="absolute inset-0 bg-[#EEF7FC] rounded-[32px] rotate-2 scale-95 -z-10" />
            
            <div className="relative w-full max-w-md bg-white p-3 rounded-[28px] shadow-lg border border-[#DCE7F0]">
              <div className="aspect-[4/5] rounded-[22px] overflow-hidden relative bg-gray-100">
                <SafeImage
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80"
                  alt="Senior plastic and cosmetic surgery consultation portrait"
                  fallbackCategory="Clinical Profile"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-[#0B2A5B] uppercase tracking-wider border border-[#DCE7F0] shadow-xs">
                  Senior Surgical Director
                </div>
              </div>

              {/* Surgeon Card Footer Details */}
              <div className="p-4 pt-4 text-center">
                <h3 className="text-xl font-serif font-bold text-[#102A43]">
                  Dr. R. K. Mishra
                </h3>
                <p className="text-xs text-[#1769AA] font-semibold mt-0.5">
                  M.S., M.Ch (Plastic Surgery - KGMC), DNB, MNAMS, FICS
                </p>
                <p className="text-[11px] text-[#52677D] mt-1">
                  Head of Plastic Surgery • SIPS Hospital, Lucknow
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Story & Surgical Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] block mb-2">
                Surgeon Story & Background
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
                Meet Dr. R. K. Mishra
              </h2>
              <p className="text-sm font-semibold text-[#1769AA] mt-1">
                25+ Years of Dedicated Super-Specialty Plastic & Aesthetic Surgery
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#52677D] leading-relaxed">
              <p>
                After obtaining his super-specialty M.Ch in Plastic Surgery from the prestigious King George’s Medical College (KGMC) in 2000, Dr. Mishra undertook advanced aesthetic and reconstructive fellowships at top medical centers in Dallas (USA), NYU New York, and Chang Gung Memorial Hospital (Taiwan).
              </p>
              <p>
                With over 30,000 surgeries performed throughout his career, Dr. Mishra is renowned for his mastery in facial aesthetic procedures (preservation rhinoplasty, facelifts), male chest contouring (gynecomastia), and comprehensive body contouring.
              </p>
            </div>

            {/* Surgical Philosophy Callout Quote */}
            <div className="p-5 rounded-2xl bg-[#F5FAFD] border border-[#DCE7F0] relative">
              <Quote className="w-8 h-8 text-[#1769AA]/20 absolute top-3 right-3" />
              <p className="text-xs sm:text-sm font-medium text-[#102A43] italic leading-relaxed">
                "{doctorData.philosophy}"
              </p>
              <p className="text-[11px] font-bold text-[#1769AA] uppercase tracking-wider mt-2">
                — Surgical Philosophy & Ethical Standard
              </p>
            </div>

            {/* International Training Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-[#102A43]">
                <Globe className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>Dallas Medical Center Fellowship (USA)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#102A43]">
                <Globe className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>NYU Medical Center Fellowship (USA)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#102A43]">
                <Award className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>Project Director, Smile Train USA</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#102A43]">
                <GraduationCap className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>Full Member APSI, ASPS, IAAPS & ICS</span>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <button
                id="doctor-story-cta-btn"
                onClick={() => onNavigate('doctor')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0B2A5B] hover:bg-[#071D3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <span>Explore Dr. Mishra's Full Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
