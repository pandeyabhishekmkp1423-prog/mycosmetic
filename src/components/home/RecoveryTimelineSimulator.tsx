import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  Smile, 
  Dumbbell, 
  ShieldAlert, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RecoveryTimelineSimulatorProps {
  onNavigate: (route: string) => void;
}

interface ProcedureTimeline {
  id: string;
  name: string;
  milestones: {
    dayLabel: string;
    dayNum: number;
    title: string;
    status: string;
    painLevel: string;
    workStatus: string;
    exerciseStatus: string;
    socialStatus: string;
    description: string;
    doctorTip: string;
  }[];
}

export const RecoveryTimelineSimulator: React.FC<RecoveryTimelineSimulatorProps> = ({ onNavigate }) => {
  const [selectedProc, setSelectedProc] = useState<string>('rhinoplasty');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2); // Default to Day 7 (most important milestone)

  const timelines: ProcedureTimeline[] = [
    {
      id: 'rhinoplasty',
      name: 'Preservation Rhinoplasty',
      milestones: [
        {
          dayLabel: 'Day 1',
          dayNum: 1,
          title: 'Immediate Post-Operative Rest',
          status: 'Resting & Initial Recovery',
          painLevel: '2 / 10 (Mild discomfort, nasal congestion)',
          workStatus: 'Complete rest at home or SIPS suite',
          exerciseStatus: 'Gentle indoor walking only',
          socialStatus: 'Nasal splint in place',
          description: 'You will rest with your head elevated on pillows. Cold compresses help minimize initial eyelid puffiness. Oral pain medication keeps you very comfortable.',
          doctorTip: 'Sleep elevated at 30–45 degrees. Avoid nose blowing or wearing heavy resting eyeglasses.'
        },
        {
          dayLabel: 'Day 3',
          dayNum: 3,
          title: 'Swelling Peak & Beginning of Subsidence',
          status: 'Tissue Stabilization',
          painLevel: '1.5 / 10 (Noticeable relief, minimal soreness)',
          workStatus: 'Can perform light laptop work from bed',
          exerciseStatus: 'Casual walking around the home',
          socialStatus: 'Light bruising around cheeks/eyes fading',
          description: 'Facial swelling stabilizes and begins rapid clearance. Normal diet is easily tolerated and breathing through the mouth improves.',
          doctorTip: 'Maintain gentle saline nasal mists as prescribed to keep internal membranes moist.'
        },
        {
          dayLabel: 'Day 7',
          dayNum: 7,
          title: 'Splint Removal & Major Social Milestone',
          status: 'Return to Work Clearance',
          painLevel: '0.5 / 10 (Virtually zero pain)',
          workStatus: 'Safe to return to office / desk work',
          exerciseStatus: 'Brisk walking, avoid heavy weights',
          socialStatus: 'External splint removed, ready for social settings',
          description: 'Dr. Mishra painlessly removes your external protective thermoplastic splint. 70% of swelling is already resolved and your new profile is clearly visible!',
          doctorTip: 'Be gentle when washing your face. Skin over the nasal bridge will continue softening over the coming weeks.'
        },
        {
          dayLabel: 'Day 14',
          dayNum: 14,
          title: 'Bruising Completely Cleared',
          status: 'Active Healing & Routine Resumption',
          painLevel: '0 / 10 (No pain)',
          workStatus: 'Full normal working schedule',
          exerciseStatus: 'Light cardio, treadmill & cycling permitted',
          socialStatus: 'Completely natural appearance to colleagues',
          description: 'Any residual faint yellowish bruising has completely dissipated. Colleagues and friends simply notice that you look refreshed and harmonious.',
          doctorTip: 'Wear SPF 50+ mineral sunscreen daily to prevent sun-induced hyperpigmentation on the healing nose.'
        },
        {
          dayLabel: 'Month 1',
          dayNum: 30,
          title: '85% Contour Refinement',
          status: 'Full Physical Clearance',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted travel, flights & meetings',
          exerciseStatus: 'Full gym workouts, running & swimming',
          socialStatus: 'Flawless photograph and video appearance',
          description: 'Tissues have strongly knitted. The nasal tip is softening and anatomical definition along the nasal dorsum is crisp and elegant.',
          doctorTip: 'You may now resume wearing regular prescription eyeglasses and sunglasses without risk.'
        },
        {
          dayLabel: 'Month 6',
          dayNum: 180,
          title: 'Permanent High-Definition Result',
          status: 'Mature Surgical Masterpiece',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Full contact sports permitted',
          socialStatus: 'Lifelong natural refinement',
          description: 'Micro-swelling has fully subsided. Cartilage grafts have solidified into permanent harmony with your natural facial proportions.',
          doctorTip: 'Enjoy your lifelong natural transformation! Dr. Mishra offers complimentary 6-month checkups.'
        }
      ]
    },
    {
      id: 'gynecomastia',
      name: 'Gynecomastia (Male Chest)',
      milestones: [
        {
          dayLabel: 'Day 1',
          dayNum: 1,
          title: 'Compression Vest & Rest',
          status: 'Daycare Recovery',
          painLevel: '2 / 10 (Soreness similar to a heavy chest workout)',
          workStatus: 'Resting comfortably at home',
          exerciseStatus: 'Gentle mobility',
          socialStatus: 'Medical vest worn under loose shirt',
          description: 'Discharged on the same day with a custom-fitted medical compression garment. Soreness feels like post-workout chest fatigue.',
          doctorTip: 'Wear your compression garment continuously. It protects the flat pectoral contour.'
        },
        {
          dayLabel: 'Day 3',
          dayNum: 3,
          title: 'Mobility & Normal Routine',
          status: 'Rapid Healing',
          painLevel: '1 / 10 (Mild tightness)',
          workStatus: 'Comfortable working from home on computer',
          exerciseStatus: 'Gentle walks',
          socialStatus: 'Undetectable under regular casual clothing',
          description: 'Arm movement is comfortable. You can shower after 48 hours and resume light household tasks without strain.',
          doctorTip: 'Keep arms below shoulder height when lifting objects to avoid pectoral tension.'
        },
        {
          dayLabel: 'Day 7',
          dayNum: 7,
          title: 'Office Return & Stitches Review',
          status: 'Back to Professional Life',
          painLevel: '0 / 10',
          workStatus: 'Full return to office, driving & daily duties',
          exerciseStatus: 'Brisk walking, lower-body workouts',
          socialStatus: 'Shirts fit with masculine, flat projection',
          description: 'Micro-incisions around the areola border are virtually invisible. Swelling has fallen dramatically, revealing a masculine, flat chest.',
          doctorTip: 'Continue wearing the slim compression vest underneath shirts for optimal skin contraction.'
        },
        {
          dayLabel: 'Day 14',
          dayNum: 14,
          title: 'Resuming Active Lifestyle',
          status: 'Substantial Resolution',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Jogging, leg workouts & light dumbbells',
          socialStatus: 'Complete freedom to wear fitted T-shirts',
          description: 'Skin has tightly adhered to the chest wall. You can confidently wear slim-fit shirts and polo tees without nipple puffiness.',
          doctorTip: 'Gentle pectoral massage with moisturizer helps soften subcutaneous healing layers.'
        },
        {
          dayLabel: 'Month 1',
          dayNum: 30,
          title: 'Full Gym Clearance',
          status: 'Chest Workouts Resumed',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Full bench press, pushups & upper body gym',
          socialStatus: 'Confidently shirtless at beach or pool',
          description: 'You are completely cleared to resume heavy chest pressing, swimming, and competitive sports. Permanent glandular removal ensures no recurrence.',
          doctorTip: 'Build your pectoral muscles with weight training to highlight your sculpted athletic chest.'
        },
        {
          dayLabel: 'Month 6',
          dayNum: 180,
          title: 'Permanent Sculpted Chest Contour',
          status: 'Lifelong Athletic Result',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Unrestricted',
          socialStatus: 'Unrestricted confidence',
          description: 'Scar lines are microscopic and camouflaged at the pigmented areolar rim. Permanent masculine transformation is complete.',
          doctorTip: 'Glandular tissue cannot regrow. Maintain healthy body weight for lifetime aesthetic excellence.'
        }
      ]
    },
    {
      id: 'vaser_lipo',
      name: 'VASER 4D Liposuction',
      milestones: [
        {
          dayLabel: 'Day 1',
          dayNum: 1,
          title: 'Fluid Drainage & Compression',
          status: 'Same-day / Overnight Stay',
          painLevel: '2.5 / 10 (Muscular stiffness, like marathon soreness)',
          workStatus: 'Bed rest with compression garment',
          exerciseStatus: 'Frequent gentle walking every 2 hours',
          socialStatus: 'Full compression garment worn',
          description: 'Ultrasound VASER gently emulsified stubborn fat without damaging blood vessels. Mild fluid weeping is normal and beneficial for rapid healing.',
          doctorTip: 'Drink plenty of water and electrolytes to stay hydrated as fluids rebalance.'
        },
        {
          dayLabel: 'Day 3',
          dayNum: 3,
          title: 'Peak Drainage & Mobilization',
          status: 'Early Contouring',
          painLevel: '1.5 / 10 (Tender to touch)',
          workStatus: 'Desk work from home',
          exerciseStatus: 'Active indoor walking',
          socialStatus: 'Under-garment concealed beneath clothing',
          description: 'Drainage stops. You can shower and put on a fresh compression garment. Mobility is smooth and posture feels natural.',
          doctorTip: 'Consistent compression garment usage is the key to sculpting athletic waistlines.'
        },
        {
          dayLabel: 'Day 7',
          dayNum: 7,
          title: 'Return to Office Work',
          status: 'Social Normalcy',
          painLevel: '0.5 / 10',
          workStatus: 'Full return to office & regular commutes',
          exerciseStatus: 'Brisk walking on treadmill',
          socialStatus: 'Waistline is noticeably slimmer and tighter',
          description: 'Swelling has begun dropping rapidly. Your clothes already fit noticeably looser around the waist, flanks, and lower back.',
          doctorTip: 'Begin manual lymphatic drainage massages to accelerate swelling absorption.'
        },
        {
          dayLabel: 'Day 14',
          dayNum: 14,
          title: 'Visible Silhouette Transformation',
          status: 'Active Slimming',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted travel & work',
          exerciseStatus: 'Cycling, yoga, light cardio',
          socialStatus: 'Significant inch loss noticeable',
          description: 'Bruising is gone. The skin retraction effect of VASER ultrasound technology begins showing sharp, tapered curves and abdominal flattening.',
          doctorTip: 'Switch to a lighter stage-2 compression garment as recommended by Dr. Mishra.'
        },
        {
          dayLabel: 'Month 1',
          dayNum: 30,
          title: '80% High-Definition Result',
          status: 'Full Athletic Activity',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Full gym, weightlifting & swimming',
          socialStatus: 'Dramatically sculpted silhouette',
          description: 'Tissues have settled into the athletic abdominal lines and waist contours sculpted by Dr. Mishra. Fat cells removed are permanently gone.',
          doctorTip: 'Maintain regular hydration and a balanced protein-rich diet to support muscular definition.'
        },
        {
          dayLabel: 'Month 6',
          dayNum: 180,
          title: 'Permanent High-Definition Sculpting',
          status: 'Final Skin Tightening',
          painLevel: '0 / 10',
          workStatus: 'Unrestricted',
          exerciseStatus: 'Unrestricted',
          socialStatus: 'Permanent athletic transformation',
          description: 'Maximum skin retraction and definition achieved. Micro-puncture marks are virtually invisible.',
          doctorTip: 'Enjoy your lifetime contoured physique!'
        }
      ]
    }
  ];

  const currentTimeline = timelines.find(t => t.id === selectedProc) || timelines[0];
  const activeMilestone = currentTimeline.milestones[activeStepIndex];

  return (
    <section id="recovery-timeline-simulator" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-[#E2E8F0]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Realistic Healing & Downtime Clarity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight">
            Day-by-Day Recovery Simulator
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Wondering when you can return to work, when swelling resolves, or when results look natural? Explore realistic milestone timelines based on Dr. R. K. Mishra’s gentle surgical protocols.
          </p>

          {/* Procedure Selector Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            {timelines.map((proc) => (
              <button
                key={proc.id}
                onClick={() => {
                  setSelectedProc(proc.id);
                  setActiveStepIndex(2); // Reset to Day 7
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedProc === proc.id
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white hover:text-[#003366]'
                }`}
              >
                {proc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Timeline Track */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Day Milestone Scrubber Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {currentTimeline.milestones.map((m, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={m.dayLabel}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-[#003366] text-white border-[#003366] shadow-md scale-105'
                      : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#00A3E0] hover:text-[#003366]'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-[#00A3E0]' : 'text-[#64748B]'}`}>
                    Milestone
                  </span>
                  <span className="text-sm sm:text-base font-bold mt-0.5">
                    {m.dayLabel}
                  </span>
                  <span className={`text-[10px] line-clamp-1 mt-1 font-medium ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {idx === 2 ? '★ Back to Work' : m.status.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Detailed Content */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Narrative & Status */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 bg-[#00A3E0]/10 text-[#003366] font-bold uppercase rounded-md border border-[#00A3E0]/20 text-[10px]">
                  {currentTimeline.name}
                </span>
                <span className="text-[#64748B]">• {activeMilestone.dayLabel} Milestone</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
                {activeMilestone.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {activeMilestone.description}
              </p>

              {/* Surgeon Clinical Tip */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border-l-4 border-[#00A3E0] text-xs space-y-1">
                <p className="font-bold text-[#003366] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Dr. R. K. Mishra's Surgical Recovery Guidance:</span>
                </p>
                <p className="text-[#475569] italic pl-5">
                  "{activeMilestone.doctorTip}"
                </p>
              </div>
            </div>

            {/* Right: Real-life readiness matrix */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0] space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366] pb-2 border-b border-[#E2E8F0]">
                Daily Activity Clearance Matrix
              </h4>

              {/* Pain Level */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Comfort & Pain Score</span>
                  <span className="font-semibold text-[#1E293B]">{activeMilestone.painLevel}</span>
                </div>
              </div>

              {/* Work Status */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center shrink-0 border border-blue-200">
                  <Briefcase className="w-4 h-4 text-[#00A3E0]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Work Readiness</span>
                  <span className="font-semibold text-[#1E293B]">{activeMilestone.workStatus}</span>
                </div>
              </div>

              {/* Social Appearance */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Social & Public Discretion</span>
                  <span className="font-semibold text-[#1E293B]">{activeMilestone.socialStatus}</span>
                </div>
              </div>

              {/* Exercise Status */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Physical Exercise</span>
                  <span className="font-semibold text-[#1E293B]">{activeMilestone.exerciseStatus}</span>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="btn-crimson w-full justify-center py-2.5 text-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Discuss Your Recovery Schedule</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
