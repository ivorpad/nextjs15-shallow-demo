/**
 * Generic item interface that can be extended for specific use cases
 */
export interface Item {
  id: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

/**
 * Props for the ItemSelector component
 */
export interface ItemSelectorProps<T extends Item> {
  items: T[];
  onItemSelect: (itemId: string) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

/**
 * Props for the DrawerContent component
 */
export interface DrawerContentProps<T extends Item> {
  item: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Props for the DrawerWrapper component
 */
export interface DrawerWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId?: string;
  children?: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Props for the MainContentWrapper component
 */
export interface MainContentWrapperProps<T extends Item> {
  itemId: string | null;
  items: T[];
  onItemSelect: (itemId: string) => void;
  renderItem: (item: T) => React.ReactNode;
  title: string;
  description: string;
} 