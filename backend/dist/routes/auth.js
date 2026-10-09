"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().min(1),
});
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(8),
});
function msToMs(exp) {
    const num = parseInt(exp.slice(0, -1), 10);
    const unit = exp.slice(-1);
    const multipliers = { s: 1000, m: 60 * 1000, h: 3600 * 1000, d: 86400 * 1000 };
    return num * (multipliers[unit] ?? 0);
}
function generateAccessToken(userId, role) {
    // Cast arguments to any to bypass type overload issues
    return jsonwebtoken_1.default.sign({ sub: userId, role }, config_1.JWT_ACCESS_SECRET, { expiresIn: config_1.JWT_ACCESS_EXPIRES_IN });
}
function generateRefreshToken() {
    return crypto_1.default.randomBytes(64).toString('hex');
}
function setRefreshCookie(res, token) {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: msToMs(config_1.JWT_REFRESH_EXPIRES_IN),
        path: '/api/v1/auth/refresh',
    });
}
router.post('/register', (0, validation_1.validate)({ body: registerSchema }), async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing)
            return res.status(409).json({ error: { message: 'User already exists' } });
        const passwordHash = await (0, password_1.hashPassword)(password);
        const user = await prisma.user.create({ data: { email, passwordHash, name } });
        const accessToken = generateAccessToken(user.id, user.role);
        const rawRefresh = generateRefreshToken();
        const refreshHash = await (0, password_1.hashPassword)(rawRefresh);
        await prisma.refreshToken.create({ data: { tokenHash: refreshHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(config_1.JWT_REFRESH_EXPIRES_IN)) } });
        setRefreshCookie(res, rawRefresh);
        res.status(201).json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (err) {
        next(err);
    }
});
router.post('/login', (0, validation_1.validate)({ body: loginSchema }), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        const valid = await (0, password_1.verifyPassword)(user.passwordHash, password);
        if (!valid)
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        const accessToken = generateAccessToken(user.id, user.role);
        const rawRefresh = generateRefreshToken();
        const refreshHash = await (0, password_1.hashPassword)(rawRefresh);
        await prisma.refreshToken.create({ data: { tokenHash: refreshHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(config_1.JWT_REFRESH_EXPIRES_IN)) } });
        setRefreshCookie(res, rawRefresh);
        res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (err) {
        next(err);
    }
});
router.post('/refresh', async (req, res, next) => {
    const rawRefresh = req.cookies.refreshToken;
    if (!rawRefresh)
        return res.status(401).json({ error: { message: 'Refresh token missing' } });
    try {
        const tokens = await prisma.refreshToken.findMany({});
        const matched = await Promise.all(tokens.map(async (t) => ({ token: t, match: await (0, password_1.verifyPassword)(t.tokenHash, rawRefresh) })));
        const validObj = matched.find(m => m.match && !m.token.revoked && m.token.expiresAt > new Date());
        if (!validObj)
            return res.status(401).json({ error: { message: 'Invalid refresh token' } });
        const oldToken = validObj.token;
        await prisma.refreshToken.update({ where: { id: oldToken.id }, data: { revoked: true } });
        const user = await prisma.user.findUnique({ where: { id: oldToken.userId } });
        if (!user)
            return res.status(401).json({ error: { message: 'User not found' } });
        const accessToken = generateAccessToken(user.id, user.role);
        const newRawRefresh = generateRefreshToken();
        const newHash = await (0, password_1.hashPassword)(newRawRefresh);
        await prisma.refreshToken.create({ data: { tokenHash: newHash, userId: user.id, expiresAt: new Date(Date.now() + msToMs(config_1.JWT_REFRESH_EXPIRES_IN)) } });
        setRefreshCookie(res, newRawRefresh);
        res.json({ accessToken });
    }
    catch (err) {
        next(err);
    }
});
router.post('/logout', async (req, res, next) => {
    const rawRefresh = req.cookies.refreshToken;
    if (rawRefresh) {
        try {
            const tokens = await prisma.refreshToken.findMany({});
            const matched = await Promise.all(tokens.map(async (t) => ({ token: t, match: await (0, password_1.verifyPassword)(t.tokenHash, rawRefresh) })));
            const valid = matched.find(m => m.match && !m.token.revoked);
            if (valid)
                await prisma.refreshToken.update({ where: { id: valid.token.id }, data: { revoked: true } });
        }
        catch (e) {
            logger_1.default.error('Logout revocation error', { error: e });
        }
    }
    res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
    res.json({ message: 'Logged out' });
});
router.get('/me', auth_1.authenticate, async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true, role: true } });
        if (!user)
            return res.status(404).json({ error: { message: 'User not found' } });
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map