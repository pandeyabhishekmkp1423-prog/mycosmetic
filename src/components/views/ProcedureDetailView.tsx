import React, { useState } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Calendar, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  AlertCircle,
  Building2,
  PhoneCall,
  ChevronDown
} from 'lucide-react';
import { Procedure, BeforeAfterCase } from '../../types';
import { proceduresData } from '../../data/proceduresData';
import { beforeAfterCases } from '../../data/resultsData';
import { doctorData } from '../../data/doctorData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

interface ProcedureDetailViewProps {
  procedureSlug: string;
  onNavigate: (route: string) => void;
}

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  procedureSlug,
  onNavigate
}) => {
  const procedure = proceduresData.find(p => p.slug === procedureSlug) || proceduresData[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const matchedCases = beforeAfterCases.filter(
    c => c.procedureSlug === procedure.slug || procedure.beforeAfterCaseIds?.includes(c.id)
  );

  const relatedProcedures = proceduresData.filter(
    p => procedure.relatedSlugs?.includes(p.slug)
  );

  return (
    <div id={`procedure-detail-${procedure.slug}`} className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('procedures')} className="hover:text-[#102A43]">Procedures</button>
        <span>/</span>
        <span className="text-[#1769AA] font-semibold">{procedure.category}</span>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">{procedure.title}</span>
      </div>

      {/* Procedure Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6FAFD] border border-[#DCE7F0] text-xs font-bold text-[#1769AA] tracking-wider uppercase">
              <span>{procedure.category}</span>
              <span>•</span>
              <span>Dr. R. K. Mishra</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
              {procedure.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              {procedure.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {procedure.shortDesc}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="procedure-book-consultation-btn"
                onClick={() => onNavigate('book-consultation')}
                className="px-7 py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C89448]" />
                <span>Book Consultation for {procedure.title}</span>
              </button>

              <button
                id="procedure-ask-question-btn"
                onClick={() => onNavigate('ask-question')}
                className="px-6 py-3.5 bg-[#F6FAFD] hover:bg-[#E7F2F8] text-[#102A43] border border-[#DCE7F0] text-xs sm:text-sm font-semibold rounded-xl transition-all text-center"
              >
                Ask a Question
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#DCE7F0] relative">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-white/40 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Estimated Cost Range</span>
                  <p className="font-bold text-[#102A43]">{procedure.costRange}</p>
                </div>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="text-xs font-bold text-[#1769AA] hover:underline"
                >
                  Pricing Guide →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Facts Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Clock className="w-4 h-4 text-[#1769AA]" />
              <span>Procedure Time</span>
            </div>
            <p className="text-base font-bold text-[#102A43]">{procedure.duration}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#1769AA]" />
              <span>Anesthesia Type</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#102A43] truncate" title={procedure.anesthesiaType}>
              {procedure.anesthesiaType.split('(')[0]}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Building2 className="w-4 h-4 text-[#1769AA]" />
              <span>Hospital Stay</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#102A43]">{procedure.hospitalStay}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <UserCheck className="w-4 h-4 text-[#1769AA]" />
              <span>Return to Work</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#102A43] truncate" title={procedure.recoveryTimeline}>
              {procedure.recoveryTimeline.split(';')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Comprehensive Clinical Breakdown */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Section 1: Overview */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#102A43]">
              Procedure Overview & Anatomical Objectives
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {procedure.overview}
            </p>
          </div>

          {/* Section 2: Ideal Candidates */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#102A43]">
              Who is an Ideal Candidate?
            </h2>
            <ul className="space-y-2.5">
              {procedure.idealCandidate.map((candidate, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <span>{candidate}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Step-by-Step Surgical Process */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#102A43]">
              Step-by-Step Surgical Process
            </h2>
            <div className="space-y-4">
              {procedure.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                  <span className="w-7 h-7 rounded-full bg-[#102A43] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Recovery & Healing Timeline */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#102A43]">
              Recovery & Post-Operative Timeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {procedure.recoveryTimeline}
            </p>
            <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] space-y-2">
              <h4 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">Expected Results</h4>
              <p className="text-xs sm:text-sm text-gray-600">{procedure.expectedResults}</p>
            </div>
          </div>

          {/* Section 5: Safety & Risk Minimization at SIPS Hospital */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#102A43] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1769AA]" />
              Surgical Safety & Risk Management
            </h2>
            <p className="text-xs sm:text-sm text-gray-700">
              All surgeries are performed at Sushrut Institute of Plastic Surgery (SIPS Hospital) under strict NABH protocols.
            </p>
            <ul className="space-y-2">
              {procedure.risksAndSafety.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-1.5 shrink-0" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Before and After Cases for this Procedure */}
          {matchedCases.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#102A43]">
                Documented Clinical Results: {procedure.title}
              </h2>
              <div className="space-y-6">
                {matchedCases.map((c) => (
                  <BeforeAfterSlider key={c.id} caseData={c} />
                ))}
              </div>
            </div>
          )}

          {/* Section 7: FAQs */}
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#102A43] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#1769AA]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 pt-2">
              {procedure.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border border-[#DCE7F0] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-[#102A43] flex items-center justify-between gap-3 hover:bg-[#F6FAFD]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180 text-[#1769AA]' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#DCE7F0] pt-3 bg-[#F6FAFD]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Consultation & Doctor Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Sticky Consultation Box */}
          <div className="sticky top-28 space-y-6">
            
            {/* Consultation Card */}
            <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider block mb-1">
                  Private Consultation
                </span>
                <h3 className="text-xl font-serif font-bold text-[#102A43]">
                  Consult Dr. R. K. Mishra
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Get a personalized surgical assessment, 3D evaluation, and transparent cost estimate.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Procedure:</span>
                  <span className="font-bold text-[#102A43]">{procedure.title}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Starting Tariff:</span>
                  <span className="font-bold text-[#1769AA]">From {procedure.costRange.split('–')[0]}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Hospital:</span>
                  <span className="font-medium text-gray-800">SIPS Lucknow</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('book-consultation')}
                className="w-full py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C89448]" />
                <span>Schedule Consultation</span>
              </button>

              <a
                href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(`Hello Dr. Mishra, I am interested in ${procedure.title} and would like to know consultation timings at SIPS Hospital.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp Coordination</span>
              </a>

              <p className="text-[11px] text-center text-gray-600 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1769AA]" />
                100% Confidential Patient Care
              </p>
            </div>

            {/* Doctor Authority Snippet */}
            <div className="bg-[#F6FAFD] rounded-3xl border border-[#DCE7F0] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-serif text-lg">
                  RM
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#102A43]">Dr. R. K. Mishra</h4>
                  <p className="text-xs text-gray-500">{doctorData.experienceYears}+ Yrs • 30,000+ Surgeries</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Senior Plastic Surgeon at SIPS Hospital Lucknow with international fellowship training in Dallas and New York.
              </p>
              <button
                onClick={() => onNavigate('doctor')}
                className="text-xs font-bold text-[#1769AA] hover:text-[#102A43] transition-colors"
              >
                View Full Surgical Credentials →
              </button>
            </div>

            {/* Related Procedures */}
            {relatedProcedures.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                  Complementary Procedures
                </h4>
                <div className="space-y-2">
                  {relatedProcedures.map((rp) => (
                    <div
                      key={rp.slug}
                      onClick={() => onNavigate(`procedure-${rp.slug}`)}
                      className="p-3 rounded-lg border border-[#DCE7F0] hover:border-[#1769AA] hover:bg-[#F6FAFD] cursor-pointer transition-colors flex items-center justify-between text-xs group"
                    >
                      <span className="font-semibold text-gray-800 group-hover:text-[#1769AA]">{rp.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1769AA]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
