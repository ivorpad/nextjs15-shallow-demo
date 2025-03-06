// This catch-all route handles any URL paths like /users/1
"use client";

import { usePathname } from "next/navigation";

// It renders a standalone component that handles the URL parameters
export default function CatchAllPage() {
  const pathname = usePathname();
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
        <div className="text-3xl font-bold mb-4">Catch-all Route</div>
        <div>Current path: {pathname}</div>
      </div>
    </main>
  );
}
