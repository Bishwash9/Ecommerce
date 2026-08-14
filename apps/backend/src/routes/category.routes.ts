import { Router } from 'express';
import { createCategory, editCategory, deleteCategory, fetchCategories } from '../controllers/category.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCategorySchema, editCategorySchema } from '../validations/category.validation.js';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create-category', authenticate, authorizeAdmin, validate(createCategorySchema), createCategory);
router.put('/edit-category/:id', authenticate, authorizeAdmin, validate(editCategorySchema), editCategory);
router.delete('/delete-category/:id', authenticate, authorizeAdmin, deleteCategory);
router.get('/fetch-categories', fetchCategories);

export default router;