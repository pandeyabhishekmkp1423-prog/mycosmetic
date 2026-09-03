import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Globe2, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Stethoscope
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { proceduresData } from '../../data/proceduresData';

interface DoctorViewProps {
  onNavigate: (route: string) => void;
}

export const DoctorView: React.FC<DoctorViewProps> = ({ onNavigate }) => {
  return (
    <div id="doctor-profile-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Dr. R. K. Mishra</span>
      </div>

      {/* Doctor Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Doctor Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#102A43] shadow-lg border border-[#DCE7F0]">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80"
                alt="Dr. R. K. Mishra Plastic & Cosmetic Surgeon"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-2.5 py-1 bg-[#1769AA] text-white text-[10px] font-bold uppercase rounded-md tracking-wider mb-2 inline-block">
                  Senior Plastic Surgeon
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold">
                  {doctorData.name}
                </h1>
                <p className="text-xs text-gray-300 mt-1">
                  {doctorData.qualifications}
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="mt-4 p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#1769AA]" /> Direct OPD:</span>
                <span className="font-bold text-[#102A43]">{doctorData.contactPhone}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#1769AA]" /> Email:</span>
                <span className="font-medium text-[#102A43]">{doctorData.contactEmail}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#1769AA]" /> Hospital:</span>
                <span className="font-medium text-[#102A43]">SIPS Hospital, Lucknow</span>
              </div>
            </div>
          </div>

          {/* Doctor Credentials & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block mb-2">
                25+ Years of Surgical Mastery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] tracking-tight">
                Pioneering Precision Cosmetic & Reconstructive Surgery in North India
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {doctorData.aboutBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-2xl font-serif font-bold text-[#102A43]">25+</p>
                <p className="text-xs text-gray-500 font-medium">Years Experience</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-2xl font-serif font-bold text-[#1769AA]">30,000+</p>
                <p className="text-xs text-gray-500 font-medium">Surgeries Performed</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-2xl font-serif font-bold text-[#102A43]">15,000+</p>
                <p className="text-xs text-gray-500 font-medium">Smile Train Cleft Surgeries</p>
              </div>
            </div>

            {/* Book Consultation CTA */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="px-7 py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C89448]" />
                <span>Book Consultation with Dr. Mishra</span>
              </button>
              <button
                onClick={() => onNavigate('ask-question')}
                className="px-6 py-3.5 bg-white hover:bg-[#F6FAFD] text-[#102A43] border border-[#DCE7F0] text-xs sm:text-sm font-semibold rounded-xl transition-all text-center"
              >
                Ask a Surgical Question
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Qualifications, Fellowships & Affiliations Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* International Fellowships */}
          <div className="p-8 rounded-3xl bg-white border border-[#DCE7F0] shadow-xs space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                International Training & Fellowships
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              {doctorData.internationalTraining.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Affiliations */}
          <div className="p-8 rounded-3xl bg-white border border-[#DCE7F0] shadow-xs space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                Professional Affiliations & Memberships
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              {doctorData.affiliations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Surgical Philosophy */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#102A43] text-white border border-[#2A313A] shadow-md space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C89448]">
            Core Surgical Philosophy
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            "Aesthetic surgery is not about alteration, but refinement."
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Every surgical plan crafted by Dr. R. K. Mishra begins with deep anatomical listening. Whether refining a nasal profile or performing extensive post-weight loss body sculpting, the objective is to honor your inherent proportions while delivering subtle, natural, and age-appropriate enhancements.
          </p>
        </div>

        {/* Procedures Conducted by Dr. Mishra */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-serif font-bold text-[#102A43]">
              Procedures Performed by Dr. Mishra
            </h3>
            <button
              onClick={() => onNavigate('procedures')}
              className="text-xs font-bold text-[#1769AA] hover:text-[#102A43] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {proceduresData.slice(0, 8).map((proc) => (
              <div
                key={proc.slug}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="p-4 rounded-xl bg-white border border-[#DCE7F0] hover:border-[#1769AA] cursor-pointer transition-colors group"
              >
                <span className="text-[10px] text-gray-600 uppercase font-semibold">{proc.category}</span>
                <h4 className="text-sm font-serif font-bold text-[#102A43] group-hover:text-[#1769AA] transition-colors truncate">
                  {proc.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{proc.duration}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
