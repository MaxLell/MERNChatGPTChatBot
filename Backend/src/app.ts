import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
config();

const app = express();

// Middlewares
app.use(express.json()); // Payload is to be parsed in JSON
app.use(morgan('dev')); // this is a logger module for HTTP Requests TODO: Remove in production

app.use('/api/v1', appRouter);

// Connections and listener

export default app;
