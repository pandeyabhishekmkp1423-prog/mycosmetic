import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface SkinStorySectionProps {
  onNavigate: (route: string) => void;
}

interface ConcernItem {
  id: string;
  tabLabel: string;
  treatmentTitle: string;
  description: string;
  benefitHighlight: string;
  recoveryNote: string;
}

const CONCERN_ITEMS: ConcernItem[] = [
  {
    id: 'acne-scars',
    tabLabel: 'Acne & Scars',
    treatmentTitle: 'Triple-Action Scar Revision & Laser Resurfacing',
    description: 'Break down stubborn fibrotic scar tethering and stimulate profound dermal collagen regeneration for visibly smoother, refined skin.',
    benefitHighlight: 'Up to 80% visible scar depth reduction',
    recoveryNote: 'Mild redness for 2–3 days'
  },
  {
    id: 'wrinkles',
    tabLabel: 'Fine Lines & Wrinkles',
    treatmentTitle: 'Secret RF Microneedling & Cellular Smoothing',
    description: 'Deliver targeted fractional radiofrequency energy to the deep dermis to erase expression lines and restore youthful skin elasticity.',
    benefitHighlight: 'Noticeable firming in 1–2 weeks',
    recoveryNote: 'Socially ready the next morning'
  },
  {
    id: 'pigmentation',
    tabLabel: 'Pigmentation & Tone',
    treatmentTitle: 'Med-Lite Q-Switch Laser & Glow Infusion',
    description: 'Shatter deep melanin clusters and correct stubborn sun damage, melasma, and dark spots without damaging surrounding skin tissue.',
    benefitHighlight: 'Even porcelain clarity & radiance',
    recoveryNote: 'Zero social downtime'
  },
  {
    id: 'sagging',
    tabLabel: 'Firming & Contour',
    treatmentTitle: 'High-SMAS Structural Lift & Tissue Tightening',
    description: 'Reposition deeper structural facial layers and define the jawline for natural, long-lasting rejuvenation without an artificial stretched look.',
    benefitHighlight: 'Defines jawline & restores contour',
    recoveryNote: 'Personalized non-surgical & surgical pathways'
  }
];

export const SkinStorySection: React.FC<SkinStorySectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ConcernItem>(CONCERN_ITEMS[0]);

  const handleWhatsApp = (topic: string) => {
    const text = encodeURIComponent(
      `Hello Dr. R. K. Mishra's Clinic! I would like to consult about skin treatments for: ${topic}. Could you share appointment availability?`
    );
    window.open(`https://wa.me/919415582377?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F8FAFC] py-14 sm:py-20 border-b border-[#E2E8F0]">
      
      {/* Subtle ambient luxury medical auras */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Balanced Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: Clean, Pristine Split-Face Artwork (NO Clutter, NO Badges, Pure Art) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              
              {/* Soft decorative shadow border */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl shadow-slate-900/10 border border-slate-200/80">
                <img
                  src="/assets/skin_story_split.jpg"
                  alt="Rewrite Your Skin Story - Clinical Transformation Split Face"
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>

              {/* Minimalist Subtext Below Artwork */}
              <div className="mt-3 text-center">
                <span className="font-editorial italic text-slate-500 text-sm">
                  Clinical Dermatology & M.Ch Plastic Surgery Synergy
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Rich Editorial Typography & Clean Interactive Solution */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            {/* Editorial Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#00A3E0]" />
              <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase">
                Aesthetic Dermatology & Surgical Artistry
              </span>
            </div>

            {/* Rich Headline with Luxury Serif & Modern Contrast */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#003366] tracking-tight leading-[1.08] mb-5">
              Rewrite Your Skin Story <br />
              <span className="italic text-[#00A3E0] font-normal">With Us.</span>
            </h2>

            {/* Clear, Spacious Summary (No small text) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Every skin concern has an exact clinical answer. Under the surgical precision of{' '}
              <strong className="text-[#003366] font-semibold">Dr. R. K. Mishra</strong>, we unite 
              advanced laser resurfacing, cellular regeneration, and tissue contouring to reveal your most radiant, timeless confidence.
            </p>

            {/* Clean Concern Tabs (No Badges, Easy-to-Tap & Clean) */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2.5">
                {CONCERN_ITEMS.map((item) => {
                  const isActive = activeTab.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item)}
                      className={`text-sm sm:text-base font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#003366] text-white shadow-md shadow-[#003366]/25'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean, Spacious Highlight Card (Breathable, No Dense Tables) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-lg shadow-slate-900/5 mb-8 transition-all duration-300">
              
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#003366] mb-3 leading-snug">
                {activeTab.treatmentTitle}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {activeTab.description}
              </p>

              {/* 2 Clean Highlights in Rich Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Proven Result
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-900">
                      {activeTab.benefitHighlight}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Recovery Time
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-900">
                      {activeTab.recoveryNote}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Rich Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#003366] hover:bg-[#002244] text-white text-base font-semibold px-7 py-4 rounded-xl shadow-lg shadow-[#003366]/20 transition-all duration-200 cursor-pointer group"
              >
                <span>Book Skin Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleWhatsApp(activeTab.tabLabel)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300/80 text-base font-semibold px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={() => onNavigate('procedures')}
                className="text-slate-600 hover:text-[#003366] text-sm font-semibold px-3 py-4 text-center transition-colors cursor-pointer"
              >
                View All Procedures →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
