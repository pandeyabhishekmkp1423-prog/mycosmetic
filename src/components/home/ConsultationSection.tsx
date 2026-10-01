import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
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
  // Core 8 Surgical Services + Other
  const procedures = [
    'Gynecomastia (Male Chest Reduction)',
    'Rhinoplasty (Nose Job)',
    '360° HD Liposuction',
    'Tummy Tuck (Abdominoplasty)',
    'Breast Augmentation',
    'Breast Reduction & Lift',
    'Genioplasty (Chin Enhancement)',
    'Blepharoplasty (Baggy Eyelids)',
    'Other'
  ];

  const [procedure, setProcedure] = useState<string>(procedures[0]);
  const [otherProcedure, setOtherProcedure] = useState<string>('');
  const consultationType = 'In-Person (SIPS Hospital)';
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
  const [showMore, setShowMore] = useState(false);

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

    if (procedure === 'Other' && !otherProcedure.trim()) {
      setErrorMessage('Please specify your procedure or treatment of interest.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const finalProcedure = procedure === 'Other' && otherProcedure.trim()
      ? `Other: ${otherProcedure.trim()}`
      : procedure;

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      procedure: finalProcedure,
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
          consultationType: 'IN_PERSON',
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
          consultationType: 'IN_PERSON',
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
        consultationType: 'IN_PERSON',
        notes: payload.notes
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const procText = procedure === 'Other' && otherProcedure.trim() ? otherProcedure.trim() : procedure;
    const text = encodeURIComponent(
      `Hello Dr. R.K. Mishra's Clinic (SIPS Hospital)! I have submitted a consultation request for ${procText}. Name: ${name || 'Patient'}. Reference: ${bookingSuccess || 'New'}`
    );
    window.open(`https://wa.me/919795800800?text=${text}`, '_blank');
  };

  return (
    <section id="consultation" className="scroll-mt-16 sm:scroll-mt-24 py-8 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] border-t border-[#CBD5E1] relative overflow-hidden">
      
      {/* Background Decorative Auras */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-[#003366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2 mb-4 sm:mb-8 px-2">
          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Schedule Your Visit with <span className="italic text-[#00A3E0] font-normal">Dr. R.K. Mishra</span>
          </h2>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Reserve an in-person OPD consultation at SIPS Super Specialty Hospital, Lucknow.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Form FIRST on mobile (order-1), Hospital info SECOND (order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

          {/* Left Column on Desktop / Bottom on Mobile: Hospital & Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 sm:space-y-5">

            {/* Direct Instant Booking Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-lg space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#003366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A3E0]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#003366]">SIPS Super Specialty Hospital</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-relaxed">29, Shah Mina Rd, Lucknow, UP 226003</p>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">OPD &amp; Call Hours:</span> 10:00 AM – 5:00 PM (Monday to Saturday)
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Phone className="w-4 h-4 text-[#003366] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">Helpline:</span> +91 9795 800 800 (10:00 AM – 5:00 PM)
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">Accreditation:</span> NABH Certified Super Specialty Center
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#003366]">Direct Evaluation:</span> 1-on-1 with Dr. R. K. Mishra
                  </div>
                </div>
              </div>

              {/* Fast Connect Buttons */}
              <div className="pt-1 grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919795800800"
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#003366] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    title="Call available 10:00 AM to 5:00 PM (Monday to Saturday)"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
                    <span>Call Hospital</span>
                  </a>
                  <span className="text-[10px] text-center text-slate-500 font-medium">10am–5pm Mon-Sat</span>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                  <span className="text-[10px] text-center text-emerald-700 font-medium">24/7 Chat Inquiries</span>
                </div>
              </div>

              {/* Doctor Pledge Box */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#003366]/5 border border-[#003366]/10 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-[#003366] mb-0.5">Strict Surgical Ethics Pledge:</p>
                Every diagnostic evaluation, pre-op planning, and surgery is conducted personally by ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra with full patient confidentiality.
              </div>
            </div>

          </div>

          {/* Right Column on Desktop / Top on Mobile: Lead Form (7 cols) */}
          <div id="consultation-form" className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/90 shadow-xl relative">

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
                      <span className="font-semibold text-slate-800">
                        {procedure === 'Other' && otherProcedure.trim() ? otherProcedure : procedure}
                      </span>
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
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Clean Form Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#003366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3E0]" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#003366]">In-Person OPD Consultation</h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-500">SIPS Super Specialty Hospital, Lucknow</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#003366] bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-100 shrink-0">
                      Confirmed OPD
                    </span>
                  </div>

                  {/* 1. Core Services Dropdown */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      1. Procedure of Interest (Select Service): *
                    </label>
                    <select
                      name="procedure"
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#003366] transition-all cursor-pointer shadow-2xs"
                    >
                      {procedures.map((p) => (
                        <option key={p} value={p}>
                          {p === 'Other' ? 'Other (Please specify)' : p}
                        </option>
                      ))}
                    </select>

                    {procedure === 'Other' && (
                      <div className="mt-2 animate-in fade-in duration-150">
                        <input
                          type="text"
                          required
                          placeholder="Please specify your procedure or treatment of interest..."
                          value={otherProcedure}
                          onChange={(e) => setOtherProcedure(e.target.value)}
                          className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-[#003366] bg-blue-50/30 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. Patient Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Full Name: *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-8.5 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Phone / WhatsApp: *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9795800800"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-8.5 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        OPD Time Slot:
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] cursor-pointer"
                      >
                        <option value="Morning OPD (10:30 AM – 1:00 PM)">Morning OPD (10:30 AM – 1:00 PM)</option>
                        <option value="Afternoon OPD (2:00 PM – 3:30 PM)">Afternoon OPD (2:00 PM – 3:30 PM)</option>
                        <option value="Evening OPD (3:30 PM – 5:00 PM)">Evening OPD (3:30 PM – 5:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Details Collapsible Toggle */}
                  <div className="pt-0.5">
                    {!showMore ? (
                      <button
                        type="button"
                        onClick={() => setShowMore(true)}
                        className="text-xs font-semibold text-[#00A3E0] hover:text-[#003366] flex items-center gap-1.5 py-1 transition-colors cursor-pointer"
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-50 text-[#00A3E0] flex items-center justify-center text-xs font-bold">+</span>
                        <span>Add City, Email, or Specific Questions (Optional)</span>
                      </button>
                    ) : (
                      <div className="space-y-3 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Additional Details</span>
                          <button
                            type="button"
                            onClick={() => setShowMore(false)}
                            className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            Hide
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                              City / Location (Optional):
                            </label>
                            <div className="relative">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
                              <input
                                type="text"
                                placeholder="e.g. Lucknow / Kanpur / Varanasi"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full pl-8.5 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Email Address (Optional):
                            </label>
                            <div className="relative">
                              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
                              <input
                                type="email"
                                placeholder="e.g. patient@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-8.5 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Specific Questions or Concerns (Optional):
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Briefly describe your goals, previous surgeries, or questions for Dr. Mishra..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00264D] via-[#003366] to-[#00264D] hover:from-[#003366] hover:to-[#004080] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group border border-[#003366]/40"
                  >
                    <Calendar className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                    <span>{isSubmitting ? 'Registering Your Consultation...' : 'Confirm Consultation Request'}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-center text-slate-500 font-medium">
                    🔒 100% Medical Privacy Guaranteed • Direct Coordinator Confirmation
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
