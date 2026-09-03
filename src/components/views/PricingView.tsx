import React from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { ProcedureCategory } from '../../types';

interface PricingViewProps {
  onNavigate: (route: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const categoryGroups: { category: ProcedureCategory; title: string }[] = [
    { category: 'FACE', title: 'Facial Aesthetics & Correction' },
    { category: 'BREAST', title: 'Breast Aesthetics & Male Chest' },
    { category: 'BODY', title: 'Body Contouring & Sculpting' },
    { category: 'SKIN', title: 'Skin, Hair & Scar Treatments' },
    { category: 'RECONSTRUCTIVE', title: 'Reconstructive & Deformity Correction' }
  ];

  return (
    <div id="pricing-guide-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Transparent Pricing Guide</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Financial Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Cosmetic Surgery Pricing Guide
          </h1>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Clear, honest estimates for cosmetic and plastic surgery procedures at SIPS Hospital Lucknow under Dr. R. K. Mishra. We believe in transparent financial expectations without hidden fees.
          </p>
        </div>

        {/* Cost Factors Pillars */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wide mb-2">
              1. Surgical Complexity
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every anatomy is unique. Primary vs. revision cases, structural grafting, and tissue laxity influence procedural time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wide mb-2">
              2. Hospital & Anesthesia
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Performed at NABH-accredited SIPS Hospital with modular laminar airflow OTs and board-certified anesthesiologists.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wide mb-2">
              3. Implants & Consumables
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              US-FDA approved medical implants (e.g. Mentor/Polytech for breast surgery, micro-sutures, and garment support).
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Tables by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {categoryGroups.map((group) => {
          const procs = proceduresData.filter(p => p.category === group.category);
          if (procs.length === 0) return null;

          return (
            <div key={group.category} className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#102A43] mb-4 pb-3 border-b border-[#DCE7F0]">
                {group.title}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DCE7F0] text-gray-500 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">Procedure</th>
                      <th className="py-3 px-4">Estimated Range</th>
                      <th className="py-3 px-4">Procedure Time</th>
                      <th className="py-3 px-4">Hospital Stay</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7F0]">
                    {procs.map((proc) => (
                      <tr key={proc.slug} className="hover:bg-[#F6FAFD] transition-colors">
                        <td className="py-4 px-4 font-semibold text-[#102A43]">
                          <button 
                            onClick={() => onNavigate(`procedure-${proc.slug}`)}
                            className="hover:text-[#1769AA] text-left"
                          >
                            {proc.title}
                          </button>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#1769AA]">
                          {proc.costRange}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {proc.duration}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {proc.hospitalStay}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => onNavigate('book-consultation')}
                            className="px-3 py-1.5 bg-[#102A43] hover:bg-[#1769AA] text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <span>Get Exact Quote</span>
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

        {/* Pricing Inclusions Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#102A43] text-white space-y-4">
          <h3 className="text-xl font-serif font-bold text-white">
            What is Included in Your Surgical Quotation?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C89448] shrink-0 mt-0.5" />
              <span>Surgeon’s fee for Dr. R. K. Mishra & assisting surgical team</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C89448] shrink-0 mt-0.5" />
              <span>Modular laminar OT charges & board anesthesiologist fee</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C89448] shrink-0 mt-0.5" />
              <span>Hospital room stay & post-operative nursing care</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C89448] shrink-0 mt-0.5" />
              <span>Routine post-operative follow-up visits & suture removal</span>
            </div>
          </div>
        </div>

        {/* Mandatory Note */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCE7F0] text-xs text-gray-500 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
          <p>
            * Prices are indicative starting estimates in Indian Rupees (INR) and subject to formal evaluation of patient anatomy, medical co-morbidities, and customized surgical plans during the clinical consultation with Dr. R. K. Mishra. Applicable hospital GST and special post-op compression garments are specified in detail prior to surgery.
          </p>
        </div>

      </div>

    </div>
  );
};
