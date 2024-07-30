import { FastifyInstance } from 'fastify';
import { addProduct, fetchProducts } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

export const productRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/products', { preHandler: [authMiddleware] }, addProduct);
  fastify.get('/products', fetchProducts);
};
