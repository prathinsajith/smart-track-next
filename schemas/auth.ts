import { z } from "zod"

export const loginSchema = z.object({
    // email: z.string().email("Invalid email"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginSchema = z.infer<typeof loginSchema>
