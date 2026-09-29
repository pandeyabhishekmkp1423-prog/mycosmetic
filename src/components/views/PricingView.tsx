import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Sparkles,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { ProcedureCategory } from '../../types';
import { ProcedureCostCalculator } from '../common/ProcedureCostCalculator';

interface PricingViewProps {
  onNavigate: (route: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const categoryGroups: { category: ProcedureCategory; title: string }[] = [
    { category: 'FACE', title: 'Facial Aesthetics & Correction' },
    { category: 'BREAST', title: 'Breast Aesthetics & Male Chest (Gynecomastia)' },
    { category: 'BODY', title: 'Body Contouring & Liposuction' },
    { category: 'SKIN', title: 'Skin & Scar Revision' },
    { category: 'RECONSTRUCTIVE', title: 'Reconstructive & Trauma Correction' }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Pricing & Procedure Estimates</span>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
            Honest & Transparent Financial Policy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Surgery Pricing & <span className="italic text-[#00A3E0] font-normal">Inclusions</span>
          </h1>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Upfront, comprehensive estimates for all cosmetic procedures at SIPS Super Specialty Hospital (Pvt. Ltd.), Lucknow under ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra. We offer transparent itemized pricing with zero-interest EMI options.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2 hover:border-[#00A3E0]/40 transition-all">
            <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block">
              Pillar 01
            </span>
            <h3 className="text-base font-bold text-[#003366]">
              Surgical Precision
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              Tailored techniques, micro-cartilage grafting needs, and individual anatomical complexity guide surgery time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2 hover:border-[#00A3E0]/40 transition-all">
            <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block">
              Pillar 02
            </span>
            <h3 className="text-base font-bold text-[#003366]">
              NABH Operating Suites
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              Performed exclusively in Class 100 laminar airflow sterile theaters with dedicated senior cardiac anesthetists.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2 hover:border-[#00A3E0]/40 transition-all">
            <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block">
              Pillar 03
            </span>
            <h3 className="text-base font-bold text-[#003366]">
              FDA-Approved Implants
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              US-FDA approved cohesive medical silicone, suture materials, and medical-grade compression garments included.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <ProcedureCostCalculator onNavigate={onNavigate} />
      </div>

      {/* Pricing Tables */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {categoryGroups.map((group) => {
          const procs = proceduresData.filter(p => p.category === group.category);
          if (procs.length === 0) return null;

          return (
            <div key={group.category} className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-[#003366] mb-4 pb-3 border-b border-[#E2E8F0]">
                {group.title}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Procedure</th>
                      <th className="py-3.5 px-4">Estimated Range</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Hospital Stay</th>
                      <th className="py-3.5 px-4 text-right">Consultation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {procs.map((proc) => (
                      <tr key={proc.slug} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-4 font-bold text-[#003366]">
                          <button 
                            onClick={() => onNavigate(`procedure-${proc.slug}`)}
                            className="hover:text-[#00A3E0] text-left cursor-pointer transition-colors"
                          >
                            {proc.title}
                          </button>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#003366]">
                          <span className="px-2.5 py-1 rounded-md bg-[#00A3E0]/10 text-[#003366] border border-[#00A3E0]/20 font-semibold">
                            {proc.costRange}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#475569]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                            {proc.duration}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#475569] font-medium">
                          {proc.hospitalStay}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => onNavigate('book-consultation')}
                            className="py-2 px-3.5 rounded-lg bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <span>Consult</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#00A3E0]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Package Inclusions */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#003366] text-white space-y-5 shadow-xl border border-[#00A3E0]/30">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">All-Inclusive Guarantee</span>
            <h3 className="text-2xl font-editorial font-bold text-white">
              What is Included in Your Surgical Package?
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-sm text-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
              <span>Surgeon fee for ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra and specialized team</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
              <span>Class 100 laminar airflow OT sterile charges & senior anesthesiologist fee</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
              <span>Hospital stay, specialized post-operative recovery nursing care</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
              <span>6 months of complimentary follow-up visits & scar healing review</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-sm text-[#64748B] flex items-start gap-3 shadow-xs">
          <Info className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
          <p>
            * Prices are indicative starting estimates in INR and subject to formal anatomical evaluation and clinical diagnosis during your confidential consultation with Dr. R.K. Mishra at SIPS Super Specialty Hospital (Pvt. Ltd.).
          </p>
        </div>

      </div>

    </div>
  );
};
