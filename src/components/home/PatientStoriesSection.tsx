import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface PatientStoriesSectionProps {
  onNavigate: (route: string) => void;
}

export const PatientStoriesSection: React.FC<PatientStoriesSectionProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      name: 'Jessica M.',
      quote: "Dr. Mishra and his team were incredible from start to finish. I couldn't be happier with my natural rhinoplasty results!",
      image: '/assets/patient_jessica.jpg',
      procedure: 'Rhinoplasty'
    },
    {
      name: 'Amanda L.',
      quote: "The care, attention, and results exceeded my expectations. I feel like the best, most confident version of myself!",
      image: '/assets/patient_amanda.jpg',
      procedure: 'Breast Augmentation'
    },
    {
      name: 'Sarah T.',
      quote: "Professional, kind, and truly talented. I highly recommend SIPS Hospital and Dr. Mishra for anyone considering cosmetic surgery!",
      image: '/assets/patient_sarah.jpg',
      procedure: 'Facial Rejuvenation'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#00A3E0] uppercase block">
            Patient Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-bold text-[#003366] tracking-tight">
            Real Patients. Real Results.
          </h2>
          <div className="w-16 h-[3px] bg-[#00A3E0] mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Row with Side Arrows */}
        <div className="relative">
          
          {/* Circular Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#003366] hover:bg-[#F0F7FD] transition-colors z-10"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#003366] hover:bg-[#F0F7FD] transition-colors z-10"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8">
            {stories.map((item) => (
              <div
                key={item.name}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex items-start gap-5 shadow-xs hover:shadow-md hover:border-[#00A3E0]/30 transition-all"
              >
                {/* Round Portrait Photo */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover shrink-0 border-2 border-white shadow-sm"
                />

                {/* Content */}
                <div className="space-y-2">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed italic">
                    "{item.quote}"
                  </p>

                  {/* Patient Name */}
                  <div className="text-xs font-bold text-[#003366] pt-1">
                    – {item.name} <span className="text-slate-400 font-normal">({item.procedure})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
