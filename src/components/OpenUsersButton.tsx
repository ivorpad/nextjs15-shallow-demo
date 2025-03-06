"use client";

import { Button } from "@/components/ui/button";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface OpenUsersButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  userId?: string;
  onUserSelect?: (userId: string) => void;
}

export const OpenUsersButton = forwardRef<HTMLButtonElement, OpenUsersButtonProps>(
  ({ className, onClick, userId = "1", onUserSelect, ...props }, ref) => {
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
        } else {
          // If no callback provided, update URL directly (fallback)
          console.log("OpenUsersButton - No onUserSelect provided, setting URL directly");
          window.history.pushState({ userId }, "", `/users/${userId}`);
        }
      }
    };
    
    return (
      <Button ref={ref} onClick={handleClick} className={className} {...props}>
        Open Users
      </Button>
    );
  }
);

OpenUsersButton.displayName = "OpenUsersButton";