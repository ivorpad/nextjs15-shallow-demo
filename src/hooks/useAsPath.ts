"use client";

import { useEffect, useState, useCallback } from "react";

// This hook returns the current path as a string, just like Next.js 12's asPath
export function useAsPath(): string {
  const [asPath, setAsPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''
  );

  const updatePath = useCallback(() => {
    setAsPath(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", updatePath);
    
    // Also listen for pushState and replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    // Override pushState
    window.history.pushState = function(data: unknown, unused: string, url?: string | URL | null) {
      originalPushState.call(this, data, unused, url);
      updatePath();
    };
    
    // Override replaceState
    window.history.replaceState = function(data: unknown, unused: string, url?: string | URL | null) {
      originalReplaceState.call(this, data, unused, url);
      updatePath();
    };
    
    return () => {
      window.removeEventListener("popstate", updatePath);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [updatePath]);

  return asPath;
} 