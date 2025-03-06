"use client";

import { UserButtonsGroup } from "@/components/UserButtonsGroup";

interface MainContentProps {
  userId: string | null;
  onUserSelect: (id: string) => void;
}

export function MainContent({ userId, onUserSelect }: MainContentProps) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {userId ? `Viewing User ${userId}` : "Home Page"}
      </h2>
      
      <p className="mb-4">
        Welcome! Select a user below to view their details in a drawer.
      </p>
      
      {/* Always show the user buttons, even when drawer is open */}
      <div className="my-4">
        <UserButtonsGroup onUserSelect={onUserSelect} />
      </div>
    </div>
  );
}