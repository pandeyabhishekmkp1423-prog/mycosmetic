import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BeforeAfterCase } from '../../types';
import { ArrowLeftRight, CheckCircle2, ZoomIn, ZoomOut, Maximize2, X, Eye } from 'lucide-react';

export interface BeforeAfterSliderProps {
  caseData?: BeforeAfterCase;
  beforeImage?: string;
  afterImage?: string;
  fullImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  procedureName?: string;
  showDetails?: boolean;
  className?: string;
  defaultMode?: 'full' | 'slider';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  caseData,
  beforeImage,
  afterImage,
  fullImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  procedureName,
  showDetails = false,
  className = '',
  defaultMode = 'full'
}) => {
  const [viewMode, setViewMode] = useState<'full' | 'slider'>(defaultMode);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveId = caseData?.id || 'slider-case';
  const effectiveBeforeImage = beforeImage || caseData?.beforeImage || '';
  const effectiveAfterImage = afterImage || caseData?.afterImage || '';
  const effectiveFullImage = fullImage || caseData?.fullImage || effectiveBeforeImage;
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

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  return (
    <div 
      id={`before-after-case-${effectiveId}`} 
      className={`bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* View Mode Switcher Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#091526] border-b border-[#182a44] text-xs">
        <div className="flex items-center gap-1.5 bg-[#050c17] p-1 rounded-xl border border-[#1e3352]">
          <button 
            type="button"
            onClick={() => setViewMode('full')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-semibold ${
              viewMode === 'full' 
                ? 'bg-[#003366] text-white shadow-xs border border-[#00A3E0]/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Full Photo</span>
          </button>

          <button 
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-semibold ${
              viewMode === 'slider' 
                ? 'bg-[#003366] text-white shadow-xs border border-[#00A3E0]/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Drag Slider</span>
          </button>
        </div>

        {/* High-Res Lightbox Action */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
          title="Open in High-Resolution Lightbox"
        >
          <ZoomIn className="w-3.5 h-3.5 text-[#00A3E0]" />
          <span className="hidden sm:inline font-medium">Zoom Full</span>
        </button>
      </div>

      {/* Media Viewing Area */}
      {viewMode === 'full' ? (
        /* MODE 1: Full Composite Side-by-Side (100% uncropped original) */
        <div 
          className="relative w-full bg-[#050b14] flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[400px] max-h-[500px] cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          title="Click to view full screen"
        >
          <img 
            src={effectiveFullImage} 
            alt={`Full standardized clinical record - ${effectiveProcedureName}`}
            className="w-full h-full max-h-[480px] object-contain p-2 transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
          />

          {/* Clinical Orientation Badges */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold rounded-md shadow-xs border border-white/10 uppercase tracking-wider pointer-events-none">
            {beforeLabel}
          </div>
          
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#003366]/90 backdrop-blur-md text-white text-[11px] font-bold rounded-md shadow-xs border border-[#00A3E0]/40 uppercase tracking-wider pointer-events-none">
            {afterLabel}
          </div>

          {/* Hover Overlay Prompt */}
          <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-black/70 backdrop-blur-md text-slate-300 text-[11px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none">
            <Eye className="w-3 h-3 text-[#00A3E0]" />
            <span>Click to Expand</span>
          </div>
        </div>
      ) : (
        /* MODE 2: Interactive Slider (Non-cropped with object-contain & responsive height) */
        <div 
          ref={containerRef}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Before and after comparison slider for ${effectiveProcedureName}`}
          onKeyDown={handleKeyDown}
          className="relative w-full aspect-[4/3] sm:aspect-[4/3] min-h-[340px] sm:min-h-[420px] max-h-[500px] select-none overflow-hidden cursor-ew-resize bg-[#050b14] focus:outline-none focus:ring-2 focus:ring-[#003366]"
          onClick={(e) => handleMove(e.clientX)}
        >
          {/* After Image (Background) */}
          {effectiveAfterImage && (
            <img 
              src={effectiveAfterImage} 
              alt={`Post-Op result - ${effectiveProcedureName}`}
              className={`absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-300 ${
                isZoomed ? 'scale-125 origin-center' : 'scale-100'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Before Image (Clipped Overlay) */}
          {effectiveBeforeImage && (
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={effectiveBeforeImage} 
                alt={`Pre-Op view - ${effectiveProcedureName}`}
                className={`absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-300 ${
                  isZoomed ? 'scale-125 origin-center' : 'scale-100'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Orientation Labels */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[11px] tracking-wider uppercase font-bold rounded-md shadow-xs border border-white/10 pointer-events-none">
            {beforeLabel}
          </div>
          
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#003366]/90 backdrop-blur-md text-white text-[11px] tracking-wider uppercase font-bold rounded-md shadow-xs border border-[#00A3E0]/40 pointer-events-none">
            {afterLabel}
          </div>

          {/* Zoom Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
            className="absolute bottom-3 left-3 z-20 p-2 rounded-lg bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xs"
            title={isZoomed ? 'Zoom Out' : 'Zoom In 1.25x'}
            aria-label="Toggle Zoom"
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-[#00A3E0]" /> : <ZoomIn className="w-3.5 h-3.5 text-white" />}
          </button>

          {/* Divider Slider Handle Line */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#003366] border-2 border-white text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-ew-resize">
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#00A3E0]" />
            </div>
          </div>
        </div>
      )}

      {/* Case Details Card (only rendered when caseData is present and showDetails is true) */}
      {showDetails && caseData && (
        <div className="p-6 space-y-4 bg-white border-t border-[#E2E8F0]">
          <div className="flex items-start justify-between gap-4">
            <div>
              {caseData.category && (
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] mb-1 block">
                  {caseData.category} Procedure
                </span>
              )}
              <h4 className="text-xl font-heading font-bold text-[#003366]">
                {caseData.procedureName}
              </h4>
              {(caseData.patientInfo || caseData.timeline) && (
                <p className="text-sm text-slate-500 font-medium mt-1">
                  {[caseData.patientInfo, caseData.timeline].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#003366] uppercase tracking-wider shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
              <span>Verified Case</span>
            </div>
          </div>

          {caseData.description && (
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "{caseData.description}"
            </p>
          )}

          {/* Key Improvements */}
          {caseData.keyImprovements && caseData.keyImprovements.length > 0 && (
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003366] block">
                Surgical Accomplishments:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {caseData.keyImprovements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full-Screen High-Resolution Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Topbar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 mb-2 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-editorial text-white">
                {effectiveProcedureName}
              </h3>
              {caseData && (
                <p className="text-xs sm:text-sm text-slate-400">
                  {caseData.patientInfo} • {caseData.timeline} • Standardized Medical Photography
                </p>
              )}
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image View */}
          <div 
            className="relative max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={effectiveFullImage} 
              alt={effectiveProcedureName} 
              className="w-auto h-auto max-w-full max-h-[78vh] object-contain rounded-xl"
            />
          </div>

          <p className="text-xs text-slate-400 mt-3">
            Press <b>ESC</b> or click anywhere outside to close
          </p>
        </div>
      )}
    </div>
  );
};
