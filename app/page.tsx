import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import { createExampleURL } from "./utils";
import SciFiPostInput from "@/components/SciFiPostInput";
import { Providers } from "@/components/Providers";

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

  return (
    <Providers>
      <div className="flex flex-col w-full gap-2 mx-auto">
        <SciFiPostInput />
      </div>
    </Providers>
  );
}
