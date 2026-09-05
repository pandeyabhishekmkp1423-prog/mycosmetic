import React, { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { beforeAfterCases } from '../../data/resultsData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ProcedureCategory } from '../../types';

interface ResultsGalleryViewProps {
  onNavigate: (route: string) => void;
}

export const ResultsGalleryView: React.FC<ResultsGalleryViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProcedureCategory | 'ALL'>('ALL');

  const categories: { id: ProcedureCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Cases' },
    { id: 'FACE', label: 'Facial Surgery' },
    { id: 'BREAST', label: 'Breast & Chest' },
    { id: 'BODY', label: 'Body Contouring' }
  ];

  const filteredCases = selectedCategory === 'ALL'
    ? beforeAfterCases
    : beforeAfterCases.filter(c => c.category === selectedCategory);

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Results Gallery</span>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Clinical Outcomes
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Before & After <span className="italic text-[#00A3E0] font-normal">Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed pt-1">
            Standardized medical records illustrating natural aesthetic balance, symmetry, and scar refinement under Dr. R. K. Mishra's surgical care at SIPS Super Specialty Hospital.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#003366] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-[#F0F7FD] hover:text-[#003366]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-editorial font-bold text-[#003366]">
                    {item.procedureName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                    {item.patientInfo} • {item.timeline}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Standardized Record
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0]">
                <BeforeAfterSlider
                  caseData={item}
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="Before"
                  afterLabel="After"
                  procedureName={item.procedureName}
                />
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic font-normal">
                "{item.description}"
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#E2E8F0] text-xs sm:text-sm">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#003366]" />
                  <span>Unfiltered & Verified</span>
                </span>
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="font-bold text-[#003366] hover:text-[#00A3E0] hover:underline cursor-pointer"
                >
                  Consult on this procedure →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl border border-[#E2E8F0] p-10 space-y-4 max-w-2xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">
            Ready to <span className="italic text-[#00A3E0] font-normal">Revamp Your Looks?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            During your confidential consultation, Dr. Mishra will perform an anatomical assessment and review customized treatment options tailored to your facial structure and body contours.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book-consultation')}
              className="btn-navy text-sm sm:text-base py-3.5 px-6 rounded-xl font-semibold cursor-pointer"
            >
              Book In-Person Consultation
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
