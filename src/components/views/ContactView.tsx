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
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { hospitalData } from '../../data/hospitalData';

interface ContactViewProps {
  onNavigate: (route: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  return (
    <div id="contact-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Contact & Location</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Visit Dr. R. K. Mishra
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
            Consultation Desk & Hospital Location
          </h1>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Located at Sushrut Institute of Plastic Surgery (SIPS) in historic Chowk, Lucknow — easily accessible for local, national, and international patients.
          </p>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Cards & Travel Logistics */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Contact Details */}
            <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Direct Hospital Helplines
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                  <Phone className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Consultation Line</p>
                    <a href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#102A43] hover:text-[#1769AA]">
                      {doctorData.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-emerald-800 font-semibold uppercase">WhatsApp Coordinator</p>
                    <a 
                      href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="font-bold text-emerald-900 hover:underline"
                    >
                      {doctorData.whatsappNumber} (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                  <Mail className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Doctor Email</p>
                    <a href={`mailto:${doctorData.contactEmail}`} className="font-medium text-[#102A43] hover:text-[#1769AA]">
                      {doctorData.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                  <Clock className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">OPD Timings</p>
                    <p className="font-medium text-[#102A43]">{hospitalData.timings}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="w-full py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C89448]" />
                  <span>Book Appointment Online</span>
                </button>
              </div>
            </div>

            {/* Travel Logistics for Outstation Patients */}
            <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Travel Guide for Outstation Patients
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Over 40% of Dr. Mishra’s patients travel from Varanasi, Prayagraj, Gorakhpur, Kanpur, Bihar, Delhi NCR, and overseas.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Plane className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">From Airport: </strong>
                    <span className="text-gray-600">Chaudhary Charan Singh International Airport (LKO) — Approx. 40 mins via VIP Road / Hardoi Road.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">From Railway Station: </strong>
                    <span className="text-gray-600">Lucknow Charbagh (LKO / LJN) — Approx. 20–25 mins by taxi or metro (Chowk station nearby).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Hospital Landmark: </strong>
                    <span className="text-gray-600">Near King George’s Medical University (KGMU) & Chowk Stadium, Shah Mina Road. Dedicated patient valet parking available.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hospital Map & Interactive Visual */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Map Visual */}
            <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#102A43]">
                    Hospital Campus
                  </h3>
                  <p className="text-xs text-gray-500">29 Shah Mina Road, Chowk, Lucknow</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase rounded-md border border-emerald-200">
                  Open Mon–Sat
                </span>
              </div>

              {/* Simulated Map Container */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-[#DCE7F0] bg-[#E5E3DF]">
                <iframe
                  title="SIPS Hospital Lucknow Map"
                  src="https://maps.google.com/maps?q=Sushrut+Institute+of+Plastic+Surgery+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs text-gray-600 flex items-center justify-between">
                <span>Need assistance with navigation or hotel stays?</span>
                <a
                  href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello SIPS Hospital, I need directions / travel assistance for my appointment.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1769AA] hover:underline"
                >
                  Ask Coordinator →
                </a>
              </div>
            </div>

            {/* Quick Consultation Request Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#102A43] text-white space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C89448]">
                Quick Callback Request
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Request a Callback from SIPS Desk
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Prefer a phone call? Leave your contact details, and Dr. Mishra’s consultation coordinator will contact you promptly.
              </p>
              
              <button
                onClick={() => onNavigate('book-consultation')}
                className="w-full py-3 bg-[#1769AA] hover:bg-[#a37f4e] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Callback & Booking Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
