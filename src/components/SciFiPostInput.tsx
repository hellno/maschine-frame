"use client";

import React, { useState, useEffect } from "react";
import { generateCSRFToken } from "@/utils/csrf";
import { SciFiNavbar } from "./SciFiNavbar";
import { GlitchText } from "./GlitchText";

// Background Effects Component
const RetroBackground = () => (
  <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
    <div className="animated-gradient"></div>
    <div className="grid-background"></div>
    <div className="retrowave-sun"></div>
    <div className="scanline"></div>
  </div>
);

// Close Button Component
const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <button className="close-button" onClick={onClose} aria-label="Close window">
    X
  </button>
);

// Form Header Component
const FormHeader = () => (
  <div className="mb-8">
    <GlitchText
      text="@maschine"
      className="text-4xl md:text-6xl font-bold text-cyan-500 mb-2 font-['Orbitron']"
    />
    <br />
    <GlitchText
      text="your unhinged transmission to farcaster..."
      className="text-xl md:text-2xl font-bold text-cyan-500 mb-2 font-['Orbitron']"
    />
    <p className="text-cyan-400 font-['Orbitron'] tracking-wider"></p>
  </div>
);

// Transmission Form Component
const TransmissionForm = ({
  postContent,
  setPostContent,
  handleSubmit,
}: {
  postContent: string;
  setPostContent: (content: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}) => (
  <form onSubmit={handleSubmit} className="relative z-10">
    <FormHeader />
    <textarea
      className="sci-fi-input w-full h-32 sm:h-40 p-3 sm:p-4 rounded-md font-['Orbitron'] text-base sm:text-lg resize-none mb-4 sm:mb-6"
      placeholder="What do you want @maschine to post about?"
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
    ></textarea>
    <div className="flex justify-end">
      <button
        type="submit"
        className="sci-fi-button py-2 sm:py-3 px-6 sm:px-8 rounded-md text-base sm:text-lg font-['Orbitron'] tracking-wider"
      >
        TRANSMIT
      </button>
    </div>
  </form>
);

export default function SciFiPostInput() {
  const [isVisible, setIsVisible] = useState(true);
  const [postContent, setPostContent] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Generate and store CSRF token in cookie when component mounts
    const token = generateCSRFToken();
    document.cookie = `csrf_token=${token}; path=/; SameSite=Strict`;
    setCsrfToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/transmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: postContent,
          csrfToken: csrfToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transmit message");
      }

      // Show the response message
      alert(data.error || "Message transmitted successfully");

      // Reset the input field
      setPostContent("");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to transmit message",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <SciFiNavbar />
      <RetroBackground />
      {isVisible && (
        <div className="sci-fi-window w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 relative">
          <div className="glass-reflection"></div>
          <div className="inner-bevel"></div>
          <CloseButton onClose={() => setIsVisible(false)} />
          <div className="relative z-10">
            <TransmissionForm
              postContent={postContent}
              setPostContent={setPostContent}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
