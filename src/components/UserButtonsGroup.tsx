"use client";

import { OpenUsersButton } from "@/components/OpenUsersButton";
import { HStack } from "@/components/ui/stack";
import { Button } from "./ui/button";
import Link from "next/link";

interface User {
  id: string;
  name: string;
}

// Sample user data
const users: User[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alex Johnson" },
  { id: "4", name: "Sam Wilson" },
];

interface UserButtonsGroupProps {
  onUserSelect?: (userId: string) => void;
}

export function UserButtonsGroup({ onUserSelect }: UserButtonsGroupProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select a User</h2>
      <HStack className="flex-wrap gap-2">
        {users.map((user) => (
          <OpenUsersButton
            key={user.id}
            userId={user.id}
            onUserSelect={onUserSelect}
            className="min-w-[120px]"
          >
            User {user.id}: {user.name}
          </OpenUsersButton>
        ))}
        <Link href="/settings">
          <Button>Settings</Button>
        </Link>
      </HStack>
    </div>
  );
}
