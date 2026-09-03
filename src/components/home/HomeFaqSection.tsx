import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How should I prepare for my initial surgical consultation?",
    answer: "Bring any relevant medical history, previous surgery details, and a clear idea of your aesthetic goals. Feel free to bring reference photos to help describe your expectations. Dr. Mishra will conduct an anatomical examination, discuss feasibility, and explain realistic outcomes."
  },
  {
    question: "How is cosmetic surgery pricing and cost calculated?",
    answer: "Every procedure is individualized. The complete quotation provided during consultation includes the surgeon's fee, NABH-accredited operating theatre charges at SIPS Hospital, specialized anaesthetist fees, surgical consumables/implants (if applicable), and all post-operative follow-up visits with zero hidden costs."
  },
  {
    question: "What is the typical downtime and recovery timeline?",
    answer: "Recovery varies by procedure. Minor facial refinements (such as chin correction or upper blepharoplasty) typically allow social resumption in 5–7 days. Procedures like rhinoplasty, gynecomastia, or liposuction typically require 7–10 days before returning to work and 3–4 weeks before strenuous workouts."
  },
  {
    question: "Are cosmetic surgery results permanent?",
    answer: "Surgical corrections like structural rhinoplasty, gynecomastia excision, and facial bone adjustments produce lasting, permanent anatomical changes. Procedures such as liposuction permanently remove fat cells, though maintaining a stable weight and healthy lifestyle preserves the sculpted contour over time."
  },
  {
    question: "Why choose Dr. R. K. Mishra for your cosmetic procedure?",
    answer: "Dr. Mishra holds a super-specialty M.Ch in Plastic Surgery from King George’s Medical College (KGMC, 2000), backed by international training at Dallas Medical Center, NYU, and Chang Gung Memorial Hospital. With over 25 years and 30,000+ operations, every procedure is personally executed with hospital-grade safety at SIPS Lucknow."
  }
];

export const HomeFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="homepage-faq-section" className="py-16 sm:py-24 bg-[#F5FAFD] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#52677D] mt-2 max-w-xl mx-auto">
            Clear, transparent answers to help you make informed choices about your cosmetic and reconstructive surgery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DCE7F0] overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-[#102A43] hover:text-[#1769AA] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-[#EEF7FC] text-[#1769AA] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0B2A5B] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#52677D] leading-relaxed border-t border-[#EEF2F6] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
