import type { Metadata } from "next";
import "./globals.css";
import "../styles/SciFiInput.css";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "@maschine mainframe",
  description: "hihi :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
