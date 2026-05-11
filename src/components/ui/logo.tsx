import React from 'react';

export function Logo({ className = "h-12 w-auto", dark = false }: { className?: string, dark?: boolean }) {
  return (
    <img 
      src="/njiru-tech-logo.jpeg" 
      alt="Njiru Technologies Logo" 
      className={`${className} object-contain ${dark ? 'invert' : ''}`}
      style={{ display: 'block' }}
    />
  );
}
