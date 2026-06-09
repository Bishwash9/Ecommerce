import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),

    email: z.email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const loginUserSchema = z.object({
    email: z.email("Please enter a valid email address"),

    password: z.string().min(1, "Password is required")
});