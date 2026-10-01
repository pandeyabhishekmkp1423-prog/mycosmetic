import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  ShieldCheck,
  Activity,
  Sparkles,
  HeartPulse,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { hospitalData, HospitalSlide } from '../../data/hospitalData';
import { SafeImage } from '../common/SafeImage';

interface HospitalGallerySliderProps {
  className?: string;
  autoPlayInterval?: number; // ms, default 4500
}

export const HospitalGallerySlider: React.FC<HospitalGallerySliderProps> = ({
  className = '',
  autoPlayInterval = 4500
}) => {
  const slides = hospitalData.slides || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto-play progress timer
  useEffect(() => {
    if (!isPlaying || isHovered || isLightboxOpen || totalSlides <= 1) {
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / autoPlayInterval) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isLightboxOpen, autoPlayInterval, nextSlide, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextSlide, prevSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> show next slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> show prev slide
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getSlideIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />;
      case 1:
        return <Activity className="w-3.5 h-3.5 text-[#00A3E0]" />;
      case 2:
        return <Award className="w-3.5 h-3.5 text-[#00A3E0]" />;
      case 3:
        return <HeartPulse className="w-3.5 h-3.5 text-[#00A3E0]" />;
      case 4:
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />;
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none flex flex-col space-y-3.5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="SIPS Hospital Infrastructure Gallery"
    >
      {/* Main Slide Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#CBD5E1] shadow-xl bg-slate-950 group">
        {/* Continuous Auto-Slide Progress Bar at top edge */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00A3E0] to-[#38BDF8] transition-[width] ease-linear"
            style={{ width: `${isPlaying && !isHovered ? progress : (currentIndex + 1) * 20}%` }}
          />
        </div>

        {/* Slides Track - Smooth Horizontal Transition */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="w-full h-full shrink-0 relative overflow-hidden bg-slate-900"
              >
                {/* Ambient Blurred Backdrop for rich depth */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-110 opacity-30 pointer-events-none"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  aria-hidden="true"
                />

                {/* Primary High-Resolution Facility Image */}
                <SafeImage
                  src={slide.image}
                  alt={slide.alt}
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover object-[center_30%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-[#001D3D]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Top Floating Controls Bar */}
          <div className="absolute top-3.5 inset-x-3.5 sm:top-4 sm:inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
            {/* Slide Category & Counter Badge */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#003366] text-xs font-bold shadow-md border border-white/50">
                {getSlideIcon(currentIndex)}
                <span className="truncate max-w-[150px] sm:max-w-[220px]">
                  {currentSlide.badge}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-mono font-semibold border border-white/20">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            {/* Quick Action Buttons: Play/Pause & Fullscreen */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand image to fullscreen"
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="View Full Resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrow Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous hospital slide"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#003366] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-lg group-hover:opacity-100 sm:opacity-90"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next hospital slide"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#003366] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-lg group-hover:opacity-100 sm:opacity-90"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Captions Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-20 pointer-events-none bg-gradient-to-t from-[#001D3D] via-[#001D3D]/80 to-transparent">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-sm line-clamp-1">
                  {currentSlide.title}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-[11px] font-semibold shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified SIPS Facility</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-1">
                {currentSlide.subtitle}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 hidden sm:block pt-0.5">
                {currentSlide.description}
              </p>

              {/* Spec Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentSlide.specs.slice(0, 3).map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-block px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs text-[10px] sm:text-[11px] text-slate-200 border border-white/15"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Thumbnail Strip (5 Images) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#003366]">
            <Layers className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Facility Gallery (5 Slides)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {isPlaying && !isHovered ? 'Auto-sliding left to right' : 'Paused on hover / interaction'}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const labels = [
              '1. Campus',
              '2. Live OT',
              '3. Dr. Mishra',
              '4. Anesthesia',
              '5. Master Surgeon'
            ];

            return (
              <button
                key={slide.id || idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                className={`group relative rounded-xl overflow-hidden aspect-[16/11] border-2 transition-all duration-300 cursor-pointer text-left focus:outline-hidden ${
                  isActive
                    ? 'border-[#00A3E0] shadow-md shadow-[#00A3E0]/25 scale-[1.02] ring-2 ring-[#00A3E0]/40'
                    : 'border-[#CBD5E1] opacity-70 hover:opacity-100 hover:border-[#00A3E0]/60'
                }`}
              >
                <SafeImage
                  src={slide.image}
                  alt={slide.alt}
                  fallbackCategory="Hospital & Theatre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Active Indicator & Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity ${
                    isActive
                      ? 'bg-gradient-to-t from-[#002244]/80 via-transparent to-transparent'
                      : 'bg-black/30 group-hover:bg-transparent'
                  }`}
                />

                {/* Active Progress Line on the current thumbnail */}
                {isActive && isPlaying && !isHovered && (
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#00A3E0]" />
                )}

                {/* Thumbnail Mini-Label */}
                <div className="absolute bottom-1 inset-x-1 text-center">
                  <span
                    className={`block text-[9px] sm:text-[10px] font-bold leading-tight px-1 py-0.5 rounded-sm backdrop-blur-xs truncate ${
                      isActive ? 'bg-[#003366]/90 text-white' : 'bg-black/70 text-slate-200'
                    }`}
                  >
                    {labels[idx] || `Slide ${idx + 1}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Hospital Image View"
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-bold">
                {currentSlide.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-[280px] sm:max-w-md">
                {currentSlide.title}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} of {totalSlides}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image Display */}
          <div className="relative flex-1 flex items-center justify-center py-4 overflow-hidden">
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-[#003366] text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              className="max-h-[72vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-[#003366] text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Captions & Thumbnails */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="text-center max-w-3xl mx-auto space-y-1">
              <p className="text-sm text-slate-300">
                {currentSlide.description}
              </p>
              <p className="text-xs text-[#00A3E0] font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Thumbnail dots in Lightbox */}
            <div className="flex items-center justify-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`w-14 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'border-[#00A3E0] scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                >
                  <img src={s.image} alt={s.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
