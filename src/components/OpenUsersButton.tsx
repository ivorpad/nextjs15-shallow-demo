"use client";

import { Button } from "@/components/ui/button";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { useAsPath } from "@/hooks/useAsPath";

interface OpenUsersButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  userId?: string;
}

export const OpenUsersButton = forwardRef<HTMLButtonElement, OpenUsersButtonProps>(
  ({ className, onClick, userId = "1", ...props }, ref) => {
    // Get the current path from our hook
    const currentPath = useAsPath();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("OpenUsersButton - Current path:", currentPath);
      
      // Call the original onClick if it exists
      if (onClick) {
        onClick(e);
      }
      
      // Only navigate if the event wasn't prevented
      if (!e.defaultPrevented) {
        console.log("OpenUsersButton - Setting URL to /users/" + userId);
        window.history.pushState({}, "", `/users/${userId}`);
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