import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Clock, Filter, Sparkles } from 'lucide-react';
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

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Procedures Directory</span>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
            Comprehensive Clinical Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Surgical & Non-Surgical <span className="italic text-[#00A3E0] font-normal">Procedures</span>
          </h1>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Personalized cosmetic and reconstructive procedures performed with artistic precision by ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra (Managing Director & Head of Plastic Surgery, SIPS Super Specialty Hospital Pvt. Ltd.).
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#003366]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative md:w-80">
            <Search className="w-4 h-4 text-[#00A3E0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search procedures by name or concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#1E293B] focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none transition-all shadow-xs"
            />
          </div>

        </div>

        <div className="mt-4 text-xs sm:text-sm text-[#64748B]">
          Showing <strong className="text-[#003366]">{filteredProcedures.length}</strong> specialized procedures
        </div>
      </div>

      {/* Grid of Clean Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredProcedures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProcedures.map((proc) => (
              <div
                key={proc.slug}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="clean-card bg-white overflow-hidden flex flex-col justify-between group cursor-pointer border border-[#E2E8F0] rounded-2xl hover:border-[#00A3E0]/50 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                    <SafeImage
                      src={proc.image}
                      alt={proc.title}
                      fallbackCategory={proc.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] block">
                      {proc.category} Surgery
                    </span>
                    <h3 className="text-xl font-editorial font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-snug">
                      {proc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#00A3E0] font-semibold">
                      {proc.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed pt-1 font-normal">
                      {proc.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#00A3E0]" /> {proc.duration}
                  </span>
                  <span className="font-bold text-[#003366] flex items-center gap-1 group-hover:text-[#00A3E0] transition-colors">
                    <span>Clinical Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <p className="text-base font-bold text-[#003366]">No procedures matched your search</p>
            <p className="text-xs text-[#64748B] mt-1">Try clearing search keywords or selecting another category.</p>
            <button
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="mt-4 btn-navy"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
