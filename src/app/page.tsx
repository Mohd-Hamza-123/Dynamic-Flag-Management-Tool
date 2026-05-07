import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="patternBackground"></div>
      <div className="relative z-1 flex flex-col items-center justify-center h-dvh text-center">
        <h1 className="text-4xl font-bold mb-4">
          Dynamic Feature Flag Management Tool
        </h1>

        <p className="text-gray-200 mb-6 max-w-xl">
          Control features dynamically without redeploying your application.
          Enable or disable features in real-time.
        </p>

        <Link
          href="/dashboard"
          className="bg-zinc-100 text-zinc-800 px-6 py-2 rounded flex items-center gap-2 hover:bg-zinc-200"
        >
          Go to Dashboard <ChevronRight />
        </Link>
      </div>
    </main>
  );
}