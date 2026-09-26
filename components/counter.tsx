"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export function Counter() {
  const [count, setCount] = useState(0);

  // Client-side hooks
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { user } = useUser();

  // If auth is still loading or user is signed out, don't show the component
  if (!isAuthLoaded || !userId) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-neutral-900/80 border border-neutral-800 rounded-xl max-w-md mx-auto text-center">
      <h3 className="text-md font-semibold text-neutral-200 mb-1">
        Client Component: Counter
      </h3>
      <p className="text-xs text-neutral-400 mb-4">
        Signed in as: <span className="text-purple-400">{user?.primaryEmailAddress?.emailAddress}</span>
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-sm font-medium cursor-pointer"
        >
          -
        </button>
        <span className="text-xl font-bold font-mono px-4 text-purple-300">
          {count}
        </span>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-sm font-medium cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}