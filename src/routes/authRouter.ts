import express from 'express';
import { register, login, getAuthenticatedUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '@src/middleware/validators/validation';
import { loginValidator, registerValidator } from '@src/middleware/validators/authValidator';

const router = express.Router();

router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);
router.get('/', authMiddleware, getAuthenticatedUser);

export default router;