import { Counter } from "@/components/counter";

export default function Home() {
  return (
    <div className="py-16 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-neutral-100 mb-4 tracking-tight">
        Next.js 15 + Clerk Authentication
      </h1>
      <p className="text-neutral-400 max-w-lg mx-auto mb-8 text-sm">
        Explore server and client authentication utilities, middleware route
        protection, and user session management.
      </p>

      <Counter />
    </div>
  );
}