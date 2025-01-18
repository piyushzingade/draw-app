
import { z } from 'zod'

export const CreateUserSchema = z.object({
    email:z.string().min(3).max(50),
    password:z.string().min(3).max(20),
    name:z.string().min(3).max(20),
})

export const SigninSchema = z.object({
    email :z.string().min(3).max(50),
    password :z.string().min(3).max(20),
})


export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});  