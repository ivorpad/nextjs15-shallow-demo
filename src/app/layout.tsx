import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Drawer Pattern Demo",
  description: "A demonstration of shadow routing for drawer persistence in Next.js applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
