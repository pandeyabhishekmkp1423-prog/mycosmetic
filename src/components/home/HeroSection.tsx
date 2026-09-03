import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface HeroMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  /** Controls where the media focal point is positioned. */
  position?: string;
}

interface HeroSectionProps {
  onNavigate?: (route: string) => void;
  items?: HeroMediaItem[];
}

const DEFAULT_MEDIA: HeroMediaItem[] = [
  {
    id: '1',
    type: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: '/hero.png',
    position: 'object-center'
  },
  {
    id: '2',
    type: 'image',
    src: '/hero.png',
    alt: 'SIPS Hospital Clinic Room',
    position: 'object-center'
  },
  {
    id: '3',
    type: 'image',
    src: '/hero.png',
    alt: 'Advanced Surgical Equipment',
    position: 'object-center'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ items = DEFAULT_MEDIA }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const currentMedia = items[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;
    if (currentMedia.type === 'video') return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, currentMedia.type]);

  useEffect(() => {
    const activeVideo = videoRefs.current[currentMedia.id];
    if (activeVideo) {
      activeVideo.muted = isMuted;
      if (isPlaying) {
        activeVideo.play().catch(() => {});
      } else {
        activeVideo.pause();
      }
    }
  }, [currentIndex, isMuted, isPlaying, currentMedia]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section 
      id="homepage-hero" 
      className="relative mt-[65px] aspect-[2/1] w-full overflow-hidden bg-slate-950 text-white md:mt-[106px]"
      aria-label="Visual Showcase"
    >
      {/* Full-screen Media Slider */}
      <div className="relative h-full w-full">
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          const objectPos = item.position || 'object-top';

          return (
            <div
              key={item.id}
              className={`absolute inset-0 h-full w-full bg-slate-950 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {item.type === 'video' && !failedVideos[item.id] ? (
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  src={item.src}
                  poster={item.poster}
                  playsInline
                  loop
                  muted={isMuted}
                  onEnded={handleNext}
                  onError={() => setFailedVideos((previous) => ({ ...previous, [item.id]: true }))}
                  className={`h-full w-full object-contain ${objectPos}`}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || ''}
                  className={`h-full w-full object-contain ${objectPos}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle Vignette Overlay for Depth */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/40" />

      {/* Side Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between pointer-events-none sm:left-8 sm:right-8">
        <button
          type="button"
          onClick={handlePrev}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-slate-900/70 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-slate-900/70 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Floating Bottom Toolbar */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/15 bg-slate-900/50 px-5 py-2.5 backdrop-blur-xl shadow-2xl sm:bottom-10">
        
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>

        {/* Dynamic Slide Indicators */}
        <div className="flex items-center gap-2 px-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-amber-400'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Audio Mute/Unmute Button */}
        {currentMedia.type === 'video' && (
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
            aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-amber-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            )}
          </button>
        )}

      </div>
    </section>
  );
};