import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { insightsData } from '../../data/insightsData';
import { SafeImage } from '../common/SafeImage';
import { Card3D } from '../common/Card3D';

interface InsightsSectionProps {
  onNavigate: (route: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onNavigate }) => {
  return (
    <section id="homepage-insights-section" className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-2">
              Surgical Education & Literature
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight leading-[1.12]">
              Clinical Insights & <span className="italic text-[#00A3E0] font-normal">Patient Guides</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-xl font-normal leading-relaxed">
              In-depth surgical literature, recovery protocols, and anatomical explanations personally authored by Senior Surgeon Dr. R. K. Mishra.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('insights')}
            className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>All Educational Guides ({insightsData.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {insightsData.slice(0, 3).map((art) => (
            <Card3D
              key={art.slug}
              maxTilt={6}
              scale={1.015}
              onClick={() => onNavigate(`insight-${art.slug}`)}
              className="cursor-pointer h-full"
            >
              <div 
                id={`insight-card-${art.slug}`}
                className="group flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#00A3E0]/60 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <SafeImage
                      src={art.image}
                      alt={art.title}
                      fallbackCategory="Clinical Guide"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2.5">
                      <span className="font-bold text-[#00A3E0] uppercase tracking-wider">{art.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00A3E0]" /> {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-editorial font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-snug mb-2.5">
                      {art.title}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between border-t border-[#E2E8F0] px-6 pb-6 pt-4 text-xs sm:text-sm">
                  <span className="text-slate-500 font-semibold">{art.author}</span>
                  <span className="font-bold text-[#003366] group-hover:text-[#00A3E0] flex items-center gap-1.5 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
