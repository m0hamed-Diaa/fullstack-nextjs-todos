"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { timeAgo } from "@/utils";
import { ITodo, IUser } from "@/interfaces";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { BadgeCheckIcon, BadgeX } from "lucide-react";


interface IProps {
    todos: ITodo[];
}

const AdminTodosControling = ({ todos }: IProps) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await (await fetch("/api/users")).json();
                setUsers(usersData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p className="p-5">Loading...</p>;

    const userTodosMap = users.map(user => {
        const userTodos = todos.filter(todo => todo.user_id === user.id);
        return {
            user,
            todos: userTodos,
        }
    })

    return <>
        <Button variant={"secondary"} className="mx-auto w-full">All Users Todos</Button>
        {userTodosMap.map(({ user, todos: userTodos }) => (
            <div key={user.id} className="mt-2 mb-4 flex flex-col lg:flex-row gap-0 lg:gap-4">
                <div className="flex items-center gap-4 mb-1 p-4 bg-accent/50 rounded-lg">
                    <Avatar className="w-16 h-16">
                        <AvatarImage
                            src={user?.profile_image_url}
                            alt={user?.first_name}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {user?.first_name?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg">
                            {`${user?.first_name || ""} ${user?.last_name || ""}`.trim()}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {user?.email_addresses?.[0]?.email_address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Todos: {userTodos?.length}
                        </p>
                    </div>
                </div>

                {userTodos?.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent">
                                <TableHead className="w-16">#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTodos?.map((todo, idx) => (
                                <TableRow
                                    key={todo.id}
                                    className="hover:bg-accent"
                                >
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {todo.title}
                                    </TableCell>
                                    <TableCell>
                                        {todo?.completed ? (
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-500 text-white dark:bg-blue-600"
                                            >
                                                <BadgeCheckIcon />
                                                Completed
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                <BadgeX />
                                                Uncompleted</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{timeAgo(todo.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{todos?.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                ) : (
                    <div className="text-center p-8 bg-muted/50 rounded-lg lg:mx-auto lg:w-100">
                        <p className="font-bold text-red-500">
                            No todos yet for this user
                        </p>
                    </div>
                )}
            </div >
        ))}
    </>;
};

export default AdminTodosControling;