import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as rateLimiter from './middleware/rateLimiter';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth';
import rbacTestRoutes from './routes/rbacTest';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs'; // yamljs has no types, see declaration file
import path from 'path';
import logger from './utils/logger';

const app: Application = express();

// Basic security middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Rate limiting - general API limit
app.use(rateLimiter.general);

// API version prefix
const apiBase = '/api/v1';
app.use(`${apiBase}/auth`, authRoutes);
app.use(`${apiBase}`, rbacTestRoutes);

// Swagger UI & JSON
const openapiPath = path.join(__dirname, '..', 'docs', 'openapi.yaml');
const swaggerDocument = yaml.load(openapiPath);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/openapi.json', (req: Request, res: Response) => {
  res.json(swaggerDocument);
});

// Health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler – must be after all routes
app.use(errorHandler);

export default app;
