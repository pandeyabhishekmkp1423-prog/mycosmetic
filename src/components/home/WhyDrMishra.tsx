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
    <section id="why-dr-mishra" className="py-16 sm:py-24 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2E8F0]">
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
              The Super-Specialty Standard
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight leading-[1.12]">
              Built on 25+ years of <span className="italic text-[#00A3E0] font-normal">surgical discipline</span> and patient trust.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Cosmetic surgery is an intimate balance of anatomical precision, artistic judgment, and uncompromising surgical safety. Under the direction of <strong className="text-[#003366] font-semibold">Dr. R. K. Mishra</strong>, every treatment plan is individualized without shortcuts.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 text-sm sm:text-base text-[#003366] font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero factory-line surgery — each case personally performed by Dr. Mishra</span>
              </div>
              <div className="flex items-start gap-3 text-sm sm:text-base text-[#003366] font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>NABH Accredited Hospital operating theatres at SIPS Lucknow</span>
              </div>
              <div className="flex items-start gap-3 text-sm sm:text-base text-[#003366] font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transparent pricing, recovery timelines, and realistic expectations</span>
              </div>
              <div className="flex items-start gap-3 text-sm sm:text-base text-[#003366] font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Fellowship-trained in Dallas (USA), NYU (USA) & Taiwan</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('doctor')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Read Surgical Principles & Philosophy</span>
                <ArrowRight className="w-4 h-4 text-[#00A3E0]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Tilt Feature Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Large Feature Item */}
              <div className="sm:col-span-2">
                <Card3D maxTilt={5}>
                  <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#003366]/40 hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F0F7FD] text-[#003366] border border-[#00A3E0]/20 flex items-center justify-center shrink-0 group-hover:bg-[#003366] group-hover:text-white transition-colors">
                        <Sparkles className="w-5 h-5 text-[#00A3E0] group-hover:text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block mb-1">
                          Pillar 01 • Master Surgical Execution
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#003366] mb-1.5">
                          Advanced Structural Techniques
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
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
                  <div className="h-full p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#003366]/40 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#F0F7FD] text-[#003366] border border-[#00A3E0]/20 flex items-center justify-center mb-3">
                        <HeartHandshake className="w-5 h-5 text-[#00A3E0]" />
                      </div>
                      <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block mb-1">
                        Pillar 02
                      </span>
                      <h4 className="text-base font-bold text-[#003366] mb-1">
                        Personalized Care
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        Bespoke consultation protocols tailored to your unique anatomical proportions, goals, and lifestyle.
                      </p>
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Smaller Feature Item 3: Natural Results */}
              <div>
                <Card3D maxTilt={6} className="h-full">
                  <div className="h-full p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#003366]/40 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#F0F7FD] text-[#003366] border border-[#00A3E0]/20 flex items-center justify-center mb-3">
                        <Activity className="w-5 h-5 text-[#00A3E0]" />
                      </div>
                      <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block mb-1">
                        Pillar 03
                      </span>
                      <h4 className="text-base font-bold text-[#003366] mb-1">
                        Natural Harmony
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        Refinement over alteration. Aesthetic outcomes that look authentic, effortless, and age-appropriate.
                      </p>
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Smaller Feature Item 4: Safety First */}
              <div className="sm:col-span-2">
                <Card3D maxTilt={5}>
                  <div className="p-6 rounded-2xl bg-[#002244] text-white border border-[#003366] shadow-sm flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/20 text-[#00A3E0] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block mb-1">
                        Pillar 04 • Highest Hospital Benchmark
                      </span>
                      <h4 className="text-base font-bold text-white mb-1">
                        Safety First at SIPS Hospital
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
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
