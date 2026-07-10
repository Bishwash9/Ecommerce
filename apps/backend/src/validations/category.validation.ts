import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string()
    .min(5, "Category name must be at least 5 characters long")
    .regex(/^[a-zA-Z\s]+$/, { message: 'Category name can only contain letters and spaces' })
});