import React from 'react';
import { ShieldCheck, MapPin, Building2, ArrowRight, Activity, BedDouble, Stethoscope, Sparkles } from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { SafeImage } from '../common/SafeImage';
import { Card3D } from '../common/Card3D';

interface HospitalSectionProps {
  onNavigate: (route: string) => void;
}

export const HospitalSection: React.FC<HospitalSectionProps> = ({ onNavigate }) => {
  return (
    <section id="homepage-hospital-section" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hospital Narrative & Facilities */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>NABH Accredited Super-Specialty Infrastructure</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight leading-[1.14]">
                Operating at SIPS Hospital, Lucknow
              </h2>
              <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed font-normal">
                Sushrut Institute of Plastic Surgery (SIPS) is North India’s premier super-specialty hospital dedicated exclusively to plastic, cosmetic, and reconstructive surgical artistry.
              </p>
            </div>

            {/* Core Facility Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-1">
                  Class 100 Laminar OTs
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  HEPA-filtered positive pressure surgical suites strictly minimizing any microbial infection risks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <BedDouble className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-1">
                  VIP Inpatient Suites
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Discreet, comfortable inpatient recovery rooms with 24/7 specialized nursing and attendant space.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Stethoscope className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-1">
                  Cardiac Anesthesia
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Full-time board-certified cardiac anesthetists on-site throughout preoperative, surgical, and post-op care.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-1">
                  VASER Ultrasound Tech
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  High-definition ultrasound body sculpting & Karl Storz endoscopy for precise, bloodless incisions.
                </p>
              </div>
            </div>

            {/* Address & Actions */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-1.5 shadow-xs">
              <p className="text-xs text-[#003366] flex items-start gap-2.5 font-bold">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span>{hospitalData.address}</span>
              </p>
              <p className="text-[11px] text-[#64748B] pl-6.5">
                <strong>Landmark:</strong> Near King George’s Medical University (KGMU), Chowk, Lucknow
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('hospital')}
                className="btn-navy"
              >
                <span>Tour Hospital & Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="btn-outline-navy"
              >
                View Directions & Map
              </button>
            </div>

          </div>

          {/* Right Column: 3D Hospital Facility Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card3D maxTilt={6}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-900">
                  <SafeImage
                    src={hospitalData.gallery[0]}
                    alt="SIPS Hospital Modern Surgical Infrastructure"
                    fallbackCategory="Hospital & Theatre"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card3D>
              <Card3D maxTilt={6}>
                <div className="aspect-square rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-900">
                  <SafeImage
                    src={hospitalData.gallery[1]}
                    alt="NABH Laminar Airflow Operating Suite"
                    fallbackCategory="Hospital & Theatre"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card3D>
            </div>
            <div className="space-y-4 pt-6">
              <Card3D maxTilt={6}>
                <div className="aspect-square rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-900">
                  <SafeImage
                    src={hospitalData.gallery[2]}
                    alt="High Tech Cosmetic Consultation Room"
                    fallbackCategory="Hospital & Theatre"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card3D>
              <Card3D maxTilt={6}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-900">
                  <SafeImage
                    src={hospitalData.gallery[3]}
                    alt="SIPS Hospital Inpatient Recovery Wing"
                    fallbackCategory="Hospital & Theatre"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card3D>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
