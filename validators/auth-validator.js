import z from "zod";

const signupSchema = new z.object({
    username: z 
        .string({required_error: "username is required"})
        .trim()
        .min(3, {message: "username should be atleast 3 characters"})
        .max(255, {message: "username should be under 255 characters"}),

    email: z
        .string({required_error: "email is required"})
        .trim()
        .email({message: "email is invalid"})
        .min(3, {message: "email should be atleast 3 characters"})
        .max(255, {message: "email should be under 255 characters"}),

    phone: z 
        .string({required_error: "phone is required"})
        .trim()
        .min(10, {message: "phone should be atleast 10 characters"})
        .max(20, {message: "phone should be under 20 characters"}),

    password: z 
        .string({required_error: "password is required"})
        .min(6, {message: "password should be atleast 6 characters"})
        .max(1024, {message: "password should be under 1024 characters"}),
});

export default signupSchema;