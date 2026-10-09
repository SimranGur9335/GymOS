"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = __importDefault(require("../utils/logger"));
// Centralized error handling middleware
function errorHandler(err, req, res, next) {
    // Log the error details
    logger_1.default.error('Error occurred', { error: err, path: req.path, method: req.method });
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const details = err.details || undefined;
    res.status(status).json({
        error: {
            message,
            ...(details && { details })
        }
    });
}
//# sourceMappingURL=errorHandler.js.map