"use client";

import { AddDrawer } from "@/components/AddDrawer";
import { OpenUsersButton } from "@/components/OpenUsersButton";
import { useAsPath } from "@/hooks/useAsPath";

export default function Home() {
  // Get the current path from our hook
  const asPath = useAsPath();
  
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Hello world!</div>
        <AddDrawer 
          trigger={<OpenUsersButton userId="1" />}
        />
        <div className="text-sm text-gray-500 mt-4">
          Current URL: {asPath}
        </div>
      </div>
    </main>
  );
}