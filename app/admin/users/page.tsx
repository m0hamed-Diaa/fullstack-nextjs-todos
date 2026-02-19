"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUser } from "@/interfaces";
import { timeAgo } from "@/utils";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await (await fetch("/api/users")).json();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <p className="p-5">Loading users...</p>;

    return (
        <div className="container mx-auto px-8 md:px-6 mt-10">
            <h1 className="text-center my-3">Admin Dashboard - Users</h1>
            <Table>
                <TableCaption>A list of your recorded users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Count</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>User Image</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user, idx: number) => (
                        <TableRow
                            key={user?.id}
                            className="hover:bg-accent relative odd:bg-input/30 dark:odd:bg-input/30 dark:hover:bg-input/50"
                        >
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{user?.email_addresses[0]?.email_address || "-"}</TableCell>
                            <TableCell className="font-medium">{user?.first_name}</TableCell>
                            <TableCell className="font-medium">{user?.last_name}</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage
                                        src={user?.profile_image_url}
                                        alt={user?.first_name}
                                    />
                                    <AvatarFallback>{user?.first_name.slice(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{timeAgo(user?.created_at)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">{users?.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
