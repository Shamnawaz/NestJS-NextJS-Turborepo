import { z } from "zod";

export type FormState = {
    error?: {
        name?: string[],
        email?: string[],
        password?: string[],
    };
    message: string;
} | undefined;

export const signupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
        .string()
        .min(8, { message: "Be at least 8 characters long." })
        .regex(/[a-zA-Z]/, { message: "Contains at least one letter." })
        .regex(/[0-9]/, { message: "Contains at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Contains at least on special character." })
        .trim()
});

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(1, { message: "Password field must be not empty." }),
});