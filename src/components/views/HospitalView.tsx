import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar,
  BedDouble,
  HeartPulse,
  Award
} from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { doctorData } from '../../data/doctorData';

interface HospitalViewProps {
  onNavigate: (route: string) => void;
}

export const HospitalView: React.FC<HospitalViewProps> = ({ onNavigate }) => {
  return (
    <div id="hospital-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Hospital & Surgical Suites</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6FAFD] border border-[#DCE7F0] text-xs font-bold text-[#1769AA] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#1769AA]" />
              <span>NABH Accredited Healthcare Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
              {hospitalData.name}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              {hospitalData.overview}
            </p>

            {/* Quick Accreditation Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-sm font-bold text-[#102A43]">NABH Accredited</p>
                <p className="text-xs text-gray-500">Quality & Safety</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-sm font-bold text-[#1769AA]">Laminar OTs</p>
                <p className="text-xs text-gray-500">HEPA Positive Pressure</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0]">
                <p className="text-sm font-bold text-[#102A43]">24/7 ICU & Anesthesia</p>
                <p className="text-xs text-gray-500">Critical Care Support</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="px-7 py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C89448]" />
                <span>Book In-Person Consultation at SIPS</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-white hover:bg-[#F6FAFD] text-[#102A43] border border-[#DCE7F0] text-xs sm:text-sm font-semibold rounded-xl transition-all text-center"
              >
                Hospital Map & Directions
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#DCE7F0]">
              <img
                src={hospitalData.gallery[0]}
                alt="SIPS Hospital Lucknow Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Facilities & Infrastructure Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Core Infrastructure Highlights */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block mb-1">
              Advanced Clinical Capability
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43]">
              State-of-the-Art Hospital Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitalData.features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#102A43]">{feature.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Theatre Suites & Safety Protocols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-white border border-[#DCE7F0] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                Operating Theatre Specifications
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {hospitalData.otDetails}
            </p>
            <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs text-gray-600 space-y-1">
              <p><strong>Air Quality:</strong> Class 100 laminar airflow HEPA filtration</p>
              <p><strong>Electrocautery:</strong> Advanced bipolar & harmonic scalpel systems</p>
              <p><strong>Monitoring:</strong> Multi-parameter continuous invasive hemodynamic tracking</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#DCE7F0] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                <BedDouble className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                Patient Recovery & Inpatient Suites
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {hospitalData.patientRooms}
            </p>
            <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs text-gray-600 space-y-1">
              <p><strong>Discretion:</strong> Private elevator access and dedicated discharge lounges</p>
              <p><strong>Nursing:</strong> 1:1 post-anesthesia recovery nursing</p>
              <p><strong>Hospitality:</strong> Personalized dietary catering and attendant accommodations</p>
            </div>
          </div>

        </div>

        {/* Hospital Photo Gallery */}
        <div>
          <h3 className="text-xl font-serif font-bold text-[#102A43] mb-6">
            SIPS Hospital Infrastructure Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hospitalData.gallery.map((imgUrl, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE7F0] shadow-xs group">
                <img
                  src={imgUrl}
                  alt={`SIPS Facility view ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location & Visiting Hours */}
        <div className="p-8 rounded-3xl bg-[#102A43] text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C89448]">
              Visiting & OPD Hours
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
              Sushrut Institute of Plastic Surgery (SIPS)
            </h3>
            <p className="text-xs text-gray-300 flex items-start gap-2 pt-2">
              <MapPin className="w-4 h-4 text-[#C89448] shrink-0 mt-0.5" />
              <span>{hospitalData.address}</span>
            </p>
            <p className="text-xs text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C89448] shrink-0" />
              <span>{hospitalData.timings}</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1B2026] border border-[#2A313A] space-y-3">
            <h4 className="text-sm font-bold text-[#C89448]">Consultation Appointments</h4>
            <p className="text-xs text-gray-300">
              Prior appointment is recommended for comprehensive surgical evaluation with Dr. R. K. Mishra.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2.5 bg-[#1769AA] hover:bg-[#a37f4e] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline</span>
              </a>
              <button
                onClick={() => onNavigate('book-consultation')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-lg transition-colors"
              >
                Book Online
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
