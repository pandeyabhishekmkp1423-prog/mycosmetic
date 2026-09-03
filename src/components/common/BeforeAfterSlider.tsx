import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BeforeAfterCase } from '../../types';
import { Sparkles, ArrowLeftRight, CheckCircle2, Shield } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface BeforeAfterSliderProps {
  caseData: BeforeAfterCase;
  showDetails?: boolean;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  caseData,
  showDetails = true,
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div id={`before-after-case-${caseData.id}`} className={`bg-white rounded-[20px] border border-[#DCE7F0] overflow-hidden shadow-xs hover:shadow-[0_8px_30px_rgba(11,42,91,0.06)] transition-all duration-300 ${className}`}>
      {/* Slider Visual Container */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] select-none overflow-hidden cursor-ew-resize bg-[#071D3B]"
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* After Image (Background) */}
        <img 
          src={caseData.afterImage} 
          alt={`After result - ${caseData.procedureName}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Before Image (Clipped Overlay) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={caseData.beforeImage} 
            alt={`Before procedure - ${caseData.procedureName}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-bold rounded-lg border border-white/10">
          Before
        </div>
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#1769AA] text-white text-[10px] tracking-wider uppercase font-bold rounded-lg shadow-xs">
          After
        </div>

        {/* Divider Slider Handle Line */}
        <div 
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg border-2 border-[#1769AA] flex items-center justify-center text-[#102A43] hover:scale-110 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-4 h-4 text-[#1769AA]" />
          </div>
        </div>

        {/* Bottom instruction hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium rounded-full flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3 h-3 text-[#93C5FD]" />
          <span>Drag slider to view comparison</span>
        </div>
      </div>

      {/* Case Details & Narrative */}
      {showDetails && (
        <div className="p-6 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-bold tracking-wider text-[#1769AA] uppercase">
              {caseData.category}
            </span>
            <span className="text-xs text-[#52677D] bg-[#EEF7FC] px-2.5 py-0.5 rounded-full border border-[#DCE7F0]">
              {caseData.timeline}
            </span>
          </div>

          <h4 className="text-lg font-serif font-bold text-[#102A43] mb-1">
            {caseData.procedureName}
          </h4>

          <p className="text-xs text-[#718096] mb-3">
            Patient Profile: {caseData.patientInfo}
          </p>

          <p className="text-xs sm:text-sm text-[#52677D] leading-relaxed mb-4">
            {caseData.description}
          </p>

          <div className="border-t border-[#EEF2F6] pt-3.5 mt-3.5">
            <h5 className="text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
              Key Clinical Outcomes
            </h5>
            <ul className="space-y-1.5">
              {caseData.keyImprovements.map((item, idx) => (
                <li key={idx} className="text-xs text-[#52677D] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Transparency Disclaimer */}
          <div className="mt-4 pt-3 border-t border-dashed border-[#DCE7F0] flex items-center gap-2 text-[11px] text-[#718096]">
            <Shield className="w-3.5 h-3.5 shrink-0 text-[#1769AA]" />
            <span>Individual results vary according to patient anatomy. Photo published with informed consent.</span>
          </div>
        </div>
      )}
    </div>
  );
};
