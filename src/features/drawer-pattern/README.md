# Reusable Drawer Pattern for Next.js 15

This is a reusable drawer pattern for Next.js 15 applications that provides a consistent way to display items in a drawer with URL synchronization.

## Features

- 🔄 URL synchronization with drawer state
- 📱 Mobile-friendly drawer UI
- 🧩 Fully typed with TypeScript
- 🎨 Customizable rendering
- 🔌 Pluggable data fetching
- 🧪 Easy to test
- 🌲 Tree-shakable with direct imports

## Components

### `DrawerWrapper`

A wrapper component for the drawer UI that handles the drawer state and rendering.

### `ItemSelector`

A component for displaying a list of items that can be selected to open the drawer.

### `MainContentWrapper`

A wrapper component for the main content that displays the item selector.

## Hooks

### `useDrawerState`

A hook that manages the drawer state and URL synchronization.

### `useItemData`

A hook that manages data fetching for items.

## Usage

Here's a basic example of how to use the drawer pattern:

```tsx
"use client";

import { Button } from "@/components/ui/button";
// Direct imports for better tree-shaking
import { DrawerWrapper } from "@/features/drawer-pattern/DrawerWrapper";
import { MainContentWrapper } from "@/features/drawer-pattern/MainContentWrapper";
import { useDrawerState } from "@/features/drawer-pattern/useDrawerState";
import { useItemData } from "@/features/drawer-pattern/useItemData";
import type { Item } from "@/features/drawer-pattern/types";
import { useEffect } from "react";

// Define your item type
interface User extends Item {
  name: string;
  email: string;
}

// API functions
const fetchUser = async (id: string): Promise<User> => {
  // Your API call here
};

const fetchUsers = async (): Promise<User[]> => {
  // Your API call here
};

export default function YourPage() {
  // Use the hooks
  const { isOpen, itemId, setDrawerOpen, handleItemSelect } = useDrawerState({
    urlPattern: "/your-path/items/(\\w+)",
    baseUrl: "/your-path/items/",
  });
  
  const { items, selectedItem, isLoading, error, fetchData } = useItemData<User>({
    fetchItem: fetchUser,
    fetchItems: fetchUsers,
  });

  // Fetch data when itemId changes
  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    }
  }, [itemId, fetchData]);

  // Render an item button
  const renderItemButton = (item: User) => (
    <Button variant="outline">
      {item.name}
    </Button>
  );

  return (
    <main>
      <MainContentWrapper
        itemId={itemId}
        items={items}
        onItemSelect={handleItemSelect}
        renderItem={renderItemButton}
        title="Your Items"
        description="Select an item to view details."
      />
      
      <DrawerWrapper
        open={isOpen}
        onOpenChange={setDrawerOpen}
        itemId={itemId || undefined}
        title="Item Details"
        description="View detailed information"
      >
        {/* Render your item details here */}
      </DrawerWrapper>
    </main>
  );
}
```

## Routing Setup

To make this work with Next.js App Router, you need to set up a catch-all route:

1. Create a file at `app/your-path/items/[...slug]/page.tsx`
2. Import your main page component and render it:

```tsx
// app/your-path/items/[...slug]/page.tsx
import YourPage from "../../page";

export default function CatchAllPage() {
  return <YourPage />;
}
```

## Dependencies

This pattern requires the following dependencies:

- Next.js 15+
- React 18+
- Shadcn UI (for the drawer component)
- Tailwind CSS

## Optimization Notes

### Direct Imports vs Barrel Files

For optimal tree-shaking and bundle size, we recommend using direct imports:

```tsx
// ✅ Recommended: Direct imports
import { DrawerWrapper } from "@/features/drawer-pattern/DrawerWrapper";
import { useDrawerState } from "@/features/drawer-pattern/useDrawerState";

// ❌ Not recommended: Barrel imports
import { DrawerWrapper, useDrawerState } from "@/features/drawer-pattern";
```

Direct imports allow the bundler to better tree-shake unused code and can improve build performance.

## Customization

You can customize the appearance and behavior of the drawer pattern by:

1. Modifying the component props
2. Extending the base types
3. Creating custom render functions
4. Styling with Tailwind classes

## License

MIT 