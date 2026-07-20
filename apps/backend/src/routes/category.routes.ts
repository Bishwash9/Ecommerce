import { Router } from 'express';
import { createCategory, editCategory, deleteCategory, fetchCategories } from '../controllers/category.controller.js';
import { validate } from '../middlewares/category.middleware.js';
import { createCategorySchema, editCategorySchema } from '../validations/category.validation.js';

const router = Router();

router.post('/create-category', validate(createCategorySchema), createCategory);
router.put('/edit-category/:id', validate(editCategorySchema), editCategory);
router.delete('/delete-category/:id', deleteCategory);
router.get('/fetch-categories', fetchCategories);

export default router;