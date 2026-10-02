import React from 'react';
import { Phone, MessageCircle, Mail, Calendar } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface MobileBottomBarProps {
  onNavigate: (route: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate }) => {
  return (
    <div 
      id="mobile-bottom-bar"
      className="bottom-safe-area fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-1.5 border-t border-[#CBD5E1] bg-white/95 px-2.5 pt-2 shadow-[0_-4px_20px_rgba(0,35,70,0.12)] backdrop-blur-md lg:hidden"
    >
      {/* 1. Call Direct */}
      <a
        id="mobile-bar-call-btn"
        href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
        className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-[#F8FAFC] px-1 py-1 text-center text-[#003366] hover:bg-slate-100 active:scale-95 transition-all shadow-2xs"
        aria-label="Call clinic: +91 9795 800 800"
        title="Call Available: 10:00 AM – 5:00 PM (Monday to Saturday)"
      >
        <Phone className="w-4 h-4 text-[#003366]" />
        <span className="text-[9px] font-bold text-slate-700 leading-none mt-1">Call</span>
      </a>

      {/* 2. WhatsApp Direct */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello Dr. Mishra / SIPS Hospital, I would like to inquire regarding a consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] min-w-[48px] flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-1 py-1 text-center text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all shadow-2xs"
        aria-label="Message on WhatsApp"
        title="Chat on WhatsApp: +91 9795 800 800"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
        <span className="text-[9px] font-bold text-emerald-800 leading-none mt-1">WhatsApp</span>
      </a>

      {/* 3. Mail Direct */}
      <a
        id="mobile-bar-mail-btn"
        href={`mailto:${doctorData.contactEmail}?subject=${encodeURIComponent('Consultation Inquiry - Dr. R.K. Mishra')}`}
        className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-1 py-1 text-center text-[#003366] hover:bg-sky-100 active:scale-95 transition-all shadow-2xs"
        aria-label="Email clinic directly"
        title="Email Clinic: MyCosmeticSurgery@gmail.com"
      >
        <Mail className="w-4 h-4 text-[#00A3E0]" />
        <span className="text-[9px] font-bold text-[#003366] leading-none mt-1">Mail</span>
      </a>

      {/* 4. Book Consultation Button */}
      <button
        id="mobile-bar-book-btn"
        onClick={() => {
          const el = document.getElementById('consultation');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('consultation');
        }}
        className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#002244] to-[#003366] hover:from-[#003366] hover:to-[#004080] active:scale-98 px-2.5 py-1 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer border border-[#003366]/40"
        aria-label="Book Consultation"
      >
        <Calendar className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
        <span className="whitespace-nowrap font-bold">Book Consultation</span>
      </button>
    </div>
  );
};
