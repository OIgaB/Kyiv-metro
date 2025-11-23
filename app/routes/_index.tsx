import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Metro Design" },
  { name: "description", content: "Plan and visualize metro systems. Create optimized travel routes, stations, and line connections with ease." },
];

export default function HomePage() {
  return (
    <main>
      <h2 className="text-red-600 font-bold underline">Tailwind check</h2>
    </main>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-2">{error.message}</p>
    </main>
  );
}