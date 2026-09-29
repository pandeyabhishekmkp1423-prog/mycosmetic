import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { beforeAfterCases } from '../../data/resultsData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ProcedureCategory } from '../../types';

interface InteractiveBeforeAfterProps {
  onNavigate: (route: string) => void;
}

export const InteractiveBeforeAfter: React.FC<InteractiveBeforeAfterProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<ProcedureCategory | 'ALL'>('ALL');

  const filteredCases = activeCategory === 'ALL'
    ? beforeAfterCases
    : beforeAfterCases.filter(c => c.category === activeCategory);

  const categories: { id: ProcedureCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Cases' },
    { id: 'FACE', label: 'Facial Aesthetics' },
    { id: 'BREAST', label: 'Breast & Gynecomastia' },
    { id: 'BODY', label: 'Body Contouring' }
  ];

  return (
    <section id="results" className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
              Verified Transformations
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
              Before & After <span className="italic text-[#00A3E0] font-normal">Gallery.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed pt-1">
              Standardized clinical photography from Dr. R. K. Mishra's surgical cases. Drag slider to compare natural tissue contours.
            </p>
          </div>

          <button
            onClick={() => setActiveCategory('ALL')}
            className="btn-outline-navy shrink-0 self-start md:self-end cursor-pointer"
          >
            <span>Show All Clinical Cases</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-[#F0F7FD] hover:text-[#003366]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Slider Cards - Displays all 6 verified clinical cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#003366]">
                    {item.procedureName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {item.patientInfo} • {item.timeline}
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xs">
                <BeforeAfterSlider
                  caseData={item}
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  fullImage={item.fullImage}
                  beforeLabel="Before"
                  afterLabel="After"
                  procedureName={item.procedureName}
                />
              </div>

              <p className="text-xs text-[#57635B] leading-relaxed italic">
                "{item.description}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
