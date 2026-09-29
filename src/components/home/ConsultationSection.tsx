import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  Video, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  User,
  Mail,
  MapPin
} from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';
import { proceduresData } from '../../data/proceduresData';

interface ConsultationSectionProps {
  onNavigate?: (route: string) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ onNavigate }) => {
  const [procedure, setProcedure] = useState<string>('Rhinoplasty (Nose Reshaping)');
  const [consultationType, setConsultationType] = useState<'IN_PERSON' | 'VIRTUAL'>('IN_PERSON');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM – 1:00 PM (Morning OPD)');
  
  // Patient Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addLead } = useConsultationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const lead = addLead({
        name,
        phone,
        email: email || `${phone.replace(/\D/g, '')}@lead.mycosmeticsurgery.in`,
        procedure,
        city: city || 'Lucknow',
        preferredDate,
        timeSlot,
        consultationType,
        notes
      });

      setBookingSuccess(lead.id);
      setIsSubmitting(false);
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Dr. R.K. Mishra's Clinic! I am looking to schedule a consultation for ${procedure}. Name: ${name || 'Patient'}.`
    );
    window.open(`https://wa.me/919795800800?text=${text}`, '_blank');
  };

  return (
    <section id="consultation" className="scroll-mt-28 py-14 sm:py-20 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] border-t border-[#CBD5E1] relative overflow-hidden">
      
      {/* Background Decorative Auras */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-[#003366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Schedule Your Visit with <span className="italic text-[#00A3E0] font-normal">Dr. R.K. Mishra.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Take the first step toward your aesthetic transformation. Reserve an in-person OPD slot at SIPS Super Specialty Hospital, Lucknow, or request a virtual video consultation.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Hospital & Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Instant Booking Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#003366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#003366]">Sushrut Institute of Plastic Surgery (SIPS) Hospital</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India</p>
                </div>
              </div>

              {/* Consultation Timings */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">OPD Timings:</span> 10:00AM - 5:00PM
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">Accreditation:</span> NABH Certified Super Specialty Center
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">Personal Evaluation:</span> 1-on-1 directly with Dr. R.K. Mishra
                  </div>
                </div>
              </div>

              {/* Fast Connect Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+919795800800"
                  className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#003366] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#00A3E0]" />
                  <span>Call 9795800800</span>
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Direct</span>
                </button>
              </div>

              {/* Zero Factory-Line Guarantee Box */}
              <div className="p-4 rounded-2xl bg-[#003366]/5 border border-[#003366]/10 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-[#003366] mb-1">Our Clinical Pledge to You:</p>
                Strictly zero junior-doctor handoffs. Every diagnostic assessment, surgical procedure, and post-op check is personally executed by ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra.
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative">

              {bookingSuccess ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#003366]">
                      Consultation Request Confirmed!
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                      Thank you, <strong className="text-[#003366]">{name}</strong>. Our clinical coordinator will reach out to you within 2 hours to confirm your scheduled slot.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs space-y-1.5 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Reference ID:</span>
                      <span className="font-mono font-bold text-[#003366]">{bookingSuccess}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Procedure:</span>
                      <span className="font-semibold text-slate-800">{procedure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Format:</span>
                      <span className="font-semibold text-[#00A3E0]">
                        {consultationType === 'IN_PERSON' ? 'In-Person (SIPS Hospital)' : 'Virtual Video'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Preferred Slot:</span>
                      <span className="font-semibold text-slate-800">{preferredDate} • {timeSlot}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="btn-navy py-3 px-6 text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Confirm via WhatsApp Instantly</span>
                    </button>
                    <button
                      onClick={() => setBookingSuccess(null)}
                      className="py-3 px-5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* 1. Consultation Format Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      1. Select Consultation Mode:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setConsultationType('IN_PERSON')}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          consultationType === 'IN_PERSON'
                            ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                          <Building2 className={`w-4 h-4 ${consultationType === 'IN_PERSON' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                          <span>In-Person OPD</span>
                        </div>
                        <p className={`text-[11px] mt-1 ${consultationType === 'IN_PERSON' ? 'text-slate-200' : 'text-slate-500'}`}>
                          SIPS Super Specialty Hospital, Lucknow
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultationType('VIRTUAL')}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          consultationType === 'VIRTUAL'
                            ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                          <Video className={`w-4 h-4 ${consultationType === 'VIRTUAL' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                          <span>Virtual Video OPD</span>
                        </div>
                        <p className={`text-[11px] mt-1 ${consultationType === 'VIRTUAL' ? 'text-slate-200' : 'text-slate-500'}`}>
                          For Outstation &amp; International Patients
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* 2. Procedure of Interest Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      2. Procedure of Interest:
                    </label>
                    <select
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366] transition-all"
                    >
                      <option value="Rhinoplasty (Nose Reshaping)">Rhinoplasty (Structural Nose Reshaping &amp; Septoplasty)</option>
                      <option value="Gynecomastia (Male Chest Sculpting)">Gynecomastia (Male Chest Sculpting)</option>
                      <option value="HD 360° Liposuction">HD 360° Liposuction &amp; Waist Contouring</option>
                      <option value="Profile Harmony & Rhinoplasty">Profile Harmony &amp; Rhinoplasty</option>
                      <option value="Tummy Tuck (Abdominoplasty)">Tummy Tuck (Abdominoplasty &amp; Muscle Repair)</option>
                      <option value="Breast Augmentation">Breast Augmentation (Dual-Plane Silicone Implants)</option>
                    </select>
                  </div>

                  {/* 3. Preferred Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        OPD Time Slot:
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                      >
                        <option value="10:30 AM – 1:00 PM (Morning OPD)">10:30 AM – 1:00 PM (Morning OPD)</option>
                        <option value="2:00 PM – 3:30 PM (Afternoon OPD)">2:00 PM – 3:30 PM (Afternoon OPD)</option>
                        <option value="3:30 PM – 5:00 PM (Evening OPD)">3:30 PM – 5:00 PM (Evening OPD)</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. Patient Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Your Full Name: *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        WhatsApp / Phone Number: *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98390 12345"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        City / Location:
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="e.g. Lucknow / Delhi / Kanpur"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Email Address (Optional):
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="e.g. rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Specific Goals / Questions for Dr. Mishra:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us any specific concerns, previous surgeries, or expectations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full py-4 px-8 rounded-2xl bg-[#003366] hover:bg-[#002244] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Calendar className="w-5 h-5 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                    <span>{isSubmitting ? 'Confirming Your Slot...' : 'Confirm In-Person / Virtual Consultation'}</span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 font-medium">
                    🔒 100% Medical Privacy Guaranteed. We respect your confidentiality. Zero spam.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
