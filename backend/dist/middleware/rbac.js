"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
exports.requireRole = requireRole;
exports.requireGymOwnership = requireGymOwnership;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/** Ensure user is authenticated - already provided by auth middleware */
const requireAuth = (req, res, next) => {
    // auth middleware already attaches userId
    if (!req.userId) {
        return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
    }
    next();
};
exports.requireAuth = requireAuth;
/** Role based access control */
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const role = req.userRole;
        if (!role || !allowedRoles.includes(role)) {
            return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
        }
        next();
    };
}
/** Verify gym ownership */
async function requireGymOwnership(req, res, next) {
    const userId = req.userId;
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
//# sourceMappingURL=rbac.js.map