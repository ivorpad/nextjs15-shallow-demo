"use client";

import { Button } from "@/components/ui/button";
import { DrawerWrapper } from "@/features/drawer-pattern/DrawerWrapper";
import { MainContentWrapper } from "@/features/drawer-pattern/MainContentWrapper";
import { useDrawerState } from "@/features/drawer-pattern/useDrawerState";
import { useItemData } from "@/features/drawer-pattern/useItemData";
import type { Item } from "@/features/drawer-pattern/types";
import { useEffect } from "react";

// Define our User type extending the base Item interface
interface User extends Item {
  name: string;
  email: string;
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

// Sample data for demonstration
const sampleUsers: User[] = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@example.com",
    phone: "555-1234",
    website: "johndoe.com"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "555-5678",
    website: "janesmith.com"
  },
  { 
    id: "3", 
    name: "Alex Johnson", 
    email: "alex@example.com",
    phone: "555-9012",
    website: "alexj.com"
  },
  { 
    id: "4", 
    name: "Sam Wilson", 
    email: "sam@example.com",
    phone: "555-3456",
    website: "samwilson.com"
  },
];

// Mock API functions
const fetchUser = async (id: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user by ID or throw error
  const user = sampleUsers.find(user => user.id === id);
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  
  return user;
};

const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return sampleUsers;
};

export default function DrawerDemoPage() {
  // Use our custom hooks
  const { isOpen, itemId, setDrawerOpen, handleItemSelect } = useDrawerState({
    urlPattern: "/drawer-demo/users/(\\w+)",
    baseUrl: "/drawer-demo/users/",
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

  // Render a user button
  const renderUserButton = (user: User) => (
    <Button variant="outline" className="min-w-[150px]">
      {user.name}
    </Button>
  );

  // Render user details in the drawer
  const renderUserDetails = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 p-4 border border-red-200 rounded-md">
          Error: {error}
        </div>
      );
    }

    if (!selectedItem) {
      return (
        <div className="text-center py-8 text-gray-500">
          No user selected
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">{selectedItem.name}</h3>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex">
              <span className="font-medium w-24">Email:</span>
              <span>{selectedItem.email || "N/A"}</span>
            </div>
            
            <div className="flex">
              <span className="font-medium w-24">Phone:</span>
              <span>{selectedItem.phone || "N/A"}</span>
            </div>
            
            <div className="flex">
              <span className="font-medium w-24">Website:</span>
              <span>{selectedItem.website || "N/A"}</span>
            </div>
            
            {selectedItem.company && (
              <div className="mt-2">
                <div className="font-medium mb-1">Company:</div>
                <div className="pl-4">
                  <div>{selectedItem.company.name}</div>
                  {selectedItem.company.catchPhrase && (
                    <div className="text-gray-500 italic">&ldquo;{selectedItem.company.catchPhrase}&rdquo;</div>
                  )}
                </div>
              </div>
            )}
            
            {selectedItem.address && (
              <div className="mt-2">
                <div className="font-medium mb-1">Address:</div>
                <div className="pl-4">
                  {selectedItem.address.street && (
                    <div>
                      {selectedItem.address.street}
                      {selectedItem.address.suite ? `, ${selectedItem.address.suite}` : ''}
                    </div>
                  )}
                  {selectedItem.address.city && (
                    <div>
                      {selectedItem.address.city}
                      {selectedItem.address.zipcode ? `, ${selectedItem.address.zipcode}` : ''}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
        <div className="text-3xl font-bold mb-4">Drawer Pattern Demo</div>
        
        <MainContentWrapper
          itemId={itemId}
          items={items}
          onItemSelect={handleItemSelect}
          renderItem={renderUserButton}
          title="User Directory"
          description="Select a user to view their details in a drawer."
        />
        
        <DrawerWrapper
          open={isOpen}
          onOpenChange={setDrawerOpen}
          itemId={itemId || undefined}
          title="User Details"
          description="View detailed information about this user"
        >
          {renderUserDetails()}
        </DrawerWrapper>
        
        <div className="text-sm text-gray-500 mt-4">
          Current URL: {typeof window !== 'undefined' ? window.location.pathname : ''}
        </div>
      </div>
    </main>
  );
} 