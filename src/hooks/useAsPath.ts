"use client";

import { useEffect, useState, useCallback } from "react";

// This hook returns the current path as a string, similar to Next.js 12's asPath
export function useAsPath(): string {
  // Initialize with the window location if available
  const [asPath, setAsPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : ''
  );

  // Update the path when window is available (critical for initial hard navigation)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("useAsPath - Initial window.location.pathname:", window.location.pathname);
      setAsPath(window.location.pathname);
    }
  }, []);

  const updatePath = useCallback(() => {
    if (typeof window !== 'undefined') {
      console.log("useAsPath - Updating path to:", window.location.pathname);
      setAsPath(window.location.pathname);
    }
  }, []);

  // Listen for browser navigation events and history API calls
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("popstate", updatePath);
      
      // Override history methods to track URL changes
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(data: unknown, unused: string, url?: string | URL | null) {
        originalPushState.call(this, data, unused, url);
        updatePath();
      };
      
      window.history.replaceState = function(data: unknown, unused: string, url?: string | URL | null) {
        originalReplaceState.call(this, data, unused, url);
        updatePath();
      };
      
      return () => {
        window.removeEventListener("popstate", updatePath);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
    return undefined;
  }, [updatePath]);

  return asPath;
} 