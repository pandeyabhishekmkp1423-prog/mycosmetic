import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Video, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';
import { doctorData } from '../../data/doctorData';
import { proceduresData } from '../../data/proceduresData';

interface BookConsultationViewProps {
  onNavigate: (route: string) => void;
  preselectedProcedure?: string;
}

export const BookConsultationView: React.FC<BookConsultationViewProps> = ({
  onNavigate,
  preselectedProcedure
}) => {
  const [step, setStep] = useState<number>(1);
  const [procedure, setProcedure] = useState<string>(preselectedProcedure || 'Rhinoplasty');
  const [consultationType, setConsultationType] = useState<'IN_PERSON' | 'VIRTUAL'>('IN_PERSON');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM – 1:00 PM (Morning OPD)');
  
  // Patient Info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);

  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const { addLead } = useConsultationStore();
  const canSubmit = Boolean(name.trim() && phone.trim() && email.trim() && privacyConsent);

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const lead = addLead({
      name,
      phone,
      email,
      procedure,
      city,
      preferredDate,
      timeSlot,
      consultationType,
      notes
    });

    setBookingReference(lead.id);
    setStep(4); // Success step
  };

  return (
    <div id="book-consultation-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Book Consultation</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
            Private Surgical Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] tracking-tight">
            Schedule with Dr. R. K. Mishra
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Sushrut Institute of Plastic Surgery (SIPS Hospital) • 29 Shah Mina Road, Lucknow
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="mb-8 grid grid-cols-3 gap-2 text-xs">
            {[
              ['1', 'Procedure & Mode'],
              ['2', 'Date & Slot'],
              ['3', 'Your Details']
            ].map(([number, label], index) => {
              const active = step === index + 1;
              const complete = step > index + 1;
              return (
                <div
                  key={label}
                  className={`min-h-12 rounded-lg border px-2.5 py-2 font-bold ${
                    active
                      ? 'border-[#1769AA] bg-[#0B2A5B] text-white shadow-sm'
                      : complete
                        ? 'border-[#1769AA]/40 bg-[#EEF7FC] text-[#0B2A5B]'
                        : 'border-[#DCE7F0] bg-white text-[#718096]'
                  }`}
                >
                  <span className="mb-1 block text-[10px] opacity-80">Step {number}</span>
                  <span className="block leading-4">{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Card Form */}
        <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-10 shadow-sm">
          
          {/* STEP 1: Procedure & Format */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-1">
                  1. Select Your Procedure of Interest
                </h3>
                <p className="text-xs text-gray-500">
                  Select the primary treatment or aesthetic area you wish to discuss with Dr. Mishra.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {proceduresData.map((proc) => (
                  <button
                    key={proc.slug}
                    type="button"
                    onClick={() => setProcedure(proc.title)}
                    aria-pressed={procedure === proc.title}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      procedure === proc.title
                        ? 'bg-[#F6FAFD] border-[#1769AA] font-bold text-[#102A43] ring-1 ring-[#1769AA]'
                        : 'bg-white border-[#DCE7F0] text-gray-700 hover:bg-[#F6FAFD]'
                    }`}
                  >
                    <p className="truncate font-semibold">{proc.title}</p>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{proc.category}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#DCE7F0]">
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-1">
                  Consultation Format
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Choose between an in-person hospital evaluation or an online video pre-assessment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setConsultationType('IN_PERSON')}
                    role="button"
                    tabIndex={0}
                    aria-pressed={consultationType === 'IN_PERSON'}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') setConsultationType('IN_PERSON');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      consultationType === 'IN_PERSON'
                        ? 'bg-[#F6FAFD] border-[#1769AA] ring-1 ring-[#1769AA]'
                        : 'bg-white border-[#DCE7F0] hover:bg-[#F6FAFD]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[#102A43]">In-Person Clinical OPD</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      SIPS Hospital, Chowk, Lucknow. Includes physical anatomical assessment & treatment plan.
                    </p>
                  </div>

                  <div
                    onClick={() => setConsultationType('VIRTUAL')}
                    role="button"
                    tabIndex={0}
                    aria-pressed={consultationType === 'VIRTUAL'}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') setConsultationType('VIRTUAL');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      consultationType === 'VIRTUAL'
                        ? 'bg-[#F6FAFD] border-[#1769AA] ring-1 ring-[#1769AA]'
                        : 'bg-white border-[#DCE7F0] hover:bg-[#F6FAFD]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#DCE7F0] flex items-center justify-center text-[#1769AA]">
                        <Video className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[#102A43]">Virtual Video Consultation</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      High-definition video call for outstation / international patients prior to Lucknow travel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-7 py-3 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue to Date Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-1">
                  2. Select Preferred Date & Time Window
                </h3>
                <p className="text-xs text-gray-500">
                  Doctor OPD is active Monday through Saturday at SIPS Hospital Lucknow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl text-xs focus:outline-hidden focus:border-[#1769AA]"
                  />
                  <p className="text-[11px] text-gray-600 mt-1">Our coordinator will confirm exact slot availability.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="space-y-2">
                    {[
                      '10:30 AM – 1:00 PM (Morning OPD)',
                      '4:00 PM – 6:30 PM (Evening OPD)'
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          timeSlot === slot
                            ? 'bg-[#F6FAFD] border-[#1769AA] font-bold text-[#102A43] ring-1 ring-[#1769AA]'
                            : 'bg-white border-[#DCE7F0] text-gray-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-6 border-t border-[#DCE7F0] sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-7 py-3 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-1">
                  3. Enter Patient Information
                </h3>
                <p className="text-xs text-gray-500">
                  All personal health details are confidential and securely handled under clinical discretion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow / Kanpur / Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Specific Questions / Goals for Dr. Mishra (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your aesthetic goals, prior procedures (if any), or specific concerns..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="rounded border-[#DCE7F0] text-[#1769AA] focus:ring-[#1769AA]"
                  />
                  <label htmlFor="consent-check" className="text-xs text-gray-600">
                    I agree to be contacted by Dr. R. K. Mishra’s clinical coordinator via call/WhatsApp to confirm appointment timing.
                  </label>
                </div>
              </div>

              {/* Summary recap */}
              <div className="p-4 rounded-2xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-gray-500">Selected Procedure: </span>
                  <strong className="text-[#102A43]">{procedure}</strong>
                </div>
                <div>
                  <span className="text-gray-500">Format: </span>
                  <strong className="text-[#102A43]">{consultationType === 'IN_PERSON' ? 'In-Person OPD' : 'Virtual'}</strong>
                </div>
                <div>
                  <span className="text-gray-500">Date: </span>
                  <strong className="text-[#102A43]">{preferredDate}</strong>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-6 border-t border-[#DCE7F0] sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#102A43] px-8 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#1769AA] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4 text-[#C89448]" />
                  <span>Confirm Consultation Request</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation Screen */}
          {step === 4 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA]">
                  Booking Reference #{bookingReference}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43]">
                  Consultation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                  Thank you, <strong>{name}</strong>. Dr. R. K. Mishra’s clinical desk at SIPS Hospital Lucknow has received your consultation booking for <strong>{procedure}</strong> on <strong>{preferredDate}</strong>.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#F6FAFD] border border-[#DCE7F0] text-left text-xs space-y-3">
                <h4 className="font-bold text-[#102A43] uppercase tracking-wider">Next Steps:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span>Our hospital coordinator will call/WhatsApp you within 2 business hours to confirm your exact token number.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span>Location: SIPS Hospital, 29 Shah Mina Road, Chowk, Lucknow.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(`Hello Dr. Mishra / SIPS team, I just booked a consultation (Ref: ${bookingReference}) for ${procedure}. Please confirm.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Immediate WhatsApp Confirmation</span>
                </a>

                <button
                  onClick={() => onNavigate('home')}
                  className="px-6 py-3 bg-[#F6FAFD] hover:bg-[#E7F2F8] text-[#102A43] border border-[#DCE7F0] rounded-xl text-xs font-bold transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
