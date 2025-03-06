"use client";

import { useState, useEffect, useCallback } from "react";
import { Item } from "./types";

interface UseItemDataOptions<T extends Item> {
  /**
   * Function to fetch a single item by ID
   */
  fetchItem: (id: string) => Promise<T>;
  
  /**
   * Function to fetch all items
   */
  fetchItems: () => Promise<T[]>;
  
  /**
   * Whether to fetch data immediately on mount
   * @default true
   */
  fetchOnMount?: boolean;
}

interface ItemDataState<T extends Item> {
  items: T[];
  selectedItem: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (itemId?: string) => Promise<void>;
}

/**
 * Custom hook to manage item data fetching
 */
export function useItemData<T extends Item>({
  fetchItem,
  fetchItems,
  fetchOnMount = true,
}: UseItemDataOptions<T>): ItemDataState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async (itemId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (itemId) {
        // Fetch a single item
        const item = await fetchItem(itemId);
        setSelectedItem(item);
        
        // If we don't have items yet, fetch them too
        if (items.length === 0) {
          const allItems = await fetchItems();
          setItems(allItems);
        }
      } else {
        // Fetch all items
        const allItems = await fetchItems();
        setItems(allItems);
        setSelectedItem(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [fetchItem, fetchItems, items.length]);

  // Fetch data on mount if enabled
  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount, fetchData]);

  return {
    items,
    selectedItem,
    isLoading,
    error,
    fetchData,
  };
} 