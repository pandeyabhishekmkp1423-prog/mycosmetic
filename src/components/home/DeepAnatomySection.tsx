import React, { useState, useRef, MouseEvent } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  CheckCircle2,
  Scan,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

interface DeepAnatomySectionProps {
  onNavigate: (route: string) => void;
}

interface AnatomicalLayer {
  number: number;
  shortName: string;
  fullName: string;
  depth: string;
  yPercent: number; // percentage height on 3D face model
  principle: string;
  role: string;
  surgicalAction: string;
  guarantee: string;
}

const anatomicalLayers: AnatomicalLayer[] = [
  {
    number: 1,
    shortName: 'Skin Envelope',
    fullName: 'Layer 1: Surface Epidermis & Dermis',
    depth: '0.5 – 1.5 mm',
    yPercent: 17,
    principle: 'Zero Skin Tension',
    role: 'External elastic skin envelope responsible for texture, hydration, and visible tone.',
    surgicalAction: 'Tension-free micro-closure along natural Langer lines. The skin is never stretched or pulled to create the lift.',
    guarantee: 'Undetectable hairline incisions with zero unnatural skin distortion'
  },
  {
    number: 2,
    shortName: 'Subcutaneous Fat',
    fullName: 'Layer 2: Superficial Adipose Compartments',
    depth: '1.5 – 3.5 mm',
    yPercent: 31,
    principle: 'Volume Restoration',
    role: 'Distinct superficial cheek and malar fat pads that deflate and descend with gravity.',
    surgicalAction: 'Vectorial micro-fat repositioning restores youthful midface projection without artificial filler puffiness.',
    guarantee: 'Authentic youthful fullness that moves naturally with your face'
  },
  {
    number: 3,
    shortName: 'SMAS Foundation',
    fullName: 'Layer 3: SMAS (Deep Fascial Scaffold)',
    depth: '3.5 – 5.0 mm',
    yPercent: 41,
    principle: 'Structural Suspension',
    role: 'The continuous fibro-muscular foundation that structurally supports the lower two-thirds of the face.',
    surgicalAction: 'High-SMAS deep suspension re-anchors the structural foundation directly to stable deep fascia.',
    guarantee: 'Genuine 10–15 year structural rejuvenation anchored beneath skin'
  },
  {
    number: 4,
    shortName: 'Facial Musculature',
    fullName: 'Layer 4: Mimetic Expression Muscles',
    depth: '5.0 – 6.5 mm',
    yPercent: 53,
    principle: 'Dynamic Mobility',
    role: 'Interwoven dynamic muscles controlling smiling, speech, and micro-emotional nuances.',
    surgicalAction: 'Sub-SMAS surgical dissection safeguards muscle continuity, preventing any frozen or stiff facial appearance.',
    guarantee: '100% preservation of authentic emotional expression and smile'
  },
  {
    number: 5,
    shortName: 'Deep Plane & Nerves',
    fullName: 'Layer 5: Deep Retaining Spaces & Nerves',
    depth: '6.5 – 8.0 mm',
    yPercent: 66,
    principle: 'Microsurgical Safety',
    role: 'Critical facial nerve branches and retaining ligaments that tether facial tissues to bone.',
    surgicalAction: 'High-magnification surgical release of true facial retaining ligaments inside Class-100 laminar OTs.',
    guarantee: 'Rapid 7–10 day healing with complete motor nerve safety'
  },
  {
    number: 6,
    shortName: 'Bone Framework',
    fullName: 'Layer 6: Craniofacial Skeletal Base',
    depth: 'Periosteal Base',
    yPercent: 82,
    principle: 'Permanent Contour',
    role: 'Mandibular jawline, zygomatic arch, and pyriform margin providing facial balance.',
    surgicalAction: 'Sub-periosteal anatomical release establishes the permanent architectural anchor for all overlying tiers.',
    guarantee: 'Sharp, elegant jawline definition and permanent facial harmony'
  }
];

export const DeepAnatomySection: React.FC<DeepAnatomySectionProps> = ({ onNavigate }) => {
  // Always starts from Layer 1
  const [activeLayerNum, setActiveLayerNum] = useState<number>(1);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 2, y: -3 });
  const [showLaser, setShowLaser] = useState<boolean>(true);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeLayer = anatomicalLayers.find(l => l.number === activeLayerNum) || anatomicalLayers[0];

  // Subtle 3D Perspective Tilt on Mouse Move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - mouseY) * 10,
      y: (mouseX - 0.5) * 14
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 2, y: -3 });
  };

  return (
    <section 
      id="deep-facial-anatomy" 
      className="relative py-8 sm:py-12 bg-[#001329] text-white overflow-hidden border-y border-[#003366]"
    >
      {/* Ambient Medical Glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-[#003366]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact, Clean Header (Tight vertical footprint, no pill badges) */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#00A3E0] uppercase block mb-1">
            3D Surgical Anatomy Workstation
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-white tracking-tight leading-tight">
            The face you see is never just on the <span className="italic font-normal text-[#00A3E0]">surface.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1.5 max-w-2xl">
            True aesthetic youthfulness is never created by pulling skin. ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra sculpts and repositions the six profound anatomical layers where facial aging genuinely takes place.
          </p>
        </div>

        {/* Compact 2-Column Integrated Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: 3D ANATOMICAL MODEL VIEWER (Compact, Responsive, Accurate Laser/Pins) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden bg-[#000F1F] border border-[#00A3E0]/30 shadow-xl p-3 sm:p-3.5 select-none"
              style={{ perspective: '1000px' }}
            >
              {/* HUD Header Bar */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-200">
                    Layer {activeLayer.number} Active: {activeLayer.shortName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLaser(!showLaser)}
                  className="flex items-center gap-1 font-mono text-[10px] text-[#00A3E0] hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-white/5"
                  title="Toggle CT Laser Depth Scan"
                >
                  <Scan className="w-2.5 h-2.5" />
                  <span>{showLaser ? 'Laser On' : 'Laser Off'}</span>
                </button>
              </div>

              {/* 3D Model Stage Canvas - Compact Height (h-[320px] on mobile, h-[360px] on desktop) */}
              <div className="relative w-full h-[310px] sm:h-[350px] flex items-center justify-center overflow-hidden">
                
                {/* Background Depth Coordinate Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#00A3E0_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />
                
                {/* Dynamic Cyan CT Laser Scanline */}
                {showLaser && (
                  <div 
                    className="absolute inset-x-2 z-30 pointer-events-none transition-all duration-400 ease-out"
                    style={{ top: `${activeLayer.yPercent}%` }}
                  >
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent shadow-[0_0_10px_#00A3E0]" />
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#00A3E0] px-1 -mt-2.5">
                      <span className="bg-[#001329]/95 px-1.5 py-0.5 rounded border border-[#00A3E0]/40 font-bold">
                        PLANE {activeLayer.number}
                      </span>
                      <span className="bg-[#001329]/95 px-1.5 py-0.5 rounded border border-[#00A3E0]/40">
                        {activeLayer.depth}
                      </span>
                    </div>
                  </div>
                )}

                {/* 3D Model Container with Interactive Mouse Tilt */}
                <div 
                  className="relative w-[220px] sm:w-[240px] h-[290px] sm:h-[330px] transition-transform duration-200 ease-out"
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    src="/facial_anatomy_model_clean.png"
                    alt="3D Facial Anatomy exploded view - 6 anatomical layers from skin to bone"
                    className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,163,224,0.25)] pointer-events-none"
                    draggable={false}
                  />

                  {/* Interactive Numbered Pins (1 to 6) Directly on Model */}
                  {anatomicalLayers.map((layer) => {
                    const isSelected = activeLayerNum === layer.number;
                    return (
                      <button
                        key={layer.number}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLayerNum(layer.number);
                        }}
                        className={`absolute right-1 sm:right-2 -translate-y-1/2 z-30 transition-all cursor-pointer ${
                          isSelected ? 'scale-125 z-40' : 'hover:scale-110 opacity-85 hover:opacity-100'
                        }`}
                        style={{ top: `${layer.yPercent}%` }}
                        title={`Select Layer ${layer.number}: ${layer.fullName}`}
                      >
                        <div 
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all shadow-md ${
                            isSelected 
                              ? 'bg-[#00A3E0] text-white ring-2 ring-white shadow-[0_0_12px_#00A3E0]' 
                              : 'bg-[#001329]/90 border border-white/50 text-slate-200 hover:border-[#00A3E0]'
                          }`}
                        >
                          {layer.number}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset & Quick Helper */}
                <div className="absolute bottom-2 left-2 z-20 text-[10px] font-mono text-slate-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                  Click pins 1–6 or buttons
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRotation({ x: 2, y: -3 });
                    setActiveLayerNum(1);
                  }}
                  className="absolute bottom-2 right-2 z-20 p-1.5 rounded-md bg-[#001329]/80 hover:bg-[#003366] text-slate-300 hover:text-white border border-white/20 transition-all cursor-pointer"
                  title="Reset to Layer 1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Surgeon Clinical Insight Footnote */}
              <div className="pt-2 mt-1 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-3 h-3 text-[#00A3E0] shrink-0" />
                <p className="truncate text-[11px] sm:text-xs">
                  <strong className="text-white">Langer Vector Technique:</strong> Natural tension-free closure.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: 6 LAYER SELECTORS & CLINICAL DETAILS (Zero Truncation, 100% Responsive) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            
            {/* 6 Anatomical Layer Selectors - Starting strictly from Layer 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                  Select Anatomical Layer (1 to 6):
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Active: Layer {activeLayer.number} / 6
                </span>
              </div>
              
              {/* Responsive Grid: 2 columns on small screens, 3 columns on tablet/desktop */}
              {/* Designed with shortName so titles NEVER truncate or get ellipsis */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {anatomicalLayers.map((layer) => {
                  const isActive = activeLayerNum === layer.number;
                  return (
                    <button
                      key={layer.number}
                      type="button"
                      onClick={() => setActiveLayerNum(layer.number)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#003366] border-[#00A3E0] shadow-md ring-1 ring-[#00A3E0]/70'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25 text-slate-300'
                      }`}
                    >
                      {/* Clear Bold Number starting from 1 */}
                      <span 
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          isActive 
                            ? 'bg-[#00A3E0] text-white shadow-sm' 
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {layer.number}
                      </span>
                      
                      {/* Short Name that fits perfectly without truncation */}
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold leading-tight truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {layer.shortName}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">
                          {layer.depth}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Layer Clinical Detail Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#001D3D]/90 border border-[#00A3E0]/30 shadow-lg space-y-3">
              
              {/* Layer Title, Depth & Principle */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-[#00A3E0] uppercase tracking-wider block">
                    Anatomical Tier {activeLayer.number} of 6
                  </span>
                  <h3 className="text-base sm:text-lg font-editorial font-bold text-white mt-0.5">
                    {activeLayer.fullName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                    {activeLayer.depth}
                  </span>
                  <span className="text-[11px] font-semibold text-[#00A3E0] bg-[#00A3E0]/15 px-2 py-0.5 rounded border border-[#00A3E0]/30">
                    {activeLayer.principle}
                  </span>
                </div>
              </div>

              {/* Anatomical Significance & Surgical Technique */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Anatomical Function:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {activeLayer.role}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border-l-3 border-[#00A3E0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A3E0] block mb-0.5">
                    Dr. Mishra’s Surgical Protocol:
                  </span>
                  <p className="text-slate-200 leading-relaxed text-xs">
                    {activeLayer.surgicalAction}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium text-slate-200">{activeLayer.guarantee}</span>
                </div>
              </div>

            </div>

            {/* Compact CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={() => onNavigate('book-consultation')}
                className="py-2.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-[#003366] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#003366]" />
                <span>Book Deep-Plane Assessment</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('procedures')}
                className="py-2.5 px-4 rounded-xl border border-white/20 hover:border-[#00A3E0] text-white hover:bg-white/5 text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>View Facial Procedures</span>
                <ArrowRight className="w-3 h-3 text-[#00A3E0]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

