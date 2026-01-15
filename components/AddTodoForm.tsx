"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { todoFormSchema } from "@/validation";
import { DialogDemo } from "./DialogDemo";
import { createTodoAction } from "@/actions/todos.actions";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "./Spinner";

export const AddTodoForm = ({ userId }: { userId: string | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      body: "",
      completed: false,
    },
  });
  const onSubmit = async (data: z.infer<typeof todoFormSchema>) => {
    setIsLoading(true);
    const { title, body, completed } = data;
    try {
      await createTodoAction({
        title,
        body,
        completed,
        userId,
      });
      setIsLoading(false);
      setIsOpen(false);
      toast.success("Todo created!", { position: "top-center" });
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      toast.error("Failed to created!", { position: "top-center" });
    } finally {
      form.reset();
    }
  };
  return (
    <div>
      <DialogDemo
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Post new todo"
        troggerValue={
          <Button variant={"outline"}>
            <Plus />
            New todo
          </Button>
        }
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
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
                {isLoading ? <Spinner /> : <span>Submit</span>}
              </Button>
            </Field>
          </DialogFooter>
        </form>
      </DialogDemo>
    </div>
  );
};
