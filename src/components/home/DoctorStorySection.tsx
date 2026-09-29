import React from 'react';
import { ShieldCheck, Building2, HeartHandshake, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface DoctorStorySectionProps {
  onNavigate: (route: string) => void;
}

export const DoctorStorySection: React.FC<DoctorStorySectionProps> = ({ onNavigate }) => {
  const professionalRoles = [
    {
      title: 'ASPS Board Certified Plastic Surgeon',
      subtitle: 'American Society of Plastic Surgeons',
      icon: Award,
      badge: 'International Board Certified'
    },
    {
      title: 'Managing Director & Head of Plastic Surgery Dept.',
      subtitle: 'SIPS Super Specialty Hospital (Pvt. Ltd.)',
      icon: Building2,
      badge: 'Clinical Leadership'
    },
    {
      title: 'Secretary, SRRE Welfare Society',
      subtitle: 'Reconstructive Healthcare & Patient Welfare',
      icon: HeartHandshake,
      badge: 'Societal Leadership'
    },
    {
      title: 'Project Director, Smile Train (USA)',
      subtitle: 'Comprehensive Cleft Care & Facial Restoration',
      icon: ShieldCheck,
      badge: 'Humanitarian Care'
    }
  ];

  return (
    <section id="about-doctor" className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Luxury Clinic & Hospital Facility Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E2E8F0] group bg-slate-900">
              <img
                src="/assets/clinic_reception.jpg"
                alt="SIPS Super Specialty Hospital (Pvt. Ltd.) Reception & Surgical Suites"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#003366] text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>SIPS Hospital Facility</span>
                </span>
              </div>

              {/* Bottom Credential Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">SIPS Super Specialty Hospital (Pvt. Ltd.)</p>
                <p className="text-base font-bold text-white mt-0.5">World-Class Laminar Airflow Operating Suites</p>
                <p className="text-xs text-slate-300 mt-1">NABH Accredited • 29 Shah Mina Road, Chowk, Lucknow</p>
              </div>
            </div>

            {/* Quick Badge summary */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs text-[#003366] font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> 25+ Years Exp
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> 30,000+ Surgeries
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> ASPS Certified
              </span>
            </div>
          </div>

          {/* Right: Editorial Story & Professional Roles & Affiliations (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00A3E0] uppercase block">
                About Us • Dr. R.K. Mishra
              </span>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.14]">
                Where Surgical Precision Meets <br />
                <span className="italic text-[#00A3E0] font-normal">Aesthetic Artistry.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              At <strong>My Cosmetic Surgery</strong>, world-class aesthetic and reconstructive plastic surgery is directed by <strong className="text-[#003366]">Dr. R.K. Mishra</strong>, an ASPS Board Certified Plastic Surgeon with over 25 years of surgical excellence and 30,000+ completed procedures. We combine meticulous anatomical precision with individualized artistic vision.
            </p>

            {/* Professional Roles & Affiliations Highlight */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#003366] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00A3E0]" />
                  <span>Professional Roles &amp; Affiliations of Dr. R.K. Mishra</span>
                </h3>
                <span className="text-[11px] font-bold text-[#00A3E0] bg-[#E0F2FE] px-2.5 py-0.5 rounded-full">
                  Official Credentials
                </span>
              </div>

              {/* 4 Professional Roles Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {professionalRoles.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.title}
                      className="p-3.5 sm:p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#00A3E0]/50 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#E0F2FE] border border-[#00A3E0]/30 flex items-center justify-center shrink-0 text-[#003366] group-hover:scale-105 transition-transform">
                          <Icon className="w-4.5 h-4.5 stroke-[1.8] text-[#003366]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug group-hover:text-[#003366] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00A3E0]">
                          {item.badge}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E0]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('doctor-credentials');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('doctor');
                }}
                className="btn-navy py-3 px-6 text-sm flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>View Full Credentials & Timeline</span>
                <ArrowRight className="w-4 h-4 text-[#00A3E0]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('consultation');
                }}
                className="btn-outline-navy py-3 px-6 text-sm cursor-pointer"
              >
                <span>Book In-Person / Virtual OPD</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
