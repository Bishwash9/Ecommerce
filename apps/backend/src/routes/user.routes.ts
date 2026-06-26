import {Router} from 'express';
import { registerUser, loginUser, refreshSession, logoutUser } from '../controllers/user.controller.js';

import { validate } from '../middlewares/user.middleware.js';
import { registerUserSchema, loginUserSchema} from '../validations/user.validation.js';

import { authenticate } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/register', validate(registerUserSchema), registerUser);

router.post('/login', validate(loginUserSchema), loginUser);

router.post('/logout', logoutUser);

router.post('/refresh-token', refreshSession);

export default router; 