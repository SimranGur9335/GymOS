import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'change-me-access';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change-me-refresh';
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
