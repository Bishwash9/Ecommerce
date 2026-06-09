import {Router} from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

import { validate } from '../middlewares/user.middleware.js';
import { registerUserSchema, loginUserSchema} from '../validations/user.validation.js';


const router = Router();

router.post('/register', validate(registerUserSchema), registerUser);

router.post('/login', validate(loginUserSchema), loginUser);

export default router;