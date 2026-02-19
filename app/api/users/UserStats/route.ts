import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
            return NextResponse.json(
                { error: "Failed to fetch users" },
                { status: response.status }
            );
        }

        const clerkUsers: ClerkUser[] = await response.json();

        const usersWithStats = await Promise.all(
            clerkUsers.map(async (user: ClerkUser) => {
                const totalTodos = await prisma.todo.count({
                    where: { user_id: user.id },
                });

                const completedTodos = await prisma.todo.count({
                    where: { user_id: user.id, completed: true },
                });

                return {
                    userId: user.id,
                    totalTodos,
                    completedTodos,
                    pendingTodos: totalTodos - completedTodos,
                    hasTodos: totalTodos > 0,
                };
            })
        );

        return NextResponse.json(usersWithStats);
    } catch (err: unknown) {
        console.error("Error fetching user stats:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}