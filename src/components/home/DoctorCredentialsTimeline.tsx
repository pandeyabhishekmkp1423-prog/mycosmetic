import React, { useState } from 'react';
import { 
  Award, 
  GraduationCap, 
  Globe, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface DoctorCredentialsTimelineProps {
  onNavigate: (route: string) => void;
}

interface Milestone {
  year: string;
  title: string;
  institution: string;
  location: string;
  highlight: string;
  details: string;
}

export const DoctorCredentialsTimeline: React.FC<DoctorCredentialsTimelineProps> = ({ onNavigate }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(1);

  const milestones: Milestone[] = [
    {
      year: '1997',
      title: 'MBBS & MS General Surgery',
      institution: 'Premier State Medical University',
      location: 'India',
      highlight: 'Surgical Foundations',
      details: 'Rigorous 6-year foundational training in delicate tissue handling, anatomical dissection, and acute surgical decision-making.'
    },
    {
      year: '2000',
      title: 'M.Ch Plastic & Reconstructive Surgery',
      institution: 'King George’s Medical College (KGMC)',
      location: 'Lucknow, India',
      highlight: 'Apex Qualification',
      details: 'Conferred super-specialty Master of Chirurgiae (M.Ch) in Plastic Surgery from North India’s most prestigious medical institution.'
    },
    {
      year: '2004',
      title: 'Dallas Rhinoplasty Symposium',
      institution: 'UT Southwestern Medical Center',
      location: 'Dallas, Texas, USA',
      highlight: 'US Fellowship',
      details: 'Trained under global masters of structural rhinoplasty, mastering preservation techniques and autologous rib/septal cartilage grafting.'
    },
    {
      year: '2008',
      title: 'Aesthetic Facial Fellowship',
      institution: 'NYU Langone Medical Center',
      location: 'New York, USA',
      highlight: 'Facial Mastery',
      details: 'Advanced clinical observership in deep-plane facelifts, structural blepharoplasty, and composite facial tissue repositioning.'
    },
    {
      year: '2012',
      title: 'Micro-Vascular Reconstruction Training',
      institution: 'Chang Gung Memorial Hospital',
      location: 'Taipei, Taiwan',
      highlight: 'Micro-Surgical Craft',
      details: 'Specialized in ultra-precise micro-vascular surgery, nerve reconstruction, and complex tissue transfers at the world-renowned center.'
    },
    {
      year: 'Present',
      title: 'Senior Surgeon & Department Head',
      institution: 'Sushrut Institute of Plastic Surgery (SIPS)',
      location: 'Lucknow, India',
      highlight: '30,000+ Surgeries',
      details: 'Over 25 years of relentless surgical commitment, establishing SIPS Hospital Chowk as Uttar Pradesh’s leading aesthetic and reconstructive center.'
    }
  ];

  const active = milestones[selectedMilestone];

  return (
    <section id="doctor-credentials-timeline" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Surgical Heritage & Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight">
            25+ Years of Surgical Mastery
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Dr. R. K. Mishra’s clinical philosophy combines rigorous academic qualification from KGMC Lucknow with international fellowships from the United States and Asia.
          </p>
        </div>

        {/* Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {milestones.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <button
                key={m.year}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-[#003366] text-white border-[#003366] shadow-md scale-105'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#00A3E0] hover:text-[#003366]'
                }`}
              >
                <span className={`text-lg font-bold font-serif ${isSelected ? 'text-[#00A3E0]' : 'text-[#003366]'}`}>
                  {m.year}
                </span>
                <span className="text-xs font-bold mt-1 line-clamp-1">
                  {m.highlight}
                </span>
                <span className={`text-[10px] mt-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {m.location}
                </span>
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-[#00A3E0]/10 text-[#003366] font-bold uppercase rounded-md border border-[#00A3E0]/20 text-[10px]">
                {active.year} • {active.highlight}
              </span>
              <span className="text-[#64748B]">• {active.location}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
              {active.title}
            </h3>

            <p className="text-sm font-semibold text-[#00A3E0]">
              {active.institution}
            </p>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {active.details}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('doctor')}
                className="btn-navy py-2.5 px-4 text-xs"
              >
                <span>Read Full Biography</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-crimson py-2.5 px-4 text-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Consult with Dr. Mishra</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00A3E0] shrink-0">
                <img
                  src="/hero.png"
                  alt="Dr. R. K. Mishra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#003366]">Dr. R. K. Mishra</h4>
                <p className="text-[11px] text-[#00A3E0] font-medium">M.Ch Plastic Surgery (KGMC)</p>
                <p className="text-[10px] text-slate-400">25+ Yrs Exp • 30,000+ Surgeries</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>Member: Association of Plastic Surgeons of India (APSI)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>Member: Indian Association of Aesthetic Plastic Surgeons (IAAPS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>Senior Consultant at SIPS Super Specialty Hospital</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
