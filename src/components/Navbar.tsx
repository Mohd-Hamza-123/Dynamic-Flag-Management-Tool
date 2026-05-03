"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white px-6 py-4 flex justify-between">
      <h1 className="font-semibold">Feature Flag Tool</h1>

      <div className="flex gap-3">
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>

        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </div>
    </nav>
  );
}