import React from 'react';
import { MapPin, ShieldCheck, Award, CheckCircle2, ArrowRight, Calendar, Building2, Sparkles } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface LocalLucknowViewProps {
  onNavigate: (route: string) => void;
}

export const LocalLucknowView: React.FC<LocalLucknowViewProps> = ({ onNavigate }) => {
  const topLucknowProcedures = proceduresData.slice(0, 6);

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Lucknow Center</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
            Regional Center of Surgical Excellence
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Cosmetic Surgery in <span className="italic text-[#00A3E0] font-normal">Lucknow</span>
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal pt-1">
            Led by ASPS Board Certified Plastic Surgeon <strong>Dr. R.K. Mishra</strong> (Managing Director & Head of Plastic Surgery Department at SIPS Super Specialty Hospital Pvt. Ltd., Chowk), Lucknow stands as Uttar Pradesh's premier destination for world-class cosmetic and reconstructive plastic surgery.
          </p>
        </div>
      </div>

      {/* Why Choose SIPS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#00A3E0]/40 transition-all">
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center border border-[#00A3E0]/20">
                <Award className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <h3 className="text-base font-bold text-[#003366]">25+ Years Clinical Experience</h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                M.Ch Plastic Surgery from King George's Medical College (KGMC 2000) alongside advanced training in Dallas and NYU.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs font-semibold text-[#003366]">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> 30,000+ Completed Surgeries
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#00A3E0]/40 transition-all">
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center border border-[#00A3E0]/20">
                <Building2 className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <h3 className="text-base font-bold text-[#003366]">NABH Hospital OT Suites</h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                HEPA Class 100 laminar airflow surgical theaters, ultrasound-assisted VASER liposuction, and 24/7 in-house ICU critical care backup.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs font-semibold text-[#003366]">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> Zero Infection Sterility Protocol
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#00A3E0]/40 transition-all">
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center border border-[#00A3E0]/20">
                <ShieldCheck className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <h3 className="text-base font-bold text-[#003366]">Transparent Packages</h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                Global standards of aesthetic surgical care at itemized, transparent tariffs without hidden facility costs or commercial markups.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs font-semibold text-[#003366]">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> 0% Interest EMI Available
            </div>
          </div>
        </div>

        {/* Procedures in Lucknow */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0] block mb-1">
                Frequently Requested Treatments
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">
                Top Procedures Performed in Lucknow
              </h2>
            </div>
            <button
              onClick={() => onNavigate('procedures')}
              className="text-xs font-bold text-[#003366] hover:text-[#00A3E0] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore All Procedures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLucknowProcedures.map((proc) => (
              <div
                key={proc.slug}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00A3E0]/50 hover:bg-white hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider">{proc.category}</span>
                  <h3 className="text-base font-editorial font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors mt-1 mb-1.5">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-[#475569] line-clamp-2 mb-3 leading-relaxed">
                    {proc.shortDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-xs text-[#64748B] block">Starting from</span>
                    <span className="font-bold text-[#003366]">{proc.costRange.split('–')[0]}</span>
                  </div>
                  <span className="font-semibold text-[#003366] group-hover:text-[#00A3E0] flex items-center gap-1 transition-colors">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#003366] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-[#00A3E0]/30">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
              In-Clinic Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white leading-tight">
              Consult Dr. R. K. Mishra at SIPS Hospital Chowk
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Personalized anatomical examination and transparent surgical planning. Conveniently accessible for patients traveling from across Lucknow, Kanpur, Ayodhya, Prayagraj, Gorakhpur, and Varanasi.
            </p>
          </div>

          <button
            onClick={() => onNavigate('book-consultation')}
            className="py-3.5 px-7 rounded-xl bg-white hover:bg-slate-100 text-[#003366] font-bold text-sm shadow-md transition-all cursor-pointer shrink-0 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#003366]" />
            <span>Schedule Consultation</span>
          </button>
        </div>

      </div>

    </div>
  );
};
