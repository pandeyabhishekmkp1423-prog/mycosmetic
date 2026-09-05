import React, { useState } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  PhoneCall, 
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';
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
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('procedures')} className="hover:text-[#003366] transition-colors cursor-pointer">Procedures</button>
        <span>/</span>
        <span className="text-[#00A3E0] font-semibold">{procedure.category}</span>
        <span>/</span>
        <span className="text-[#003366] font-bold">{procedure.title}</span>
      </div>

      {/* Main Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{procedure.category} • Surgical Excellence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#003366] tracking-tight leading-tight">
              {procedure.title}
            </h1>

            <p className="text-base text-[#00A3E0] font-semibold">
              {procedure.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
              {procedure.shortDesc}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-crimson"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Confidential Consultation</span>
              </button>

              <button
                onClick={() => onNavigate('ask-question')}
                className="btn-outline-navy"
              >
                <span>Ask a Doctor</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-gray-50 relative group">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Quick Facts Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#00A3E0] mb-1 font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Duration</span>
            </div>
            <p className="text-sm font-bold text-[#003366]">{procedure.duration}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#00A3E0] mb-1 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anesthesia</span>
            </div>
            <p className="text-sm font-bold text-[#003366] truncate">{procedure.anesthesiaType.split('(')[0]}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#00A3E0] mb-1 font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Hospital Stay</span>
            </div>
            <p className="text-sm font-bold text-[#003366]">{procedure.hospitalStay}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#00A3E0] mb-1 font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Recovery</span>
            </div>
            <p className="text-sm font-bold text-[#003366] truncate">{procedure.recoveryTimeline.split(';')[0]}</p>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#003366]">
              Procedure Overview & Anatomical Objectives
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed font-normal">
              {procedure.overview}
            </p>
          </div>

          {/* Ideal Candidates */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#003366]">
              Who is an Ideal Candidate?
            </h2>
            <ul className="space-y-2.5">
              {procedure.idealCandidate.map((cand, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>{cand}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#003366]">
              Step-by-Step Surgical Process
            </h2>
            <div className="space-y-3">
              {procedure.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#003366] text-[11px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#003366]">
              Post-Operative Recovery & Care
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {procedure.recoveryTimeline}
            </p>
          </div>

          {/* FAQs */}
          {procedure.faqs.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#003366]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {procedure.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-bold text-[#003366] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                      >
                        <span className="text-sm">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#00A3E0] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Contact & Related */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-gradient-to-br from-[#002244] to-[#003366] text-white rounded-3xl p-6 sm:p-7 border border-white/10 shadow-lg space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#00A3E0] shrink-0">
                <img
                  src="/hero.png"
                  alt="Dr. R. K. Mishra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">Dr. R. K. Mishra</h3>
                <p className="text-xs text-[#00A3E0] font-medium">M.Ch Senior Plastic Surgeon</p>
                <p className="text-[10px] text-slate-300">25+ Yrs Exp • SIPS Hospital</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Performed over 30,000 successful surgeries. Every treatment plan is custom sculpted with uncompromising anatomical safety.
            </p>

            <div className="pt-2 border-t border-white/10 space-y-3">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-crimson w-full py-3"
              >
                Schedule Consultation
              </button>
              <a
                href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="w-full py-2.5 border border-white/20 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Call Clinic Helpline</span>
              </a>
            </div>
          </div>

          {/* Related Procedures */}
          {relatedProcedures.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#003366]">
                Related Procedures
              </h4>
              <div className="space-y-2">
                {relatedProcedures.map((rp) => (
                  <button
                    key={rp.slug}
                    onClick={() => onNavigate(`procedure-${rp.slug}`)}
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#003366]/5 text-left text-xs font-semibold text-[#003366] flex items-center justify-between transition-colors border border-[#E2E8F0]"
                  >
                    <span>{rp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00A3E0]" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
