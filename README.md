# User Drawer Pattern Demo

A rough implementation of shadow routing for drawer persistence in Next.js 15 applications. This solution adapts Next.js 12 routing patterns to the App Router, providing URL-synchronized drawer state management.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Shared UI components
│   ├── ui/                 # Shadcn UI components
│   ├── UserButtonsGroup.tsx # User selection component
│   ├── OpenUsersButton.tsx  # Button to open user drawer
│   └── ...
├── features/               # Feature modules
│   └── drawer-pattern/     # Reusable drawer pattern implementation
│       ├── DrawerWrapper.tsx    # Drawer UI component
│       ├── ItemSelector.tsx     # Item selection component
│       ├── MainContentWrapper.tsx # Main content layout
│       ├── useDrawerState.ts    # Drawer state management hook
│       ├── useItemData.ts       # Data fetching hook
│       ├── types.ts             # Type definitions
│       └── README.md            # Detailed documentation
├── hooks/                  # Shared hooks
└── lib/                    # Utility functions and configurations
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation Details

This project implements a shadow routing pattern for drawer state persistence:

1. **Shadow Routing**: Adapts Next.js 12-like routing patterns to Next.js 15's App Router
2. **Component Architecture**: Modular, composable drawer UI components
3. **State Management**: URL-synchronized drawer state
4. **Data Fetching**: Pluggable data fetching with loading states
5. **Type Safety**: TypeScript interfaces for all components and hooks

## Routing Implementation

The implementation uses:

1. **Catch-all Routes**: Next.js catch-all routes (`[...slug]`) for state handling
2. **URL Pattern Matching**: Regex pattern matching for item ID extraction
3. **State Synchronization**: URL parameter synchronization with drawer state
4. **Navigation**: Client-side navigation without full page reloads

Example route structure:
```
app/
├── your-path/
│   ├── page.tsx              # Main page
│   ├── items/                # Shadow route for items
│   │   └── [...slug]/        # Catch-all route
│   │       └── page.tsx      # Renders the same component
```

## Usage Example

```tsx
// Example usage of the drawer pattern
import { DrawerWrapper } from "@/features/drawer-pattern/DrawerWrapper";
import { MainContentWrapper } from "@/features/drawer-pattern/MainContentWrapper";
import { useDrawerState } from "@/features/drawer-pattern/useDrawerState";
import { useItemData } from "@/features/drawer-pattern/useItemData";

// See the drawer-pattern README.md for complete usage examples
```

## Technologies Used

- Next.js 15
- React 18
- TypeScript
- Shadcn UI
- Tailwind CSS

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
