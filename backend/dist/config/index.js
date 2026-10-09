"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_EXPIRES_IN = exports.JWT_ACCESS_EXPIRES_IN = exports.JWT_REFRESH_SECRET = exports.JWT_ACCESS_SECRET = exports.CORS_ORIGIN = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 4000;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'change-me-access';
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change-me-refresh';
exports.JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
exports.JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
//# sourceMappingURL=index.js.map