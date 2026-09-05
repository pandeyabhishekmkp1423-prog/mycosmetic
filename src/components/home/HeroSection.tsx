import React from 'react';
import { Calendar, Award, Users, ShieldCheck, Building2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0]">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Eyebrow / Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E0F2FE] border border-[#00A3E0]/20 text-xs font-semibold text-[#0284C7] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
              <span>Revamping Your Looks • SIPS Hospital Lucknow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-heading font-bold text-[#0F172A] tracking-tight leading-[1.1]">
              Revamping Your Looks.<br />
              <span className="text-[#003366]">Refining Your Confidence.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Premier Plastic, Aesthetic & Reconstructive Surgery platform led by <strong className="text-[#003366] font-semibold">Dr. R. K. Mishra</strong> (25+ Years Experience, 30,000+ Surgeries) at SIPS Super Specialty Hospital, Lucknow.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md cursor-pointer flex items-center"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0] mr-1.5" />
                <span>Book Consultation</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('procedure-matcher-quiz');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-sky text-xs sm:text-sm py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Procedure Quiz</span>
              </button>

              <button
                onClick={() => onNavigate('procedures')}
                className="btn-outline-navy text-xs sm:text-sm py-3 px-5 rounded-xl cursor-pointer"
              >
                <span>All Procedures</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Trust Credentials Row */}
            <div className="pt-8 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-6">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center shrink-0 text-[#003366]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">25+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Years Experience</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center shrink-0 text-[#003366]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">30,000+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Procedures Done</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center shrink-0 text-[#003366]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">MS, MCh</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Plastic Surgery</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center shrink-0 text-[#003366]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">SIPS</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">NABH Hospital</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Aesthetic Photography (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              {/* Main Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#003366]/15 bg-white relative group">
                <img 
                  src="/hero.png" 
                  alt="Dr. R. K. Mishra - Senior Plastic Surgeon, SIPS Hospital Lucknow" 
                  className="w-full h-auto object-cover object-top aspect-[3/4] group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Verified Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        RM
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#003366]">Dr. R. K. Mishra</div>
                        <div className="text-[11px] text-[#00A3E0] font-semibold">M.Ch Senior Plastic Surgeon</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-500 flex items-center justify-end gap-1">
                        <span>★ 4.9</span>
                        <span className="text-slate-600 font-semibold text-[10px]">(850+ reviews)</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">30,000+ Surgeries</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};