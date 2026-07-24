import { isObjectIdOrHexString } from "mongoose";
import { z } from "zod";


const objectIdSchema = z.string().refine(isObjectIdOrHexString, {
    message: "Invalid category id",
});

export const createProductSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters long")
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Product name can only contain letters, numbers, and spaces' }),

    description: z.string()
        .min(10, "Product description must be at least 10 characters long").optional(),

    stock: z.number()
        .min(0, "Product stock must be a non-negative number"),

    price: z.number()
        .min(1, "Product price must be a positive number"),

    category: objectIdSchema,

    images: z.array(z.string().min(1)).optional(), // Optional array of image URLs

});

export const editProductSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters long")
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Product name can only contain letters, numbers, and spaces' }),

    description: z.string()
        .min(10, "Product description must be at least 10 characters long").optional(),

    stock: z.number()
        .min(0, "Product stock must be a non-negative number"),

    price: z.number()
        .min(1, "Product price must be a positive number"),
    
    images: z.array(z.string().min(1)).optional(), // Optional array of image URLs
})