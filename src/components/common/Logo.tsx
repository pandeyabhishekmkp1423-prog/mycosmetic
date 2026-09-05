import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  const isWhite = variant === 'white';

  if (isWhite) {
    return (
      <div className={`inline-flex items-center select-none cursor-pointer transition-transform hover:opacity-95 ${className}`}>
        <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-sm border border-white/20 inline-flex items-center">
          <img 
            src="/logo.png" 
            alt="My Cosmetic Surgery - Dr. R. K. Mishra" 
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer group ${className}`}>
      <img 
        src="/logo.png" 
        alt="My Cosmetic Surgery - Dr. R. K. Mishra" 
        className={variant === 'compact' ? "h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]" : "h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"}
      />
    </div>
  );
};
