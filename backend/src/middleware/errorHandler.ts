import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Centralized error handling middleware
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log the error details
  logger.error('Error occurred', { error: err, path: req.path, method: req.method });

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
