"use client";

import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div className={`glitch-wrapper ${className}`}>
      <div className="glitch" data-text={text}>
        {text}
      </div>
    </div>
  );
}
