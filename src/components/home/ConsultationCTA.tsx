import React from 'react';
import { Calendar, PhoneCall } from 'lucide-react';

interface ConsultationCTAProps {
  onNavigate: (route: string) => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ onNavigate }) => {
  return (
    <section className="bg-[#002244] py-8 sm:py-10 border-t border-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Icon + Heading & Subtext */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#003366] text-[#00A3E0] border border-[#00A3E0]/30 flex items-center justify-center shrink-0 shadow-sm hidden sm:flex">
              <Calendar className="w-5 h-5 stroke-[1.8]" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-tight">
                Ready to Begin Your <span className="italic text-[#00A3E0] font-normal">Transformation?</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-1 font-normal">
                Schedule your private, confidential clinical consultation with Dr. R. K. Mishra at SIPS Hospital today.
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto justify-center md:justify-end">
            <div className="flex flex-col items-center sm:items-start">
              <a
                href="tel:+919795800800"
                className="px-6 py-3.5 rounded-xl border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                title="Call available 10:00 AM to 5:00 PM, Monday to Saturday"
              >
                <PhoneCall className="w-4 h-4 text-[#00A3E0]" />
                <span>Call 9795800800</span>
              </a>
              <span className="text-[10px] text-slate-300 font-medium pt-1 text-center sm:text-left">
                Available 10:00 AM – 5:00 PM (Mon–Sat)
              </span>
            </div>

            <button
              onClick={() => onNavigate('book-consultation')}
              className="px-7 py-3.5 rounded-xl bg-[#003366] hover:bg-[#002244] border border-[#00A3E0]/40 text-white text-sm sm:text-base font-semibold shrink-0 w-full sm:w-auto shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#00A3E0]" />
              <span>Book Consultation</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
