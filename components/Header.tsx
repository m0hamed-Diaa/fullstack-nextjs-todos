"use client";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-99999 flex items-center p-4 gap-4">
      <SignedOut>
        <SignInButton>
          <button className="bg-[#0000ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-[#0000ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
}
