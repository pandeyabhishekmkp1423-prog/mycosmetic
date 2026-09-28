import React from 'react';
import { 
  GraduationCap, 
  Globe2, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Building2 
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface DoctorViewProps {
  onNavigate: (route: string) => void;
}

export const DoctorView: React.FC<DoctorViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">About Dr. R. K. Mishra</span>
      </div>

      {/* Main Profile Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Surgeon Image & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-md border border-[#E2E8F0] bg-slate-50">
              <img
                src="/hero.png"
                alt="Dr. R. K. Mishra Senior Plastic Surgeon"
                className="w-full h-auto object-cover object-top aspect-[4/5]"
              />
            </div>

            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003366] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#00A3E0]" /> OPD Inquiries:
                </span>
                <span className="font-bold text-[#0F172A]">{doctorData.contactPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003366] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00A3E0]" /> Email:
                </span>
                <span>{doctorData.contactEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003366] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" /> Hospital:
                </span>
                <span className="text-right">SIPS Super Specialty Hospital (Pvt. Ltd.), Lucknow</span>
              </div>
            </div>
          </div>

          {/* Right: Bio & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00A3E0] uppercase block">
                ASPS Board Certified Plastic Surgeon
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
                {doctorData.name}
              </h1>
              <p className="text-base font-semibold text-[#0284C7]">
                {doctorData.qualifications}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {doctorData.aboutBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0]">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">25+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Years Practice</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">30,000+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Surgeries</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">NABH</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Accredited OT</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy text-sm sm:text-base py-3.5 px-6 rounded-xl font-semibold cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span>Book Consultation</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="py-3.5 px-6 rounded-xl border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-sm sm:text-base transition-colors cursor-pointer"
              >
                <span>Contact Hospital</span>
              </button>
            </div>

          </div>

        </div>

        {/* Dedicated Highlight: Professional Roles & Affiliations of Dr. R.K. Mishra */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-6 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-widest text-[#00A3E0] uppercase block">
                Official Credentials & Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">
                Professional Roles & Affiliations of Dr. R.K. Mishra
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E0F2FE] border border-[#00A3E0]/30 text-[#003366] text-xs font-bold shrink-0 self-start sm:self-auto">
              <Award className="w-4 h-4 text-[#00A3E0]" />
              <span>Verified Medical Leadership</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role 1 */}
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00A3E0] hover:bg-white transition-all space-y-3 group shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Award className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">International Credential</span>
                <h3 className="text-lg font-bold text-[#003366]">
                  ASPS Board Certified Plastic Surgeon
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Active member of the American Society of Plastic Surgeons (ASPS), meeting rigorous international standards for surgical safety, patient outcomes, and surgical ethics.
                </p>
              </div>
            </div>

            {/* Role 2 */}
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00A3E0] hover:bg-white transition-all space-y-3 group shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Building2 className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">Executive Clinical Leadership</span>
                <h3 className="text-lg font-bold text-[#003366]">
                  Managing Director and Head of Plastic Surgery Department
                </h3>
                <p className="text-xs font-medium text-[#00A3E0]">
                  SIPS Super Specialty Hospital (Pvt. Ltd.)
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Directing the plastic, cosmetic, and microvascular surgery divisions at North India’s premier NABH-accredited tertiary superspecialty hospital in Lucknow.
                </p>
              </div>
            </div>

            {/* Role 3 */}
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00A3E0] hover:bg-white transition-all space-y-3 group shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">Welfare & Reconstructive Health</span>
                <h3 className="text-lg font-bold text-[#003366]">
                  Secretary, SRRE Welfare Society
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Dedicated leadership ensuring healthcare equity, charitable surgical interventions, and reconstructive patient support for underserved communities.
                </p>
              </div>
            </div>

            {/* Role 4 */}
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00A3E0] hover:bg-white transition-all space-y-3 group shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#003366] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Globe2 className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">Global Humanitarian Leadership</span>
                <h3 className="text-lg font-bold text-[#003366]">
                  Project Director, Smile Train (USA)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Over two decades spearheading comprehensive cleft lip and palate repair programs across Northern India, restoring smiles and life quality to over 15,000+ children.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Affiliations & International Training */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] border border-[#00A3E0]/20 flex items-center justify-center text-[#003366]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-editorial font-bold text-[#003366]">Professional Affiliations</h2>
            </div>
            <div className="space-y-3">
              {doctorData.affiliations.map((d, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-semibold text-[#0F172A] flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#003366] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] border border-[#00A3E0]/20 flex items-center justify-center text-[#003366]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-editorial font-bold text-[#003366]">International Fellowships</h2>
            </div>
            <div className="space-y-3">
              {doctorData.internationalTraining.map((t, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-semibold text-[#0F172A] flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
