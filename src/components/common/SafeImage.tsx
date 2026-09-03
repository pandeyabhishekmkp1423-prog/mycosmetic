import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackCategory?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackCategory = 'Medical Procedure',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`w-full h-full min-h-[180px] bg-gradient-to-br from-[#EEF7FC] via-[#F5FAFD] to-[#DCE7F0] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/80 border border-[#DCE7F0] flex items-center justify-center text-[#1769AA] mb-2.5 shadow-xs">
          <ImageIcon className="w-5 h-5 text-[#1769AA]" />
        </div>
        <p className="text-xs font-bold text-[#102A43] line-clamp-1">{alt || 'Clinical Reference'}</p>
        <span className="text-[10px] text-[#52677D] font-medium mt-0.5 uppercase tracking-wider">
          {fallbackCategory}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Soft loading skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EEF7FC] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
