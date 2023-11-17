import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userSignup,
} from '../controllers/user-controllers.js';
import {
  signUpValidator,
  validate,
  loginValidator,
} from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signUpValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', validate(loginValidator), userLogin);

export default userRoutes;
