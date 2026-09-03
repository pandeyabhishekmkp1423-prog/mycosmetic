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
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#071D3B]/72 px-3 pt-16 backdrop-blur-md sm:px-4 sm:pt-24"
      onClick={onClose}
    >
      <div
        id="global-search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search procedures and patient guidance"
        className="route-transition flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-[#DCE7F0] bg-white shadow-[0_30px_90px_rgba(7,29,59,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#DCE7F0] bg-[#F7FBFE] p-3 sm:p-4">
          <div className="flex items-center gap-3 rounded-lg border border-[#DCE7F0] bg-white px-3 py-3 shadow-sm">
            <Search className="h-5 w-5 shrink-0 text-[#1769AA]" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search rhinoplasty, gynecomastia, recovery, pricing..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              className="w-full bg-transparent text-base font-semibold text-[#102A43] placeholder:text-[#718096] focus:outline-hidden"
            />
            {query && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] hover:bg-[#EEF7FC] hover:text-[#102A43]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              id="close-search-modal-btn"
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] hover:bg-[#EEF7FC] hover:text-[#102A43]"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => goTo('book-consultation')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B2A5B] px-3 py-2 font-bold text-white hover:bg-[#1769AA]"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book consultation
            </button>
            <button
              type="button"
              onClick={() => goTo('pricing')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE7F0] bg-white px-3 py-2 font-bold text-[#0B2A5B] hover:border-[#1769AA]"
            >
              Pricing guide
            </button>
            <span className="ml-auto hidden text-[#718096] sm:inline">Press Esc to close</span>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          <button
            type="button"
            onClick={() => goTo('doctor')}
            className="interactive-lift flex w-full items-center justify-between gap-4 rounded-lg border border-[#DCE7F0] bg-[#F5FAFD] p-4 text-left"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0B2A5B] text-sm font-bold text-white">
                Dr
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-[#102A43]">{doctorData.name}</h4>
                <p className="truncate text-xs text-[#52677D]">
                  Senior Plastic Surgeon, SIPS Hospital Lucknow - {doctorData.experienceYears}+ years
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#1769AA]" />
          </button>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#52677D]">
                <Stethoscope className="h-3.5 w-3.5 text-[#1769AA]" />
                Procedures ({searchResults.procedures.length})
              </h3>
              {!query && <span className="text-[11px] font-semibold text-[#718096]">Popular treatments</span>}
            </div>

            {searchResults.procedures.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {searchResults.procedures.map((procedure) => (
                  <button
                    key={procedure.slug}
                    id={`search-proc-${procedure.slug}`}
                    type="button"
                    onClick={() => goTo(`procedure-${procedure.slug}`)}
                    className="interactive-lift group flex items-start gap-3 rounded-lg border border-[#DCE7F0] bg-white p-3 text-left hover:border-[#1769AA]"
                  >
                    <SafeImage
                      src={procedure.image}
                      alt={procedure.title}
                      fallbackCategory={procedure.category}
                      className="h-14 w-14 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-bold text-[#102A43] group-hover:text-[#1769AA]">
                          {procedure.title}
                        </span>
                        <span className="shrink-0 text-[10px] font-bold uppercase text-[#718096]">{procedure.category}</span>
                      </div>
                      <p className="mt-1 truncate text-xs text-[#52677D]">{procedure.shortDesc}</p>
                      <span className="mt-1 block text-[11px] font-bold text-[#1769AA]">From {procedure.costRange}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-[#DCE7F0] bg-[#F7FBFE] p-4 text-sm text-[#52677D]">
                No procedure matches "{query}". Try a concern like nose, scar, chest, body, eyes or recovery.
              </p>
            )}
          </div>

          {searchResults.insights.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase text-[#52677D]">
                <BookOpen className="h-3.5 w-3.5 text-[#1769AA]" />
                Articles & Recovery Guides
              </h3>
              <div className="space-y-2">
                {searchResults.insights.map((article) => (
                  <button
                    key={article.slug}
                    id={`search-art-${article.slug}`}
                    type="button"
                    onClick={() => goTo(`insight-${article.slug}`)}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg border border-[#DCE7F0] bg-white p-3 text-left hover:border-[#1769AA] hover:bg-[#F7FBFE]"
                  >
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase text-[#1769AA]">{article.category}</span>
                      <h4 className="truncate text-xs font-bold text-[#102A43] group-hover:text-[#1769AA]">{article.title}</h4>
                      <p className="truncate text-xs text-[#52677D]">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#718096] group-hover:text-[#1769AA]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.stories.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase text-[#52677D]">
                <Sparkles className="h-3.5 w-3.5 text-[#1769AA]" />
                Patient Results & Stories
              </h3>
              <div className="space-y-2">
                {searchResults.stories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => goTo('patient-stories')}
                    className="w-full rounded-lg border border-[#DCE7F0] bg-white p-3 text-left hover:border-[#1769AA] hover:bg-[#F7FBFE]"
                  >
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                      <span className="font-bold text-[#102A43]">{story.patientName}</span>
                      <span className="font-bold text-[#1769AA]">{story.procedure}</span>
                    </div>
                    <p className="line-clamp-2 text-xs italic text-[#52677D]">"{story.headline}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="rounded-lg border border-[#DCE7F0] bg-[#F7FBFE] p-5 text-center">
              <p className="text-sm font-bold text-[#102A43]">Nothing found for "{query}"</p>
              <p className="mt-1 text-xs text-[#52677D]">You can still send a question or book a private consultation.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#DCE7F0] bg-[#F7FBFE] p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-[#52677D]">
            <a
              href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold hover:text-[#1769AA]"
            >
              <Phone className="h-3.5 w-3.5 text-[#1769AA]" />
              +91 9795 800 800
            </a>
            <a
              href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
          <button
            id="search-footer-book-btn"
            type="button"
            onClick={() => goTo('book-consultation')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B2A5B] px-4 py-2.5 font-bold text-white hover:bg-[#1769AA]"
          >
            Book Consultation
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
