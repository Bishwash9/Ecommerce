import {Router} from 'express';
import {getAllProducts, getProductById, createProduct, deleteProduct, editProduct, uploadImages} from '../controllers/product.controller.js';
import { validate } from '../middlewares/product.middleware.js';
import { createProductSchema, editProductSchema } from '../validations/product.validation.js';
import { uploadProductImages } from '../middlewares/upload.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/fetch-products', getAllProducts);
router.get('/fetch-product/:id', getProductById);
router.post('/create-product', validate(createProductSchema), createProduct);
router.put('/edit-product/:id', validate(editProductSchema), editProduct);
router.delete('/delete-product/:id', deleteProduct);
router.post('/upload-images', authenticate, uploadProductImages, uploadImages);

export default router;
