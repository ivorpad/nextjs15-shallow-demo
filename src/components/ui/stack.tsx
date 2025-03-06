import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const VStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      />
    );
  }
);
VStack.displayName = "VStack";

export const HStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-row", className)}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack"; 