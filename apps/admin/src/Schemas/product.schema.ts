import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Invalid category id",
});
export const addProductSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, { message: 'Product name can only contain letters and spaces' }),
    description: z.string()
        .min(10, "Product description must be at least 10 characters long").optional(),
    price: z.number()
        .min(1, "Product price must be a positive number"),
    stock: z.number()
        .min(0, "Product stock must be a non-negative number"),
    categoryId: objectIdSchema,
    images: z.array(z.string()).optional(),
    isActive: z.boolean(),
    brand: z.string()
        .trim()
        .min(1, "Product brand is required")
        .max(100, "Product brand must be at most 100 characters"),
    tags: z.string()
        .trim()
        .min(1, "Enter at least one product tag")
    
});

export const editProductSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, { message: 'Product name can only contain letters and spaces' }),
    description: z.string()
        .min(10, "Product description must be at least 10 characters long").optional(),
    price: z.number()
        .min(1, "Product price must be a positive number"),
    stock: z.number()
        .min(0, "Product stock must be a non-negative number"),
    images: z.array(z.string()).optional(),
    isActive: z.boolean(),
    brand: z.string()
        .trim()
        .min(1, "Product brand is required")
        .max(100, "Product brand must be at most 100 characters"),
    tags: z.string()
        .trim()
        .min(1, "Enter at least one product tag")
});

export type AddProductData = z.infer<typeof addProductSchema>;
export type EditProductData = z.infer<typeof editProductSchema>;
