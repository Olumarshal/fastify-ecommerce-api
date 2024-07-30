import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify();

server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
  });
  
  export const generateToken = (user: { id: string, username: string }) => {
    return server.jwt.sign({ id: user.id, username: user.username }, { expiresIn: process.env.JWT_TTL });
  };
  
  export const verifyToken = async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };
