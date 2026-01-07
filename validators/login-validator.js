import z from "zod";

const loginSchema = new z.object({
    email: z
        .string({required_error: "email is required"})
        .trim()
        .email({message: "invalid email address"})
        .min(3, {message: "email should be at least 3 characters"})
        .max(255, {message: "email should be under 255 characters"}),

    password: z
        .string({required_error: "password is required"})
        .min(6, {message: "password should be at least 6 characters"})
        .max(1024, {message: "password should be under 1024 characters"}),
});

export default loginSchema;