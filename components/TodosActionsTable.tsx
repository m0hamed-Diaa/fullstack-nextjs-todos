"use client";

import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { ITodo } from "@/interfaces";
import { DialogDemo } from "./DialogDemo";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { deleteTodoAction, updateTodoAction } from "@/actions/todos.actions";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { Input } from "./ui/input";
import { todoFormSchema } from "@/validation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TodosTableActions = ({ todo }: { todo: ITodo }) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo.title,
      body: todo.body as string,
      completed: todo.completed,
    },
  });

  const onSubmitUpdate = async (data: z.infer<typeof todoFormSchema>) => {
    setLoading(true);
    const { title, body, completed } = data;
    try {
      await updateTodoAction({
        id: todo.id,
        title,
        body,
        completed,
      });
      setLoading(false);
      setIsOpenUpdate(false);
      form.reset();
      toast.success("Todo created!", { position: "top-center" });
    } catch (error) {
      console.log(error);
      setIsOpenUpdate(true);
      toast.error("Failed to created!", { position: "top-center" });
    }
  };

  const onDeleteTodo = async (id: string) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
    toast.success("Todo Deleted!", { position: "top-center" });
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Dialog for Edit todo */}
      <DialogDemo
        open={isOpenUpdate}
        onOpenChange={setIsOpenUpdate}
        title="Edit your todo"
        description="You can edit your todo, if you want."
        troggerValue={
          <Button>
            <Pen />
          </Button>
        }
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmitUpdate)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your todo"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Short Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="You can write short description, not required"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field?.value?.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    You can write a short description for your todo.
                  </FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="completed"
              control={form.control}
              render={({ field }) => (
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="toggle-2"
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Completed todo?
                    </p>
                    <p className="text-muted-foreground text-sm">
                      You can Click here to completed this todo.
                    </p>
                  </div>
                </Label>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Field orientation="horizontal">
              <Button type="submit" form="form-rhf-demo">
                {isLoading ? <Spinner /> : <span>Update</span>}
              </Button>
            </Field>
          </DialogFooter>
        </form>
      </DialogDemo>
      {/* Dialog for Delete todo */}
      <DialogDemo
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title="Are you sure to delete this todo"
        description="if you click on delete you will lose this todo!!"
        troggerValue={
          <Button size={"icon"} variant={"destructive"}>
            <Trash />
          </Button>
        }
      >
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="form-rhf-demo"
            onClick={() => onDeleteTodo(todo.id)}
          >
            {isLoading ? <Spinner /> : <span>Delete</span>}
          </Button>
        </DialogFooter>
      </DialogDemo>
    </div>
  );
};

export default TodosTableActions;
