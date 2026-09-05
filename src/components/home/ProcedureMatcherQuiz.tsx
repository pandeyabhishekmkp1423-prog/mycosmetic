import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Calendar,
  Smile,
  User,
  Zap
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface ProcedureMatcherQuizProps {
  onNavigate: (route: string) => void;
}

interface QuizOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export const ProcedureMatcherQuiz: React.FC<ProcedureMatcherQuizProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedDowntime, setSelectedDowntime] = useState<string>('');

  const areaOptions: QuizOption[] = [
    { 
      id: 'FACE', 
      label: 'Face & Nose Aesthetics', 
      description: 'Rhinoplasty, eyelid rejuvenation, jawline definition, structural facelifts.' 
    },
    { 
      id: 'CHEST', 
      label: 'Chest & Breast Contouring', 
      description: 'Male gynecomastia correction, breast augmentation, lift, or reduction.' 
    },
    { 
      id: 'BODY', 
      label: 'Body Sculpting & Liposuction', 
      description: 'VASER 4D high-def lipo, tummy tuck (abdominoplasty), mommy makeovers.' 
    },
    { 
      id: 'SKIN', 
      label: 'Skin, Scars & Anti-Aging', 
      description: 'Facial scar revision, keloid correction, Botox, hyaluronic dermal fillers.' 
    }
  ];

  const getGoalOptions = (): QuizOption[] => {
    switch (selectedArea) {
      case 'FACE':
        return [
          { id: 'rhino', label: 'Refine Nose Shape / Bridge / Tip', description: 'Remove hump, narrow bulbous tip, or correct deviated septum for breathing.' },
          { id: 'bleph', label: 'Tired, Drooping Eyelids / Under-eye Bags', description: 'Remove excess eyelid skin and puffy orbital fat pads for youthful alert eyes.' },
          { id: 'facelift', label: 'Sagging Cheeks, Jowls & Loose Neck Skin', description: 'Deep SMAS tissue lifting and neck contouring with invisible hairline scars.' }
        ];
      case 'CHEST':
        return [
          { id: 'gyneco', label: 'Male Enlarged Chest / Puffy Nipples', description: 'Permanent glandular excision combined with micro-cannula VASER contouring.' },
          { id: 'breast_aug', label: 'Enhance Volume & Symmetric Fullness', description: 'Cohesive silicone gel implants with natural anatomical projection.' },
          { id: 'breast_red', label: 'Relieve Heavy Breast Sag / Back Discomfort', description: 'Elevate and reshape breast tissue with improved proportional silhouette.' }
        ];
      case 'BODY':
        return [
          { id: 'lipo', label: 'Stubborn Fat Pockets (Belly, Love Handles, Flanks)', description: 'Targeted ultrasound VASER melting without tissue damage or long downtime.' },
          { id: 'tummy', label: 'Post-Pregnancy Loose Skin / Muscle Separation', description: 'Full abdominoplasty with muscle plication and lower abdomen skin excision.' },
          { id: 'body_lift', label: 'Post-Massive Weight Loss Body Toning', description: 'Comprehensive skin redraping and body firming across thighs, arms, and torso.' }
        ];
      case 'SKIN':
      default:
        return [
          { id: 'scar', label: 'Facial Trauma or Post-Surgical Scar Revision', description: 'W-plasty and micro-surgical realignment to make visible scars virtually imperceptible.' },
          { id: 'fillers', label: 'Restore Lost Facial Volume & Smooth Deep Folds', description: 'US-FDA approved hyaluronic acid for nasolabial lines, lips, and hollow temples.' },
          { id: 'botox', label: 'Smooth Forehead Lines, Crow’s Feet & Frown Creases', description: 'Targeted neurotoxin micro-injections preserving natural facial expressions.' }
        ];
    }
  };

  const downtimeOptions: QuizOption[] = [
    { id: 'DAYCARE', label: 'Minimal Downtime (24 to 48 Hours)', description: 'Quick recovery, mild soreness, resume office or desk work within 2 days.' },
    { id: 'WEEKEND', label: 'Long Weekend (3 to 5 Days)', description: 'Manageable recovery, mild swelling, ideal for confidential long-weekend scheduling.' },
    { id: 'FULL_WEEK', label: 'Full Recovery Week (7 to 10 Days)', description: 'Comprehensive surgical healing, splints/dressings removed by Day 7 for optimal perfection.' }
  ];

  // Match recommendation
  const getMatchedProcedure = () => {
    if (selectedGoal === 'rhino') return proceduresData.find(p => p.slug === 'preservation-rhinoplasty') || proceduresData[0];
    if (selectedGoal === 'bleph') return proceduresData.find(p => p.slug === 'blepharoplasty-eyelid') || proceduresData[1];
    if (selectedGoal === 'facelift') return proceduresData.find(p => p.slug === 'deep-plane-facelift') || proceduresData[2];
    if (selectedGoal === 'gyneco') return proceduresData.find(p => p.slug === 'gynecomastia-correction') || proceduresData[0];
    if (selectedGoal === 'breast_aug') return proceduresData.find(p => p.slug === 'breast-augmentation') || proceduresData[1];
    if (selectedGoal === 'breast_red') return proceduresData.find(p => p.slug === 'breast-reduction') || proceduresData[1];
    if (selectedGoal === 'lipo') return proceduresData.find(p => p.slug === 'vaser-4d-liposuction') || proceduresData[2];
    if (selectedGoal === 'tummy') return proceduresData.find(p => p.slug === 'abdominoplasty-tummy-tuck') || proceduresData[2];
    if (selectedGoal === 'scar') return proceduresData.find(p => p.slug === 'facial-scar-revision') || proceduresData[3];
    return proceduresData[0];
  };

  const matched = getMatchedProcedure();

  const handleReset = () => {
    setStep(1);
    setSelectedArea('');
    setSelectedGoal('');
    setSelectedDowntime('');
  };

  return (
    <section id="procedure-matcher-quiz" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00A3E0]/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Self-Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight">
            Find Your Ideal Procedure
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Not sure which surgery suits your anatomy and lifestyle? Answer 3 confidential questions for an instant clinical recommendation based on Dr. R. K. Mishra’s 25+ years of surgical expertise.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className={`flex items-center gap-2 text-xs font-bold transition-colors ${step >= 1 ? 'text-[#003366]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
              <span>Area</span>
            </div>
            <div className={`h-0.5 w-8 transition-colors ${step >= 2 ? 'bg-[#003366]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 text-xs font-bold transition-colors ${step >= 2 ? 'text-[#003366]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
              <span>Goal</span>
            </div>
            <div className={`h-0.5 w-8 transition-colors ${step >= 3 ? 'bg-[#003366]' : 'bg-slate-200'}`} />
            <div className={`flex items-center gap-2 text-xs font-bold transition-colors ${step >= 3 ? 'text-[#003366]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
              <span>Downtime</span>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md p-6 sm:p-10 transition-all">
          
          {/* STEP 1: CHOOSE ANATOMICAL AREA */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">Question 1 of 3</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#003366]">Which anatomical area would you like to refine?</h3>
                <p className="text-xs text-[#64748B]">Select the primary area you are considering for enhancement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {areaOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedArea(opt.id);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group hover:border-[#00A3E0] hover:shadow-md ${
                      selectedArea === opt.id
                        ? 'border-[#003366] bg-[#003366]/5 shadow-xs'
                        : 'border-[#E2E8F0] bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#003366] group-hover:text-[#00A3E0]">
                      <span>Select area</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE AESTHETIC GOAL */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">Question 2 of 3</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#003366]">What is your primary aesthetic objective?</h3>
                  <p className="text-xs text-[#64748B]">Choose what describes your main desired improvement.</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#64748B] hover:text-[#003366] underline cursor-pointer"
                >
                  ← Back
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3.5 pt-2">
                {getGoalOptions().map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedGoal(opt.id);
                      setStep(3);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between group hover:border-[#00A3E0] hover:shadow-md ${
                      selectedGoal === opt.id
                        ? 'border-[#003366] bg-[#003366]/5'
                        : 'border-[#E2E8F0] bg-white'
                    }`}
                  >
                    <div className="pr-4">
                      <h4 className="text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:bg-[#003366] group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE DOWNTIME / LIFESTYLE */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">Question 3 of 3</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#003366]">What recovery timeline fits your schedule?</h3>
                  <p className="text-xs text-[#64748B]">All procedures are personalized for minimal downtime and rapid healing.</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#64748B] hover:text-[#003366] underline cursor-pointer"
                >
                  ← Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {downtimeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedDowntime(opt.id);
                      setStep(4);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group hover:border-[#00A3E0] hover:shadow-md ${
                      selectedDowntime === opt.id
                        ? 'border-[#003366] bg-[#003366]/5'
                        : 'border-[#E2E8F0] bg-white'
                    }`}
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center mb-3">
                        <Clock className="w-4 h-4 text-[#00A3E0]" />
                      </div>
                      <h4 className="text-sm font-bold text-[#003366] mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-semibold text-[#00A3E0] flex items-center gap-1">
                      <span>Select & view match</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: CLINICAL RECOMMENDATION RESULT */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Match Found
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
                    Your Recommended Surgical Approach
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-[#003366] hover:bg-[#F8FAFC] transition-colors self-start cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Assessment</span>
                </button>
              </div>

              {/* Matched Procedure Box */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0]">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 bg-[#00A3E0]/10 text-[#003366] font-bold uppercase rounded-md border border-[#00A3E0]/20 text-[10px]">
                      {matched.category}
                    </span>
                    <span className="text-[#64748B]">• SIPS Hospital Super-Specialty Protocol</span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
                    {matched.title}
                  </h4>

                  <p className="text-xs font-semibold text-[#00A3E0]">
                    {matched.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {matched.shortDesc}
                  </p>

                  {/* 3 Key Spec Badges */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Duration</span>
                      <span className="text-xs font-bold text-[#003366]">{matched.duration}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Stay</span>
                      <span className="text-xs font-bold text-[#003366]">{matched.hospitalStay}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center">
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Estimate</span>
                      <span className="text-xs font-bold text-[#00A3E0]">{matched.costRange}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E2E8F0] shadow-sm bg-white">
                    <img
                      src={matched.image}
                      alt={matched.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onNavigate('book-consultation')}
                      className="btn-crimson w-full justify-center py-3 text-xs shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Evaluation with Dr. Mishra</span>
                    </button>

                    <button
                      onClick={() => onNavigate(`procedure-${matched.slug}`)}
                      className="btn-outline-navy w-full justify-center py-2.5 text-xs"
                    >
                      <span>Read Full Clinical Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Doctor Assurance Strip */}
              <div className="p-4 rounded-2xl bg-[#002244] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00A3E0]/20 flex items-center justify-center text-[#00A3E0] shrink-0 font-bold">
                    RM
                  </div>
                  <div>
                    <p className="font-bold text-white">Anatomical Confirmation Recommended</p>
                    <p className="text-slate-300 text-[11px]">Personal evaluation by Dr. R. K. Mishra determines exact surgical candidacy.</p>
                  </div>
                </div>
                <span className="text-[#00A3E0] font-semibold text-[11px] whitespace-nowrap">
                  100% Confidential & Secure
                </span>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
