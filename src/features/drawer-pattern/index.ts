/**
 * @file Entry point for the drawer pattern
 * 
 * This file provides direct exports of specific components and hooks
 * rather than using barrel exports to improve tree-shaking.
 * 
 * Import specific components and hooks directly:
 * import { DrawerWrapper } from "@/features/drawer-pattern/DrawerWrapper";
 * import { ItemSelector } from "@/features/drawer-pattern/ItemSelector";
 * import { useDrawerState } from "@/features/drawer-pattern/useDrawerState";
 */

// This file is kept for backward compatibility but direct imports are recommended
export type { Item } from './types';
export type { 
  ItemSelectorProps,
  DrawerContentProps,
  DrawerWrapperProps,
  MainContentWrapperProps 
} from './types';

export { DrawerWrapper } from './DrawerWrapper';
export { ItemSelector } from './ItemSelector';
export { MainContentWrapper } from './MainContentWrapper';
export { useDrawerState } from './useDrawerState';
export { useItemData } from './useItemData'; 