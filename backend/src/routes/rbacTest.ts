import { Router, Request, Response, NextFunction } from 'express';
import { requireRole } from '../middleware/rbac';
import { authenticate } from '../middleware/auth';

const router = Router();

// Admin test endpoint – only SUPER_ADMIN can access
router.get('/admin/test', authenticate, requireRole('SUPER_ADMIN'), (req: Request, res: Response) => {
  res.json({ success: true, data: 'Admin access granted' });
});

// Owner test endpoint – GYM_OWNER or GYM_STAFF can access
router.get('/owner/test', authenticate, requireRole('GYM_OWNER', 'GYM_STAFF'), (req: Request, res: Response) => {
  res.json({ success: true, data: 'Owner access granted' });
});

// Trainer test endpoint – TRAINER role
router.get('/trainer/test', authenticate, requireRole('TRAINER'), (req: Request, res: Response) => {
  res.json({ success: true, data: 'Trainer access granted' });
});

// Member test endpoint – MEMBER role
router.get('/member/test', authenticate, requireRole('MEMBER'), (req: Request, res: Response) => {
  res.json({ success: true, data: 'Member access granted' });
});

export default router;
