// This catch-all route handles any URL paths like /user-demo/users/1
import UserDemoPage from "../../page";

// It renders the same main page component which can then decide what to display
export default function CatchAllPage() {
  return <UserDemoPage />;
} 