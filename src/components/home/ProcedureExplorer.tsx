import React, { useState, useMemo } from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface ProcedureExplorerProps {
  onNavigate: (route: string) => void;
}

interface CategoryTile {
  id: string;
  label: string;
  categoryFilter: string;
  image: string;
  isSeeAll?: boolean;
}

export const ProcedureExplorer: React.FC<ProcedureExplorerProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // 6 Photographic Square Tiles matching the user's reference layout
  const categoryTiles: CategoryTile[] = [
    {
      id: 'rhinoplasty',
      label: 'RHINOPLASTY',
      categoryFilter: 'FACE',
      image: 'https://www.perfectdrs.com/wp-content/uploads/2025/12/What-are-the-different-rhinoplasty-procedures.webp'
    },
    {
      id: 'gynecomastia',
      label: 'GYNECOMASTIA',
      categoryFilter: 'BREAST',
      image: '/assets/proc_male.jpg'
    },
    {
      id: 'breast-aug',
      label: 'FAT TRANSFER BREAST',
      categoryFilter: 'BREAST',
      image: '/assets/proc_breast.jpg'
    },
    {
      id: 'neck-facelift',
      label: 'MINI NECK & FACELIFT',
      categoryFilter: 'FACE',
      image: '/assets/patient_sarah.jpg'
    },
    {
      id: 'vaser-lipo',
      label: 'VASER 360° LIPO',
      categoryFilter: 'BODY',
      image: '/assets/proc_body.jpg'
    },
    {
      id: 'see-all',
      label: 'SEE ALL',
      categoryFilter: 'ALL',
      image: '/assets/clinic_reception.jpg',
      isSeeAll: true
    }
  ];

  // Filter procedures based on active category
  const filteredProcedures = useMemo(() => {
    return proceduresData.filter(proc => {
      if (activeCategory === 'ALL') return true;
      if (activeCategory === 'SKIN') {
        return proc.category === 'SKIN' || proc.category === 'RECONSTRUCTIVE';
      }
      return proc.category === activeCategory;
    });
  }, [activeCategory]);

  // Show exactly 4 cards initially (4 on desktop, 2-2 on mobile)
  const displayedProcedures = filteredProcedures.slice(0, 4);

  const handleTileClick = (tile: CategoryTile) => {
    if (tile.isSeeAll) {
      onNavigate('procedures');
    } else {
      setActiveCategory(tile.categoryFilter);
    }
  };

  return (
    <section id="procedure-explorer-section" className="py-12 sm:py-16 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Rich Editorial Typography */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Super-Specialty Categories
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Surgical & Aesthetic <span className="italic text-[#00A3E0] font-normal">Procedures.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Explore Dr. R. K. Mishra's specialized surgical protocols — planned with anatomical precision for natural, lasting harmony.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Visual Photographic Category Tiles (Exact 6-Tile Layout From Reference)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-3.5 mb-10 sm:mb-12">
          {categoryTiles.map((tile) => {
            const isActive = !tile.isSeeAll && activeCategory === tile.categoryFilter;

            return (
              <div
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className={`aspect-square rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${
                  isActive
                    ? 'border-[#003366] ring-2 ring-[#00A3E0]/50 scale-[1.02]'
                    : 'border-transparent hover:border-[#003366]/60'
                }`}
              >
                {/* Photo with smooth zoom on hover */}
                <img
                  src={tile.image}
                  alt={tile.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay for optimal white text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 group-hover:from-black/75 transition-colors" />

                {/* Centered Bold All-Caps Title (Matching Reference Screenshot) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2.5 sm:p-3 text-center z-10">
                  <span className="font-heading font-extrabold text-white text-xs sm:text-sm lg:text-[13px] xl:text-[14px] uppercase tracking-wider leading-snug drop-shadow-md group-hover:text-[#00A3E0] transition-colors">
                    {tile.label}
                  </span>
                  
                  {tile.isSeeAll && (
                    <ArrowRight className="w-4 h-4 text-[#00A3E0] mt-1 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>

                {/* Active Indicator Underline */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-[#00A3E0] z-20" />
                )}
              </div>
            );
          })}
        </div>

        {/* 4 Cards Grid: 2 cols on mobile (2-2), 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {displayedProcedures.map((proc) => {
            const stayText = proc.hospitalStay ? proc.hospitalStay.split('(')[0].trim() : 'Daycare';
            const priceText = proc.costRange ? proc.costRange.split('–')[0].trim() : '';

            return (
              <div
                key={proc.slug}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#003366] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Clean Image - No Badges Plastered Over It */}
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={proc.image}
                      alt={proc.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-4 space-y-1 sm:space-y-1.5">
                    <h3 className="text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-snug line-clamp-1">
                      {proc.title}
                    </h3>

                    <p className="text-xs text-[#00A3E0] font-semibold line-clamp-1">
                      {proc.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 pt-0.5">
                      {proc.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Footer specs & link */}
                <div className="p-3 sm:p-4 pt-0">
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span className="truncate max-w-[90px] sm:max-w-[110px]">
                      {stayText}
                    </span>
                    {priceText && (
                      <span className="text-[#003366] font-bold shrink-0">
                        {priceText}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors">
                    <span>Explore Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Button to View More in the Particular Procedures Page */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            onClick={() => onNavigate('procedures')}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs hover:shadow-md group"
          >
            <span>View All Procedures in Directory</span>
            <ArrowRight className="w-4 h-4 text-[#00A3E0] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
