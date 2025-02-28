"use client";

import React from "react";
import { Home, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { SciFiConnectButton } from "./SciFiConnectButton";

const navItems = [
  { icon: Home, href: "https://www.maschine.fun", label: "Mainframe" },
  {
    icon: Globe,
    href: "https://warpcast.com/maschine",
    label: "Warpcast",
  },
  {
    href:"https://hypersub.xyz/s/maschine-10v1dj0ipor28",
    label: "Hypersub",
    icon: Zap,
  }
];

export function SciFiNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cyan-300 hover:text-cyan-100 transition-colors duration-200 flex flex-col items-center group px-4"
              >
                <item.icon className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                <span className="text-xs font-['Orbitron'] tracking-wider opacity-100 group-hover:opacity-80 transition-opacity duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <SciFiConnectButton />
        </div>
      </div>
    </nav>
  );
}
