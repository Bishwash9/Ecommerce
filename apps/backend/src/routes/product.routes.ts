import {Router} from 'express';
import {getAllProducts, getProductById, createProduct, deleteProduct, editProduct, uploadImages} from '../controllers/product.controller.js';
import { validate } from '../middlewares/product.middleware.js';
import { createProductSchema, editProductSchema } from '../validations/product.validation.js';
import { uploadProductImages } from '../middlewares/upload.middleware.js';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/fetch-products', getAllProducts);
router.get('/fetch-product/:id', getProductById);
router.post('/create-product', authenticate, authorizeAdmin, validate(createProductSchema), createProduct);
router.put('/edit-product/:id', authenticate, authorizeAdmin, validate(editProductSchema), editProduct);
router.delete('/delete-product/:id', authenticate, authorizeAdmin, deleteProduct);
router.post('/upload-images', authenticate, authorizeAdmin, uploadProductImages, uploadImages);

export default router;
