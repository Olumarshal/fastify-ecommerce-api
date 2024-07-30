import { verifyToken } from '../utils/authUtils';

export const authMiddleware = async (request: any, reply: any) => {
  await verifyToken(request, reply);
};
