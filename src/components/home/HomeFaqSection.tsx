import React, { useState } from 'react';
import { ChevronDown, ArrowRight, MessageCircle, Sparkles, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';

interface HomeFaqSectionProps {
  onNavigate?: (route: string) => void;
}

type FaqCategory = 'ALL' | 'CONSULTATION' | 'RECOVERY' | 'SAFETY';

interface FaqItem {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
  keyTakeaway: string;
}

const FAQS: FaqItem[] = [
  {
    id: 1,
    category: 'CONSULTATION',
    question: "How should I prepare for my consultation with Dr. R. K. Mishra?",
    answer: "Bring any relevant medical history, previous surgical notes, and reference photos illustrating your desired aesthetic outcome. Dr. Mishra personally evaluates bone structure, cartilage, and soft-tissue harmony to construct an honest, personalized surgical plan with zero commercial pressure.",
    keyTakeaway: "Personal 1-on-1 evaluation with Dr. Mishra himself with realistic anatomical goal setting."
  },
  {
    id: 2,
    category: 'CONSULTATION',
    question: "How is surgery pricing calculated, and are there any hidden fees?",
    answer: "Every quotation is 100% fixed, transparent, and all-inclusive. Your quote covers Dr. Mishra's surgical fee, NABH-accredited laminar airflow OT charges at SIPS Super Specialty Hospital, specialist cardiac anesthetist fees, certified implants, and all routine post-operative dressings and checkups.",
    keyTakeaway: "All-inclusive quote with guaranteed zero surprise hospital charges or hidden extras."
  },
  {
    id: 3,
    category: 'CONSULTATION',
    question: "Are 0% interest EMI and medical financing options available?",
    answer: "Yes. In partnership with leading medical lenders like LiquiLoans and Bajaj Finserv, we offer zero-interest monthly EMI plans. Patients can choose 3 to 18-month repayment tenures, with paperless pre-approval completed at our hospital desk in under 15 minutes.",
    keyTakeaway: "Instant paperless approval in 15 minutes with flexible 3 to 18-month tenure options."
  },
  {
    id: 4,
    category: 'RECOVERY',
    question: "What is the realistic recovery downtime before returning to work and exercise?",
    answer: "Outpatient facial procedures (eyelids, chin, buccal fat) allow return to desk work within 24 to 48 hours. Body contouring (gynecomastia, VASER liposuction) typically requires 3 to 5 days for office return and 3 weeks for gym workouts. Structural facial surgeries like rhinoplasty require 7 to 10 days.",
    keyTakeaway: "Most working professionals schedule over a long weekend and resume office work smoothly."
  },
  {
    id: 5,
    category: 'RECOVERY',
    question: "Are cosmetic surgery outcomes permanent, or will they need revision?",
    answer: "Structural modifications such as preservation rhinoplasty, male breast gland excision, and facial bone contouring produce permanent anatomical alterations. Liposuction permanently eliminates targeted fat cells. Maintaining a stable body weight ensures lifetime aesthetic harmony.",
    keyTakeaway: "Glandular and skeletal alterations are permanent; stable body weight preserves contours."
  },
  {
    id: 6,
    category: 'SAFETY',
    question: "Why does Dr. Mishra operate exclusively at SIPS Hospital rather than a day clinic?",
    answer: "Patient safety is non-negotiable. Standalone cosmetic clinics often lack critical care backup. SIPS Hospital is a full NABH-accredited super-specialty hospital with Class-100 HEPA-filtered laminar airflow operating suites, full in-house ICU, 24/7 dedicated cardiac anesthesiologists, and complete emergency readiness.",
    keyTakeaway: "Class-100 sterile operating suites and full hospital ICU backup minimize infection and anesthesia risks."
  },
  {
    id: 7,
    category: 'SAFETY',
    question: "Will there be visible external scars after surgery?",
    answer: "Plastic surgery is the art of invisible healing. Dr. Mishra hides incisions within natural skin creases, hairline junctions, or internal mucosal borders. Multi-layer tension-free internal micro-sutures ensure incisions heal into delicate, virtually imperceptible hairline marks.",
    keyTakeaway: "Strategic incision concealment along natural creases with microscopic tension-free closure."
  },
  {
    id: 8,
    category: 'CONSULTATION',
    question: "How do out-of-town and international patients coordinate their surgery in Lucknow?",
    answer: "Our Patient Concierge provides preliminary digital photo evaluations before you travel. Upon arrival in Lucknow, priority in-person diagnostics, immediate surgery scheduling, and coordinated recovery hotel stays (such as Taj Mahal Lucknow or Hyatt Regency) are arranged for a seamless visit.",
    keyTakeaway: "Pre-arrival virtual review, reserved surgery dates, and full partner hotel assistance."
  }
];

export const HomeFaqSection: React.FC<HomeFaqSectionProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('ALL');
  
  // ALL ANSWERS ARE CLOSED BY DEFAULT UNTIL EXPLICITLY OPENED BY USER
  const [openId, setOpenId] = useState<number | null>(null);

  const categories: { id: FaqCategory; label: string }[] = [
    { id: 'ALL', label: 'All Questions' },
    { id: 'CONSULTATION', label: 'Consultation & Pricing' },
    { id: 'RECOVERY', label: 'Recovery & Results' },
    { id: 'SAFETY', label: 'Hospital Safety & Scars' }
  ];

  const filteredFaqs = activeCategory === 'ALL' 
    ? FAQS 
    : FAQS.filter(f => f.category === activeCategory);

  const toggleAccordion = (id: number) => {
    setOpenId(prev => prev === id ? null : id);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Dr. R. K. Mishra's Clinic! I have a question regarding cosmetic surgery and would like to speak with a patient coordinator."
    );
    window.open(`https://wa.me/919415582377?text=${text}`, '_blank');
  };

  return (
    <section id="faqs" className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF] py-14 sm:py-20 border-b border-[#E2E8F0]">
      
      {/* Background Soft Glow Auras */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric 2-Column Luxury Layout (Not Kept in the Center) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Premium Consultation Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Main AI Process & Surgical Planning Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-slate-900/20 border border-slate-700/50 group">
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-950">
                <img
                  src="/assets/surgical_process_ai.jpg"
                  alt="AI-Assisted 3D Anatomical Surgical Planning & Procedural Workflow"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Subtle Sleek Gradient Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Card Bottom Caption */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A3E0] mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                    <span>3D Precision Planning Process</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading leading-tight mb-1 text-white">
                    Anatomical Precision & Vector Mapping
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Personalized procedural planning combining 3D facial vectors, millimeter depth precision, and natural anatomical symmetry.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Assistance Callout */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-4">
              <h4 className="font-editorial text-xl font-bold text-[#003366]">
                Have a Specific Surgical Question?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with Dr. Mishra or our senior clinical coordinator for personalized procedural clarity.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('book-consultation')}
                    className="flex-1 bg-[#003366] hover:bg-[#002244] text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <button
                  onClick={handleWhatsApp}
                  className="bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-2 border-t border-slate-100">
                <a
                  href="tel:+919415023675"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#003366] font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Direct Helpline: +91 94150 23675</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Left-Aligned Editorial Header & Clean Accordion (7 Cols) */}
          <div className="lg:col-span-7">
            
            {/* Left-Aligned Rich Editorial Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase">
                  Patient Advisory & Transparent Insights
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.1] mb-4">
                Frequently Asked <span className="italic text-[#00A3E0] font-normal">Questions.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Evidence-based answers directly from Dr. R. K. Mishra (M.Ch Plastic Surgery) to ensure total confidence on your surgical journey.
              </p>

              {/* Clean Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mt-6">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#003366] text-white shadow-md shadow-[#003366]/20'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion List (ALL ANSWERS CLOSED INITIALLY UNTIL CLICKED) */}
            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#003366]/40 shadow-md shadow-slate-900/5'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Accordion Question Header */}
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left py-4 sm:py-5 px-5 sm:px-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading text-base sm:text-lg font-bold text-[#003366] leading-snug">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'bg-[#003366] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Answer Body (Only Shown When Open) */}
                    {isOpen && (
                      <div className="px-5 sm:px-7 pb-5 pt-1 text-slate-600 animate-fade-in">
                        
                        <p className="text-sm sm:text-base leading-relaxed text-slate-700 mb-3.5">
                          {faq.answer}
                        </p>

                        {/* Highlight Clinical Takeaway */}
                        <div className="p-3.5 rounded-xl bg-[#003366]/5 border border-[#003366]/15 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm font-semibold text-[#003366] leading-snug">
                            {faq.keyTakeaway}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
