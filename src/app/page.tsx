import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">User Drawer Pattern Demo</h1>
      <p className="text-xl mt-4">
        A demonstration of shadow routing for drawer persistence in Next.js applications.
      </p>
      <div className="mt-8 grid gap-4">
        <Link href="/drawer-demo" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">
          View Drawer Demo
        </Link>
        <Link href="/user-demo" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center">
          View User Demo
        </Link>
      </div>
    </main>
  );
}