"use client";

import { UserButtonsGroup } from "@/components/UserButtonsGroup";
import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

export default function UserDemoPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleUserSelect = async (userId: string) => {
    setSelectedUserId(userId);
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUserData: UserData = {
        id: userId,
        name: userId === "1" ? "John Doe" : 
              userId === "2" ? "Jane Smith" : 
              userId === "3" ? "Alex Johnson" : 
              "Sam Wilson",
        email: `user${userId}@example.com`,
        role: userId === "1" ? "Admin" : "User",
        joinDate: "2023-01-01",
      };
      
      setUserData(mockUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">User Selection Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <UserButtonsGroup onUserSelect={handleUserSelect} />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          
          {isLoading && (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          
          {hasError && (
            <div className="text-red-500 p-4 border border-red-200 rounded-md">
              Failed to load user data. Please try again.
            </div>
          )}
          
          {!isLoading && !hasError && selectedUserId && userData && (
            <div className="space-y-2">
              <p><span className="font-medium">ID:</span> {userData.id}</p>
              <p><span className="font-medium">Name:</span> {userData.name}</p>
              <p><span className="font-medium">Email:</span> {userData.email}</p>
              <p><span className="font-medium">Role:</span> {userData.role}</p>
              <p><span className="font-medium">Join Date:</span> {userData.joinDate}</p>
            </div>
          )}
          
          {!isLoading && !hasError && !selectedUserId && (
            <div className="text-gray-500 flex items-center justify-center h-40">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 