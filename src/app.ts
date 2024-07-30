import fastify from 'fastify';
import { authRoutes } from './routes/authRoutes';
import { productRoutes } from './routes/productRoutes';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({ logger: true });

app.register(cors);
app.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET || 'supersecret',
});

app.register(authRoutes);
app.register(productRoutes);

export default app;
