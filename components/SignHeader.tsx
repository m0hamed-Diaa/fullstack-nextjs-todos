"use client";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function SignHeader() {
  return (
    <header className="absolute -top-4 sm:top-0 z-99999 flex items-center justify-between flex-col sm:flex-row p-4 gap-2">
      <SignedOut>
        <h1 className="text-xl font-bold text-center">Hello User to todos app 👍❤️</h1>
        <div className="flex gap-2 items-center justify-end">
          <SignInButton>
            <Button size={"lg"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size={"lg"}>
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </header>
  );
}
