import { z } from 'zod';
import { isObjectIdOrHexString } from 'mongoose';

const objectIdSchema = z.string().refine(isObjectIdOrHexString, {
    message: "Invalid product ID",
});

export const addToCartSchema = z.object({
    productId: objectIdSchema,
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1").default(1)
})
.strict();

export const updateCartProductQuantitySchema = z.object({
    action: z.enum(['increment', 'decrement'], { message: 'Action must be either "increment" or "decrement"' })
})
.strict();