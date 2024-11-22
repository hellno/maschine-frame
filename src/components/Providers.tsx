"use client";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
}

const config = getDefaultConfig({
  appName: "@maschine mainframe",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [base],
  ssr: true,
});

// Custom theme configuration
const customTheme = darkTheme({
  accentColor: "#ff00ff", // Magenta accent to match our sci-fi theme
  accentColorForeground: "#ffffff",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
