import { ShieldCheck, MapPin, Activity, BedDouble, Sparkles } from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { SafeImage } from '../common/SafeImage';
import { Card3D } from '../common/Card3D';

interface HospitalSectionProps {
  onNavigate: (route: string) => void;
}

export const HospitalSection: React.FC<HospitalSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hospital" className="scroll-mt-28 py-12 sm:py-16 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Hospital Narrative & Facilities */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.12]">
                Operating at SIPS Super Specialty Hospital, <span className="italic text-[#00A3E0] font-normal">Lucknow.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed font-normal">
                SIPS Super Specialty Hospital (Pvt. Ltd.) is North India’s premier NABH-accredited tertiary center dedicated to advanced aesthetic, plastic, and reconstructive surgery under the leadership of Managing Director & Head of Plastic Surgery Department, Dr. R.K. Mishra.
              </p>
            </div>

            {/* Core Facility Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  Class 100 Laminar OTs
                </h4>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  HEPA-filtered positive pressure surgical suites strictly minimizing any microbial infection risks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <BedDouble className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  VIP Inpatient Suites
                </h4>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Discreet, comfortable inpatient recovery rooms with 24/7 specialized nursing and attendant space.
                </p>
              </div>

              <div className="sm:col-span-2 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00A3E0]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h4 className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-1">
                  VASER- High Tech Machine
                </h4>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  High-definition ultrasound body sculpting &amp; Karl Storz endoscopy for precise, bloodless incisions.
                </p>
              </div>
            </div>

            {/* Address & Actions */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-1.5 shadow-xs">
              <p className="text-sm text-[#003366] flex items-start gap-2.5 font-bold">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span>{hospitalData.address}</span>
              </p>
              <p className="text-xs text-[#64748B] pl-6.5">
                <strong>Landmark:</strong> Near King George’s Medical University (KGMU), Chowk, Lucknow
              </p>
            </div>



          </div>

          {/* Right Column: Authentic Hospital Facility Visual Showcase */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* Grand Hero Hospital Building Card */}
            <Card3D maxTilt={5}>
              <div className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-slate-900 group">
                <div className="aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                  <SafeImage
                    src="/assets/hospital.png"
                    alt="Sushrut Institute of Plastic Surgery (SIPS) Hospital Building, Lucknow"
                    fallbackCategory="Hospital & Theatre"
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Ambient Smooth Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D]/95 via-[#001D3D]/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#003366] text-xs font-bold shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>NABH Accredited Tertiary Center</span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-sm">
                      SIPS Super Specialty Hospital
                    </h3>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-[11px] font-semibold">
                      Main Campus
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    Sushrut Institute of Plastic Surgery &amp; Research • Shah Mina Rd, Lucknow
                  </p>
                  <p className="text-[11px] text-[#00A3E0] font-semibold pt-0.5">
                    Managing Director &amp; Head of Dept: Dr. R. K. Mishra (M.Ch. Plastic Surgery)
                  </p>
                </div>
              </div>
            </Card3D>

            {/* Inset Facility Sub-cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xs bg-slate-900 aspect-[16/9]">
                <SafeImage
                  src={hospitalData.gallery[1]}
                  alt="Class 100 Modular OT Suites"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-tight drop-shadow-sm">6 Modular Laminar OTs</p>
                  <p className="text-[10px] text-slate-300">HEPA Positive Pressure</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xs bg-slate-900 aspect-[16/9]">
                <SafeImage
                  src={hospitalData.gallery[3]}
                  alt="VIP Aesthetic Inpatient Recovery Suites"
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-tight drop-shadow-sm">Aesthetic Inpatient Suites</p>
                  <p className="text-[10px] text-slate-300">24/7 Monitored Recovery</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
