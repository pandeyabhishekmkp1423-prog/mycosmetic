import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Clock, Filter } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { ProcedureCategory } from '../../types';
import { SafeImage } from '../common/SafeImage';

interface ProceduresDirectoryViewProps {
  onNavigate: (route: string) => void;
}

export const ProceduresDirectoryView: React.FC<ProceduresDirectoryViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProcedureCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProcedureCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Procedures' },
    { id: 'FACE', label: 'Face & Neck' },
    { id: 'BREAST', label: 'Breast Aesthetics' },
    { id: 'BODY', label: 'Body Contouring' },
    { id: 'SKIN', label: 'Skin & Scar' },
    { id: 'RECONSTRUCTIVE', label: 'Reconstructive' }
  ];

  const filteredProcedures = useMemo(() => {
    return proceduresData.filter((proc) => {
      const matchesCategory = selectedCategory === 'ALL' || proc.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getStartingCost = (costRange: string) => {
    const [startingCost] = costRange.split('–');
    return startingCost.trim();
  };

  return (
    <div id="procedures-directory-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Procedures Directory</span>
      </div>

      {/* Directory Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Comprehensive Surgical Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Aesthetic & Reconstructive Procedures
          </h1>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Explore advanced surgical treatments performed by Dr. R. K. Mishra at SIPS Hospital Lucknow. Every procedure is customized to enhance your authentic beauty and restore physical comfort.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`min-h-10 rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B2A5B] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-[#EEF7FC] border border-[#DCE7F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Field */}
          <div className="relative md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-10 w-full rounded-lg border border-[#DCE7F0] bg-white py-2 pl-9 pr-4 text-xs font-semibold focus:border-[#1769AA] focus:outline-hidden"
            />
          </div>

        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#52677D]">
          <Filter className="h-3.5 w-3.5 text-[#1769AA]" />
          <span>
            Showing <strong className="text-[#102A43]">{filteredProcedures.length}</strong> of {proceduresData.length} procedures
          </span>
        </div>
      </div>

      {/* Grid of Procedures */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProcedures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProcedures.map((proc) => (
              <div
                key={proc.slug}
                id={`proc-dir-card-${proc.slug}`}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="interactive-lift group flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-[#DCE7F0] bg-white shadow-xs hover:border-[#1769AA]/60"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                    <SafeImage
                      src={proc.image}
                      alt={proc.title}
                      fallbackCategory={proc.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#102A43] text-[10px] font-bold uppercase rounded-md tracking-wider">
                      {proc.category}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#102A43]/85 text-[#C89448] text-xs font-semibold rounded-md backdrop-blur-xs border border-white/10">
                      From {getStartingCost(proc.costRange)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-[#102A43] group-hover:text-[#1769AA] transition-colors mb-1.5">
                      {proc.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-3">
                      {proc.subtitle}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {proc.shortDesc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {proc.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#F6FAFD] text-gray-600 text-[10px] rounded-md border border-[#DCE7F0]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#DCE7F0] mt-2 pt-4 flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1769AA]" /> {proc.duration}
                  </span>
                  <span className="font-semibold text-[#102A43] group-hover:text-[#1769AA] flex items-center gap-1 transition-colors">
                    Explore Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DCE7F0] p-8">
            <p className="text-base font-serif font-bold text-[#102A43]">No procedures found matching your criteria</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting the category filter or search keywords.</p>
            <button
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#102A43] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
