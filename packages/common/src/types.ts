
import { z } from 'zod'

export const CreateUserSchema = z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(3).max(20),
    user:z.string().min(3).max(20),
})

export const SigninSchema = z.object({
    username :z.string().min(3).max(20),
    password :z.string().min(3).max(20),
})


export const roomSchema = z.object({
    name:z.string().min(3).max(20),
})  