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
      className="bottom-safe-area fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-2 border-t border-[#E2E8F0] bg-white/95 px-4 pt-2.5 shadow-lg backdrop-blur-md lg:hidden"
    >
      {/* Call Direct */}
      <a
        id="mobile-bar-call-btn"
        href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
        className="flex min-h-11 flex-1 flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-1 py-1.5 text-center text-[#003366] hover:bg-[#F0F7FD] transition-colors"
        aria-label="Call clinic available 10:00 AM to 5:00 PM Monday to Saturday"
        title="Call Available: 10:00 AM – 5:00 PM (Monday to Saturday)"
      >
        <div className="flex items-center gap-1 leading-tight">
          <Phone className="w-3.5 h-3.5 text-[#003366]" />
          <span className="text-xs font-bold">Call</span>
        </div>
        <span className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">10am–5pm Mon-Sat</span>
      </a>

      {/* WhatsApp Direct */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello Dr. Mishra / SIPS Hospital, I would like to inquire regarding a consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-2 text-xs font-semibold text-emerald-800"
        aria-label="Message on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      {/* Consult Dr. Mishra - Scroll to Consultation Form on landing page */}
      <button
        id="mobile-bar-main-site-btn"
        onClick={() => {
          const el = document.getElementById('consultation');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('consultation');
        }}
        className="flex min-h-11 flex-[1.3] items-center justify-center gap-1.5 rounded-xl bg-[#003366] hover:bg-[#002244] px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
        aria-label="Consult Dr. Mishra"
      >
        <Calendar className="w-3.5 h-3.5 text-[#00A3E0]" />
        <span>Consult Dr. Mishra</span>
      </button>
    </div>
  );
};
