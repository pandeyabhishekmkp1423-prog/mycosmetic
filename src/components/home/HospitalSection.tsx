import React from 'react';
import { ShieldCheck, MapPin, Activity, BedDouble, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { HospitalGallerySlider } from './HospitalGallerySlider';

interface HospitalSectionProps {
  onNavigate: (route: string) => void;
}

export const HospitalSection: React.FC<HospitalSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hospital" className="scroll-mt-28 py-12 sm:py-16 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Hospital Narrative & Facilities */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003366]/10 text-[#003366] text-xs font-bold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>NABH Accredited Tertiary Center</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.12]">
                Operating at SIPS Super Specialty Hospital, <span className="italic text-[#00A3E0] font-normal">Lucknow.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed font-normal">
                SIPS Super Specialty Hospital (Pvt. Ltd.) is North India’s premier NABH-accredited tertiary center dedicated to advanced aesthetic, plastic, and reconstructive surgery under the leadership of Managing Director &amp; Head of Plastic Surgery Department, Dr. R.K. Mishra.
              </p>
            </div>

            {/* Core Facility Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  Class 100 Laminar OTs
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  HEPA-filtered positive pressure surgical suites strictly minimizing any microbial infection risks.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <BedDouble className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  VIP Inpatient Suites
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Discreet, comfortable inpatient recovery rooms with 24/7 specialized nursing and attendant space.
                </p>
              </div>

              <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  High-Tech Precision Systems
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  High-definition ultrasound body sculpting &amp; Karl Storz endoscopy for precise, bloodless incisions with Nihon Kohden Life Scope vital telemetry.
                </p>
              </div>
            </div>

            {/* Address & Landmark */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-1.5 shadow-xs">
              <p className="text-xs sm:text-sm text-[#003366] flex items-start gap-2.5 font-bold">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span>{hospitalData.address}</span>
              </p>
              <p className="text-xs text-[#64748B] pl-6.5">
                <strong>Landmark:</strong> Near King George’s Medical University (KGMU), Chowk, Lucknow
              </p>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy py-3 px-5 rounded-xl font-semibold text-sm cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span>Book Consultation at SIPS</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('hospital')}
                className="py-3 px-5 rounded-xl border border-[#003366]/30 text-[#003366] hover:bg-[#003366] hover:text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Full Facility Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Authentic Hospital Facility Interactive Visual Showcase */}
          <div className="lg:col-span-6 w-full">
            <HospitalGallerySlider autoPlayInterval={4500} />
          </div>

        </div>
      </div>
    </section>
  );
};
