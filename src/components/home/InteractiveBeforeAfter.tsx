import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
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
    { id: 'FACE', label: 'Face' },
    { id: 'BREAST', label: 'Gynecomastia & Breast' },
    { id: 'BODY', label: 'Liposuction & Body' }
  ];

  return (
    <section id="homepage-results-section" className="py-16 sm:py-24 bg-[#F5FAFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Documented Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
              Patient Results & Transformations
            </h2>
            <p className="text-sm sm:text-base text-[#52677D] mt-2 max-w-xl font-normal">
              Authentic before-and-after photographic documentation demonstrating natural structural balance and precision surgical outcomes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('results')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1769AA] hover:text-[#0B2A5B] transition-colors"
          >
            <span>View Full Gallery ({beforeAfterCases.length}+ Cases)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B2A5B] text-white shadow-xs'
                  : 'bg-white text-[#52677D] hover:bg-[#EEF7FC] border border-[#DCE7F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.slice(0, 2).map((item) => (
            <BeforeAfterSlider key={item.id} caseData={item} />
          ))}
        </div>

        {/* Mandatory Transparency & Safety Notice */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#52677D]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1769AA] shrink-0" />
            <p>
              <strong className="text-[#102A43]">Clinical Transparency Notice:</strong> Individual surgical results vary according to patient baseline anatomy, age, and healing response. Photography is published strictly with informed patient consent.
            </p>
          </div>
          <button
            onClick={() => onNavigate('results')}
            className="px-4 py-2 bg-[#EEF7FC] hover:bg-[#DCE7F0] text-[#1769AA] rounded-xl font-semibold shrink-0 transition-colors whitespace-nowrap"
          >
            Explore All Case Studies
          </button>
        </div>

      </div>
    </section>
  );
};
