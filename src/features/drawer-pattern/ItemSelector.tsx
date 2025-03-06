"use client";

import { HStack } from "@/components/ui/stack";
import { Item, ItemSelectorProps } from "./types";

export function ItemSelector<T extends Item>({
  items,
  onItemSelect,
  renderItem,
  className = "",
}: ItemSelectorProps<T>) {
  return (
    <div className={`space-y-4 ${className}`}>
      <HStack className="flex-wrap gap-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onItemSelect(item.id)}
            className="cursor-pointer"
          >
            {renderItem(item)}
          </div>
        ))}
      </HStack>
    </div>
  );
} 