import React, { useState } from 'react';
import { Calculator, CheckCircle2, Clock, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';

interface ProcedureCostCalculatorProps {
  onNavigate?: (route: string) => void;
  initialProcedureSlug?: string;
}

export const ProcedureCostCalculator: React.FC<ProcedureCostCalculatorProps> = ({
  onNavigate,
  initialProcedureSlug
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialProcedureSlug || proceduresData[0]?.slug || 'rhinoplasty'
  );
  const [stayPreference, setStayPreference] = useState<'daycare' | 'vip-suite'>('daycare');
  const [emiTenure, setEmiTenure] = useState<number>(12); // months

  const selectedProcedure = proceduresData.find(p => p.slug === selectedSlug) || proceduresData[0];
  const baseCost = selectedProcedure.priceStartingFrom || 95000;
  
  // Calculations
  const stayCost = stayPreference === 'vip-suite' ? 18000 : 0;
  const totalEstimatedCost = baseCost + stayCost;
  const monthlyEmi = Math.round(totalEstimatedCost / emiTenure);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#00A3E0] uppercase block mb-1">
            Financial Transparency
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#003366]">
            Procedure Cost & EMI Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Clear, transparent hospital estimates with zero hidden fees at SIPS Super Specialty Hospital, Lucknow.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0F7FD] border border-[#003366]/20 text-xs font-semibold text-[#003366]">
          <ShieldCheck className="w-4 h-4 text-[#00A3E0]" />
          <span>NABH Accredited Hospital Center</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Procedure Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
              1. Select Procedure
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full bg-white text-[#0F172A] text-xs font-semibold rounded-lg border border-[#E2E8F0] p-3 focus:border-[#003366] focus:outline-none"
            >
              {proceduresData.map((proc) => (
                <option key={proc.slug} value={proc.slug}>
                  {proc.title} ({proc.category}) — from {proc.costRange}
                </option>
              ))}
            </select>
          </div>

          {/* Room Tier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
              2. Hospital Stay Suite Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStayPreference('daycare')}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                  stayPreference === 'daycare'
                    ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                    : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">Day-Care / Semi-Private</span>
                  <span className={`text-[10px] ${stayPreference === 'daycare' ? 'text-[#00A3E0]' : 'text-slate-400'}`}>
                    Standard
                  </span>
                </div>
                <p className={`text-[11px] ${stayPreference === 'daycare' ? 'text-slate-200' : 'text-slate-500'}`}>
                  Discharge within 6–24 hours post-procedure with monitoring.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setStayPreference('vip-suite')}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                  stayPreference === 'vip-suite'
                    ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                    : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">Private Deluxe Suite</span>
                  <span className={`text-[10px] font-bold ${stayPreference === 'vip-suite' ? 'text-[#00A3E0]' : 'text-[#003366]'}`}>
                    +₹18,000
                  </span>
                </div>
                <p className={`text-[11px] ${stayPreference === 'vip-suite' ? 'text-slate-200' : 'text-slate-500'}`}>
                  Private suite with attendant accommodation and personal nursing.
                </p>
              </button>
            </div>
          </div>

          {/* Inclusions */}
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003366] block">
              Transparent Package Inclusions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>Senior Surgeon Fee (Dr. R. K. Mishra)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>NABH Laminar Airflow OT Suite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>Senior Anesthetist & Safety Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>Specialized Medical Compression Garments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>6 Months of Comprehensive Follow-ups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                <span>Zero Hidden OT Medication Surcharges</span>
              </div>
            </div>
          </div>

          {/* Recovery info */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
              <Clock className="w-3.5 h-3.5" />
              <span>Recovery Milestones for {selectedProcedure.title}</span>
            </div>
            <p className="text-xs text-slate-600">
              <strong>{selectedProcedure.duration}</strong> surgical time • <strong>{selectedProcedure.hospitalStay}</strong> stay.
            </p>
            <div className="p-3 rounded-lg bg-[#F8FAFC] text-xs text-slate-700">
              {selectedProcedure.recoveryTimeline}
            </div>
          </div>

        </div>

        {/* Right Column: Total & EMI in Navy Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#002244] text-white shadow-xl border border-[#003366]">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#003366] pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
                Estimated Quote
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-medium">
                SIPS Hospital, Lucknow
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-300">Selected Procedure</p>
              <h4 className="text-xl font-heading font-bold text-white mt-0.5">
                {selectedProcedure.title}
              </h4>
              <p className="text-xs text-[#00A3E0] mt-0.5 font-medium">
                {selectedProcedure.subtitle}
              </p>
            </div>

            <div className="py-4 border-y border-[#003366]">
              <span className="text-xs text-slate-300 block mb-1">Estimated Total Investment:</span>
              <div className="text-3xl font-heading font-bold text-white tracking-tight">
                ₹{totalEstimatedCost.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-400 ml-2">approx.</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Clinical Range: {selectedProcedure.costRange}
              </p>
            </div>

            {/* EMI Options */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <CreditCard className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>0% Interest EMI Option</span>
                </span>
                <span className="text-[#00A3E0] font-bold">
                  ₹{monthlyEmi.toLocaleString('en-IN')}/mo
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[6, 12, 18, 24].map((tenure) => (
                  <button
                    key={tenure}
                    type="button"
                    onClick={() => setEmiTenure(tenure)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      emiTenure === tenure
                        ? 'bg-[#00A3E0] text-white shadow-xs'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {tenure} Mo
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                * Zero-interest EMI available through healthcare finance partners at the hospital desk.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#003366]">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('book-consultation')}
              className="btn-crimson w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
