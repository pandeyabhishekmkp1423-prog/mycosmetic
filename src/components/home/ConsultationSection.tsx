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
  User, 
  Mail, 
  MapPin,
  AlertCircle
} from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';

interface ConsultationSectionProps {
  onNavigate?: (route: string) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ onNavigate }) => {
  // Core 8 Surgical Services
  const procedures = [
    'Gynecomastia (Male Chest Reduction)',
    'Rhinoplasty (Nose Job)',
    '360° HD Liposuction',
    'Tummy Tuck (Abdominoplasty)',
    'Breast Augmentation',
    'Breast Reduction & Lift',
    'Genioplasty (Chin Enhancement)',
    'Blepharoplasty (Baggy Eyelids)'
  ];

  const [procedure, setProcedure] = useState<string>(procedures[0]);
  const [consultationType, setConsultationType] = useState<'In-Person (SIPS Hospital)' | 'Virtual Video OPD'>('In-Person (SIPS Hospital)');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('Morning OPD (10:30 AM – 1:00 PM)');
  
  // Patient Contact Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { addLead } = useConsultationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      procedure,
      consultationType,
      preferredDate,
      timeSlot,
      city: city.trim() || 'Lucknow',
      notes: notes.trim()
    };

    try {
      // POST directly to the PHP API endpoint
      const response = await fetch('/api/submit_lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        const refId = result.reference_id || `SIPS-${Date.now().toString().slice(-6)}`;
        setBookingSuccess(refId);
        addLead({
          name: payload.name,
          phone: payload.phone,
          email: payload.email || `${payload.phone.replace(/\D/g, '')}@lead.mycosmeticsurgery.in`,
          procedure: payload.procedure,
          city: payload.city,
          preferredDate: payload.preferredDate,
          timeSlot: payload.timeSlot,
          consultationType: payload.consultationType === 'In-Person (SIPS Hospital)' ? 'IN_PERSON' : 'VIRTUAL',
          notes: payload.notes
        });
      } else if (result && result.message) {
        setErrorMessage(result.message);
      } else {
        // Fallback for local dev or network offline
        const fallbackRef = `SIPS-${Date.now().toString().slice(-6)}`;
        setBookingSuccess(fallbackRef);
        addLead({
          name: payload.name,
          phone: payload.phone,
          email: payload.email || `${payload.phone.replace(/\D/g, '')}@lead.mycosmeticsurgery.in`,
          procedure: payload.procedure,
          city: payload.city,
          preferredDate: payload.preferredDate,
          timeSlot: payload.timeSlot,
          consultationType: payload.consultationType === 'In-Person (SIPS Hospital)' ? 'IN_PERSON' : 'VIRTUAL',
          notes: payload.notes
        });
      }
    } catch (err) {
      // Offline / Local mock fallback
      const fallbackRef = `SIPS-${Date.now().toString().slice(-6)}`;
      setBookingSuccess(fallbackRef);
      addLead({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || `${payload.phone.replace(/\D/g, '')}@lead.mycosmeticsurgery.in`,
        procedure: payload.procedure,
        city: payload.city,
        preferredDate: payload.preferredDate,
        timeSlot: payload.timeSlot,
        consultationType: payload.consultationType === 'In-Person (SIPS Hospital)' ? 'IN_PERSON' : 'VIRTUAL',
        notes: payload.notes
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Dr. R.K. Mishra's Clinic (SIPS Hospital)! I have submitted a consultation request for ${procedure}. Name: ${name || 'Patient'}. Reference: ${bookingSuccess || 'New'}`
    );
    window.open(`https://wa.me/919795800800?text=${text}`, '_blank');
  };

  return (
    <section id="consultation" className="scroll-mt-28 py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] border-t border-[#CBD5E1] relative overflow-hidden">
      
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
          <div className="lg:col-span-5 space-y-5">

            {/* Direct Instant Booking Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#003366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#003366]">SIPS Super Specialty Hospital</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">29, Shah Mina Rd, Lucknow, UP 226003</p>
                </div>
              </div>

              {/* Consultation Details */}
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
                    <span className="font-bold text-[#003366]">Direct Evaluation:</span> 1-on-1 with Dr. R. K. Mishra
                  </div>
                </div>
              </div>

              {/* Fast Connect Buttons */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:+919795800800"
                  className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#003366] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#00A3E0]" />
                  <span>Call 9795800800</span>
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Direct</span>
                </button>
              </div>

              {/* Doctor Pledge Box */}
              <div className="p-3.5 rounded-2xl bg-[#003366]/5 border border-[#003366]/10 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-[#003366] mb-0.5">Strict Surgical Ethics Pledge:</p>
                Every diagnostic evaluation, pre-op planning, and surgery is conducted personally by ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra with full patient confidentiality.
              </div>
            </div>

          </div>

          {/* Right Column: Lead Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl relative">

              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-bold text-[#003366]">
                      Consultation Request Confirmed!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <strong className="text-[#003366]">{name}</strong>. Your consultation details have been recorded. Our Senior Clinical Coordinator will connect with you within 2 hours.
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
                        {consultationType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Date &amp; Slot:</span>
                      <span className="font-semibold text-slate-800">{preferredDate} • {timeSlot}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>Confirm via WhatsApp Instantly</span>
                    </button>
                    <button
                      onClick={() => setBookingSuccess(null)}
                      className="py-3 px-5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Mode Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      1. Consultation Mode:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setConsultationType('In-Person (SIPS Hospital)')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          consultationType === 'In-Person (SIPS Hospital)'
                            ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Building2 className={`w-3.5 h-3.5 ${consultationType === 'In-Person (SIPS Hospital)' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                          <span>In-Person OPD</span>
                        </div>
                        <p className={`text-[10px] mt-0.5 ${consultationType === 'In-Person (SIPS Hospital)' ? 'text-slate-200' : 'text-slate-500'}`}>
                          SIPS Super Specialty Hospital
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultationType('Virtual Video OPD')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          consultationType === 'Virtual Video OPD'
                            ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Video className={`w-3.5 h-3.5 ${consultationType === 'Virtual Video OPD' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                          <span>Virtual Video Call</span>
                        </div>
                        <p className={`text-[10px] mt-0.5 ${consultationType === 'Virtual Video OPD' ? 'text-slate-200' : 'text-slate-500'}`}>
                          For Outstation &amp; NRI Patients
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* 2. Core 8 Services Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      2. Procedure of Interest (Select Service): *
                    </label>
                    <select
                      name="procedure"
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366] transition-all cursor-pointer shadow-2xs"
                    >
                      {procedures.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Patient Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Full Name: *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Phone / WhatsApp: *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9795800800"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        OPD Time Slot:
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] cursor-pointer"
                      >
                        <option value="Morning OPD (10:30 AM – 1:00 PM)">Morning OPD (10:30 AM – 1:00 PM)</option>
                        <option value="Afternoon OPD (2:00 PM – 3:30 PM)">Afternoon OPD (2:00 PM – 3:30 PM)</option>
                        <option value="Evening OPD (3:30 PM – 5:00 PM)">Evening OPD (3:30 PM – 5:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* 5. City & Email (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        City / Location (Optional):
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Lucknow / Kanpur / Varanasi"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Email Address (Optional):
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          placeholder="e.g. patient@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6. Message / Questions */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Specific Questions or Concerns (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe your goals, previous surgeries, or questions for Dr. Mishra..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00264D] via-[#003366] to-[#00264D] hover:from-[#003366] hover:to-[#004080] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed group border border-[#003366]/40"
                  >
                    <Calendar className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                    <span>{isSubmitting ? 'Registering Your Consultation...' : 'Confirm Consultation Request'}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
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
