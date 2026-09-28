import React, { useState } from 'react';
import { Star, Calendar, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { patientStoriesData } from '../../data/patientStoriesData';

interface PatientStoriesViewProps {
  onNavigate: (route: string) => void;
}

export const PatientStoriesView: React.FC<PatientStoriesViewProps> = ({ onNavigate }) => {
  const [selectedStory, setSelectedStory] = useState<string>(patientStoriesData[0].id);

  const activeStory = patientStoriesData.find(s => s.id === selectedStory) || patientStoriesData[0];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Patient Journeys & Stories</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
            Real Patient Experiences
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Patient Stories & <span className="italic text-[#00A3E0] font-normal">Journeys</span>
          </h1>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Behind every surgical procedure is a deeply personal transformation. Read candid reflections from patients treated by ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra at SIPS Super Specialty Hospital (Pvt. Ltd.), Lucknow.
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {patientStoriesData.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
                selectedStory === story.id
                  ? 'bg-[#003366] text-white border-[#003366] shadow-md'
                  : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1E293B] hover:border-[#00A3E0]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={`font-bold uppercase tracking-wider text-xs ${selectedStory === story.id ? 'text-[#00A3E0]' : 'text-[#003366]'}`}>
                  {story.procedure}
                </span>
                <span className={`text-xs font-medium ${selectedStory === story.id ? 'text-white/80' : 'text-[#64748B]'}`}>
                  {story.patientName}
                </span>
              </div>
              <p className={`text-sm font-editorial font-bold line-clamp-1 ${selectedStory === story.id ? 'text-white' : 'text-[#003366]'}`}>
                {story.headline}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Story Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Story */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-2.5">
                {[...Array(activeStory.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366] leading-snug">
                "{activeStory.headline}"
              </h2>
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#64748B] mt-2 font-medium">
                <span className="font-bold text-[#003366]">{activeStory.patientName}</span>
                <span>•</span>
                <span>{activeStory.location}</span>
                <span>•</span>
                <span className="text-[#00A3E0] font-semibold">{activeStory.procedure}</span>
                <span>•</span>
                <span>{activeStory.timeline} post-op</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border-l-4 border-[#00A3E0] text-base sm:text-lg italic text-[#1E293B] leading-relaxed font-editorial shadow-xs">
              "{activeStory.quote}"
            </div>

            <div className="space-y-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
              <h3 className="text-lg font-editorial font-bold text-[#003366]">The Surgical Journey</h3>
              <p>{activeStory.story}</p>
            </div>

            {/* Doctor Reflection */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#002244] to-[#003366] text-white space-y-2 border border-white/10 shadow-md">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
                Surgeon Note • Dr. R. K. Mishra
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic font-normal">
                "{activeStory.doctorNote}"
              </p>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">
                Case Summary
              </h4>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">Procedure</span>
                  <span className="font-bold text-[#003366]">{activeStory.procedure}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">Location</span>
                  <span className="font-medium text-[#1E293B]">{activeStory.location}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">Follow-up</span>
                  <span className="font-medium text-[#1E293B]">{activeStory.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Surgeon</span>
                  <span className="font-bold text-[#003366]">Dr. R. K. Mishra</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy w-full justify-center py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span>Book Similar Consultation</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center space-y-2 shadow-xs">
              <h4 className="text-base font-editorial font-bold text-[#003366]">
                Explore All 500+ Reviews
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] font-normal">
                Verified patient feedback from Lucknow, UP, and international visitors.
              </p>
              <button
                onClick={() => onNavigate('reviews')}
                className="mt-2 text-xs sm:text-sm font-bold text-[#00A3E0] hover:underline cursor-pointer"
              >
                View Reviews Directory →
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
