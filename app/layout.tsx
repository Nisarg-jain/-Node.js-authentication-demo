import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 15 Clerk Auth Demo",
  description: "Authentication and session management with Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100 min-h-screen flex flex-col`}
      >
        <ClerkProvider>
          {/* Clerk Header Bar */}
          <header className="flex justify-between items-center px-8 py-4 border-b border-neutral-800 bg-neutral-900/50">
            <span className="font-bold tracking-tight text-lg text-neutral-100">
              Clerk Auth App
            </span>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}