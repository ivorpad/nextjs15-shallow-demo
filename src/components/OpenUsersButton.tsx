"use client";

import { Button } from "@/components/ui/button";
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

interface OpenUsersButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  userId?: string;
  onUserSelect?: (userId: string) => void;
  children?: ReactNode;
}

export const OpenUsersButton = forwardRef<HTMLButtonElement, OpenUsersButtonProps>(
  ({ className, onClick, userId = "1", onUserSelect, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("OpenUsersButton - Button clicked for userId:", userId);
      
      // Call the original onClick if it exists (for drawer trigger)
      if (onClick) {
        console.log("OpenUsersButton - Calling parent onClick");
        onClick(e);
      }
      
      // Only proceed if the event wasn't prevented
      if (!e.defaultPrevented) {
        // Call the onUserSelect callback if provided
        if (onUserSelect) {
          console.log("OpenUsersButton - Calling onUserSelect with:", userId);
          onUserSelect(userId);
        }
      }
    };
    
    return (
      <Button ref={ref} onClick={handleClick} className={className} {...props}>
        {children || "Open Users"}
      </Button>
    );
  }
);

OpenUsersButton.displayName = "OpenUsersButton";