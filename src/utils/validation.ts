import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

class CreateUserDto {
  username!: string;
  password!: string;
}

class CreateProductDto {
  name!: string;
  description!: string;
  price!: number;
}

const validationHandler = async (request: FastifyRequest, reply: FastifyReply, dtoClass: any): Promise<void> => {
  const input = plainToInstance(dtoClass, request.body as object);
  const errors: ValidationError[] = await validate(input as any);
  if (errors.length > 0) {
    reply.status(400).send({ errors: errors.map(error => error.constraints) });
  }
};

export const validateCreateUser = async (request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
  try {
    await validationHandler(request, reply, CreateUserDto);
    done();
  } catch (err) {
    done(err as Error);
  }
};

export const validateCreateProduct = async (request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
  try {
    await validationHandler(request, reply, CreateProductDto);
    done();
  } catch (err) {
    done(err as Error);
  }
};
