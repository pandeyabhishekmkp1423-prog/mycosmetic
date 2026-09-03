import React, { useState } from 'react';
import { Activity, ArrowRight, Clock, Droplets, HeartPulse, ScanFace, ShieldCheck, Sparkles } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { ProcedureCategory } from '../../types';
import { SafeImage } from '../common/SafeImage';

interface ProcedureExplorerProps {
  onNavigate: (route: string) => void;
}

export const ProcedureExplorer: React.FC<ProcedureExplorerProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<ProcedureCategory>('FACE');

  const categories: { id: ProcedureCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'FACE', label: 'Face', icon: <ScanFace className="w-4 h-4" /> },
    { id: 'BREAST', label: 'Breast', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'BODY', label: 'Body', icon: <Activity className="w-4 h-4" /> },
    { id: 'SKIN', label: 'Skin & Scar', icon: <Droplets className="w-4 h-4" /> },
    { id: 'RECONSTRUCTIVE', label: 'Reconstructive', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  const currentProcedures = proceduresData.filter(p => p.category === activeCategory);

  return (
    <section id="explore-procedures" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Supporting Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Surgical Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
              Explore Procedures
            </h2>
            <p className="text-sm sm:text-base text-[#52677D] mt-2 max-w-xl font-normal">
              Thoughtfully planned surgical solutions for face, body and reconstructive needs.
            </p>
          </div>

          {/* Elegant Category Navigation Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none bg-[#F5FAFD] p-1.5 rounded-2xl border border-[#DCE7F0]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`proc-tab-${cat.id.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#0B2A5B] shadow-sm'
                      : 'text-[#52677D] hover:text-[#102A43] hover:bg-white/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#1769AA]' : 'text-[#718096]'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentProcedures.map((proc) => (
            <div
              key={proc.slug}
              id={`card-proc-${proc.slug}`}
              onClick={() => onNavigate(`procedure-${proc.slug}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onNavigate(`procedure-${proc.slug}`);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${proc.title}`}
              className="interactive-lift group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] border border-[#DCE7F0]/80 bg-[#FCFDFD] shadow-xs hover:border-[#1769AA]/40"
            >
              <div>
                {/* Large Visual Image Area (240px - 280px) */}
                <div className="h-60 sm:h-64 overflow-hidden relative bg-gray-100">
                  <SafeImage
                    src={proc.image}
                    alt={proc.title}
                    fallbackCategory={proc.category}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B2A5B] text-[10px] font-bold uppercase rounded-lg tracking-wider shadow-xs border border-white/60">
                    {proc.category}
                  </div>

                  {/* Downtime / Duration Pill */}
                  <div className="absolute bottom-3.5 left-3.5 px-3 py-1 bg-[#071D3B]/80 backdrop-blur-md text-white text-[11px] font-medium rounded-lg flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#93C5FD]" />
                    <span>{proc.duration}</span>
                  </div>
                </div>

                {/* Content Area with Generous Spacing & Refined Typography */}
                <div className="p-6">
                  <h3 className="card-readable mb-2 text-lg font-serif font-bold leading-snug text-[#102A43] transition-colors group-hover:text-[#1769AA] sm:text-xl">
                    {proc.title}
                  </h3>
                  
                  <p className="card-readable line-clamp-2 text-xs leading-relaxed text-[#52677D] sm:text-sm">
                    {proc.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proc.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-medium text-[#1769AA] bg-[#EEF7FC] px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Minimal Circular Action & Price Indication */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#EEF2F6] mt-2">
                <div>
                  <span className="text-[10px] text-[#718096] uppercase tracking-wider block">Estimated Fee</span>
                  <span className="text-xs font-bold text-[#102A43]">{proc.costRange}</span>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#EEF7FC] group-hover:bg-[#0B2A5B] text-[#1769AA] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Directory Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('procedures')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EEF7FC] hover:bg-[#DCE7F0] text-[#0B2A5B] text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <span>View Complete 13-Procedure Clinical Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#1769AA]" />
          </button>
        </div>

      </div>
    </section>
  );
};
