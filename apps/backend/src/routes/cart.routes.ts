import { Router } from 'express';
import { addToCart, removeFromCart, getMyCart, updateCartProductQuantity} from '../controllers/cart.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { addToCartSchema, updateCartProductQuantitySchema } from '../validations/cart.validation.js';

const router = Router();

router.get('/get-cart', authenticate, getMyCart);
router.post('/add-cart', authenticate, validate(addToCartSchema), addToCart);
router.delete('/remove-cart/:productId', authenticate, removeFromCart);
router.patch('/update-cart/:productId', authenticate, validate(updateCartProductQuantitySchema), updateCartProductQuantity);

export default router;