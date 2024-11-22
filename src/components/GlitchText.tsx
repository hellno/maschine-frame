"use client";

import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(-1); // Start before first character

  // Typing effect with cursor leading the text
  useEffect(() => {
    if (cursorPosition < text.length) {
      const cursorTimeout = setTimeout(() => {
        setCursorPosition(prev => prev + 1);
        // Add character to display text after cursor moves past it
        if (cursorPosition >= 0) {
          setDisplayText(prev => prev + text[cursorPosition]);
        }
      }, 100); // Adjust typing speed here
      return () => clearTimeout(cursorTimeout);
    } else {
      setIsTyping(false);
    }
  }, [text, cursorPosition]);

  // Set random char indices for glitch effect after typing is complete
  useEffect(() => {
    if (!isTyping) {
      const chars = document.querySelectorAll<HTMLElement>('.glitch-char');
      chars.forEach((char) => {
        char.style.setProperty('--char-index', Math.random().toString());
      });
    }
  }, [isTyping]);

  return (
    <div className={`glitch-wrapper ${className} relative`}>
      {displayText.split('').map((char, index) => (
        <span 
          key={index} 
          className={`glitch-char ${char === ' ' ? 'glitch-space' : ''} ${!isTyping ? 'glitch-active' : ''}`}
          data-char={char}
          aria-hidden={char === ' ' ? 'true' : 'false'}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {isTyping && (
        <span 
          className="typing-cursor"
          style={{ left: `${Math.max(0, cursorPosition) * 0.6}em` }}
        >
          _
        </span>
      )}
    </div>
  );
}
