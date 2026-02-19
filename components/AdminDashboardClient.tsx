"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { ITodo, IUser } from "@/interfaces";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BadgeCheckIcon, BadgeX } from "lucide-react";
import { Badge } from "./ui/badge";
import { ModeToggle } from "./ModeToggle";
import { ChartBarDemoAxis } from "./ChartBarDemoAxis";

interface UserStats {
    userId: string;
    totalTodos: number;
    completedTodos: number;
    pendingTodos: number;
    hasTodos: boolean;
}

interface UserWithTodos {
    id: string;
    name: string;
    email: string;
    totalTodos: number;
    completedTodos: number;
    pendingTodos: number;
    hasTodos: boolean;
}

interface ITodos {
    todos: ITodo[];
}

export default function AdminDashboardClient({ todos }: ITodos) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [userStats, setUserStats] = useState<UserStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await (await fetch("/api/users")).json();
                setUsers(usersData);

                const statsRes = await fetch("/api/users/UserStats");
                const statsData: UserStats[] = await statsRes.json();
                setUserStats(statsData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p className="p-5">Loading...</p>;

    // Data Concat
    const usersWithTodos: UserWithTodos[] = users.map(user => {
        const stats = userStats.find(s => s.userId === user.id) || {
            totalTodos: 0,
            completedTodos: 0,
            pendingTodos: 0,
            hasTodos: false
        };

        return {
            id: user.id,
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            email: user.email_addresses[0]?.email_address || "",
            ...stats
        };
    });

    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const pendingTodos = totalTodos - completedTodos;

    return (
        <div className="space-y-4 relative">
            <ModeToggle className="absolute right-0 -top-10 z-99999" />
            <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                <ChartBarDemoAxis />
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center">
                    <Card>
                        <CardTitle>Total Todos</CardTitle>
                        <CardContent>{totalTodos}</CardContent>
                    </Card>
                    <Card>
                        <CardTitle>Completed</CardTitle>
                        <CardContent>{completedTodos}</CardContent>
                    </Card>
                    <Card>
                        <CardTitle>Pending</CardTitle>
                        <CardContent>{pendingTodos}</CardContent>
                    </Card>
                    <Card>
                        <CardTitle>Total Users</CardTitle>
                        <CardContent>{users.length}</CardContent>
                    </Card>
                </div>
            </div>

            {/* Users Table with Todo Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Users Overview</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Has Todos</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Completed</TableHead>
                                <TableHead>Pending
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usersWithTodos?.length ? usersWithTodos.map(user => (
                                <TableRow
                                    key={user?.id}
                                    className="hover:bg-accent relative odd:bg-input/30 dark:odd:bg-input/30 dark:hover:bg-input/50"
                                >
                                    <TableCell className="font-medium">{user?.name}</TableCell>
                                    <TableCell className="font-medium">{user?.email}</TableCell>
                                    <TableCell>
                                        {user?.hasTodos ? (
                                            <Badge
                                                variant="secondary"
                                                className="bg-(--main-color) text-white"
                                            >
                                                <BadgeCheckIcon />
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                <BadgeX />
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{user.totalTodos}</TableCell>
                                    <TableCell>{user.completedTodos}</TableCell>
                                    <TableCell>{user.pendingTodos}</TableCell>

                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={6} className="text-red-500 text-center">No Users yet!</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}