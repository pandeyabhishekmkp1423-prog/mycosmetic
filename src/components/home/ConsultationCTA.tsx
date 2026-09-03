import React from 'react';
import { Calendar, Phone, MessageCircle, ShieldCheck, ArrowRight, MapPin, Lock } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface ConsultationCTAProps {
  onNavigate: (route: string) => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onNavigate }) => {
  return (
    <section id="consultation-cta-section" className="py-20 sm:py-28 bg-[#0B2A5B] text-white relative overflow-hidden">
      <div className="absolute inset-0 medical-grid-bg opacity-10 pointer-events-none" />

      {/* Organic Linework */}
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-10 pointer-events-none text-white" 
        viewBox="0 0 1000 600" 
        fill="none"
      >
        <circle cx="500" cy="300" r="280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
        <circle cx="500" cy="300" r="420" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Reassurance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold tracking-wider text-[#EEF7FC] uppercase">
          <Lock className="w-3.5 h-3.5 text-[#93C5FD]" />
          <span>Discreet, Private & Patient-Centred</span>
        </div>

        {/* Closing Title & Subtitle */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold tracking-tight leading-[1.15]">
            Begin your transformation with Dr. R. K. Mishra.
          </h2>
          <p className="text-sm sm:text-base text-[#DCE7F0] leading-relaxed font-normal">
            Schedule an in-depth private consultation at SIPS Hospital Lucknow or connect virtually for a preliminary surgical assessment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            id="cta-book-consultation-btn"
            onClick={() => onNavigate('book-consultation')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#EEF7FC] text-[#0B2A5B] text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#1769AA]" />
            <span>Book In-Person Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#0B2A5B] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            id="cta-whatsapp-btn"
            href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello Dr. Mishra, I would like to schedule a cosmetic surgery consultation at SIPS Hospital.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Inquire via WhatsApp</span>
          </a>
        </div>

        {/* Direct Contact & Location Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-[#CBD5E1]">
          <a href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>OPD Hotline: +91 9795 800 800</span>
          </a>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>SIPS Hospital, 29 Shah Mina Road, Chowk, Lucknow</span>
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Confidentiality Guaranteed</span>
          </span>
        </div>

      </div>
    </section>
  );
};
