import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2, ArrowRight } from 'lucide-react';

interface PatientStoriesSectionProps {
  onNavigate: (route: string) => void;
}

export const PatientStoriesSection: React.FC<PatientStoriesSectionProps> = ({ onNavigate }) => {
  const [startIndex, setStartIndex] = useState(0);

  const stories = [
    {
      name: 'Jessica M.',
      location: 'Delhi NCR',
      quote: "Dr. Mishra and his surgical team were incredible from start to finish. My breathing is completely clear and my nose looks so natural that nobody can tell I had surgery!",
      image: '/assets/patient_jessica.jpg',
      procedure: 'Preservation Rhinoplasty'
    },
    {
      name: 'Aman V.',
      location: 'Lucknow',
      quote: "Suffered from gynecomastia for 8 years. Dr. Mishra performed gland excision with VASER lipo at SIPS Hospital. Was back at my office desk in 3 days. Life changing!",
      image: '/assets/proc_male.jpg',
      procedure: 'Gynecomastia Correction'
    },
    {
      name: 'Amanda L.',
      location: 'Varanasi',
      quote: "The care, hospital safety at SIPS, and aesthetic outcome exceeded all expectations. Dr. Mishra has the hands of an artist and the discipline of a master surgeon.",
      image: '/assets/patient_amanda.jpg',
      procedure: 'Breast Augmentation'
    },
    {
      name: 'Sarah T.',
      location: 'Kanpur',
      quote: "Professional, kind, and truly talented. The deep-plane SMAS facelift took 12 years off my face without any unnatural pulled look. Highly recommend Dr. Mishra!",
      image: '/assets/patient_sarah.jpg',
      procedure: 'SMAS Deep-Plane Facelift'
    },
    {
      name: 'Rohit K.',
      location: 'Gorakhpur',
      quote: "Had VASER 360 abdominal liposuction. The contouring and athletic definition achieved are unbelievable. Zero hidden charges and the financing EMI was seamless.",
      image: '/assets/hero_model.jpg',
      procedure: 'VASER 360° Liposuction'
    }
  ];

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % stories.length);
  };

  // Get 3 visible stories for desktop circular display
  const visibleStories = [
    stories[startIndex],
    stories[(startIndex + 1) % stories.length],
    stories[(startIndex + 2) % stories.length]
  ];

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-white border-b border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Rich Editorial Typography */}
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Verified Patient Journeys
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Real Patients. <span className="italic text-[#00A3E0] font-normal">Authentic Results.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto">
            Honest feedback from individuals who underwent aesthetic and reconstructive procedures with Dr. R. K. Mishra.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Circular Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#CBD5E1] shadow-md flex items-center justify-center text-[#003366] hover:bg-[#003366] hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#CBD5E1] shadow-md flex items-center justify-center text-[#003366] hover:bg-[#003366] hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards: 1 on mobile, 3 on md+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-6">
            {visibleStories.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#003366] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-3">
                  {/* Top Row: Patient Info + Procedure Tag */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white shadow-xs"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#003366] flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </h4>
                      <p className="text-xs sm:text-sm text-[#00A3E0] font-semibold">
                        {item.procedure}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.location} • Verified Patient
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium">
                  <span>SIPS Hospital Lucknow</span>
                  <span className="text-[#003366] font-bold group-hover:text-[#00A3E0] transition-colors">
                    Verified Outcome ★
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-6">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  startIndex === i ? 'w-6 bg-[#003366]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Bottom CTA to Book Consultation */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const el = document.getElementById('consultation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigate('consultation');
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-[#003366] text-[#003366] hover:text-white border border-slate-200 hover:border-[#003366] text-xs font-bold transition-all cursor-pointer shadow-2xs group"
          >
            <span>Read 850+ Verified Google Reviews & Book Visit</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00A3E0] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
