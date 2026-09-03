import React from 'react';
import { ShieldCheck, MapPin, Building2, ArrowRight, Activity, CheckCircle2, BedDouble, Stethoscope } from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { SafeImage } from '../common/SafeImage';

interface HospitalSectionProps {
  onNavigate: (route: string) => void;
}

export const HospitalSection: React.FC<HospitalSectionProps> = ({ onNavigate }) => {
  return (
    <section id="homepage-hospital-section" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hospital Narrative & Facilities */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF7FC] text-[#0B2A5B] text-xs font-bold uppercase tracking-wider mb-3 border border-[#DCE7F0]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1769AA]" />
                <span>NABH Accredited Facility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
                Operating at SIPS Hospital, Lucknow
              </h2>
              <p className="text-sm sm:text-base text-[#52677D] mt-3 leading-relaxed font-normal">
                Sushrut Institute of Plastic Surgery (SIPS) is North India’s premier super-specialty hospital infrastructure dedicated to plastic, cosmetic, and reconstructive surgery.
              </p>
            </div>

            {/* Core Facility Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-[#F5FAFD] border border-[#DCE7F0] shadow-xs">
                <Activity className="w-5 h-5 text-[#1769AA] mb-2.5" />
                <h4 className="text-xs font-bold text-[#102A43] uppercase mb-1">Laminar Airflow OTs</h4>
                <p className="text-xs text-[#52677D] leading-relaxed">HEPA-filtered positive pressure surgical suites minimizing infection risks.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5FAFD] border border-[#DCE7F0] shadow-xs">
                <BedDouble className="w-5 h-5 text-[#1769AA] mb-2.5" />
                <h4 className="text-xs font-bold text-[#102A43] uppercase mb-1">Private Recovery Suites</h4>
                <p className="text-xs text-[#52677D] leading-relaxed">Discreet, comfortable inpatient recovery rooms with 24/7 specialized nursing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5FAFD] border border-[#DCE7F0] shadow-xs">
                <Stethoscope className="w-5 h-5 text-[#1769AA] mb-2.5" />
                <h4 className="text-xs font-bold text-[#102A43] uppercase mb-1">24/7 Dedicated Anaesthesia</h4>
                <p className="text-xs text-[#52677D] leading-relaxed">Full-time board-certified anaesthesiologists on-site throughout surgery and recovery.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5FAFD] border border-[#DCE7F0] shadow-xs">
                <Building2 className="w-5 h-5 text-[#1769AA] mb-2.5" />
                <h4 className="text-xs font-bold text-[#102A43] uppercase mb-1">Advanced Endoscopy</h4>
                <p className="text-xs text-[#52677D] leading-relaxed">High-resolution HD endoscopic visualization for minimally invasive tissue handling.</p>
              </div>
            </div>

            {/* Address & Actions */}
            <div className="p-4 rounded-xl bg-[#EEF7FC] border border-[#DCE7F0] space-y-1.5 shadow-xs">
              <p className="text-xs text-[#102A43] flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                <span><strong>Address:</strong> {hospitalData.address}</span>
              </p>
              <p className="text-[11px] text-[#52677D] pl-6">
                <strong>Landmark:</strong> Near King George’s Medical University (KGMU), Chowk, Lucknow
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('hospital')}
                className="px-6 py-3 bg-[#0B2A5B] hover:bg-[#071D3B] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Tour Hospital & Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 bg-white hover:bg-[#EEF7FC] text-[#0B2A5B] border border-[#DCE7F0] text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                View Directions & Map
              </button>
            </div>

          </div>

          {/* Right Column: Hospital Facility Photos with SafeImage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden border border-[#DCE7F0] shadow-xs bg-gray-100">
                <SafeImage
                  src={hospitalData.gallery[0]}
                  alt="SIPS Hospital Modern Surgical Infrastructure"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-[22px] overflow-hidden border border-[#DCE7F0] shadow-xs bg-gray-100">
                <SafeImage
                  src={hospitalData.gallery[1]}
                  alt="SIPS Hospital Operating Suite"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="aspect-square rounded-[22px] overflow-hidden border border-[#DCE7F0] shadow-xs bg-gray-100">
                <SafeImage
                  src={hospitalData.gallery[2]}
                  alt="SIPS Hospital Inpatient Care"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden border border-[#DCE7F0] shadow-xs bg-gray-100">
                <SafeImage
                  src={hospitalData.gallery[3]}
                  alt="SIPS Hospital Consultation Suite"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
