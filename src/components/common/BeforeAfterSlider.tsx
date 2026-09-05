import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BeforeAfterCase } from '../../types';
import { Sparkles, ArrowLeftRight, CheckCircle2, ZoomIn, ZoomOut } from 'lucide-react';

export interface BeforeAfterSliderProps {
  caseData?: BeforeAfterCase;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  procedureName?: string;
  showDetails?: boolean;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  caseData,
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  procedureName,
  showDetails = false,
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveId = caseData?.id || 'slider-case';
  const effectiveBeforeImage = beforeImage || caseData?.beforeImage || '';
  const effectiveAfterImage = afterImage || caseData?.afterImage || '';
  const effectiveProcedureName = procedureName || caseData?.procedureName || 'Clinical Procedure';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div 
      id={`before-after-case-${effectiveId}`} 
      className={`bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Slider Visual Container */}
      <div 
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Before and after comparison slider for ${effectiveProcedureName}`}
        onKeyDown={handleKeyDown}
        className="relative w-full aspect-[4/3] select-none overflow-hidden cursor-ew-resize bg-[#071323] focus:outline-none focus:ring-2 focus:ring-[#003366]"
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* After Image (Background) */}
        {effectiveAfterImage && (
          <img 
            src={effectiveAfterImage} 
            alt={`Post-Op result - ${effectiveProcedureName}`}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-125 origin-center' : 'scale-100'
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Before Image (Clipped Overlay with Clip-Path) */}
        {effectiveBeforeImage && (
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={effectiveBeforeImage} 
              alt={`Pre-Op view - ${effectiveProcedureName}`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                isZoomed ? 'scale-125 origin-center' : 'scale-100'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-semibold rounded shadow-xs">
          {beforeLabel}
        </div>
        
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#003366]/90 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-semibold rounded shadow-xs border border-[#00A3E0]/40">
          {afterLabel}
        </div>

        {/* Zoom Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="absolute bottom-3 left-3 z-20 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xs"
          title={isZoomed ? 'Zoom Out' : 'Zoom In 1.25x'}
          aria-label="Toggle Zoom"
        >
          {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-[#00A3E0]" /> : <ZoomIn className="w-3.5 h-3.5 text-white" />}
        </button>

        {/* Divider Slider Handle Line */}
        <div 
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#003366] border-2 border-white text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-ew-resize">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#00A3E0]" />
          </div>
        </div>
      </div>

      {/* Case Details Card (only rendered when caseData is present and showDetails is true) */}
      {showDetails && caseData && (
        <div className="p-6 space-y-4 bg-white border-t border-[#E2E8F0]">
          <div className="flex items-start justify-between gap-4">
            <div>
              {caseData.category && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#E0F2FE] text-[10px] font-bold uppercase tracking-wider text-[#0284C7] mb-1.5 border border-[#00A3E0]/20">
                  <Sparkles className="w-3 h-3 text-[#00A3E0]" />
                  <span>{caseData.category} Procedure</span>
                </div>
              )}
              <h4 className="text-lg font-heading font-bold text-[#003366]">
                {caseData.procedureName}
              </h4>
              {(caseData.patientInfo || caseData.timeline) && (
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {[caseData.patientInfo, caseData.timeline].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>
            
            <div className="px-2.5 py-1 rounded-md bg-[#F0F7FD] border border-[#003366]/20 text-[10px] font-bold text-[#003366] uppercase tracking-wider shrink-0">
              Verified Case
            </div>
          </div>

          {caseData.description && (
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "{caseData.description}"
            </p>
          )}

          {/* Key Improvements */}
          {caseData.keyImprovements && caseData.keyImprovements.length > 0 && (
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A] block">
                Surgical Accomplishments:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {caseData.keyImprovements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#003366] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
