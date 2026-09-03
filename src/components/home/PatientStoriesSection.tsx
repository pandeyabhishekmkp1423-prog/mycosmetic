import React from 'react';
import { Star, ArrowRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { patientStoriesData } from '../../data/patientStoriesData';
import { reviewsData } from '../../data/reviewsData';
import { SafeImage } from '../common/SafeImage';

interface PatientStoriesSectionProps {
  onNavigate: (route: string) => void;
}

export const PatientStoriesSection: React.FC<PatientStoriesSectionProps> = ({ onNavigate }) => {
  const featuredStory = patientStoriesData[0];
  const secondaryStories = patientStoriesData.slice(1, 3);

  return (
    <section id="patient-stories-section" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patient Journeys</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#102A43] tracking-tight leading-tight">
              Real Experiences & Transformations
            </h2>
            <p className="text-sm sm:text-base text-[#52677D] mt-2 max-w-xl font-normal">
              Authentic stories from individuals whose confidence and daily comfort were renewed through customized surgical care.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reviews')}
              className="px-5 py-2.5 bg-[#EEF7FC] hover:bg-[#DCE7F0] text-[#0B2A5B] text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Read All Reviews ({reviewsData.length}+)
            </button>
            <button
              onClick={() => onNavigate('patient-stories')}
              className="px-5 py-2.5 bg-[#0B2A5B] hover:bg-[#071D3B] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Patient Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Storytelling Layout: Large Featured Story + Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Featured Editorial Story (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-[#F5FAFD] rounded-[24px] p-6 sm:p-10 border border-[#DCE7F0] flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 bg-white text-[#1769AA] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#DCE7F0] shadow-xs">
                  Featured Patient Story
                </span>
                <span className="text-xs text-[#718096] font-medium">
                  {featuredStory.timeline}
                </span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(featuredStory.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43] leading-snug mb-4">
                "{featuredStory.headline}"
              </h3>

              <p className="text-sm sm:text-base text-[#52677D] leading-relaxed mb-8 italic">
                "{featuredStory.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#102A43]">{featuredStory.patientName}</h4>
                <p className="text-xs text-[#1769AA] font-semibold">{featuredStory.procedure} • {featuredStory.location}</p>
              </div>

              <button
                onClick={() => onNavigate('patient-stories')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A5B] hover:text-[#1769AA] transition-colors"
              >
                <span>Read Full Case Narrative</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supporting Stories (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#DCE7F0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider">
                      {story.procedure}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#102A43] mb-2">
                    {story.headline}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#52677D] line-clamp-3 leading-relaxed mb-4">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEF2F6] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#102A43]">{story.patientName}</p>
                    <p className="text-[11px] text-[#718096]">{story.location}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('patient-stories')}
                    className="text-xs font-semibold text-[#1769AA] hover:text-[#0B2A5B] transition-colors"
                  >
                    Read Story →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Aggregate Ratings Banner */}
        <div className="mt-12 p-8 rounded-[24px] bg-[#0B2A5B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#0B2A5B] flex flex-col items-center justify-center font-bold font-serif leading-none shadow-sm shrink-0">
              <span className="text-2xl">4.9</span>
              <span className="text-[9px] uppercase tracking-wider text-[#1769AA] mt-0.5">Rating</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#EEF7FC]">
                Verified Patient Satisfaction across Google Reviews, WhatClinic, and SIPS Hospital patient feedback.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('book-consultation')}
            className="w-full md:w-auto px-7 py-3.5 bg-white hover:bg-[#EEF7FC] text-[#0B2A5B] text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 text-center shadow-xs cursor-pointer"
          >
            Schedule Your Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
