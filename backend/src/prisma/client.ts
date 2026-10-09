// src/prisma/client.ts
import { PrismaClient } from '@prisma/client';

// Singleton PrismaClient to avoid multiple instances
const prisma = new PrismaClient();

export default prisma;
