import React from 'react';
import { 
  Plane, 
  Train, 
  Hotel, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  Car
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';

interface MedicalTourismConciergeProps {
  onNavigate: (route: string) => void;
}

export const MedicalTourismConcierge: React.FC<MedicalTourismConciergeProps> = ({ onNavigate }) => {
  return (
    <section id="medical-tourism-concierge" className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-[#E2E8F0]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Rich Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Regional & International Patients
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Traveling to Lucknow <span className="italic text-[#00A3E0] font-normal">For Surgery.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Over 40% of Dr. R. K. Mishra’s patients travel from across Uttar Pradesh, Delhi NCR, Bihar, Nepal, and overseas. Our medical concierge ensures seamless transit, priority hospital scheduling, and comfortable recovery.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs space-y-4 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#003366] text-white flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-[#003366]">
              Virtual Photo Assessment
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Consult with Dr. Mishra from your home city via video call or secure photo assessment. Receive estimated surgical planning, cost range, and recovery duration prior to booking tickets.
            </p>
            <div className="pt-2 text-sm font-semibold text-[#00A3E0] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
              <span>Zero unnecessary travel</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs space-y-4 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#00A3E0] text-white flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-[#003366]">
              Arrival & Priority Surgery
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Arrive at SIPS Hospital Chowk, Lucknow. In-person diagnostic examination is conducted, blood investigations are completed in-house, and your surgical theater slot is reserved.
            </p>
            <div className="pt-2 text-sm font-semibold text-[#00A3E0] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
              <span>NABH laminar OT priority</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs space-y-4 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#CE181E] text-white flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-[#003366]">
              Recovery & Fit-to-Travel
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Rest in our private inpatient suites or luxury partner hotels. Following final post-op review by Dr. Mishra and splint removal, you receive your official Fit-to-Fly certificate.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#00A3E0] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
              <span>6-month digital follow-up</span>
            </div>
          </div>

        </div>

        {/* Transit & Stay Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-[#002244] to-[#003366] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-white/10">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
                Connectivity to SIPS Hospital Chowk
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Smooth Transit & VIP Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Located centrally at 29, Shahmeena Road, Chowk, Lucknow, SIPS Super Specialty Hospital is easily accessible from all transit hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#00A3E0] font-bold">
                  <Plane className="w-4 h-4" />
                  <span>CCS International Airport</span>
                </div>
                <p className="text-slate-300 text-xs">Amausi Airport (LKO) • ~30 mins drive</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#00A3E0] font-bold">
                  <Train className="w-4 h-4" />
                  <span>Charbagh Railway Station</span>
                </div>
                <p className="text-slate-300 text-xs">Lucknow Junction (LKO) • ~15 mins drive</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#00A3E0] font-bold">
                  <Car className="w-4 h-4" />
                  <span>Expressway Access</span>
                </div>
                <p className="text-slate-300 text-xs">Agra-Lucknow & Purvanchal Expressways</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#00A3E0] font-bold">
                  <Hotel className="w-4 h-4" />
                  <span>Luxury Partner Hotels</span>
                </div>
                <p className="text-slate-300 text-xs">Taj Mahal, Hyatt Regency, Clarks Avadh</p>
              </div>
            </div>
          </div>

          {/* Right Box: Action Card */}
          <div className="bg-white text-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                Concierge Desk
              </span>
              <h4 className="text-xl font-editorial font-bold text-[#003366]">
                Plan Your Lucknow Visit
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Connect directly with Dr. Mishra’s patient travel coordinator for customized hotel reservations, hospital recovery suites, and confidential schedule slots.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy w-full justify-center py-3.5 text-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span>Request Out-of-Town Consultation</span>
              </button>

              <a
                href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello SIPS Hospital Concierge, I am planning to travel to Lucknow for surgery with Dr. R. K. Mishra. Please assist me with dates and travel planning.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-navy w-full justify-center py-2.5 text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>WhatsApp Travel Coordinator</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
