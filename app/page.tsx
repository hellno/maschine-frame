import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import Link from "next/link";
import { createExampleURL } from "./utils";
import { Frame } from "./components/Frame";
import SciFiPostInput from "@/components/SciFiPostInput";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "@maschine mainframe",
    description: "hihi :)",
    other: {
      ...(await fetchMetadata(createExampleURL("/frames"))),
    },
  };
}

export default async function Home() {
  const metadata = await generateMetadata();

  // then, when done, return next frame
  return (
    <div className="flex flex-col w-full gap-2 mx-auto">
      <SciFiPostInput />
    </div>
  );
}
