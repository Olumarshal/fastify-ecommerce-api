import { FastifyInstance } from 'fastify';
import { register, login } from '../controllers/authController';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', register);
  fastify.post('/login', login);
};
