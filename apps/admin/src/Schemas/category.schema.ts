import { z } from "zod";

export const categorySchema = z.object({
    name: z.string()
        .min(3, "Category name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, { message: 'Category name can only contain letters and spaces' })
});

export type CategoryData = z.infer<typeof categorySchema>;

