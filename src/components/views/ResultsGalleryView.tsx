import React, { useState } from 'react';
import { Filter, Shield, Sparkles, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { beforeAfterCases } from '../../data/resultsData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ProcedureCategory } from '../../types';

interface ResultsGalleryViewProps {
  onNavigate: (route: string) => void;
}

export const ResultsGalleryView: React.FC<ResultsGalleryViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProcedureCategory | 'ALL'>('ALL');

  const categories: { id: ProcedureCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Documented Cases' },
    { id: 'FACE', label: 'Facial Surgery' },
    { id: 'BREAST', label: 'Gynecomastia & Breast' },
    { id: 'BODY', label: 'Liposuction & Body Contouring' }
  ];

  const filteredCases = selectedCategory === 'ALL'
    ? beforeAfterCases
    : beforeAfterCases.filter(c => c.category === selectedCategory);

  return (
    <div id="results-gallery-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Before & After Results Gallery</span>
      </div>

      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Clinical Documentation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Before & After Patient Gallery
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Standardized photographic clinical records demonstrating natural proportions, anatomical balance, and scar maturation under Dr. R. K. Mishra's surgical protocols.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F0] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-[#E7F2F8] border border-[#DCE7F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredCases.map((caseItem) => (
            <BeforeAfterSlider key={caseItem.id} caseData={caseItem} />
          ))}
        </div>

        {/* Mandatory Transparency & Safety Disclaimer Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE7F0] shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#102A43] uppercase tracking-wide">
                Patient Privacy & Medical Notice
              </h3>
              <p className="text-xs text-gray-500">
                Ethical medical photography standards compliant with Indian medical guidelines.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            All clinical photographs shown in this gallery are authentic, un-retouched records of surgical procedures performed personally by Dr. R. K. Mishra at SIPS Hospital Lucknow. Published with verified informed patient consent. Individual aesthetic results, swelling duration, and recovery timelines vary based on unique genetics, body mass index, skin elasticity, and adherence to post-operative instructions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#DCE7F0]">
            <span className="text-xs text-gray-700 font-medium">
              Want a personalized assessment for your unique anatomy?
            </span>
            <button
              onClick={() => onNavigate('book-consultation')}
              className="px-6 py-2.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C89448]" />
              <span>Book In-Clinic Evaluation</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
