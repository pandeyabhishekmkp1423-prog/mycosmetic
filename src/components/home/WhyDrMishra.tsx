import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Activity, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface WhyDrMishraProps {
  onNavigate: (route: string) => void;
}

export const WhyDrMishra: React.FC<WhyDrMishraProps> = ({ onNavigate }) => {
  return (
    <section id="why-dr-mishra" className="py-16 sm:py-24 bg-[#F5FAFD] relative overflow-hidden">
      <div className="absolute inset-0 medical-grid-bg opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
              <span>The Clinical Difference</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#102A43] tracking-tight leading-[1.18]">
              Built on decades of surgical discipline and patient trust.
            </h2>

            <p className="text-sm sm:text-base text-[#52677D] leading-relaxed">
              Cosmetic surgery is an intimate balance of anatomical precision, artistic judgment, and uncompromising surgical safety. Under the direction of Dr. R. K. Mishra, every treatment plan is individualized without shortcuts.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#102A43] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>Zero factory-line surgery — each case personally performed by Dr. Mishra</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#102A43] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>NABH Accredited Hospital operating theatres at SIPS Lucknow</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#102A43] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                <span>Transparent pricing, downtime timelines, and realistic expectations</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('doctor')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2A5B] hover:bg-[#071D3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <span>Read Surgical Principles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Asymmetric Visual Composition */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Primary Large Feature Item (Spans Full or Highlights Advanced Techniques) */}
              <div className="sm:col-span-2 p-7 rounded-[22px] bg-white border border-[#DCE7F0]/80 shadow-[0_8px_24px_rgba(11,42,91,0.04)] relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#1769AA] uppercase tracking-wider block mb-1">
                      Pillar 01 • Mastery
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#102A43] mb-2">
                      Advanced Surgical Techniques
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52677D] leading-relaxed">
                      Incorporating state-of-the-art structural preservation rhinoplasty, micro-incision gynecomastia excision, and deep SMAS muscle repositioning to ensure lasting results with minimal tissue trauma.
                    </p>
                  </div>
                </div>
              </div>

              {/* Smaller Feature Item 2: Personalized Care */}
              <div className="p-6 rounded-[22px] bg-white border border-[#DCE7F0]/80 shadow-[0_8px_24px_rgba(11,42,91,0.04)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center mb-4">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1769AA] uppercase tracking-wider block mb-1">
                    Pillar 02
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#102A43] mb-1.5">
                    Personalized Care
                  </h4>
                  <p className="text-xs text-[#52677D] leading-relaxed">
                    Bespoke consultation protocols tailored to your unique anatomical proportions, goals, and lifestyle.
                  </p>
                </div>
              </div>

              {/* Smaller Feature Item 3: Natural Results */}
              <div className="p-6 rounded-[22px] bg-white border border-[#DCE7F0]/80 shadow-[0_8px_24px_rgba(11,42,91,0.04)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center mb-4">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1769AA] uppercase tracking-wider block mb-1">
                    Pillar 03
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#102A43] mb-1.5">
                    Natural Results
                  </h4>
                  <p className="text-xs text-[#52677D] leading-relaxed">
                    Refinement over alteration. Aesthetic outcomes that look authentic, effortless, and age-appropriate.
                  </p>
                </div>
              </div>

              {/* Smaller Feature Item 4: Safety First (Spans Full on bottom) */}
              <div className="sm:col-span-2 p-6 rounded-[22px] bg-white border border-[#DCE7F0]/80 shadow-[0_8px_24px_rgba(11,42,91,0.04)] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1769AA] uppercase tracking-wider block mb-1">
                    Pillar 04 • Highest Hospital Benchmark
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#102A43] mb-1">
                    Safety First at SIPS Hospital
                  </h4>
                  <p className="text-xs text-[#52677D] leading-relaxed">
                    Modular HEPA-filtered laminar airflow operating suites, full in-house intensive care, and 24/7 dedicated anesthesiology team.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
