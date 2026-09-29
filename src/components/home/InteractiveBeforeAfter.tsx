import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Calendar 
} from 'lucide-react';
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

  const categories: { id: ProcedureCategory | 'ALL'; label: string; count: number }[] = [
    { id: 'ALL', label: 'All 8 Services', count: beforeAfterCases.length },
    { id: 'FACE', label: 'Face & Eyelids', count: beforeAfterCases.filter(c => c.category === 'FACE').length },
    { id: 'BREAST', label: 'Breast & Gynecomastia', count: beforeAfterCases.filter(c => c.category === 'BREAST').length },
    { id: 'BODY', label: 'Body Contouring & Lipo', count: beforeAfterCases.filter(c => c.category === 'BODY').length }
  ];

  const handleBookConsultation = (procedureName: string) => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const selectEl = document.querySelector('select[name="procedure"]') as HTMLSelectElement | null;
      if (selectEl) {
        for (let i = 0; i < selectEl.options.length; i++) {
          if (selectEl.options[i].text.toLowerCase().includes(procedureName.toLowerCase().slice(0, 5))) {
            selectEl.selectedIndex = i;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            break;
          }
        }
      }
    } else {
      onNavigate('consultation');
    }
  };

  return (
    <section id="results" className="scroll-mt-28 py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FB] to-[#F8FAFC] border-b border-[#CBD5E1] relative overflow-hidden">
      
      {/* Decorative Background Lighting Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00A3E0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Only Heading & Subheading, Compact Vertical Spacing */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.12]">
            Before &amp; After <span className="italic text-[#00A3E0] font-normal">Transformations.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real patient outcomes performed by Dr. R. K. Mishra at SIPS Super Specialty Hospital, Lucknow.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#003366] text-white shadow-sm scale-[1.02]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#003366] hover:bg-[#F0F6FA] hover:text-[#003366]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* The 8 Clinical Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:border-[#00A3E0]/40"
            >
              <div className="space-y-3">
                
                {/* Card Title & Timeline - No Badges */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#003366] tracking-tight">
                    {item.procedureName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium pt-0.5">
                    {item.patientInfo} • <span className="text-[#003366] font-semibold">{item.timeline}</span>
                  </p>
                </div>

                {/* Interactive High-Definition Before & After Comparison */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-[#050b14]">
                  <BeforeAfterSlider
                    caseData={item}
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    fullImage={item.fullImage}
                    beforeLabel="Before Surgery"
                    afterLabel="Post-Op Result"
                    procedureName={item.procedureName}
                    defaultMode="full"
                  />
                </div>

              </div>

              {/* Card Footer: The Two Mandatory Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  
                  {/* Button 1: Know More (Redirects to given link in new tab) */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border-2 border-[#003366] hover:bg-[#003366] text-[#003366] hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group cursor-pointer shadow-2xs"
                    title={`Know more about ${item.procedureName} on official website`}
                  >
                    <span>Know More</span>
                    <ExternalLink className="w-4 h-4 text-[#00A3E0] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Button 2: Book Consultation (Smoothly scrolls to consultation form) */}
                  <button
                    onClick={() => handleBookConsultation(item.procedureName)}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#003366] to-[#004C99] hover:from-[#002244] hover:to-[#003366] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md group"
                  >
                    <Calendar className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>

            </article>
          ))}
        </div>

        {/* View All Services Button (Redirects to official services catalog in new tab) */}
        <div className="mt-10 text-center">
          <a
            href="https://mycosmeticsurgery.in/services/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-white hover:bg-[#003366] text-[#003366] hover:text-white border-2 border-[#003366] font-bold text-sm shadow-sm hover:shadow-lg transition-all duration-200 group cursor-pointer"
          >
            <span>View All Procedures &amp; Services</span>
            <ExternalLink className="w-4 h-4 text-[#00A3E0] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
