import type { Metadata } from "next";
import SciFiPostInput from "@/components/SciFiPostInput";
import { Providers } from "@/components/Providers";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "@maschine mainframe",
    description: "hihi :)",
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
