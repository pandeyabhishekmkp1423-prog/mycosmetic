import React from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Calendar,
  BedDouble,
  HeartPulse,
  Sparkles,
  Award
} from 'lucide-react';
import { hospitalData } from '../../data/hospitalData';
import { doctorData } from '../../data/doctorData';
import { HospitalGallerySlider } from '../home/HospitalGallerySlider';

interface HospitalViewProps {
  onNavigate: (route: string) => void;
}

export const HospitalView: React.FC<HospitalViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Hospital & Surgical Facilities</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-7 space-y-6">
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
              NABH Accredited Super Specialty Center
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight leading-tight">
              {hospitalData.name}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
              {hospitalData.overview}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <p className="text-base font-bold text-[#003366]">NABH</p>
                <p className="text-xs text-[#64748B] uppercase font-semibold mt-1">Accredited Quality</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <p className="text-base font-bold text-[#003366]">Class 100</p>
                <p className="text-xs text-[#64748B] uppercase font-semibold mt-1">Laminar OTs</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <p className="text-base font-bold text-[#003366]">24/7 ICU</p>
                <p className="text-xs text-[#64748B] uppercase font-semibold mt-1">Critical Care</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="btn-navy text-sm sm:text-base py-3.5 px-6 rounded-xl font-semibold cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span>Book Consultation at SIPS</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="py-3.5 px-6 rounded-xl border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-sm sm:text-base transition-colors cursor-pointer"
              >
                <span>Hospital Map & Travel</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-white relative group">
              <img
                src={hospitalData.gallery[0]}
                alt="SIPS Hospital Lucknow Facility"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#00A3E0]">SIPS Super Specialty Hospital</p>
                <p className="text-sm font-medium text-white/90">Sushrut Institute of Plastic Surgery (SIPS) Hospital, 29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Facilities Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">

        {/* Features */}
        <div>
          <div className="max-w-xl mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#00A3E0] uppercase block mb-1">
              Clinical Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
              Hospital Infrastructure Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitalData.features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-3 hover:border-[#00A3E0]/40 transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#003366] flex items-center justify-center border border-[#00A3E0]/20">
                  <CheckCircle2 className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <h3 className="text-base font-bold text-[#003366]">{feature.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Theatre & Rooms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#003366] flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">
                Operating Theatre Specifications
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {hospitalData.otDetails}
            </p>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] space-y-2">
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Air Purity:</strong> Class 100 laminar airflow with absolute HEPA sterile filtration</p>
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Instrumentation:</strong> Advanced bipolar radiofrequency, VASER & harmonic dissection</p>
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Anesthesia:</strong> Continuous multi-parameter cardiac hemodynamic monitoring by MD specialists</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#003366] flex items-center justify-center">
                <BedDouble className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">
                Patient Recovery & Deluxe Suites
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {hospitalData.patientRooms}
            </p>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] space-y-2">
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Privacy:</strong> Discretionary luxury suites with private attendant areas and en-suite facilities</p>
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Nursing:</strong> Dedicated 1:1 post-anesthetic specialized surgical nursing team</p>
              <p className="flex items-center gap-2"><strong className="text-[#003366]">Hospitality:</strong> Tailored nutritional meal programs and compassionate care coordinator</p>
            </div>
          </div>

        </div>

        {/* Gallery */}
        <div>
          <div className="max-w-xl mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#00A3E0] uppercase block mb-1">
              Facility Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
              Hospital &amp; Surgical Suite Gallery
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Authentic visual documentation of SIPS Super Specialty Hospital campus, Class 100 modular operating suites, and advanced surgical telemetry.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <HospitalGallerySlider autoPlayInterval={4500} />
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#002244] to-[#003366] text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl border border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
              Hospital Location & Timings
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              SIPS Super Specialty Hospital (Pvt. Ltd.)
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-2 pt-1">
              <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>{hospitalData.address}</span>
            </p>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>{hospitalData.timings}</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Prior appointment booking is strictly recommended to ensure in-depth confidential evaluation with Managing Director & Head of Plastic Surgery Dept., Dr. R.K. Mishra.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="py-3 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#003366] font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                Schedule Consultation
              </button>
              <a
                href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="btn-outline-navy border-white/30 text-white hover:bg-white/10 flex items-center gap-1.5"
                title="Call available 10:00 AM – 5:00 PM (Monday to Saturday)"
              >
                <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Call Helpline (10 AM – 5 PM)</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
