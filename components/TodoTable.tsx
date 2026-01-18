"use client";

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
import { BadgeCheckIcon } from "lucide-react";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";

import TodosTableActions from "./TodosActionsTable";
import { timeAgo } from "@/utils";

interface IIodos {
  todos: ITodo[];
}

export default function TodoTable({ todos }: IIodos) {
  return (
    <>
      {todos?.length ? (
        <Table>
          <TableCaption>A list of your recorded todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Count</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos?.map((todo, idx: number) => (
              <TableRow
                key={todo?.id}
                className="hover:bg-accent relative odd:bg-input/30 dark:odd:bg-input/30 dark:hover:bg-input/50"
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{todo?.title}</TableCell>
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
                    <Badge variant="destructive">Uncompleted</Badge>
                  )}
                </TableCell>
                <TableCell>{timeAgo(todo?.createdAt)}</TableCell>
                <TableCell className="flex items-center space-x-2 justify-end">
                  <TodosTableActions todo={todo} />
                </TableCell>
                <td>
                  {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                    <span className="absolute bottom-0 right-25 text-gray-600 dark:text-gray-300">Edited</span>
                  )}
                </td>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{todos?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <h1 className="text-center text-xl text-red-500">No todos yet!</h1>
      )}
    </>
  );
}
