import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Lock
} from 'lucide-react';
import { Card3D } from '../common/Card3D';

interface WhyDrMishraProps {
  onNavigate: (route: string) => void;
}

export const WhyDrMishra: React.FC<WhyDrMishraProps> = ({ onNavigate }) => {
  return (
    <section id="why-dr-mishra" className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="absolute inset-0 luxury-grid-bg opacity-25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-gold-pill text-[11px] font-bold tracking-wider uppercase text-[#B88035]">
              <span className="w-2 h-2 rounded-full bg-[#C89448] animate-pulse" />
              <span>The Super-Specialty Standard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#071D3B] tracking-tight leading-[1.16]">
              Built on 25+ years of surgical discipline and patient trust.
            </h2>

            <p className="text-sm sm:text-base text-[#4A5D73] leading-relaxed">
              Cosmetic surgery is an intimate balance of anatomical precision, artistic judgment, and uncompromising surgical safety. Under the direction of Dr. R. K. Mishra, every treatment plan is individualized without shortcuts.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#071D3B] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <span>Zero factory-line surgery — each case personally performed by Dr. Mishra</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#071D3B] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <span>NABH Accredited Hospital operating theatres at SIPS Lucknow</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#071D3B] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <span>Transparent pricing, downtime timelines, and realistic expectations</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#071D3B] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <span>Fellowship-trained in Dallas (USA), NYU (USA) & Taiwan</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => onNavigate('doctor')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#071D3B] hover:bg-[#0B2A5B] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>Read Surgical Principles & Philosophy</span>
                <ArrowRight className="w-4 h-4 text-[#DFB26E]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Tilt Feature Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Primary Large Feature Item */}
              <div className="sm:col-span-2">
                <Card3D maxTilt={5}>
                  <div className="p-7 rounded-3xl glass-panel border border-[#DFE7EF] shadow-md hover:border-[#C89448]/60 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EBF4FB] text-[#1769AA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6 text-[#C89448]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#C89448] uppercase tracking-wider block mb-1">
                          Pillar 01 • Master Surgical Execution
                        </span>
                        <h3 className="text-xl font-serif-luxury font-bold text-[#071D3B] mb-2">
                          Advanced Structural Techniques
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4A5D73] leading-relaxed">
                          Incorporating state-of-the-art structural preservation rhinoplasty, micro-incision gynecomastia excision, and deep SMAS muscle repositioning to ensure lasting results with minimal tissue trauma.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Smaller Feature Item 2: Personalized Care */}
              <div>
                <Card3D maxTilt={6} className="h-full">
                  <div className="h-full p-6 rounded-3xl glass-panel border border-[#DFE7EF] shadow-md hover:border-[#C89448]/60 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#EBF4FB] text-[#1769AA] flex items-center justify-center mb-4">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#C89448] uppercase tracking-wider block mb-1">
                        Pillar 02
                      </span>
                      <h4 className="text-base font-serif-luxury font-bold text-[#071D3B] mb-1.5">
                        Personalized Care
                      </h4>
                      <p className="text-xs text-[#4A5D73] leading-relaxed">
                        Bespoke consultation protocols tailored to your unique anatomical proportions, goals, and lifestyle.
                      </p>
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Smaller Feature Item 3: Natural Results */}
              <div>
                <Card3D maxTilt={6} className="h-full">
                  <div className="h-full p-6 rounded-3xl glass-panel border border-[#DFE7EF] shadow-md hover:border-[#C89448]/60 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#EBF4FB] text-[#1769AA] flex items-center justify-center mb-4">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#C89448] uppercase tracking-wider block mb-1">
                        Pillar 03
                      </span>
                      <h4 className="text-base font-serif-luxury font-bold text-[#071D3B] mb-1.5">
                        Natural Harmony
                      </h4>
                      <p className="text-xs text-[#4A5D73] leading-relaxed">
                        Refinement over alteration. Aesthetic outcomes that look authentic, effortless, and age-appropriate.
                      </p>
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Smaller Feature Item 4: Safety First */}
              <div className="sm:col-span-2">
                <Card3D maxTilt={5}>
                  <div className="p-6 rounded-3xl glass-panel-dark text-white border border-white/15 shadow-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#DFB26E]/20 text-[#DFB26E] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#DFB26E] uppercase tracking-wider block mb-1">
                        Pillar 04 • Highest Hospital Benchmark
                      </span>
                      <h4 className="text-base font-serif-luxury font-bold text-white mb-1">
                        Safety First at SIPS Hospital
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Class 100 modular HEPA-filtered laminar airflow operating suites, full in-house intensive care unit (ICU), and 24/7 dedicated cardiac anesthesiology team.
                      </p>
                    </div>
                  </div>
                </Card3D>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
