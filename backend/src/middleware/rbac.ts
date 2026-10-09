import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Ensure user is authenticated - already provided by auth middleware */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // auth middleware already attaches userId
  if (!(req as any).userId) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
  }
  next();
};

/** Role based access control */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).userRole;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
    }
    next();
  };
}

/** Verify gym ownership */
export async function requireGymOwnership(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).userId as number;
  const gymId = Number(req.params.gymId);
  if (!gymId) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_GYM_ID', message: 'Gym ID is required' } });
  }
  const gym = await prisma.gym.findUnique({ where: { id: gymId }, select: { ownerId: true } });
  if (!gym) {
    return res.status(404).json({ success: false, error: { code: 'GYM_NOT_FOUND', message: 'Gym not found' } });
  }
  if (gym.ownerId !== userId) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this gym' } });
  }
  next();
}
