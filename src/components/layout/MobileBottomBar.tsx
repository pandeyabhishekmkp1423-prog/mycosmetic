import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface MobileBottomBarProps {
  onNavigate: (route: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate }) => {
  return (
    <div 
      id="mobile-bottom-bar"
      className="bottom-safe-area fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-2 border-t border-[#DCE7F0] bg-white/95 px-3 pt-2.5 shadow-[0_-12px_34px_rgba(11,42,91,0.1)] backdrop-blur-xl lg:hidden"
    >
      {/* Call Direct */}
      <a
        id="mobile-bar-call-btn"
        href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
        className="interactive-lift flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#DCE7F0] bg-[#F6FAFD] px-2 py-2.5 text-xs font-bold text-[#102A43]"
        aria-label="Call clinic"
      >
        <Phone className="w-3.5 h-3.5 text-[#1769AA]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Direct */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello Dr. Mishra / SIPS Hospital, I would like to inquire regarding a consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="interactive-lift flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-2.5 text-xs font-bold text-emerald-800"
        aria-label="Message on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      {/* Book Consultation */}
      <button
        id="mobile-bar-book-btn"
        onClick={() => onNavigate('book-consultation')}
        className="interactive-lift flex min-h-11 flex-[1.35] items-center justify-center gap-1.5 rounded-lg bg-[#0B2A5B] px-3 py-2.5 text-xs font-bold text-white shadow-[0_12px_26px_rgba(11,42,91,0.18)]"
        type="button"
      >
        <Calendar className="w-3.5 h-3.5 text-[#D9F1FF]" />
        <span>Book</span>
      </button>
    </div>
  );
};
