import * as z from "zod";

export const todoFormSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters.")
        .max(30, "Title must be at most 30 characters."),
    body: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters.")
        .optional()
        .or(z.literal("")),
    completed: z
        .boolean(),
});