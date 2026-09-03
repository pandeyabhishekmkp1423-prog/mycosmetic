import React from 'react';
import { MapPin, ShieldCheck, Award, CheckCircle2, ArrowRight, Calendar, Star, Building2 } from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { proceduresData } from '../../data/proceduresData';

interface LocalLucknowViewProps {
  onNavigate: (route: string) => void;
}

export const LocalLucknowView: React.FC<LocalLucknowViewProps> = ({ onNavigate }) => {
  const topLucknowProcedures = proceduresData.slice(0, 6);

  return (
    <div id="local-lucknow-guide-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Cosmetic Surgery in Lucknow</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE7F0] text-xs font-bold text-[#1769AA] uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Lucknow & Uttar Pradesh Premier Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Cosmetic & Plastic Surgery in Lucknow
          </h1>

          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Under the clinical direction of Senior Plastic Surgeon <strong>Dr. R. K. Mishra</strong> at Sushrut Institute of Plastic Surgery (SIPS Hospital), Lucknow is a trusted regional hub for world-class cosmetic refinement and reconstructive surgery.
          </p>
        </div>
      </div>

      {/* Why Choose SIPS Lucknow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-2">
            <Award className="w-6 h-6 text-[#1769AA]" />
            <h3 className="text-base font-serif font-bold text-[#102A43]">25+ Years Experience</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dr. R. K. Mishra brings M.Ch Plastic Surgery training from KGMC Lucknow alongside fellowships from Dallas and New York.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-2">
            <Building2 className="w-6 h-6 text-[#1769AA]" />
            <h3 className="text-base font-serif font-bold text-[#102A43]">NABH Hospital OT Suites</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Fully equipped hospital infrastructure with HEPA-filtered laminar airflow operating rooms and 24/7 ICU backup.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#1769AA]" />
            <h3 className="text-base font-serif font-bold text-[#102A43]">Ethical, Honest Pricing</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              World-class surgical care at transparent, realistic tariffs without the inflated commercial overheads of metro cities.
            </p>
          </div>
        </div>

        {/* Most Requested Treatments in Lucknow */}
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block mb-1">
              Regional Demand & Specialities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43]">
              Top Cosmetic Procedures in Lucknow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLucknowProcedures.map((proc) => (
              <div
                key={proc.slug}
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="p-5 rounded-2xl bg-[#F6FAFD] border border-[#DCE7F0] hover:border-[#1769AA] cursor-pointer transition-colors group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">{proc.category}</span>
                  <h3 className="text-lg font-serif font-bold text-[#102A43] group-hover:text-[#1769AA] transition-colors mt-1 mb-2">
                    {proc.title} in Lucknow
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {proc.shortDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DCE7F0] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1769AA]">{proc.costRange.split('–')[0]}</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1 group-hover:text-[#1769AA]">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lucknow Consultation CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#102A43] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C89448]">
              In-Clinic Evaluation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Consult Dr. R. K. Mishra at SIPS Hospital Chowk
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Personalized anatomical examination and transparent surgical planning. Serving patients from Lucknow, Kanpur, Prayagraj, and all UP districts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('book-consultation')}
            className="w-full md:w-auto px-8 py-4 bg-[#1769AA] hover:bg-[#a37f4e] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#C89448]" />
            <span>Book Lucknow Consultation</span>
          </button>
        </div>

      </div>

    </div>
  );
};
