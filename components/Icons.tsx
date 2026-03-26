import React from 'react';

export const ArrowLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const ArrowCircleRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8L14 12L10 16" strokeWidth="1.5" />
  </svg>
);

export const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const OvalNumber = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center relative mx-1 align-middle" style={{ width: '2.4em', height: '1.4em' }}>
    <svg viewBox="0 0 40 24" className="absolute inset-0 w-full h-full text-current" fill="none" stroke="currentColor" strokeWidth="1">
      <ellipse cx="20" cy="12" rx="19" ry="11" />
    </svg>
    <span className="font-body text-[0.65em] font-bold relative z-10 translate-y-[1px]">
      {num.toString().padStart(2, '0')}
    </span>
  </span>
);

export const LogoStack = ({ className }: { className?: string }) => (
  <div className={`flex flex-col leading-[0.75] text-[10px] tracking-tighter font-display font-bold ${className}`}>
    <span>SECUREX</span>
    <span>SECUREX</span>
    <span>SECUREX</span>
  </div>
);
