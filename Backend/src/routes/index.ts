import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';

const appRouter = Router();

appRouter.use('/user', userRoutes); // Path: domain/api/v1/user -> userRoutes
appRouter.use('/chats', chatRoutes); // Path: domain/api/v1/chats -> chatRoutes

export default appRouter;
