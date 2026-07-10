import { Router } from 'express';
import { createCategory, editCategory, deleteCategory } from '../controllers/category.controller.js';
import { validate } from '../middlewares/category.middleware.js';
import { createCategorySchema } from '../validations/category.validation.js';

const router = Router();

router.post('/create-category', validate(createCategorySchema), createCategory);
router.put('/edit-category/:id', editCategory);
router.delete('/delete-category/:id', deleteCategory);

export default router;