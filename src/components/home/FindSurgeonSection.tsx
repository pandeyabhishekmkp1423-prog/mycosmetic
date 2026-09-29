import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FindSurgeonSectionProps {
  onNavigate: (route: string) => void;
}

export const FindSurgeonSection: React.FC<FindSurgeonSectionProps> = ({ onNavigate }) => {
  const handleStartSearch = () => {
    // If the matcher quiz exists on page, smooth scroll to it; otherwise navigate to procedures
    const el = document.getElementById('procedure-matcher-quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('procedures');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#12102B] via-[#002244] to-[#0A142F] text-white py-14 sm:py-20 border-y border-white/10">
      
      {/* Delicate Abstract Contour Curve Lines (Matching the reference aesthetic) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25" 
        viewBox="0 0 1440 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path 
          d="M-50,150 C200,50 350,450 500,650" 
          stroke="white" 
          strokeWidth="1.5" 
        />
        <path 
          d="M100,-50 C300,100 150,400 450,550" 
          stroke="#00A3E0" 
          strokeWidth="1" 
        />
        <path 
          d="M800,-100 C1100,200 1000,500 1500,500" 
          stroke="white" 
          strokeWidth="1" 
          strokeDasharray="4 4"
        />
        <path 
          d="M900,650 C1150,450 1350,200 1500,-50" 
          stroke="#00A3E0" 
          strokeWidth="1.5" 
        />
      </svg>

      {/* Ambient Radial Glowing Auras */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#003366]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Dr. R.K. Mishra Solo Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-1 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md w-full">
              
              {/* Outer Decorative Gradient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00A3E0] to-[#003366] rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950 group">
                <img 
                  src="/hero.png" 
                  alt="Dr. R.K. Mishra - ASPS Board Certified Plastic Surgeon" 
                  className="w-full h-auto object-cover object-top aspect-[3/4] group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Bottom Floating Identity Card */}
                <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-2xl bg-[#001f3f]/90 backdrop-blur-md border border-white/15 shadow-xl text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">
                        Dr. R.K. Mishra
                      </h3>
                      <p className="text-[#00A3E0] text-xs font-semibold mt-0.5">
                        M.S., M.Ch (Plastic Surgery - KGMC)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider">
                      ASPS Member
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Managing Director & Head of Plastic Surgery, SIPS Hospital</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Clean Editorial Content & White CTA Button (Matching Reference) */}
          <div className="lg:col-span-7 order-2 lg:order-2 space-y-5 text-center lg:text-left">
            
            {/* Clean Section Eyebrow */}
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
              Senior Surgical Expertise
            </span>

            {/* Main Headline */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
              Looking For An Aesthetic <br />
              <span className="italic text-[#00A3E0] font-normal">Plastic Surgeon?</span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Find an ASPS Board Certified Plastic Surgeon who specializes in precisely what you’re looking for. Connect directly with <strong className="text-white font-semibold">Dr. R.K. Mishra</strong> (Managing Director & Head of Plastic Surgery Department, SIPS Super Specialty Hospital Pvt. Ltd.) for personalized anatomical planning.
            </p>

            {/* Inclusions Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-slate-200 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ASPS Board Certified</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>25+ Yrs Master Surgeon</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Class-100 Laminar OTs</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>In-Person & Virtual OPD</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={handleStartSearch}
                className="bg-white hover:bg-slate-100 text-[#003366] text-sm sm:text-base font-bold py-3.5 px-7 rounded-xl shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>Find Your Surgeon Protocol</span>
                <ArrowRight className="w-4 h-4 text-[#003366] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('consultation');
                }}
                className="px-6 py-3.5 rounded-xl border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-sm sm:text-base transition-all cursor-pointer"
              >
                Book Consultation
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
