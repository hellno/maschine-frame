"use client";

import React, { useState, useEffect } from "react";
import { generateCSRFToken } from "@/utils/csrf";
import { SciFiNavbar } from "./SciFiNavbar";
import { GlitchText } from "./GlitchText";

export default function SciFiPostInput() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <SciFiNavbar />
      <div className="absolute inset-0 overflow-hidden bg-gray-900">
        <div className="grid-background absolute inset-0"></div>
        <div className="grid-overlay absolute inset-0"></div>
      </div>
      <div className="w-full max-w-4xl p-8 rounded-lg backdrop-blur-xl bg-black/20 relative overflow-hidden glow-effect">
        <div className="holographic-overlay absolute inset-0 pointer-events-none"></div>
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-8">
            <GlitchText
              text="farcaster_transmission for @maschine"
              className="text-3xl font-bold text-cyan-500 mb-2 font-['Orbitron']"
            />
            <p className="text-cyan-400 font-['Orbitron']"></p>
          </div>
          <textarea
            className="sci-fi-input w-full h-40 p-4 rounded-md font-mono text-lg resize-none mb-6"
            placeholder="What do you want @maschine to post about?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="sci-fi-button py-3 px-8 rounded-md text-lg font-['Orbitron']"
            >
              TRANSMIT
            </button>
          </div>
        </form>
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
