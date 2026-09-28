import React, { useState } from 'react';
import { 
  Calendar, 
  Award, 
  Users, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Clock,
  Star,
  Activity,
  PhoneCall,
  Check,
  ArrowUpRight
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [activeConcern, setActiveConcern] = useState<string>('rhinoplasty');

  // Interactive Quick Concerns for Instant User Engagement
  const concerns = [
    { id: 'rhinoplasty', label: 'Nose & Breathing', slug: 'rhinoplasty', icon: '👃', badge: 'Signature' },
    { id: 'gynecomastia', label: 'Male Chest (Gynecomastia)', slug: 'gynecomastia', icon: '🏋️', badge: 'Daycare' },
    { id: 'liposuction', label: 'VASER 360° Liposuction', slug: 'liposuction', icon: '✨', badge: 'HD Sculpt' },
    { id: 'facelift', label: 'SMAS Deep-Plane Facelift', slug: 'facelift', icon: '⏳', badge: 'Anti-Aging' },
    { id: 'blepharoplasty', label: 'Eyelid & Eye Bags', slug: 'blepharoplasty', icon: '👁️', badge: 'Outpatient' },
    { id: 'mommy-makeover', label: 'Mommy Makeover', slug: 'mommy-makeover', icon: '👶', badge: 'Restore' },
    { id: 'scar-revision', label: 'Scar & Keloid Correction', slug: 'scar-revision', icon: '🩹', badge: 'Micro-Surgery' }
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-gradient-to-b from-[#F0F6FA] via-[#F6FAFD] to-[#F8FAFC] overflow-hidden border-b border-[#CBD5E1]">
      
      {/* Background Architectural Grid & Subtle Luminous Glows */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#00A3E0]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-[#003366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Badges & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Trust Eyebrow */}
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#003366]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">OPD Active Today</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">SIPS Super Specialty Hospital, Lucknow</span>
            </div>

            {/* Main Headline with Rich Editorial Rhythm */}
            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-editorial font-bold text-[#003366] tracking-tight leading-[1.08]">
              Revamping Your Looks.<br />
              <span className="italic text-[#00A3E0] font-normal">
                Refining Your Confidence.
              </span>
            </h1>

            {/* Editorial Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Super-specialty plastic, cosmetic & reconstructive surgery led by senior plastic surgeon <strong className="text-[#003366] font-semibold">Dr. R. K. Mishra</strong> (25+ Years Experience, 30,000+ Surgeries) at NABH Accredited SIPS Hospital, Lucknow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://mycosmeticsurgery.in/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-book-consultation-btn"
                className="btn-navy text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md cursor-pointer flex items-center gap-2 group hover:scale-[1.02] transition-transform font-semibold text-white"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                <span>Book In-Person Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('procedure-matcher-quiz');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3.5 px-5 rounded-xl bg-white border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-sm sm:text-base font-bold shadow-xs cursor-pointer flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                <span>Procedure Matcher</span>
              </button>

              <button
                onClick={() => onNavigate('procedures')}
                className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>Browse All</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Interactive "Explore by Surgical Concern" Quick-Launch Pill Bar */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block mb-2">
                Quick Explore by Concern:
              </span>
              <div className="flex flex-wrap gap-2">
                {concerns.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(`procedure-${item.slug}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#003366] text-slate-700 hover:text-white border border-[#CBD5E1] hover:border-[#003366] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Credentials Metrics Row */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">25+ Yrs</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Surgical Exp</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">30,000+</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Surgeries Done</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">NABH SIPS</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Super-Specialty</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#003366] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#003366] leading-none">Class-100</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Laminar OTs</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Aesthetic Photography with Floating Credential Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              
              {/* Outer Glowing Decorative Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#003366] to-[#00A3E0] rounded-[32px] blur-md opacity-20 group-hover:opacity-40 transition-opacity" />

              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#003366]/20 bg-white relative group">
                <img 
                  src="/hero.png" 
                  alt="Dr. R. K. Mishra - Senior Plastic Surgeon, SIPS Hospital Lucknow" 
                  className="w-full h-auto object-cover object-top aspect-[3/4] group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Bottom Overlay Verified Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        RM
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#003366]">Dr. R. K. Mishra</div>
                        <div className="text-xs text-[#00A3E0] font-semibold">M.Ch Senior Plastic Surgeon (KGMC)</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-500 flex items-center justify-end gap-1">
                        <span>★ 4.9</span>
                        <span className="text-slate-500 font-medium text-xs">(850+ reviews)</span>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">30,000+ Surgeries</div>
                    </div>
                  </div>

                  {/* Micro Quick Inclusions */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Zero Factory-Line
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Dallas / NYU Fellow
                    </span>
                    <span className="text-[#003366] font-bold hover:underline cursor-pointer" onClick={() => onNavigate('doctor')}>
                      Full Profile →
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};