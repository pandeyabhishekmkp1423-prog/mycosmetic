import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, User, BookOpen, Search, Share2, CheckCircle2 } from 'lucide-react';
import { insightsData } from '../../data/insightsData';
import { InsightArticle } from '../../types';
import { doctorData } from '../../data/doctorData';

interface InsightsViewProps {
  activeArticleSlug?: string;
  onNavigate: (route: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ activeArticleSlug, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Facial Surgery', 'Body & Breast', 'Recovery & Healing', 'Reconstructive & Cleft Care'];

  // If a single article slug is provided, render the reader view
  const singleArticle = activeArticleSlug 
    ? insightsData.find(a => a.slug === activeArticleSlug)
    : null;

  if (singleArticle) {
    return (
      <div id={`article-reader-${singleArticle.slug}`} className="pt-24 pb-20 bg-[#F6FAFD]">
        
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-500 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('insights')} className="hover:text-[#102A43]">Insights</button>
          <span>/</span>
          <span className="text-[#102A43] font-semibold truncate">{singleArticle.title}</span>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 bg-[#F6FAFD] text-[#1769AA] font-bold uppercase rounded-md border border-[#DCE7F0]">
                  {singleArticle.category}
                </span>
                <span className="text-gray-500">{singleArticle.date}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1769AA]" /> {singleArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] leading-tight">
                {singleArticle.title}
              </h1>

              <p className="text-base text-gray-600 italic border-l-2 border-[#1769AA] pl-4 py-1">
                {singleArticle.excerpt}
              </p>

              {/* Author Strip */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DCE7F0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#C89448] flex items-center justify-center font-serif text-sm font-bold">
                    RM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#102A43]">{singleArticle.author}</p>
                    <p className="text-[11px] text-gray-500">Senior Plastic Surgeon • SIPS Hospital</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Link copied to clipboard!')}
                  className="p-2 text-gray-500 hover:text-[#102A43] hover:bg-[#F6FAFD] rounded-lg text-xs flex items-center gap-1.5 border border-[#DCE7F0]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xs border border-[#DCE7F0]">
              <img
                src={singleArticle.image}
                alt={singleArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-6 pt-4 text-xs sm:text-sm">
              {(Array.isArray(singleArticle.content) ? singleArticle.content : [singleArticle.content]).map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl sm:text-2xl font-serif font-bold text-[#102A43] pt-4 pb-2 border-b border-[#DCE7F0]">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="space-y-2 list-none pl-0">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Consultation Banner at Article End */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#102A43] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  Have Questions Regarding This Procedure?
                </h3>
                <p className="text-xs text-gray-300">
                  Book a confidential in-person or virtual consultation with Dr. R. K. Mishra.
                </p>
              </div>
              <button
                onClick={() => onNavigate('book-consultation')}
                className="w-full sm:w-auto px-6 py-3 bg-[#1769AA] hover:bg-[#a37f4e] text-white text-xs font-bold rounded-xl transition-colors shrink-0 text-center"
              >
                Schedule Consultation
              </button>
            </div>

            {/* Return to Articles */}
            <div className="pt-4 border-t border-[#DCE7F0] flex items-center justify-between">
              <button
                onClick={() => onNavigate('insights')}
                className="text-xs font-bold text-[#102A43] hover:text-[#1769AA] flex items-center gap-1.5"
              >
                ← Back to All Insights
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
    <div id="insights-directory-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Clinical Insights & Guides</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Educational Resources
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Clinical Insights & Patient Guides
          </h1>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Evidence-based medical articles, recovery timelines, and surgical planning advice written directly by Dr. R. K. Mishra.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-[#E7F2F8] border border-[#DCE7F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search medical guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#DCE7F0] rounded-full text-xs focus:outline-hidden focus:border-[#1769AA]"
            />
          </div>

        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              id={`insight-card-${art.slug}`}
              onClick={() => onNavigate(`insight-${art.slug}`)}
              className="bg-white rounded-2xl border border-[#DCE7F0] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1769AA]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#102A43] text-[10px] font-bold uppercase rounded-md tracking-wider">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#1769AA]" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#102A43] group-hover:text-[#1769AA] transition-colors leading-snug mb-3">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {art.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {art.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#F6FAFD] text-gray-500 text-[10px] rounded-md border border-[#DCE7F0]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#DCE7F0] mt-2 pt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">{art.author}</span>
                <span className="font-semibold text-[#102A43] group-hover:text-[#1769AA] flex items-center gap-1 transition-colors">
                  Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
