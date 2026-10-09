import app from './app';
import { PORT, NODE_ENV } from './config';
import logger from './utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to PostgreSQL');
    app.listen(PORT, () => {
      logger.info(`🚀 Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
