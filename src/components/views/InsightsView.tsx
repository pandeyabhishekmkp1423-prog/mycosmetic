import React, { useState } from 'react';
import { Clock, ArrowRight, Search, Share2, BookOpen, Sparkles } from 'lucide-react';
import { insightsData } from '../../data/insightsData';

interface InsightsViewProps {
  activeArticleSlug?: string;
  onNavigate: (route: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ activeArticleSlug, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Facial Surgery', 'Body & Breast', 'Recovery & Healing', 'Reconstructive & Cleft Care'];

  // Single article reader
  const singleArticle = activeArticleSlug 
    ? insightsData.find(a => a.slug === activeArticleSlug)
    : null;

  if (singleArticle) {
    return (
      <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
        
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('insights')} className="hover:text-[#003366] transition-colors cursor-pointer">Insights</button>
          <span>/</span>
          <span className="text-[#003366] font-semibold truncate">{singleArticle.title}</span>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 sm:p-12 shadow-sm space-y-8">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 bg-[#00A3E0]/10 text-[#003366] font-bold uppercase rounded-md border border-[#00A3E0]/20 text-[10px]">
                  {singleArticle.category}
                </span>
                <span className="text-[#64748B]">{singleArticle.date}</span>
                <span className="text-[#64748B]">•</span>
                <span className="text-[#64748B] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#00A3E0]" /> {singleArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#003366] leading-tight">
                {singleArticle.title}
              </h1>

              <p className="text-sm sm:text-base text-[#475569] italic border-l-4 border-[#00A3E0] pl-4 py-1.5 leading-relaxed bg-[#F8FAFC] rounded-r-xl">
                {singleArticle.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003366] text-white flex items-center justify-center font-serif text-xs font-bold shadow-xs">
                    RM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#003366]">{singleArticle.author}</p>
                    <p className="text-[10px] text-[#64748B]">Senior Plastic Surgeon • SIPS Hospital</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Article link copied to clipboard!')}
                  className="px-3 py-1.5 text-xs text-[#475569] hover:text-[#003366] bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] bg-gray-50 shadow-xs">
              <img
                src={singleArticle.image}
                alt={singleArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
              {(Array.isArray(singleArticle.content) ? singleArticle.content : [singleArticle.content]).map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-lg sm:text-xl font-serif font-bold text-[#003366] pt-5 pb-2 border-b border-[#E2E8F0]">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* In-Article CTA */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#002244] to-[#003366] text-white space-y-4 shadow-xl border border-white/10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
                Confidential Medical Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Have specific questions about this procedure?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Dr. R. K. Mishra conducts thorough, individual patient surgical assessments at SIPS Hospital, Chowk, Lucknow.
              </p>
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-crimson inline-flex items-center gap-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </article>

      </div>
    );
  }

  // Directory View
  const filteredArticles = insightsData.filter((art) => {
    const matchesCategory = selectedCategory === 'ALL' || art.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Clinical Insights</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Surgical Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight">
            Clinical Insights & Guides
          </h1>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Evidence-based educational guides, recovery timelines, and surgical preparation advice authored by Senior Plastic Surgeon Dr. R. K. Mishra.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#003366]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative md:w-80">
            <Search className="w-3.5 h-3.5 text-[#00A3E0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#1E293B] focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none shadow-xs"
            />
          </div>

        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              onClick={() => onNavigate(`insight-${art.slug}`)}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:border-[#00A3E0]/40 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-50">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[#003366] text-[10px] font-bold uppercase rounded-md border border-[#E2E8F0] shadow-xs">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#00A3E0]" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-medium">{art.author}</span>
                <span className="font-bold text-[#003366] group-hover:text-[#00A3E0] flex items-center gap-1 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
