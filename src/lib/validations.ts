import { z } from "zod";

export const LoginFormValidation = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 character")
    .max(50, "Username must be at most 50 character"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const CreateTodoValidation = z.object({
  todo: z.string().min(2, "Username must be at least 2 character"),
});
