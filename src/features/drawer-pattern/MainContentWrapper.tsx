"use client";

import { Item, MainContentWrapperProps } from "./types";
import { ItemSelector } from "./ItemSelector";

export function MainContentWrapper<T extends Item>({
  itemId,
  items,
  onItemSelect,
  renderItem,
  title,
  description,
}: MainContentWrapperProps<T>) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {itemId ? `${title} ${itemId}` : title}
      </h2>
      
      <p className="mb-4">
        {description}
      </p>
      
      <div className="my-4">
        <ItemSelector
          items={items}
          onItemSelect={onItemSelect}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
} 