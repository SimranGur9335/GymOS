"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rbac_1 = require("../middleware/rbac");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Admin test endpoint – only SUPER_ADMIN can access
router.get('/admin/test', auth_1.authenticate, (0, rbac_1.requireRole)('SUPER_ADMIN'), (req, res) => {
    res.json({ success: true, data: 'Admin access granted' });
});
// Owner test endpoint – GYM_OWNER or GYM_STAFF can access
router.get('/owner/test', auth_1.authenticate, (0, rbac_1.requireRole)('GYM_OWNER', 'GYM_STAFF'), (req, res) => {
    res.json({ success: true, data: 'Owner access granted' });
});
// Trainer test endpoint – TRAINER role
router.get('/trainer/test', auth_1.authenticate, (0, rbac_1.requireRole)('TRAINER'), (req, res) => {
    res.json({ success: true, data: 'Trainer access granted' });
});
// Member test endpoint – MEMBER role
router.get('/member/test', auth_1.authenticate, (0, rbac_1.requireRole)('MEMBER'), (req, res) => {
    res.json({ success: true, data: 'Member access granted' });
});
exports.default = router;
//# sourceMappingURL=rbacTest.js.map