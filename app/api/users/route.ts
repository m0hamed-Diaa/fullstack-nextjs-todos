import { NextResponse } from "next/server";

interface ClerkUser {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  email_addresses: { email_address: string }[];
}

export async function GET() {
  try {
    const response = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch users" }, { status: response.status });
    }

    const data: ClerkUser[] = await response.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
