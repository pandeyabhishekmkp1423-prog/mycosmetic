import React, { useState } from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ProcedureComparisonMatrixProps {
  onNavigate: (route: string) => void;
}

interface ComparisonTopic {
  id: string;
  category: string;
  title: string;
  optionA: {
    name: string;
    tagline: string;
    bestFor: string;
    incision: string;
    anesthesia: string;
    downtime: string;
    permanence: string;
    highlight: string;
  };
  optionB: {
    name: string;
    tagline: string;
    bestFor: string;
    incision: string;
    anesthesia: string;
    downtime: string;
    permanence: string;
    highlight: string;
  };
  verdict: string;
}

export const ProcedureComparisonMatrix: React.FC<ProcedureComparisonMatrixProps> = ({ onNavigate }) => {
  const [activeTopicId, setActiveTopicId] = useState<string>('rhinoplasty');

  const topics: ComparisonTopic[] = [
    {
      id: 'rhinoplasty',
      category: 'Facial Aesthetics',
      title: 'Open Preservation Rhinoplasty vs. Closed Endonasal Rhinoplasty',
      optionA: {
        name: 'Open Preservation Rhinoplasty',
        tagline: 'Maximum anatomical precision & structural stability',
        bestFor: 'Complex dorsal humps, asymmetric tips, crooked noses, previous trauma, revision cases.',
        incision: 'Tiny microscopic 3mm stairstep incision across columella (fades completely within 2–3 months).',
        anesthesia: 'General anesthesia in NABH laminar airflow OT.',
        downtime: 'Splint removed at 7 days; return to office work on Day 7.',
        permanence: '100% permanent lifelong structural harmony.',
        highlight: 'Allows complete direct visualization of delicate tip cartilages for bespoke structural preservation.'
      },
      optionB: {
        name: 'Closed Endonasal Rhinoplasty',
        tagline: 'Zero external incision scar',
        bestFor: 'Minor bridge hump shaving without complex tip cartilage rotation or grafting.',
        incision: 'All incisions placed entirely inside nostrils; zero external columella scar.',
        anesthesia: 'Twilight sedation or General anesthesia.',
        downtime: 'Nasal splint for 5 to 7 days; back to routine quickly.',
        permanence: '100% permanent bony/cartilage adjustment.',
        highlight: 'Completely scarless externally, best suited for primary mild dorsal profile refinement.'
      },
      verdict: 'Dr. Mishra utilizes Preservation Open Rhinoplasty for 90% of cases because it enables millimeter-level structural grafting that ensures the nose will never collapse or droop over time.'
    },
    {
      id: 'lipo_tummy',
      category: 'Body Contouring',
      title: 'VASER 4D Liposuction vs. Abdominoplasty (Tummy Tuck)',
      optionA: {
        name: 'VASER 4D Liposuction',
        tagline: 'Targeted fat emulsification with skin tightening',
        bestFor: 'Good skin elasticity with localized stubborn fat deposits (belly, flanks, love handles).',
        incision: 'Microscopic 3–4mm entry ports concealed in bikini line and belly button.',
        anesthesia: 'Tumescent local with IV sedation or General anesthesia.',
        downtime: 'Desk work in 3–5 days; full exercise in 3 weeks.',
        permanence: 'Permanently eliminates fat cells in treated zones.',
        highlight: 'Ultrasound energy gently melts fat while heating subdermal collagen for rapid skin retraction.'
      },
      optionB: {
        name: 'Abdominoplasty (Tummy Tuck)',
        tagline: 'Surgical skin excision & abdominal muscle repair',
        bestFor: 'Post-pregnancy loose abdominal overhang, stretch marks, and separated rectus muscles (diastasis recti).',
        incision: 'Low transverse bikini-line incision (easily hidden beneath low-cut swimwear) & navel repositioning.',
        anesthesia: 'General anesthesia with overnight hospital stay.',
        downtime: 'Return to desk work in 10–14 days; light workouts in 4 weeks.',
        permanence: 'Permanent removal of excess skin apron and permanent muscle tightening.',
        highlight: 'Re-tightens the internal abdominal corset wall that diet and workouts cannot repair.'
      },
      verdict: 'If you have excess loose hanging skin and muscle separation after pregnancy, a Tummy Tuck is necessary. If your skin is elastic and your primary issue is stubborn fat, VASER Liposuction delivers dramatic athletic sculpting with minimal downtime.'
    },
    {
      id: 'gynecomastia',
      category: 'Male Chest',
      title: 'Gland Excision + VASER vs. Liposuction Alone',
      optionA: {
        name: 'Gland Excision + VASER Lipo (Gold Standard)',
        tagline: 'Complete glandular removal with smooth chest feathering',
        bestFor: 'True gynecomastia with rubbery, hard glandular tissue under the areola.',
        incision: 'Micro-areolar semi-circular incision (1.5 cm) hidden at pigmented areolar border.',
        anesthesia: 'General anesthesia or twilight sedation (daycare).',
        downtime: 'Back to office desk work in 3 to 5 days.',
        permanence: 'Zero recurrence guarantee because the gland tissue is physically excised.',
        highlight: 'The only method to achieve a permanently flat, masculine pectoral profile without puffy nipples.'
      },
      optionB: {
        name: 'Liposuction Alone',
        tagline: 'Fat-only reduction through cannulas',
        bestFor: 'Pseudogynecomastia (chest fullness composed strictly of adipose fat without fibrous glandular knots).',
        incision: 'Two 3mm puncture ports at the lateral chest crease.',
        anesthesia: 'Local with sedation.',
        downtime: 'Back to work in 2 to 3 days.',
        permanence: 'Permanent fat removal, but will NOT eliminate hard glandular tissue.',
        highlight: 'Fast recovery, but will leave a puffy nipple bulge if true glandular tissue is present.'
      },
      verdict: 'Over 85% of men suffering from chest enlargement have true fibrous glandular tissue. Dr. Mishra performs the combined approach (gland excision + VASER feathering) to prevent residual nipple puffiness.'
    }
  ];

  const currentTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  return (
    <section id="procedure-comparison-matrix" className="py-12 sm:py-16 bg-[#F8FAFC] relative overflow-hidden border-b border-[#E2E8F0]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Rich Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
            Clinical Decision Clarity
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight">
            Which Procedure Is <span className="italic text-[#00A3E0] font-normal">Right For You?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Patients often debate between surgical techniques. Here is an honest, clinical side-by-side comparison to help you understand your best anatomical option.
          </p>

          {/* Topic Selector Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopicId(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTopicId === t.id
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#003366]'
                }`}
              >
                {t.category}: {t.id === 'rhinoplasty' ? 'Rhinoplasty Options' : t.id === 'lipo_tummy' ? 'Lipo vs. Tummy Tuck' : 'Gynecomastia Approaches'}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Header Title */}
        <div className="text-center mb-8">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#003366]">
            {currentTopic.title}
          </h3>
        </div>

        {/* Dual Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          
          {/* OPTION A */}
          <div className="bg-white rounded-3xl border border-[#003366]/20 p-6 sm:p-8 shadow-sm hover:border-[#003366] transition-all flex flex-col justify-between space-y-6 relative group">
            <span className="text-xs uppercase font-bold tracking-widest text-[#003366]">
              Protocol A
            </span>

            <div className="space-y-3">
              <h4 className="font-editorial text-2xl font-bold text-[#003366]">
                {currentTopic.optionA.name}
              </h4>
              <p className="text-sm font-semibold text-[#00A3E0]">
                {currentTopic.optionA.tagline}
              </p>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#1E293B]">
                <strong>Key Advantage:</strong> {currentTopic.optionA.highlight}
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-[#E2E8F0]">
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Ideal Candidate</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionA.bestFor}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Incision & Scar</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionA.incision}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Downtime</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionA.downtime}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Longevity</span>
                <span className="font-semibold text-[#003366] text-right">{currentTopic.optionA.permanence}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('book-consultation')}
              className="btn-navy w-full justify-center py-2.5 text-xs mt-2"
            >
              <span>Consult on Option A</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* OPTION B */}
          <div className="bg-white rounded-3xl border border-[#00A3E0]/30 p-6 sm:p-8 shadow-sm hover:border-[#00A3E0] transition-all flex flex-col justify-between space-y-6 relative group">
            <span className="text-xs uppercase font-bold tracking-widest text-[#00A3E0]">
              Protocol B
            </span>

            <div className="space-y-3">
              <h4 className="font-editorial text-2xl font-bold text-[#003366]">
                {currentTopic.optionB.name}
              </h4>
              <p className="text-sm font-semibold text-[#00A3E0]">
                {currentTopic.optionB.tagline}
              </p>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#1E293B]">
                <strong>Key Advantage:</strong> {currentTopic.optionB.highlight}
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-[#E2E8F0]">
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Ideal Candidate</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionB.bestFor}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Incision & Scar</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionB.incision}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Downtime</span>
                <span className="font-semibold text-[#1E293B] text-right">{currentTopic.optionB.downtime}</span>
              </div>
              <div className="pt-2 flex justify-between gap-4">
                <span className="text-[#64748B] font-medium shrink-0">Longevity</span>
                <span className="font-semibold text-[#003366] text-right">{currentTopic.optionB.permanence}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('book-consultation')}
              className="btn-outline-navy w-full justify-center py-2.5 text-xs mt-2"
            >
              <span>Consult on Option B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Dr. Mishra's Verdict Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#002244] to-[#003366] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00A3E0]">
              Dr. R. K. Mishra's Surgical Recommendation
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{currentTopic.verdict}"
            </p>
          </div>

          <button
            onClick={() => onNavigate('book-consultation')}
            className="bg-[#003366] hover:bg-[#002244] border border-[#00A3E0]/40 text-white rounded-xl font-bold uppercase tracking-wider shrink-0 text-xs py-3 px-6 shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Calendar className="w-4 h-4 text-[#00A3E0]" />
            <span>Schedule Diagnostic Evaluation</span>
          </button>
        </div>

      </div>

    </section>
  );
};
