"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DrawerWrapperProps } from "./types";

export function DrawerWrapper({
  open,
  onOpenChange,
  itemId,
  children,
  title,
  description,
}: DrawerWrapperProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="max-h-[100dvh]">
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader>
            <DrawerTitle>
              {itemId ? `${title} (ID: ${itemId})` : title}
            </DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4">
            {children}
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 