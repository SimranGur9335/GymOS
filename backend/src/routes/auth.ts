import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from '../config';
import logger from '../utils/logger';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});

function msToMs(exp: string): number {
  const num = parseInt(exp.slice(0, -1), 10);
  const unit = exp.slice(-1);
  const multipliers: Record<string, number> = { s: 1000, m: 60 * 1000, h: 3600 * 1000, d: 86400 * 1000 };
  return num * (multipliers[unit] ?? 0);
}

function generateAccessToken(userId: number, role: string) {
  // Cast arguments to any to bypass type overload issues
  return (jwt.sign as any)({ sub: userId, role }, JWT_ACCESS_SECRET as any, { expiresIn: JWT_ACCESS_EXPIRES_IN as any });
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

function setRefreshCookie(res: Response, token: string) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: msToMs(JWT_REFRESH_EXPIRES_IN as string),
    path: '/api/v1/auth/refresh',
  });
}

router.post('/register', validate({ body: registerSchema }), async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: { message: 'User already exists' } });
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, passwordHash, name } });
    const accessToken = generateAccessToken(user.id, user.role);
    const rawRefresh = generateRefreshToken();
    const refreshHash = await hashPassword(rawRefresh);
    await prisma.refreshToken.create({ data: { tokenHash: refreshHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(JWT_REFRESH_EXPIRES_IN as string)) } });
    setRefreshCookie(res, rawRefresh);
    res.status(201).json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) { next(err); }
});

router.post('/login', validate({ body: loginSchema }), async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: { message: 'Invalid credentials' } });
    const valid = await verifyPassword(user.passwordHash, password);
    if (!valid) return res.status(401).json({ error: { message: 'Invalid credentials' } });
    const accessToken = generateAccessToken(user.id, user.role);
    const rawRefresh = generateRefreshToken();
    const refreshHash = await hashPassword(rawRefresh);
    await prisma.refreshToken.create({ data: { tokenHash: refreshHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(JWT_REFRESH_EXPIRES_IN as string)) } });
    setRefreshCookie(res, rawRefresh);
    res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) { next(err); }
});

router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  const rawRefresh = req.cookies.refreshToken;
  if (!rawRefresh) return res.status(401).json({ error: { message: 'Refresh token missing' } });
  try {
    const tokens = await prisma.refreshToken.findMany({});
    const matched = await Promise.all(tokens.map(async (t) => ({ token: t, match: await verifyPassword(t.tokenHash, rawRefresh) })));
    const validObj = matched.find(m => m.match && !m.token.revoked && m.token.expiresAt > new Date());
    if (!validObj) return res.status(401).json({ error: { message: 'Invalid refresh token' } });
    const oldToken = validObj.token;
    await prisma.refreshToken.update({ where: { id: oldToken.id }, data: { revoked: true } });
    const user = await prisma.user.findUnique({ where: { id: oldToken.userId } });
    if (!user) return res.status(401).json({ error: { message: 'User not found' } });
    const accessToken = generateAccessToken(user.id, user.role);
    const newRawRefresh = generateRefreshToken();
    const newHash = await hashPassword(newRawRefresh);
    await prisma.refreshToken.create({ data: { tokenHash: newHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(JWT_REFRESH_EXPIRES_IN as string)) } });
    setRefreshCookie(res, newRawRefresh);
    res.json({ accessToken });
  } catch (err) { next(err); }
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  const rawRefresh = req.cookies.refreshToken;
  if (rawRefresh) {
    try {
      const tokens = await prisma.refreshToken.findMany({});
      const matched = await Promise.all(tokens.map(async (t) => ({ token: t, match: await verifyPassword(t.tokenHash, rawRefresh) })));
      const valid = matched.find(m => m.match && !m.token.revoked);
      if (valid) await prisma.refreshToken.update({ where: { id: valid.token.id }, data: { revoked: true } });
    } catch (e) { logger.error('Logout revocation error', { error: e }); }
  }
  res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
  res.json({ message: 'Logged out' });
});

router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).userId as number;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true, role: true } });
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    res.json({ user });
  } catch (err) { next(err); }
});

export default router;
