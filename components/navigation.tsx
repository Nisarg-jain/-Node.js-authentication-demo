import Link from "next/link";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Navigation() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg text-neutral-100 hover:text-purple-400 transition-colors"
        >
          Next.js Auth App
        </Link>

        {/* Links shown only when signed in */}
        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/user-profile"
            className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            Profile
          </Link>
        </Show>
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-sm font-medium px-3.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shadow-sm">
              Sign Up
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <SignOutButton>
            <button className="text-xs font-medium px-3 py-1.5 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}