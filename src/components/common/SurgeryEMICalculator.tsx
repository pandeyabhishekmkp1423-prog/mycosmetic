import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Percent, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface SurgeryEMICalculatorProps {
  onNavigate: (route: string) => void;
}

export const SurgeryEMICalculator: React.FC<SurgeryEMICalculatorProps> = ({ onNavigate }) => {
  const [amount, setAmount] = useState<number>(85000); // Default Rhinoplasty/Gynecomastia average
  const [tenure, setTenure] = useState<number>(12); // Default 12 months

  const tenures = [
    { months: 3, label: '3 Months (0% Interest)' },
    { months: 6, label: '6 Months (0% Interest)' },
    { months: 9, label: '9 Months (0% Interest)' },
    { months: 12, label: '12 Months (0% Interest)' },
    { months: 18, label: '18 Months (Flexible)' }
  ];

  // At 0% interest, EMI is straightforward: amount / tenure
  const monthlyEMI = Math.round(amount / tenure);

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase mb-2">
            <Percent className="w-3.5 h-3.5" />
            <span>0% Interest Medical Financing</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003366]">
            Surgery EMI & Payment Calculator
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Achieve your desired aesthetic transformation without financial compromise through flexible monthly plans.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-[#64748B] block">Financing Rate</span>
          <span className="text-base font-bold text-[#00A3E0]">0% Interest Available</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Sliders & Tenure */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-[#003366]">
                Select Estimated Procedure Amount
              </label>
              <span className="text-lg font-bold text-[#003366] bg-[#00A3E0]/10 px-3 py-1 rounded-xl border border-[#00A3E0]/20">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>

            <input
              type="range"
              min={35000}
              max={300000}
              step={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
            />

            <div className="flex justify-between text-[11px] text-[#64748B]">
              <span>₹35,000 (Minor Revision)</span>
              <span>₹1,50,000 (Advanced Surgery)</span>
              <span>₹3,00,000 (Composite Full Body)</span>
            </div>
          </div>

          {/* Tenure Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#003366] block">
              Choose Repayment Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {tenures.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setTenure(t.months)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                    tenure === t.months
                      ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                      : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-white hover:text-[#003366]'
                  }`}
                >
                  <span className="block font-bold text-sm">{t.months} Months</span>
                  <span className={`text-[10px] ${tenure === t.months ? 'text-[#00A3E0]' : 'text-[#64748B]'}`}>
                    {t.months <= 12 ? '0% Interest' : 'Low Interest'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Finance Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#475569]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>Zero down-payment options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>Instant Aadhaar / PAN digital approval</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>Zero hidden hospital charges</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>No penalty for early pre-closure</span>
            </div>
          </div>

        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#002244] to-[#003366] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg border border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
              Estimated Monthly Outlay
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-white">
                ₹{monthlyEMI.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300">/ month</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              For a total procedure investment of ₹{amount.toLocaleString('en-IN')} spread over {tenure} months.
            </p>
          </div>

          <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 text-slate-200">
            <div className="flex justify-between">
              <span>Principal Amount</span>
              <span className="font-bold text-white">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Financing Tenure</span>
              <span className="font-bold text-white">{tenure} Months</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate</span>
              <span className="font-bold text-[#00A3E0]">0% (Subsidized Medical)</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee</span>
              <span className="font-bold text-white">₹0</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onNavigate('book-consultation')}
              className="btn-crimson w-full justify-center py-3 text-xs shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Pre-Approval & Book</span>
            </button>

            <p className="text-[10px] text-center text-slate-400 leading-relaxed">
              * Official approval is subject to partner lender verification (Bajaj Finserv, LiquiLoans, Arogya Finance).
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
