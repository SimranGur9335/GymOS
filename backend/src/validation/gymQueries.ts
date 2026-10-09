// src/validation/gymQueries.ts
import { z } from 'zod';
import { validate } from '../middleware/validation';

// Whitelisted sortable fields mapped to Prisma orderBy definitions
const sortMap = {
  rating: { rating: 'desc' },
  price_low: { membershipPlans: { price: 'asc' } },
  price_high: { membershipPlans: { price: 'desc' } },
  newest: { createdAt: 'desc' },
} as const;

export const gymQuerySchema = z.object({
  page: z.string().optional().default('1').transform((v) => parseInt(v, 10)),
  limit: z.string().optional().default('12').transform((v) => Math.min(parseInt(v, 10), 100)),
  search: z.string().optional(),
  rating: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  minPrice: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  maxPrice: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  facilities: z.string().optional().transform((v) => (v ? v.split(',') : undefined)),
  membership: z.string().optional(),
  verified: z.string().optional().transform((v) => v === 'true'),
  lat: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  lng: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  radius: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
  sort: z.enum(['rating', 'price_low', 'price_high', 'newest']).optional(),
});

export const validateGymQuery = validate({ query: gymQuerySchema });
