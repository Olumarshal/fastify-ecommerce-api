import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser, getUserByUsername } from '../models/userModel';
import { generateToken } from '../utils/authUtils';
import bcrypt from 'bcrypt';
import { validateCreateUser } from '../utils/validation';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  validateCreateUser(request, reply, async () => {
    const { username, password } = request.body as { username: string, password: string };
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Math.random().toString(36).substring(7);
    await createUser(id, username, hashedPassword);
    const token = generateToken({ id, username });
    reply.send({ token });
  });
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as { username: string, password: string };
  const user = await getUserByUsername(username);
  if (!user) {
    return reply.status(401).send({ error: 'Invalid username or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.status(401).send({ error: 'Invalid username or password' });
  }
  const token = generateToken({ id: user.id, username });
  reply.send({ token });
};
