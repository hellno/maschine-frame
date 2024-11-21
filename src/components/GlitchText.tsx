"use client";

import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  React.useEffect(() => {
    const chars = document.querySelectorAll('.glitch-char');
    chars.forEach((char, index) => {
      char.style.setProperty('--char-index', Math.random().toString());
    });
  }, [text]);

  return (
    <div className={`glitch-wrapper ${className}`}>
      {text.split('').map((char, index) => (
        <span key={index} className="glitch-char" data-char={char}>
          {char}
        </span>
      ))}
    </div>
  );
}
