"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordLimiter = exports.registerLimiter = exports.loginLimiter = exports.general = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// General API rate limiter (apply to all routes)
exports.general = (0, express_rate_limit_1.default)({
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
exports.loginLimiter = (0, express_rate_limit_1.default)({
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
exports.registerLimiter = (0, express_rate_limit_1.default)({
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
exports.forgotPasswordLimiter = (0, express_rate_limit_1.default)({
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
//# sourceMappingURL=rateLimiter.js.map