import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Calendar,
  User,
  Heart,
  Activity,
  Layers,
  PhoneCall,
  ChevronRight,
  Info,
  Check,
  Award,
  Zap,
  Sparkles
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface ProcedureMatcherQuizProps {
  onNavigate: (route: string) => void;
}

interface ZoneOption {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  countBadge: string;
  procedures: string[];
  icon: any;
  accentBg: string;
  badgeBg: string;
}

interface GoalOption {
  id: string;
  targetTag: string;
  label: string;
  description: string;
  typicalTime: string;
  satisfaction: string;
}

interface DowntimeOption {
  id: string;
  label: string;
  tag: string;
  badgeColor: string;
  deskWork: string;
  socialReadiness: string;
  idealFor: string;
  cardBg: string;
  borderColor: string;
}

export const ProcedureMatcherQuiz: React.FC<ProcedureMatcherQuizProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedDowntime, setSelectedDowntime] = useState<string>('');

  // Rich, content-packed anatomical zone cards (no empty blank white spaces)
  const areaOptions: ZoneOption[] = [
    { 
      id: 'FACE', 
      label: 'Face & Neck Aesthetics', 
      subtitle: 'Facial Balance & Structural Rejuvenation',
      description: 'Preservation nose reshaping, upper/lower eyelid lift, deep SMAS facial suspension, and profile harmony.',
      countBadge: '5 Procedures',
      procedures: ['Rhinoplasty', 'Blepharoplasty', 'SMAS Facelift', 'Buccal Fat', 'Chin Genioplasty'],
      icon: User,
      accentBg: 'bg-[#003366]',
      badgeBg: 'bg-[#EBF5FC] text-[#003366] border-[#00A3E0]/30'
    },
    { 
      id: 'CHEST', 
      label: 'Chest & Breast Contouring', 
      subtitle: 'Male & Female Upper Body Symmetry',
      description: 'Minimally-invasive male gynecomastia excision, FDA silicone breast augmentation, and mastopexy lifts.',
      countBadge: '3 Procedures',
      procedures: ['Gynecomastia', 'Breast Augmentation', 'Breast Reduction & Lift'],
      icon: Heart,
      accentBg: 'bg-[#003366]',
      badgeBg: 'bg-[#EBF5FC] text-[#003366] border-[#00A3E0]/30'
    },
    { 
      id: 'BODY', 
      label: 'Body Sculpting & Liposuction', 
      subtitle: '360° HD Contouring & Core Restoration',
      description: 'High-definition VASER ultrasound lipo, abdominal muscle diastasis repair, and comprehensive mommy makeovers.',
      countBadge: '3 Procedures',
      procedures: ['VASER 360° Lipo', 'Tummy Tuck (Abdominoplasty)', 'Mommy Makeover'],
      icon: Activity,
      accentBg: 'bg-[#003366]',
      badgeBg: 'bg-[#EBF5FC] text-[#003366] border-[#00A3E0]/30'
    },
    { 
      id: 'SKIN', 
      label: 'Skin, Scars & Reconstructive', 
      subtitle: 'Micro-Surgical Tissue Realignment',
      description: 'Geometric scar revision for trauma and burns, keloid control protocols, and Smile Train cleft lip repair.',
      countBadge: '2 Procedures',
      procedures: ['Facial Scar Revision', 'Keloid Treatments', 'Cleft Lip & Palate'],
      icon: Layers,
      accentBg: 'bg-[#003366]',
      badgeBg: 'bg-[#EBF5FC] text-[#003366] border-[#00A3E0]/30'
    }
  ];

  const getGoalOptions = (): GoalOption[] => {
    switch (selectedArea) {
      case 'FACE':
        return [
          { 
            id: 'rhinoplasty', 
            targetTag: 'Nose & Profile Balancing',
            label: 'Refine Nose Bridge, Tip, Hump or Breathing', 
            description: 'Preserve natural bone/cartilage architecture while perfecting profile balance and opening nasal airways.',
            typicalTime: '2.5 – 3.5 Hours',
            satisfaction: '99% Natural Result'
          },
          { 
            id: 'blepharoplasty', 
            targetTag: 'Periorbital Rejuvenation',
            label: 'Remove Drooping Eyelids & Puffy Under-Eye Bags', 
            description: 'Excise hooded eyelid skin folds and reposition orbital fat pads for a refreshed, alert look.',
            typicalTime: '1 – 1.5 Hours',
            satisfaction: 'Daycare Outpatient'
          },
          { 
            id: 'facelift', 
            targetTag: 'Lower Face & Neck',
            label: 'Elevate Sagging Cheeks, Jowls & Lax Neck Bands', 
            description: 'Deep SMAS anatomical muscle suspension repositioning tissues with invisible ear hairline incisions.',
            typicalTime: '3.5 – 4.5 Hours',
            satisfaction: '10–15 Yrs Rejuvenated'
          },
          { 
            id: 'buccal-fat-reduction', 
            targetTag: 'Midface Slimming',
            label: 'Slim Round "Chubby" Cheeks for Chiseled V-Line', 
            description: 'Gentle intraoral extraction of buccal fat pads to emphasize natural cheekbones with zero external cuts.',
            typicalTime: '30 – 45 Minutes',
            satisfaction: 'Zero Visible Scars'
          },
          { 
            id: 'chin-correction', 
            targetTag: 'Mandibular Contour',
            label: 'Harmonize Weak / Receding Chin & Jawline', 
            description: 'Custom biocompatible anatomical implants placed intraorally to strengthen the jaw profile.',
            typicalTime: '1 – 1.5 Hours',
            satisfaction: 'Profile Alignment'
          }
        ];
      case 'CHEST':
        return [
          { 
            id: 'gynecomastia', 
            targetTag: 'Male Pectoral Sculpting',
            label: 'Permanent Male Breast Gland Excision + VASER Lipo', 
            description: 'Dual-modality micro-cannula fat aspiration and sub-areolar gland removal for a flat, athletic chest.',
            typicalTime: '1.5 – 2 Hours',
            satisfaction: 'Permanent No-Recurrence'
          },
          { 
            id: 'breast-augmentation', 
            targetTag: 'Volume & Fullness',
            label: 'Enhance Breast Volume, Projection & Symmetry', 
            description: 'US-FDA certified cohesive silicone gel implants placed via dual-plane technique for anatomical softness.',
            typicalTime: '1.5 – 2.5 Hours',
            satisfaction: 'Certified Lifetime Warranty'
          },
          { 
            id: 'breast-reduction', 
            targetTag: 'Postural Relief & Lift',
            label: 'Reduce Heavy Breast Sag & Relieve Chronic Back Strain', 
            description: 'Elevate pendulous breast tissue, reposition nipple-areola complex, and immediately alleviate neck strain.',
            typicalTime: '2.5 – 3.5 Hours',
            satisfaction: 'Immediate Physical Relief'
          }
        ];
      case 'BODY':
        return [
          { 
            id: 'liposuction', 
            targetTag: 'Targeted Adipose Removal',
            label: 'Melt Resistant Fat (Abdomen, Love Handles, Flanks, Arms)', 
            description: 'Ultrasound VASER technology liquefies stubborn fat while preserving delicate blood vessels and skin tone.',
            typicalTime: '2 – 3 Hours',
            satisfaction: '360° Body Definition'
          },
          { 
            id: 'tummy-tuck', 
            targetTag: 'Abdominal Wall Repair',
            label: 'Repair Separated Abdominal Muscles & Loose Skin Overhang', 
            description: 'Full vertical rectus muscle plication (diastasis repair) and excess skin excision with low bikini-line scar.',
            typicalTime: '3 – 4 Hours',
            satisfaction: 'Flat Taut Midsection'
          },
          { 
            id: 'mommy-makeover', 
            targetTag: 'Multi-Zone Restoration',
            label: 'Complete Post-Pregnancy Makeover (Abdomen + Breasts + Waist)', 
            description: 'Synchronized single-session surgical restoration combining tummy tuck, breast enhancement, and 360° lipo.',
            typicalTime: '4 – 5.5 Hours',
            satisfaction: 'Pre-Baby Silhouette'
          }
        ];
      case 'SKIN':
      default:
        return [
          { 
            id: 'scar-revision', 
            targetTag: 'Surgical Scar Revision',
            label: 'Minimize Trauma, Burn, or Previous Surgical Scars', 
            description: 'Precision W-plasty and micro-surgical tension realignment to make visible scars virtually imperceptible.',
            typicalTime: '45 – 90 Minutes',
            satisfaction: 'Smooth Tissue Blend'
          },
          { 
            id: 'reconstructive-cleft-lip', 
            targetTag: 'Specialist Reconstruction',
            label: 'Cleft Lip, Palate & Complex Structural Reconstruction', 
            description: 'Super-specialty multidisciplinary repair led by Smile Train Project Director with 15,000+ completed cases.',
            typicalTime: '2 – 3 Hours',
            satisfaction: 'Restored Function & Artistry'
          }
        ];
    }
  };

  // Rich, content-dense recovery window cards
  const downtimeOptions: DowntimeOption[] = [
    { 
      id: 'DAYCARE', 
      label: 'Rapid Daycare (24 – 48 Hours)', 
      tag: 'Shortest Downtime',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      deskWork: 'Return to desk/remote work within 24 to 48 hours',
      socialReadiness: 'Minimal visible swelling, easily concealed',
      idealFor: 'Busy executives, students, and patients needing discreet, zero-interruption care.',
      cardBg: 'bg-linear-to-b from-[#F0F8FD] to-white',
      borderColor: 'border-[#CBD5E1]'
    },
    { 
      id: 'WEEKEND', 
      label: 'Long Weekend (3 – 5 Days)', 
      tag: 'Most Popular',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      deskWork: 'Take procedure on Thursday/Friday, return to work Monday',
      socialReadiness: 'Mild tenderness subsiding; confident in routine clothing',
      idealFor: 'Gynecomastia, Liposuction, and Rhinoplasty patients desiring seamless weekend timing.',
      cardBg: 'bg-linear-to-b from-[#F0F8FD] to-white',
      borderColor: 'border-[#CBD5E1]'
    },
    { 
      id: 'FULL_WEEK', 
      label: 'Comprehensive Remodeling (7 – 10 Days)', 
      tag: 'Complete Healing',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      deskWork: 'Dedicated 7 to 10 days of restful recuperation',
      socialReadiness: 'External splints/dressings removed by Day 7; full social confidence',
      idealFor: 'Structural Facelifts, Tummy Tucks, and Mommy Makeovers for optimal long-term longevity.',
      cardBg: 'bg-linear-to-b from-[#F0F8FD] to-white',
      borderColor: 'border-[#CBD5E1]'
    }
  ];

  // Matched procedure resolution
  const getMatchedProcedure = () => {
    const found = proceduresData.find(p => p.slug === selectedGoal);
    if (found) return found;

    if (selectedArea === 'CHEST') return proceduresData.find(p => p.slug === 'gynecomastia') || proceduresData[1];
    if (selectedArea === 'BODY') return proceduresData.find(p => p.slug === 'liposuction') || proceduresData[2];
    if (selectedArea === 'SKIN') return proceduresData.find(p => p.slug === 'scar-revision') || proceduresData[3];
    return proceduresData[0]; // Default rhinoplasty
  };

  const matched = getMatchedProcedure();

  const handleReset = () => {
    setStep(1);
    setSelectedArea('');
    setSelectedGoal('');
    setSelectedDowntime('');
  };

  const areaLabelMap: Record<string, string> = {
    FACE: 'Face & Neck Aesthetics',
    CHEST: 'Chest & Breast Contouring',
    BODY: 'Body Sculpting & Liposuction',
    SKIN: 'Skin, Scars & Reconstructive'
  };

  const currentGoalOption = getGoalOptions().find(g => g.id === selectedGoal);

  return (
    <section id="procedure-matcher-quiz" className="py-12 sm:py-16 bg-gradient-to-b from-[#EEF4F9] via-[#F4F8FB] to-[#F8FAFC] relative overflow-hidden border-b border-[#CBD5E1]">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Rich Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Personalized Procedure Selection
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Find Your Recommended <span className="italic text-[#00A3E0] font-normal">Surgical Plan.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Select your anatomical zone and transformation goals. Receive an immediate clinical protocol based on <strong className="text-[#003366] font-semibold">Dr. R. K. Mishra’s</strong> 25+ years of plastic surgery expertise.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-3 max-w-lg mx-auto">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300/50">
              <div 
                className="h-full bg-gradient-to-r from-[#003366] to-[#00A3E0] rounded-full transition-all duration-500 ease-out"
                style={{ width: step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '100%' }}
              />
            </div>

            <div className="grid grid-cols-4 text-center text-xs sm:text-sm font-semibold text-slate-500 mt-2.5">
              <span className={step >= 1 ? 'text-[#003366] font-bold' : ''}>1. Target Zone</span>
              <span className={step >= 2 ? 'text-[#003366] font-bold' : ''}>2. Desired Goal</span>
              <span className={step >= 3 ? 'text-[#003366] font-bold' : ''}>3. Recovery Window</span>
              <span className={step >= 4 ? 'text-[#003366] font-bold' : ''}>4. Recommendation</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: TARGET ANATOMICAL ZONE (Rich, Multi-Element Interactive Cards) */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                  Step 1 of 3
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">
                  Select the anatomical area you want to enhance
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Click any card to proceed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areaOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedArea === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedArea(opt.id);
                      setStep(2);
                    }}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E1F0FA] to-white border-2 border-[#003366] shadow-md ring-2 ring-[#003366]/20'
                        : 'bg-gradient-to-b from-white to-[#F6FAFD] border-[#CBD5E1] hover:border-[#003366] hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      {/* Top Bar inside Card */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl ${opt.accentBg} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                            <Icon className="w-5 h-5 stroke-[2]" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-tight">
                              {opt.label}
                            </h4>
                            <span className="text-xs text-slate-500 font-medium">
                              {opt.subtitle}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
                          {opt.countBadge}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5 font-normal">
                        {opt.description}
                      </p>

                      {/* Real Procedure Tags inside Card */}
                      <div className="flex flex-wrap gap-1.5 pt-1 pb-2">
                        {opt.procedures.map((proc, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[#003366] shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mr-1.5" />
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 mt-1 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-bold text-[#003366]">
                      <span className="group-hover:text-[#00A3E0] transition-colors">Select This Zone</span>
                      <div className="w-6 h-6 rounded-full bg-[#003366] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: PRIMARY GOAL (Structured 2-Column Responsive Matrix) */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                  Step 2 of 3 • {areaLabelMap[selectedArea]}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">
                  What is your primary surgical objective?
                </h3>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-[#003366] py-1 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors self-start sm:self-auto cursor-pointer"
              >
                ← Change Zone
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {getGoalOptions().map((opt) => {
                const isSelected = selectedGoal === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedGoal(opt.id);
                      setStep(3);
                    }}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E1F0FA] to-white border-2 border-[#003366] shadow-md ring-2 ring-[#003366]/20'
                        : 'bg-gradient-to-b from-white to-[#F8FAFD] border-[#CBD5E1] hover:border-[#003366] hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      {/* Top Labels */}
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <span className="font-bold uppercase tracking-wider text-[#003366]">
                          {opt.targetTag}
                        </span>
                        <span className="font-semibold text-emerald-700">
                          {opt.satisfaction}
                        </span>
                      </div>

                      {/* Goal Title */}
                      <h4 className="text-sm sm:text-base font-bold text-[#003366] group-hover:text-[#00A3E0] transition-colors leading-snug mb-1.5">
                        {opt.label}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        {opt.description}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                        <span>Surgical Time: {opt.typicalTime}</span>
                      </span>
                      <span className="font-bold text-[#003366] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>Select</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: RECOVERY WINDOW & TIMELINE (3 Rich Clinical Timeline Cards) */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                  Step 3 of 3 • Recovery Profile
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#003366]">
                  What recovery window aligns with your schedule?
                </h3>
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-600 hover:text-[#003366] py-1 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors self-start sm:self-auto cursor-pointer"
              >
                ← Back to Goals
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {downtimeOptions.map((opt) => {
                const isSelected = selectedDowntime === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedDowntime(opt.id);
                      setStep(4);
                    }}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E1F0FA] to-white border-2 border-[#003366] shadow-md ring-2 ring-[#003366]/20'
                        : `${opt.cardBg} ${opt.borderColor} hover:border-[#003366] hover:shadow-md hover:-translate-y-0.5`
                    }`}
                  >
                    <div>
                      {/* Top Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                          {opt.tag}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#003366] text-white flex items-center justify-center">
                          <Clock className="w-4 h-4 text-[#00A3E0]" />
                        </div>
                      </div>

                      {/* Header */}
                      <h4 className="text-base font-bold text-[#003366] mb-2 leading-tight">
                        {opt.label}
                      </h4>

                      {/* Concrete Details */}
                      <div className="space-y-2 text-xs text-slate-600 mb-4">
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="text-xs uppercase font-bold text-[#003366] block">
                            Work Clearance
                          </span>
                          <p className="text-xs leading-relaxed text-slate-700">
                            {opt.deskWork}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="text-xs uppercase font-bold text-[#003366] block">
                            Social Discretion
                          </span>
                          <p className="text-xs leading-relaxed text-slate-700">
                            {opt.socialReadiness}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 italic leading-relaxed">
                        "{opt.idealFor}"
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#003366]">
                      <span>Calculate Clinical Plan</span>
                      <div className="w-6 h-6 rounded-full bg-[#003366] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CLINICAL RECOMMENDATION (High-Density Executive Medical Suite) */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="space-y-4">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>98% Candidacy Match Found</span>
                </span>
                <span className="text-xs text-slate-500 font-semibold hidden md:inline">
                  • Based on your selections for {areaLabelMap[selectedArea]}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-[#003366] transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start New Assessment</span>
              </button>
            </div>

            {/* Main Clinical Recommendation Card */}
            <div className="rounded-3xl border-2 border-[#003366]/20 bg-gradient-to-br from-white via-[#F8FAFD] to-[#EDF4F9] shadow-lg p-5 sm:p-7 overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left: Clinical Specs & Reasoning (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Category & Hospital OT Tag */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                      {matched.category} Plastic Surgery
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600">
                      SIPS Hospital Laminar Airflow Suite
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366] leading-tight">
                      {matched.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#00A3E0] mt-0.5">
                      {matched.subtitle}
                    </p>
                  </div>

                  {/* Doctor's Rationale Box */}
                  <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#003366]">
                      <Info className="w-3.5 h-3.5 text-[#00A3E0]" />
                      <span>Dr. R. K. Mishra’s Clinical Rationale:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {currentGoalOption
                        ? `For patients seeking "${currentGoalOption.label}", Dr. Mishra employs structural preservation techniques with micro-incisions to deliver permanent, natural balance while minimizing tissue disruption.`
                        : matched.shortDesc
                      }
                    </p>
                  </div>

                  {/* 4 Clinical Specification Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs text-center">
                      <span className="text-xs text-slate-500 uppercase font-bold block mb-0.5">Surgical Time</span>
                      <span className="text-sm font-bold text-[#003366]">{matched.duration}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs text-center">
                      <span className="text-xs text-slate-500 uppercase font-bold block mb-0.5">Anesthesia</span>
                      <span className="text-sm font-bold text-[#003366] truncate block" title={matched.anesthesiaType}>
                        {matched.anesthesiaType.includes('Local') ? 'Local / Tumescent' : 'General'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs text-center">
                      <span className="text-xs text-slate-500 uppercase font-bold block mb-0.5">Hospital Stay</span>
                      <span className="text-sm font-bold text-[#003366]">{matched.hospitalStay.split('(')[0]}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-2xs text-center">
                      <span className="text-xs text-slate-500 uppercase font-bold block mb-0.5">Estimated Cost</span>
                      <span className="text-sm font-bold text-[#003366]">{matched.costRange.split('–')[0]}</span>
                    </div>
                  </div>

                  {/* Highlights / Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs font-semibold text-slate-500 mr-1">Key Focus:</span>
                    {matched.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Procedure Image & Action CTAs (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] border border-[#CBD5E1] shadow-sm bg-white relative">
                    <img
                      src={matched.image}
                      alt={matched.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#001D3D]/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-white flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">0% Interest Medical EMI</span>
                      <span className="text-[#00A3E0] font-bold">From ₹3,200/mo</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => onNavigate('book-consultation')}
                      className="w-full py-3.5 px-5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md border border-[#003366] hover:border-[#00A3E0] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#00A3E0]" />
                      <span>Book Consultation with Dr. Mishra</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigate(`procedure-${matched.slug}`)}
                        className="py-3 px-4 rounded-xl bg-white border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-xs sm:text-sm font-bold transition-all text-center cursor-pointer"
                      >
                        Clinical Details
                      </button>

                      <a
                        href="tel:+919415023675"
                        className="py-3 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 hover:border-[#003366] hover:text-[#003366] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 text-center"
                      >
                        <PhoneCall className="w-4 h-4 text-[#00A3E0]" />
                        <span>Helpline</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Assurance Bar */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>SIPS Hospital NABH Super-Specialty Protocol • 100% Confidential Consultation</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Direct evaluation by Dr. R. K. Mishra (M.Ch KGMC)
                </span>
              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
};
