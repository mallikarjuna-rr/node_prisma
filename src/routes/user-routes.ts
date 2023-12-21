import express from 'express';
import { userSignUp, userLogin,getUser } from '../controllers/userControllers';
import { authzMiddleware } from '../utils/middleware';

const router = express.Router();

router.post('/signup', userSignUp as any);
router.post('/login', userLogin as any)
router.get('/:id' , authzMiddleware as any, getUser as any)

export { router as userRoutes };