import { Router } from 'express';
import {
  getAllUsers,
  userSignup,
} from '../controllers/user-controllers.js';
import { signUpValidator, validate } from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signUpValidator), userSignup);

export default userRoutes;
