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
  email?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
  };
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
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
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader>
            <DrawerTitle>
              {userId ? `User Details (ID: ${userId})` : "All Users"}
            </DrawerTitle>
            <DrawerDescription>
              {userId ? "View detailed information about this user" : "Browse all available users."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-4">
              {children}

              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              
              {error && (
                <div className="text-red-500 p-4 border border-red-200 rounded-md">
                  Error: {error}
                </div>
              )}

              {users.length > 0 ? (
                <div className="space-y-6">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 p-4 rounded-lg border">
                      <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex">
                          <span className="font-medium w-24">Email:</span>
                          <span>{user.email || "N/A"}</span>
                        </div>
                        
                        <div className="flex">
                          <span className="font-medium w-24">Phone:</span>
                          <span>{user.phone || "N/A"}</span>
                        </div>
                        
                        <div className="flex">
                          <span className="font-medium w-24">Website:</span>
                          <span>{user.website || "N/A"}</span>
                        </div>
                        
                        {user.company && (
                          <div className="mt-2">
                            <div className="font-medium mb-1">Company:</div>
                            <div className="pl-4">
                              <div>{user.company.name}</div>
                              {user.company.catchPhrase && (
                                <div className="text-gray-500 italic">&ldquo;{user.company.catchPhrase}&rdquo;</div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {user.address && (
                          <div className="mt-2">
                            <div className="font-medium mb-1">Address:</div>
                            <div className="pl-4">
                              {user.address.street && <div>{user.address.street}{user.address.suite ? `, ${user.address.suite}` : ''}</div>}
                              {user.address.city && <div>{user.address.city}{user.address.zipcode ? `, ${user.address.zipcode}` : ''}</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : !loading && !error ? (
                <div className="text-center py-8 text-gray-500">No users found</div>
              ) : null}
            </div>
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
