import  { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(3, { message: "Invalid email address" }),

    password: z.string().min(6, {message: 'Password must be at least 6 chararcters'}),
});

export const registerSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;