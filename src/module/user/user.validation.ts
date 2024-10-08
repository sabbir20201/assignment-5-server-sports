import { z } from "zod";
import { USER_ROLE } from "./user.constant";

export const userValidationByZod = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        role: z.nativeEnum(USER_ROLE),
        address: z.string()

    })
})

export const userValidationByZodExport = {
    userValidationByZod
}