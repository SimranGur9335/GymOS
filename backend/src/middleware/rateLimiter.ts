import rateLimit from 'express-rate-limit';
import { RequestHandler } from 'express';

// General API rate limiter (apply to all routes)
export const general: RequestHandler = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX) || 1000, // limit per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.',
    },
  },
});

// Auth-specific limiters – configurable via env
export const loginLimiter: RequestHandler = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_LOGIN_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_LOGIN_MAX) || 5,
  keyGenerator: (req) => (req.ip || ''),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'TOO_MANY_LOGIN_ATTEMPTS', message: 'Too many login attempts, try again later.' },
  },
});

export const registerLimiter: RequestHandler = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_REGISTER_WINDOW_MS) || 60 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_REGISTER_MAX) || 5,
  keyGenerator: (req) => (req.ip || ''),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'TOO_MANY_REGISTRATIONS', message: 'Too many registration attempts, try again later.' },
  },
});

export const forgotPasswordLimiter: RequestHandler = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_FORGOT_WINDOW_MS) || 60 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_FORGOT_MAX) || 5,
  keyGenerator: (req) => (req.ip || ''),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'TOO_MANY_FORGOT_PASSWORD', message: 'Too many password recovery attempts, try again later.' },
  },
});
