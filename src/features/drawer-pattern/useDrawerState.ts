"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface UseDrawerStateOptions {
  /**
   * The URL pattern to match for extracting the item ID
   * Example: /users/:id would be /users/(\\w+)
   */
  urlPattern: string;
  
  /**
   * The base URL to use when updating the URL
   * Example: /users/
   */
  baseUrl: string;
}

interface DrawerState {
  isOpen: boolean;
  itemId: string | null;
  setDrawerOpen: (open: boolean) => void;
  handleItemSelect: (id: string) => void;
}

/**
 * Custom hook to manage drawer state and URL synchronization
 */
export function useDrawerState({ urlPattern, baseUrl }: UseDrawerStateOptions): DrawerState {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);

  // Check URL path on mount and when it changes
  useEffect(() => {
    if (!pathname) return;
    
    const regex = new RegExp(urlPattern);
    const match = pathname.match(regex);
    
    if (match && match[1]) {
      const id = match[1];
      setItemId(id);
      setIsOpen(true);
    } else {
      // Reset if we're not on an item page
      setIsOpen(false);
    }
  }, [pathname, urlPattern]);

  // Handle drawer state changes
  const setDrawerOpen = (open: boolean) => {
    setIsOpen(open);
    
    // If closing the drawer, reset the URL to home
    if (!open && itemId) {
      window.history.pushState({}, "", "/");
      setItemId(null);
    }
  };

  // Handle item selection
  const handleItemSelect = (id: string) => {
    setItemId(id);
    
    // Update URL to reflect the selected item
    window.history.pushState({}, "", `${baseUrl}${id}`);
    setIsOpen(true);
  };

  return {
    isOpen,
    itemId,
    setDrawerOpen,
    handleItemSelect,
  };
} 