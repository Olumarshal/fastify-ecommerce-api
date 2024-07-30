import 'fastify';
import fastifyJwt from 'fastify-jwt';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: fastifyJwt.FastifyJWT;
  }
}