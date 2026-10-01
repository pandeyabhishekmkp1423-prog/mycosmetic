import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  ArrowUpRight,
  ArrowRight,
  PhoneCall,
  Sparkles,
  CheckCircle,
  X,
  Clock,
  MapPin,
  Lock
} from 'lucide-react';

interface Procedure {
  id: string;
  label: string;
  url: string;
  iconType: 'chest' | 'nose' | 'sculpt' | 'waist' | 'breast-up' | 'breast-lift' | 'jaw' | 'eye';
}

interface HeroSectionProps {
  onNavigate?: (route: string) => void;
}

const ProcedureIcon: React.FC<{ type: Procedure['iconType']; className?: string }> = ({ type, className = "w-3.5 h-3.5" }) => {
  switch (type) {
    case 'chest':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 6c3 0 5 3 8 3s5-3 8-3" />
          <path d="M4 6v6a8 8 0 0 0 8 8 8 8 0 0 0 8-8V6" />
          <path d="M12 9v11" />
        </svg>
      );
    case 'nose':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 3v10c0 1.5-1 2.5-2.5 3.5C7.5 17.5 7 18.5 7 20h10c0-1.5-.5-2.5-1.5-3.5-1.5-1-2.5-2-2.5-3.5V3" />
          <circle cx="9" cy="18" r="0.75" fill="currentColor" />
          <circle cx="15" cy="18" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'sculpt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </svg>
      );
    case 'waist':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3c2 4 1 8-1 12 1 4 3 6 7 6s6-2 7-6c-2-4-3-8-1-12" />
          <path d="M9 10h6" />
          <path d="M8 14h8" />
        </svg>
      );
    case 'breast-up':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 14a4 4 0 0 0 8 0 4 4 0 0 0 8 0" />
          <path d="M12 4v4m0 0-2-2m2 2 2-2" />
        </svg>
      );
    case 'breast-lift':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 13a4.5 4.5 0 0 0 9 0 4.5 4.5 0 0 0 9 0" />
          <path d="M12 7V3m-3 3 3-3 3 3" />
        </svg>
      );
    case 'jaw':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M5 4v6c0 5 4 9 7 11 3-2 7-6 7-11V4" />
          <path d="M9 14l3 2 3-2" />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return <Sparkles className={className} />;
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalProcedure, setModalProcedure] = useState('Gynecomastia (Male Chest Reduction)');
  const [modalOtherProcedure, setModalOtherProcedure] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  // Core 8 Surgical Services divided 4 | 4 side-by-side
  const proceduresCol1: Procedure[] = [
    { id: 'gynecomastia', label: 'Gynecomastia (Male Chest)', iconType: 'chest', url: 'https://mycosmeticsurgery.in/breast/gynecomastia-surgery-lucknow/' },
    { id: 'rhinoplasty', label: 'Rhinoplasty (Nose Job)', iconType: 'nose', url: 'https://mycosmeticsurgery.in/face/nose-job-lucknow/' },
    { id: 'liposuction', label: '360° HD Liposuction', iconType: 'sculpt', url: 'https://mycosmeticsurgery.in/body/liposuction-surgery-in-lucknow/' },
    { id: 'tummy-tuck', label: 'Tummy Tuck (Abdominoplasty)', iconType: 'waist', url: 'https://mycosmeticsurgery.in/body/tummy-tuck-in-lucknow/' }
  ];

  const proceduresCol2: Procedure[] = [
    { id: 'breast-augmentation', label: 'Breast Augmentation', iconType: 'breast-up', url: 'https://mycosmeticsurgery.in/breast/breast-surgery/' },
    { id: 'breast-reduction', label: 'Breast Reduction & Lift', iconType: 'breast-lift', url: 'https://mycosmeticsurgery.in/breast/reduce-breast-size/' },
    { id: 'chin-correction', label: 'Genioplasty (Chin Enhancement)', iconType: 'jaw', url: 'https://mycosmeticsurgery.in/face/nose-job-lucknow/' },
    { id: 'blepharoplasty', label: 'Blepharoplasty (Baggy Eyelids)', iconType: 'eye', url: 'https://mycosmeticsurgery.in/face/baggy-eyelids-surgery/' }
  ];

  const handleConsultationClick = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (onNavigate) {
      onNavigate('consultation');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalPhone.trim()) return;

    setIsSubmittingModal(true);
    try {
      const finalProcedure = modalProcedure === 'Other' && modalOtherProcedure.trim()
        ? `Other: ${modalOtherProcedure.trim()}`
        : modalProcedure;

      await fetch('/api/submit_lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalName.trim(),
          phone: modalPhone.trim(),
          procedure: finalProcedure,
          consultationType: 'In-Person (SIPS Hospital)',
          preferredDate: modalDate || new Date().toISOString().split('T')[0],
          city: 'Lucknow'
        })
      });
    } catch {
      // Local fallback
    } finally {
      setIsSubmittingModal(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setModalName('');
        setModalPhone('');
      }, 2500);
    }
  };

  return (
    <section id="hero" className="scroll-mt-28 relative pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 bg-[#F8FAFD] overflow-hidden border-b border-slate-200/90 font-sans selection:bg-[#00A3E0]/20 selection:text-[#00264D]">

      {/* Background Architectural Mesh & Subtle Luminous Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.025] pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#00A3E0]/10 via-[#005580]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-16 w-[400px] h-[400px] bg-[#003366]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main 2-Column Responsive Layout - Aligned at Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column (7 cols): Heading, Primary CTAs, 4 | 4 Procedures Grid, View All Services */}
          <div className="lg:col-span-7 space-y-5">

            {/* Headline Block */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#00264D] tracking-tight leading-[1.14]">
                Artistry in Plastic Surgery. <br />
                <span className="font-serif italic font-normal bg-gradient-to-r from-[#00A3E0] to-[#005580] bg-clip-text text-transparent">
                  Refining Your Confidence.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                Super-specialty plastic, cosmetic &amp; reconstructive surgery led by{' '}
                <strong className="text-[#00264D] font-semibold">Dr. R.K. Mishra</strong>{' '}
                <span className="text-slate-500 font-normal">
                  (Managing Director &amp; Head of Plastic Surgery Dept., SIPS Hospital, Lucknow).
                </span>
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleConsultationClick}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00264D] via-[#003366] to-[#00264D] hover:from-[#003366] hover:to-[#004080] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer border border-[#003366]/40 group"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="flex flex-col">
                <a
                  href="tel:+919795800800"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-[#00264D] font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all flex items-center gap-2 hover:border-[#00A3E0] cursor-pointer"
                  title="Call Available: 10:00 AM – 5:00 PM (Monday to Saturday)"
                >
                  <PhoneCall className="w-4 h-4 text-[#00A3E0]" />
                  <span>Call 9795800800</span>
                </a>
                <span className="text-[10px] text-slate-500 font-medium pl-1 pt-0.5">Available 10am–5pm (Mon–Sat)</span>
              </div>
            </div>

            {/* Core Surgical Procedures: Ultra Clean 4 | 4 Side-by-Side */}
            <div className="pt-1 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Core Surgical Procedures
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Column 1: 4 Procedures */}
                <div className="space-y-2">
                  {proceduresCol1.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#00A3E0] hover:bg-[#F0F6FA] text-slate-700 hover:text-[#00264D] transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-6 h-6 rounded-md bg-[#F0F6FA] group-hover:bg-[#00264D] text-[#005580] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <ProcedureIcon type={item.iconType} className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-semibold truncate">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00A3E0] shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>

                {/* Column 2: 4 Procedures */}
                <div className="space-y-2">
                  {proceduresCol2.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#00A3E0] hover:bg-[#F0F6FA] text-slate-700 hover:text-[#00264D] transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-6 h-6 rounded-md bg-[#F0F6FA] group-hover:bg-[#00264D] text-[#005580] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <ProcedureIcon type={item.iconType} className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-semibold truncate">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00A3E0] shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* View All Services Button Directly Below Procedures */}
              <div className="pt-1">
                <a
                  href="https://mycosmeticsurgery.in/services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-xs font-bold transition-all shadow-2xs group cursor-pointer"
                  title="Explore all 30+ plastic & cosmetic procedures"
                >
                  <span>View All Services &amp; Procedures</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00A3E0] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Fully Clickable Doctor Portrait Card Aligned at Top */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[350px] sm:max-w-[370px]">

              {/* Subtle luxury ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#003366]/15 via-[#00A3E0]/15 to-[#001D3D]/10 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Seamless, fully clickable card */}
              <a
                href="https://mycosmeticsurgery.in/dr-r-k-mishra-best-cosmetic-surgeon-in-lucknow/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#00A3E0]/60 cursor-pointer"
                title="Click to view Dr. R.K. Mishra's full surgical qualifications & credentials"
              >
                {/* Doctor Portrait Image with generous headroom */}
                <div className="relative h-[430px] sm:h-[460px] w-full overflow-hidden bg-[#0A192F]">
                  <img
                    src="/hero.png"
                    alt="Dr. R.K. Mishra - Senior Plastic and Cosmetic Surgeon, SIPS Hospital"
                    className="w-full h-full object-cover object-[center_5%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {/* Multi-stage smooth dark gradient for crisp readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-[#001428]/45 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}


                  {/* Floating Glassmorphism Identity Card at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 sm:p-4 rounded-2xl bg-[#001D3D]/90 backdrop-blur-md border border-white/20 shadow-xl text-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-editorial text-lg sm:text-xl font-bold tracking-tight leading-tight drop-shadow-sm">
                          Dr. R. K. Mishra
                        </div>
                        <p className="text-[11px] text-[#00A3E0] font-semibold tracking-wide">
                          M.Ch. (Plastic Surgery) • ASPS Member
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#00A3E0] text-white flex items-center justify-center transition-all duration-200 shrink-0">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="truncate pr-2">Head of Plastic Surgery, SIPS Hospital</span>
                      <span className="text-[#00A3E0] font-bold shrink-0">25+ Yrs Exp</span>
                    </div>
                  </div>

                </div>

              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Consultation Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="relative p-5 bg-gradient-to-r from-[#00264D] to-[#003866] text-white">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-[11px] text-[#00A3E0] font-semibold mb-2">
                <Lock className="w-3 h-3" />
                <span>100% Confidential Medical Inquiry</span>
              </div>
              <h3 className="text-xl font-bold leading-tight">Request a Surgical Consultation</h3>
              <p className="text-xs text-slate-300 mt-1">Directly reviewed by Dr. R.K. Mishra&apos;s clinical team.</p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Consultation Request Received</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Our Senior Patient Coordinator will call you shortly to confirm your slot with Dr. Mishra.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Mode Information */}
                  <div className="p-2.5 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#00A3E0]" />
                      <span className="font-semibold text-[#00264D]">In-Person OPD Consultation</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">SIPS Hospital</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/40 focus:border-[#00A3E0]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={modalPhone}
                          onChange={(e) => setModalPhone(e.target.value)}
                          placeholder="+91 97958 00800"
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/40 focus:border-[#00A3E0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Procedure of Interest</label>
                        <select
                          value={modalProcedure}
                          onChange={(e) => setModalProcedure(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/40 focus:border-[#00A3E0] bg-white text-slate-700"
                        >
                          <option value="Gynecomastia (Male Chest Reduction)">Gynecomastia (Male Chest Reduction)</option>
                          <option value="Rhinoplasty (Nose Job)">Rhinoplasty (Nose Job)</option>
                          <option value="360° HD Liposuction">360° HD Liposuction</option>
                          <option value="Tummy Tuck (Abdominoplasty)">Tummy Tuck (Abdominoplasty)</option>
                          <option value="Breast Augmentation">Breast Augmentation</option>
                          <option value="Breast Reduction & Lift">Breast Reduction &amp; Lift</option>
                          <option value="Genioplasty (Chin Enhancement)">Genioplasty (Chin Enhancement)</option>
                          <option value="Blepharoplasty (Baggy Eyelids)">Blepharoplasty (Baggy Eyelids)</option>
                          <option value="Other">Other (Please specify)</option>
                        </select>
                        {modalProcedure === 'Other' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              required
                              placeholder="Please specify procedure..."
                              value={modalOtherProcedure}
                              onChange={(e) => setModalOtherProcedure(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-[#00264D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/40 focus:border-[#00A3E0] bg-blue-50/20 text-slate-800"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date (Optional)</label>
                      <input
                        type="date"
                        value={modalDate}
                        onChange={(e) => setModalDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/40 focus:border-[#00A3E0] bg-white text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingModal}
                      className="w-full py-3 bg-[#00264D] hover:bg-[#003866] disabled:opacity-60 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isSubmittingModal ? 'Submitting Request...' : 'Confirm Consultation Request'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00A3E0]" /> Fast Response in 2 Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00A3E0]" /> SIPS Hospital
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;