import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How should I prepare for my cosmetic consultation with Dr. R. K. Mishra?",
    answer: "Bring any relevant medical records, previous surgical history, and a clear vision of your aesthetic goals. Feel free to bring reference photos to illustrate your preferences. Dr. Mishra will examine your unique anatomy, explain realistic results, and design a customized surgical plan."
  },
  {
    question: "How is cosmetic surgery pricing and cost calculated in Lucknow?",
    answer: "Every procedure is personalized to your anatomical needs. Our transparent quotations cover all aspects: Dr. Mishra's surgical fee, NABH-accredited laminar OT charges at SIPS Super Specialty Hospital, specialist anesthetist fees, original certified implants/materials (if applicable), and all post-operative follow-up visits with zero hidden charges."
  },
  {
    question: "What is the typical downtime and recovery timeline?",
    answer: "Recovery varies by procedure. Minor facial procedures (like eyelid surgery or chin enhancement) generally allow social return in 5–7 days. Procedures such as rhinoplasty, gynecomastia, or liposuction typically require 7–10 days before returning to work and 3–4 weeks before intense gym workouts."
  },
  {
    question: "Are cosmetic surgery results permanent?",
    answer: "Structural corrections like rhinoplasty, gynecomastia excision, and facial bone surgery produce permanent anatomical refinement. Liposuction permanently extracts fat cells from targeted zones, provided you maintain a stable weight and healthy active routine."
  },
  {
    question: "Why choose Dr. R. K. Mishra at SIPS Super Specialty Hospital?",
    answer: "Dr. Mishra holds an M.Ch in Plastic Surgery from King George’s Medical College (KGMC, 2000), backed by international training at Dallas Medical Center, NYU, and Chang Gung Memorial Hospital. With over 25 years experience and 30,000+ operations, every procedure is personally executed with hospital-grade safety at SIPS Lucknow."
  }
];

export const HomeFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="homepage-faq-section" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[11px] font-semibold tracking-wider uppercase text-[#0284C7] mb-3 border border-[#00A3E0]/20">
            <HelpCircle className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Clinical Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-[#003366] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
            Clear, medically verified answers from Dr. R. K. Mishra to help you make informed decisions about your cosmetic and plastic surgery care.
          </p>
        </div>

        {/* Accordion List */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          <div className="hidden lg:block space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] block">
                The Clinical Guarantee
              </span>
              <p className="text-sm leading-relaxed text-slate-700 font-medium">
                Every consultation is grounded in realistic expectations, anatomical honesty, and a surgical plan exclusively customized to your body.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#002244] text-white space-y-3 border border-[#003366]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                Have a Confidential Question?
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our clinical surgical desk for prompt, private guidance.
              </p>
              <a
                href="tel:+919415023675"
                className="inline-flex items-center gap-2 pt-2 text-xs font-bold text-white hover:text-[#00A3E0] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Call Clinic: +91 94150 23675</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#003366] shadow-md' 
                      : 'border-[#E2E8F0] shadow-xs hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 sm:p-6 text-left font-heading font-bold text-[#003366] transition-colors hover:text-[#00A3E0]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#003366] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#E2E8F0] p-5 sm:p-6 pt-4 text-xs sm:text-sm leading-relaxed text-slate-600 bg-[#F8FAFC]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
