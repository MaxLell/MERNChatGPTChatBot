import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import {
  chatCompetionValidator,
  validate,
} from '../utils/validators.js';
import { generateChatCompletion } from '../controllers/chat-controllers.js';

// Protected Route - Only authenticated users must be allowed
// access
const chatRoutes = Router();
chatRoutes.post(
  '/new',
  validate(chatCompetionValidator),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
