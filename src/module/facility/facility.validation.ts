import z from "zod"

const facilityZodSchema = z.object({
        name: z.string().min(1, {message:"name is required"}),
        description: z.string(),
        pricePerHour: z.number(),
        location: z.string(),
        isDeleted: z.boolean().default(false)
})

export const  facilityZodSchemaFile = {
    facilityZodSchema
}