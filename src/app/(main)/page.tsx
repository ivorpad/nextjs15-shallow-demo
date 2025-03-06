"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AddDrawer } from "@/components/AddDrawer";
import { MainContent } from "@/components/MainContent";

export default function MainPage() {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check URL path on mount and when it changes
  useEffect(() => {
    console.log("MainPage - Current pathname:", pathname);
    const userMatch = pathname?.match(/\/users\/(\w+)/);
    
    if (userMatch && userMatch[1]) {
      const id = userMatch[1];
      console.log("MainPage - Found userId in pathname:", id);
      setUserId(id);
      setDrawerOpen(true);
    } else {
      // Reset if we're not on a user page
      setDrawerOpen(false);
    }
  }, [pathname]);

  // Handle drawer state changes
  const handleDrawerOpenChange = (open: boolean) => {
    console.log("MainPage - Drawer open state changed:", open);
    setDrawerOpen(open);
    
    // If closing the drawer, reset the URL to home
    if (!open && userId) {
      console.log("MainPage - Resetting URL to /");
      window.history.pushState({}, "", "/");
      setUserId(null);
    }
  };

  // Handle button click to open the drawer
  const handleUserSelect = (id: string) => {
    console.log("MainPage - User selected:", id);
    setUserId(id);
    
    // Update URL to reflect the selected user
    console.log("MainPage - Setting URL to /users/" + id);
    window.history.pushState({}, "", `/users/${id}`);
    setDrawerOpen(true);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
        <div className="text-3xl font-bold mb-4">My App</div>
        
        <MainContent 
          userId={userId}
          onUserSelect={handleUserSelect}
        />
        
        {/* Always render the drawer with controlled open state */}
        <AddDrawer 
          open={isDrawerOpen}
          onOpenChange={handleDrawerOpenChange}
          userId={userId || undefined}
        />
        
        <div className="text-sm text-gray-500 mt-4">
          Current URL: {pathname || ""}
        </div>
      </div>
    </main>
  );
} 