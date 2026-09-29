import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Plane, 
  Train, 
  Car, 
  ArrowRight 
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { hospitalData } from '../../data/hospitalData';

interface ContactViewProps {
  onNavigate: (route: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Contact & Hospital Location</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Hospital Desk & Location
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
            Contact & <span className="italic font-normal">Find Us</span>
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed pt-1">
            Located at Sushrut Institute of Plastic Surgery (SIPS Super Specialty Hospital) in historic Chowk, Lucknow. Welcoming patients across Uttar Pradesh, India, and overseas.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact info */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5 shadow-xs">
              <h2 className="text-xl font-heading font-bold text-[#003366]">
                Direct Hospital Helplines
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Phone className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Direct Consultation Line</p>
                    <a href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#003366] hover:text-[#00A3E0] text-base">
                      {doctorData.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">WhatsApp Coordinator</p>
                    <a 
                      href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="font-bold text-emerald-800 hover:underline"
                    >
                      {doctorData.whatsappNumber} (Direct Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Mail className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Clinical Email Desk</p>
                    <a href={`mailto:${doctorData.contactEmail}`} className="font-bold text-[#003366] hover:underline">
                      {doctorData.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Clock className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">OPD Operating Hours</p>
                    <p className="font-bold text-[#0F172A]">{hospitalData.timings}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>

            {/* Travel Guide */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-heading font-bold text-[#003366]">
                Travel Guide for Outstation Patients
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Patients regularly travel from across Uttar Pradesh, Bihar, Delhi NCR, and internationally for specialized plastic surgery with Dr. Mishra.
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <Plane className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#003366]">Airport: </strong>
                    <span className="text-slate-600">Chaudhary Charan Singh International Airport (LKO) — approx. 35–40 minutes by taxi.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#003366]">Railway Station: </strong>
                    <span className="text-slate-600">Lucknow Charbagh (LKO/LJN) — approx. 20 minutes by cab or metro.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#003366]">Landmark: </strong>
                    <span className="text-slate-600">Near King George's Medical University (KGMU), Chowk Stadium, Shah Mina Road. Dedicated patient parking on-site.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Hospital Map */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#003366]">
                    Hospital Location
                  </h3>
                  <p className="text-sm text-slate-500">Sushrut Institute of Plastic Surgery (SIPS) Hospital, 29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#003366]">
                  Mon – Sat OPD
                </span>
              </div>

              <div className="aspect-[16/11] rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-100">
                <iframe
                  title="SIPS Hospital Lucknow Map"
                  src="https://maps.google.com/maps?q=Sushrut+Institute+of+Plastic+Surgery+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-slate-600 flex items-center justify-between">
                <span>Need travel coordination or guest house assistance?</span>
                <a
                  href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello SIPS Hospital, I need directions / travel assistance.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#003366] hover:text-[#00A3E0] hover:underline"
                >
                  Chat with Desk →
                </a>
              </div>
            </div>

            {/* Quick Contact Banner */}
            <div className="bg-[#002244] text-white p-8 rounded-2xl border border-[#003366] space-y-3 shadow-md">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
                Hospital Concierge
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                Have a Quick Surgical Question?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our senior care coordinator to discuss procedure suitability, costs, and surgeon availability.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('ask-question')}
                  className="btn-navy bg-white text-[#003366] hover:bg-slate-100"
                >
                  <span>Ask Dr. Mishra a Question</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
