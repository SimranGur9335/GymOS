import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config';
import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Middleware to verify Access Token JWT */
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Missing or invalid Authorization header' } });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET) as any;
    // Attach user info to request for downstream handlers
    (req as any).userId = payload.sub;
    (req as any).userRole = payload.role;
    // Optionally load full user for convenience (cached per request)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    (req as any).user = user;
    next();
  } catch (err) {
    logger.warn('Authentication failed', { error: err });
    return res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }
}

/** Simple role‑based access control helper */
export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).userRole;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: { message: 'Forbidden: insufficient permissions' } });
    }
    next();
  };
}
