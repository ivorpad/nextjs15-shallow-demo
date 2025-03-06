"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface User {
  id: string;
  name: string;
}

interface AddDrawerProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  userId?: string;
}

export function AddDrawer({ trigger, children, open: controlledOpen, onOpenChange, userId: propUserId }: AddDrawerProps) {
  const [userId, setUserId] = useState<string | null>(propUserId || null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Log the userId when it changes
  useEffect(() => {
    console.log("AddDrawer - Current userId:", userId);
  }, [userId]);
  
  // Update userId when propUserId changes
  useEffect(() => {
    if (propUserId !== undefined) {
      console.log("AddDrawer - Received new userId prop:", propUserId);
      setUserId(propUserId);
    }
  }, [propUserId]);
  
  // Handle controlled open state
  useEffect(() => {
    if (controlledOpen !== undefined) {
      console.log("AddDrawer - Controlled open state changed to:", controlledOpen);
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);
  
  // Handle internal open state changes
  const handleOpenChange = (newOpen: boolean) => {
    console.log("AddDrawer - handleOpenChange:", newOpen);
    setOpen(newOpen);
    
    // Notify parent component of open state change
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  // Fetch data when the drawer opens or userId changes
  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      console.log("AddDrawer - Starting fetch with userId:", userId);

      try {
        // If we have a userId, fetch that specific user
        const url = userId 
          ? `https://jsonplaceholder.typicode.com/users/${userId}`
          : "https://jsonplaceholder.typicode.com/users";
          
        console.log("AddDrawer - Fetching from URL:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched users:", data);

        if (userId) {
          console.log("AddDrawer - Single user mode, user data:", data);
          // If we fetched a single user, put it in an array
          setUsers([data]);
        } else if (Array.isArray(data)) {
          console.log("AddDrawer - Multiple users mode, count:", data.length);
          setUsers(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open, userId]);

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      {trigger && (
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent className="max-h-[100dvh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {userId ? `User Details (ID: ${userId})` : "Add New Item"}
            </DrawerTitle>
            <DrawerDescription>
              {userId ? "View user details" : "Fill in the details to add a new item."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-4">
              {children}

              {loading && <div>Loading users...</div>}
              {error && <div className="text-red-500">Error: {error}</div>}

              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="p-2 border rounded">
                    {user.name}
                  </div>
                ))
              ) : !loading && !error ? (
                <div>No users found</div>
              ) : null}
            </div>
          </div>
          <DrawerFooter>
            <Button>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
