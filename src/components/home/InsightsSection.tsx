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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-gold-pill text-[11px] font-bold tracking-wider uppercase text-[#B88035] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C89448]" />
              <span>Surgical Education & Literature</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#071D3B] tracking-tight leading-[1.14]">
              Clinical Insights & Patient Guides
            </h2>
            <p className="text-sm sm:text-base text-[#4A5D73] mt-3 max-w-xl font-normal leading-relaxed">
              In-depth surgical literature, recovery protocols, and anatomical explanations personally authored by Dr. R. K. Mishra.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('insights')}
            className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#DFE7EF] text-[#071D3B] text-xs sm:text-sm font-bold hover:border-[#C89448] hover:text-[#C89448] shadow-sm transition-all cursor-pointer"
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
                className="group flex flex-col justify-between h-full rounded-3xl overflow-hidden glass-panel border border-[#DFE7EF] hover:border-[#C89448]/60 transition-all duration-300 shadow-md hover:shadow-2xl"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <SafeImage
                      src={art.image}
                      alt={art.title}
                      fallbackCategory="Clinical Guide"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#071D3B] shadow-sm border border-white/80">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-xs text-[#64748B] mb-2.5">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#1769AA]" /> {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-[#071D3B] group-hover:text-[#1769AA] transition-colors leading-snug mb-3">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A5D73] line-clamp-3 leading-relaxed font-normal">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between border-t border-[#DFE7EF] px-6 pb-6 pt-4 text-xs">
                  <span className="text-[#64748B] font-semibold">{art.author}</span>
                  <span className="font-bold text-[#071D3B] group-hover:text-[#C89448] flex items-center gap-1.5 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
