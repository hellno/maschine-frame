"use client";

import React from "react";
import { Home, Globe, Radio, Rocket, Zap } from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: Home, href: "https://www.maschine.fun", label: "Mainframe" },
  {
    icon: Globe,
    href: "https://warpcast.com/maschine",
    label: "Warpcasst",
  },
  {
    icon: Rocket,
    href: "https://www.youtube.com/watch?v=K48AasRJpag",
    label: "Rocket",
  },
  // { icon: Radio, href: "https://www.spotify.com", label: "Comms Channel" },
  // { icon: Zap, href: "https://www.technews.com", label: "Tech Pulse" },
];

export function SciFiNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="grid items-center grid-cols-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cyan-300 hover:text-cyan-100 transition-colors duration-200 flex flex-col items-center group"
              >
                <item.icon className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                <span className="text-xs font-['Orbitron'] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
