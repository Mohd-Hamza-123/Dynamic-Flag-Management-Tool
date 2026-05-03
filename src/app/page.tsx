import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">
        Dynamic Feature Flag Management Tool
      </h1>

      <p className="text-gray-600 mb-6 max-w-xl">
        Control features dynamically without redeploying your application.
        Enable or disable features in real-time.
      </p>

      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-blue-700"
      >
        Go to Dashboard <FiArrowRight />
      </Link>
    </div>
  );
}