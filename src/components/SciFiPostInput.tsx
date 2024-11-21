"use client";

import React, { useState } from "react";
import { SciFiNavbar } from "./SciFiNavbar";

export default function SciFiPostInput() {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log("Posting:", postContent);
    // Reset the input field
    setPostContent("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <SciFiNavbar />
      <div className="grid-background absolute inset-0 opacity-50"></div>
      <div className="w-full max-w-4xl p-8 rounded-lg backdrop-blur-sm bg-black/30 relative overflow-hidden glow-effect">
        <div className="holographic-overlay absolute inset-0 pointer-events-none"></div>
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-cyan-300 mb-2 font-['Orbitron']">
              MISSION BRIEFING
            </h2>
            <p className="text-cyan-400 font-['Orbitron']">
              ENTER TRANSMISSION FOR @maschine
            </p>
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
