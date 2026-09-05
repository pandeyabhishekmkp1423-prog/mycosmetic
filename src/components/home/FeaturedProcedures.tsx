import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface FeaturedProceduresProps {
  onNavigate: (route: string) => void;
}

export const FeaturedProcedures: React.FC<FeaturedProceduresProps> = ({ onNavigate }) => {
  const featured = proceduresData.filter(p => p.featured).slice(0, 4);

  return (
    <section id="featured-procedures" className="py-16 sm:py-24 bg-white border-b border-[#DCE7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-2">
            Signature Surgical Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight leading-tight">
            Pioneering aesthetic surgery with mathematical precision.
          </h2>
          <p className="text-base text-gray-600 mt-4 leading-relaxed">
            Every procedure is planned with meticulous anatomical understanding, emphasizing harmonious proportions, structural durability, and minimal social downtime.
          </p>
        </div>

        {/* Featured 2x2 Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {featured.map((proc, index) => (
            <div
              key={proc.slug}
              id={`featured-card-${proc.slug}`}
              className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-[#00A3E0]/60 transition-all duration-300 group"
            >
              {/* Left Image Area */}
              <div className="md:w-5/12 aspect-[4/3] md:aspect-auto rounded-xl overflow-hidden relative shrink-0">
                <img
                  src={proc.image}
                  alt={proc.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Right Content Area */}
              <div className="md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#00A3E0] font-semibold mb-1">
                    <span>{proc.category}</span>
                    <span>{proc.duration}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {proc.shortDesc}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 mb-6">
                    {proc.idealCandidate.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#DCE7F0] flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">
                    Est. {proc.costRange}
                  </span>
                  <button
                    onClick={() => onNavigate(`procedure-${proc.slug}`)}
                    className="text-xs font-bold text-[#102A43] group-hover:text-[#1769AA] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Procedure</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
