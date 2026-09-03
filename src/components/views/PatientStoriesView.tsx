import React, { useState } from 'react';
import { Star, Quote, Calendar, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { patientStoriesData } from '../../data/patientStoriesData';

interface PatientStoriesViewProps {
  onNavigate: (route: string) => void;
}

export const PatientStoriesView: React.FC<PatientStoriesViewProps> = ({ onNavigate }) => {
  const [selectedStory, setSelectedStory] = useState<string>(patientStoriesData[0].id);

  const activeStory = patientStoriesData.find(s => s.id === selectedStory) || patientStoriesData[0];

  return (
    <div id="patient-stories-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Patient Journeys & Stories</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Real Human Journeys
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Patient Stories & Transformations
          </h1>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Behind every surgical procedure is a personal transformation. Read candid accounts of the patient experience at My Cosmetic Surgery — from consultation to full recovery.
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F0] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {patientStoriesData.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedStory === story.id
                  ? 'bg-white border-[#1769AA] shadow-md ring-1 ring-[#1769AA]'
                  : 'bg-[#F6FAFD] border-[#DCE7F0] hover:bg-white text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#1769AA]">{story.procedure}</span>
                <span className="text-gray-600">{story.patientName}</span>
              </div>
              <p className="text-xs font-serif font-bold text-[#102A43] line-clamp-1">
                {story.headline}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Story Deep-Dive Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Story Header */}
            <div>
              <div className="flex items-center gap-1 text-[#C89448] mb-2">
                {[...Array(activeStory.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#102A43] leading-snug">
                "{activeStory.headline}"
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
                <span className="font-semibold text-gray-900">{activeStory.patientName}</span>
                <span>•</span>
                <span>{activeStory.location}</span>
                <span>•</span>
                <span className="text-[#1769AA] font-semibold">{activeStory.procedure}</span>
                <span>•</span>
                <span>{activeStory.timeline}</span>
              </div>
            </div>

            {/* Quote Callout */}
            <div className="p-6 rounded-2xl bg-[#F6FAFD] border-l-4 border-[#1769AA] text-sm sm:text-base italic text-gray-800 leading-relaxed font-serif">
              "{activeStory.quote}"
            </div>

            {/* Narrative Body */}
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h3 className="text-base font-serif font-bold text-[#102A43]">The Decision & Consultation</h3>
              <p>{activeStory.story}</p>
            </div>

            {/* Doctor Note */}
            <div className="p-6 rounded-2xl bg-[#102A43] text-white space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C89448]">
                Surgeon Note from Dr. R. K. Mishra
              </span>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                "{activeStory.doctorNote}"
              </p>
            </div>

          </div>

          {/* Right Sidebar: Surgery Context & CTA */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[#F6FAFD] border border-[#DCE7F0] space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                Case Overview
              </h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#DCE7F0]">
                  <span className="text-gray-500">Procedure</span>
                  <span className="font-bold text-[#102A43]">{activeStory.procedure}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#DCE7F0]">
                  <span className="text-gray-500">Patient Origin</span>
                  <span className="font-medium text-gray-800">{activeStory.location}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#DCE7F0]">
                  <span className="text-gray-500">Follow-up Period</span>
                  <span className="font-medium text-gray-800">{activeStory.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Operating Surgeon</span>
                  <span className="font-bold text-[#1769AA]">Dr. R. K. Mishra</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('book-consultation')}
                className="w-full py-3 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C89448]" />
                <span>Book Similar Consultation</span>
              </button>
            </div>

            {/* Read All Reviews Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE7F0] text-center space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#102A43]">
                Explore More Patient Feedback
              </h4>
              <p className="text-xs text-gray-500">
                Over 500+ verified patient ratings from Lucknow, UP, and across India.
              </p>
              <button
                onClick={() => onNavigate('reviews')}
                className="w-full py-2.5 bg-[#F6FAFD] hover:bg-[#E7F2F8] text-[#102A43] border border-[#DCE7F0] rounded-xl text-xs font-semibold transition-colors"
              >
                View Verified Reviews Directory →
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
