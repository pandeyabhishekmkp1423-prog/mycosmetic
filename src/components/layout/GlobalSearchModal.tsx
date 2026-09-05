import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Stethoscope,
  X
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { insightsData } from '../../data/insightsData';
import { patientStoriesData } from '../../data/patientStoriesData';
import { doctorData } from '../../data/doctorData';
import { SafeImage } from '../common/SafeImage';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        procedures: proceduresData.slice(0, 4),
        insights: insightsData.slice(0, 2),
        stories: patientStoriesData.slice(0, 1)
      };
    }

    const q = query.toLowerCase();

    const matchingProcedures = proceduresData.filter(
      (procedure) => procedure.title.toLowerCase().includes(q) ||
        procedure.subtitle.toLowerCase().includes(q) ||
        procedure.shortDesc.toLowerCase().includes(q) ||
        procedure.category.toLowerCase().includes(q) ||
        procedure.tags.some((tag) => tag.toLowerCase().includes(q))
    );

    const matchingInsights = insightsData.filter(
      (article) => article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
    );

    const matchingStories = patientStoriesData.filter(
      (story) => story.procedure.toLowerCase().includes(q) ||
        story.story.toLowerCase().includes(q) ||
        story.patientName.toLowerCase().includes(q) ||
        story.headline.toLowerCase().includes(q)
    );

    return {
      procedures: matchingProcedures,
      insights: matchingInsights,
      stories: matchingStories
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = searchResults.procedures.length + searchResults.insights.length + searchResults.stories.length;

  const goTo = (route: string) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-3 pt-16 backdrop-blur-xs sm:px-4 sm:pt-24"
      onClick={onClose}
    >
      <div
        id="global-search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search procedures and patient guidance"
        className="flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 shadow-xs">
            <Search className="h-4 w-4 shrink-0 text-[#00A3E0]" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search rhinoplasty, gynecomastia, recovery, pricing..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
            />
            {query && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              id="close-search-modal-btn"
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:text-slate-700"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => goTo('book-consultation')}
              className="py-1.5 px-3.5 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1"
            >
              <Calendar className="h-3.5 w-3.5 mr-1 text-[#00A3E0]" />
              <span>Book consultation</span>
            </button>
            <button
              type="button"
              onClick={() => goTo('pricing')}
              className="btn-outline-navy text-xs py-1.5 px-3.5 rounded-lg"
            >
              Pricing guide
            </button>
            <span className="ml-auto hidden text-slate-400 text-xs sm:inline">Press Esc to close</span>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          <button
            type="button"
            onClick={() => goTo('doctor')}
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 text-left hover:border-[#003366] transition-colors"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#003366] text-xs font-bold text-white">
                RM
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-xs font-bold text-[#003366]">{doctorData.name}</h4>
                <p className="truncate text-xs text-slate-500">
                  Senior Plastic Surgeon, SIPS Super Specialty Hospital Lucknow • {doctorData.experienceYears}+ years
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#00A3E0]" />
          </button>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Stethoscope className="h-3.5 w-3.5 text-[#00A3E0]" />
                Procedures ({searchResults.procedures.length})
              </h3>
              {!query && <span className="text-xs text-slate-400">Featured</span>}
            </div>

            {searchResults.procedures.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {searchResults.procedures.map((procedure) => (
                  <button
                    key={procedure.slug}
                    id={`search-proc-${procedure.slug}`}
                    type="button"
                    onClick={() => goTo(`procedure-${procedure.slug}`)}
                    className="group flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 text-left hover:border-[#003366] transition-colors"
                  >
                    <SafeImage
                      src={procedure.image}
                      alt={procedure.title}
                      fallbackCategory={procedure.category}
                      className="h-12 w-12 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-bold text-[#0F172A] group-hover:text-[#003366]">
                          {procedure.title}
                        </span>
                        <span className="shrink-0 text-xs font-bold uppercase text-[#00A3E0]">{procedure.category}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{procedure.shortDesc}</p>
                      <span className="mt-1 block text-xs font-bold text-[#003366]">From {procedure.costRange}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs text-slate-500">
                No procedure matches "{query}". Try a concern like rhinoplasty, breast, gynecomastia, or liposuction.
              </p>
            )}
          </div>

          {searchResults.insights.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <BookOpen className="h-3.5 w-3.5 text-[#00A3E0]" />
                Clinical Insights
              </h3>
              <div className="space-y-2">
                {searchResults.insights.map((article) => (
                  <button
                    key={article.slug}
                    id={`search-art-${article.slug}`}
                    type="button"
                    onClick={() => goTo(`insight-${article.slug}`)}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg border border-[#E2E8F0] bg-white p-3 text-left hover:border-[#003366] transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold uppercase text-[#00A3E0]">{article.category}</span>
                      <h4 className="truncate text-xs font-bold text-[#0F172A] group-hover:text-[#003366]">{article.title}</h4>
                      <p className="truncate text-xs text-slate-500">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-[#003366]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.stories.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-[#00A3E0]" />
                Patient Results
              </h3>
              <div className="space-y-2">
                {searchResults.stories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => goTo('patient-stories')}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-left hover:border-[#003366] transition-colors"
                  >
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                      <span className="font-bold text-[#003366]">{story.patientName}</span>
                      <span className="font-semibold text-[#00A3E0]">{story.procedure}</span>
                    </div>
                    <p className="line-clamp-2 text-xs italic text-slate-600">"{story.headline}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-center">
              <p className="text-xs font-bold text-[#0F172A]">No matches found for "{query}"</p>
              <p className="mt-1 text-xs text-slate-500">You can send a question or schedule a direct consultation.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <a
              href="tel:+919415023675"
              className="inline-flex items-center gap-1.5 font-semibold text-[#003366] hover:text-[#00A3E0]"
            >
              <Phone className="h-3.5 w-3.5 text-[#003366]" />
              +91 94150 23675
            </a>
            <a
              href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-900"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              WhatsApp
            </a>
          </div>
          <button
            id="search-footer-book-btn"
            type="button"
            onClick={() => goTo('book-consultation')}
            className="py-2 px-4 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 text-[#00A3E0]" />
          </button>
        </div>
      </div>
    </div>
  );
};
