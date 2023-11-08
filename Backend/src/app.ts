import express from 'express';
// import { config } from 'dotenv';
// config();
import { config } from 'dotenv';
config();

const app = express();

// Middlewares
app.use(express.json());

// Connections and listener
console.log('asdf');

export default app;
