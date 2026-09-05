import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  Video, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Phone 
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
    setStep(4);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Book Consultation</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Private Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#003366] tracking-tight">
            Schedule Your <span className="italic text-[#00A3E0] font-normal">Visit</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Meet with Senior Plastic Surgeon Dr. R. K. Mishra at SIPS Super Specialty Hospital Lucknow.
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="mb-8 grid grid-cols-3 gap-3 text-xs sm:text-sm">
            {[
              ['1', 'Procedure & Mode'],
              ['2', 'Date & Time'],
              ['3', 'Your Details']
            ].map(([number, label], index) => {
              const active = step === index + 1;
              const complete = step > index + 1;
              return (
                <div
                  key={label}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    active
                      ? 'border-[#003366] bg-[#003366] text-white font-bold shadow-xs'
                      : complete
                        ? 'border-[#00A3E0] bg-[#E0F2FE] text-[#0284C7] font-semibold'
                        : 'border-[#E2E8F0] bg-white text-slate-500'
                  }`}
                >
                  <span className="text-xs block opacity-80 uppercase font-semibold">Step {number}</span>
                  <span className="text-xs sm:text-sm font-bold">{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-heading font-bold text-[#003366]">
                1. Select Procedure of Interest
              </h2>
              <p className="text-xs text-slate-500">
                Choose the primary surgical or aesthetic treatment you wish to discuss.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {proceduresData.map((proc) => (
                <button
                  key={proc.slug}
                  type="button"
                  onClick={() => setProcedure(proc.title)}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    procedure === proc.title
                      ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <p className="truncate font-bold">{proc.title}</p>
                  <span className={`text-xs block mt-0.5 ${procedure === proc.title ? 'text-[#00A3E0]' : 'text-slate-500'}`}>
                    {proc.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2E8F0]">
              <h3 className="text-sm font-bold text-[#003366] mb-1">
                Consultation Format
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div
                  onClick={() => setConsultationType('IN_PERSON')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'IN_PERSON'
                      ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className={`w-4 h-4 ${consultationType === 'IN_PERSON' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                    <span className="text-xs font-bold">In-Person Clinical OPD</span>
                  </div>
                  <p className={`text-xs ${consultationType === 'IN_PERSON' ? 'text-slate-200' : 'text-slate-500'}`}>
                    At SIPS Hospital, Chowk, Lucknow. Full anatomical evaluation.
                  </p>
                </div>

                <div
                  onClick={() => setConsultationType('VIRTUAL')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    consultationType === 'VIRTUAL'
                      ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Video className={`w-4 h-4 ${consultationType === 'VIRTUAL' ? 'text-[#00A3E0]' : 'text-[#003366]'}`} />
                    <span className="text-xs font-bold">Virtual Video Consultation</span>
                  </div>
                  <p className={`text-xs ${consultationType === 'VIRTUAL' ? 'text-slate-200' : 'text-slate-500'}`}>
                    For outstation or international patients prior to Lucknow travel.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-navy"
              >
                <span>Continue to Date Selection</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-heading font-bold text-[#003366]">
                2. Select Preferred Date & Time
              </h2>
              <p className="text-xs text-slate-500">
                Doctor OPD is open Monday through Saturday at SIPS Super Specialty Hospital.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#003366]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                  Preferred Slot
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
                      className={`w-full p-3 rounded-lg border text-left text-xs font-semibold transition-colors ${
                        timeSlot === slot
                          ? 'bg-[#003366] text-white border-[#003366]'
                          : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-[#003366] flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-navy"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={handleCompleteBooking} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-heading font-bold text-[#003366]">
                3. Patient Details
              </h2>
              <p className="text-xs text-slate-500">
                Your information remains strictly confidential under medical discretion.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#003366]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#003366]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#003366]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">City</label>
                <input
                  type="text"
                  placeholder="e.g. Lucknow, Kanpur, Varanasi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#003366]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#0F172A] mb-1.5">Optional Notes / Goals</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what you'd like to achieve..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#003366]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                id="consent"
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                className="w-4 h-4 text-[#003366] rounded accent-[#003366]"
              />
              <label htmlFor="consent">
                I agree to be contacted by SIPS Hospital patient coordinator regarding this consultation.
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-[#003366] flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`py-3.5 px-7 rounded-xl bg-[#003366] hover:bg-[#002244] text-white font-bold text-sm shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Confirm & Request Appointment</span>
                <CheckCircle2 className="w-4 h-4 ml-1 text-[#00A3E0]" />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#E0F2FE] border border-[#00A3E0]/30 text-[#003366] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-[#003366]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#003366]">
                Consultation Request Registered
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Your consultation request for <strong>{procedure}</strong> has been received. Reference: <strong className="text-[#003366]">#{bookingReference}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-md mx-auto text-xs text-slate-600 space-y-1">
              <p>Our patient care team will contact you to confirm your OPD appointment token.</p>
              <p className="font-bold text-[#003366]">Hospital Desk Direct Line: +91 94150 23675</p>
            </div>

            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="btn-navy"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
