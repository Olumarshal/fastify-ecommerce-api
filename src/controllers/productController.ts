import { FastifyRequest, FastifyReply } from 'fastify';
import { createProduct, getProducts } from '../models/productModel';
import { validateCreateProduct } from '../utils/validation';

export const addProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  validateCreateProduct(request, reply, async () => {
    const { name, description, price } = request.body as { name: string, description: string, price: number };
    const id = Math.random().toString(36).substring(7);
    await createProduct(id, name, description, price);
    reply.send({ id, name, description, price });
  });
};

export const fetchProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const products = await getProducts();
  reply.send(products);
};
