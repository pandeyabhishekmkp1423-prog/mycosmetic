import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { insightsData } from '../../data/insightsData';
import { SafeImage } from '../common/SafeImage';

interface InsightsSectionProps {
  onNavigate: (route: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onNavigate }) => {
  return (
    <section id="homepage-insights-section" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Surgical Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
              Clinical Insights & Patient Guides
            </h2>
            <p className="text-sm sm:text-base text-[#52677D] mt-2 max-w-xl font-normal">
              Educational guides, recovery expectations, and procedural explanations authored by Dr. R. K. Mishra.
            </p>
          </div>

          <button
            onClick={() => onNavigate('insights')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769AA] hover:text-[#0B2A5B] transition-colors cursor-pointer"
          >
            <span>View All Guides ({insightsData.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {insightsData.slice(0, 3).map((art) => (
            <div
              key={art.slug}
              id={`insight-card-${art.slug}`}
              onClick={() => onNavigate(`insight-${art.slug}`)}
              className="bg-[#FCFDFD] rounded-[22px] border border-[#DCE7F0] overflow-hidden shadow-xs hover:shadow-[0_12px_30px_rgba(11,42,91,0.06)] hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                  <SafeImage
                    src={art.image}
                    alt={art.title}
                    fallbackCategory="Clinical Guide"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/95 backdrop-blur-md text-[#0B2A5B] text-[10px] font-bold uppercase rounded-lg tracking-wider border border-[#DCE7F0]">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#718096] mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1769AA]" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#102A43] group-hover:text-[#1769AA] transition-colors leading-snug mb-2.5">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52677D] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-[#EEF2F6] mt-2 pt-4">
                <span className="text-[#718096] font-medium">{art.author}</span>
                <span className="font-semibold text-[#1769AA] group-hover:text-[#0B2A5B] flex items-center gap-1 transition-colors">
                  Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
