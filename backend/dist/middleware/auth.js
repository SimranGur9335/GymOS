"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/** Middleware to verify Access Token JWT */
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: { message: 'Missing or invalid Authorization header' } });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_SECRET);
        // Attach user info to request for downstream handlers
        req.userId = payload.sub;
        req.userRole = payload.role;
        // Optionally load full user for convenience (cached per request)
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        req.user = user;
        next();
    }
    catch (err) {
        logger_1.default.warn('Authentication failed', { error: err });
        return res.status(401).json({ error: { message: 'Invalid or expired token' } });
    }
}
/** Simple role‑based access control helper */
function authorize(allowedRoles) {
    return (req, res, next) => {
        const role = req.userRole;
        if (!role || !allowedRoles.includes(role)) {
            return res.status(403).json({ error: { message: 'Forbidden: insufficient permissions' } });
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map