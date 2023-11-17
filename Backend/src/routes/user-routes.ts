import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userSignup,
  verifyUser,
} from '../controllers/user-controllers.js';
import {
  signUpValidator,
  validate,
  loginValidator,
} from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signUpValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser); // Verifies the token

export default userRoutes;
