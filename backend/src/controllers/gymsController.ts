// src/controllers/gymsController.ts
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { gymQuerySchema } from '../validation/gymQueries';

// Helper to parse pagination params (already validated)
function getPagination(query: any) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 12;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

/**
 * GET /api/v1/gyms
 * Public discovery with filtering, sorting and pagination.
 */
export async function listGyms(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const {
      search,
      rating,
      minPrice,
      maxPrice,
      facilities,
      membership,
      verified,
      sort,
    } = req.query as any;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { locality: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (typeof verified === 'boolean') {
      where.verified = verified;
    } else {
      // default: only show verified gyms publicly
      where.verified = true;
    }
    if (rating) {
      // We will filter after fetching by average rating
      // using having clause is not directly supported; simplify by later filter
    }
    if (facilities && Array.isArray(facilities) && facilities.length) {
      where.facilities = { some: { name: { in: facilities } } } as any;
    }
    if (membership) {
      where.membershipPlans = { some: { name: { equals: membership } } } as any;
    }
    // Price filter on membershipPlans – simplified by joining later

    const orderBy: any = {};
    if (sort) {
      switch (sort) {
        case 'rating':
          orderBy.rating = 'desc';
          break;
        case 'price_low':
          orderBy.membershipPlans = { price: 'asc' };
          break;
        case 'price_high':
          orderBy.membershipPlans = { price: 'desc' };
          break;
        case 'newest':
          orderBy.createdAt = 'desc';
          break;
        default:
          break;
      }
    }

    const [total, gyms] = await Promise.all([
      prisma.gym.count({ where }),
      prisma.gym.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          address: true,
          locality: true,
          city: true,
          latitude: true,
          longitude: true,
          verified: true,
          facilities: { select: { name: true } },
          rating: true,
          reviews: { select: { id: true } },
        },
      }),
    ]);

    // Post‑filter rating if needed
    let filteredGyms = gyms;
    if (rating) {
      filteredGyms = filteredGyms.filter((g) => (g.rating ?? 0) >= rating);
    }
    // Price filter – look at the cheapest active plan per gym
    if (minPrice !== undefined || maxPrice !== undefined) {
      filteredGyms = filteredGyms.filter((g) => {
        const cheapest = g.membershipPlans?.[0]?.price;
        if (cheapest === undefined) return false;
        if (minPrice !== undefined && cheapest < minPrice) return false;
        if (maxPrice !== undefined && cheapest > maxPrice) return false;
        return true;
      });
    }

    const totalPages = Math.ceil(total / limit);
    res.json({
      success: true,
      data: {
        items: filteredGyms,
        pagination: { page, limit, total, totalPages },
      },
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id */
export async function getGymById(req: Request, res: Response, next: NextFunction) {
  try {
    const gym = await prisma.gym.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        facilities: { select: { name: true } },
        membershipPlans: true,
        trainers: { include: { user: { select: { name: true, avatar: true } } } },
        operatingHours: true,
        images: true,
        videos: true,
        offers: true,
        reviews: { select: { rating: true, comment: true, createdAt: true, user: { select: { name: true, avatar: true } } } },
      },
    });
    if (!gym) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Gym not found' } });
    res.json({ success: true, data: gym });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/slug/:slug */
export async function getGymBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const gym = await prisma.gym.findUnique({
      where: { slug: req.params.slug },
      include: { facilities: true, membershipPlans: true, trainers: true, operatingHours: true, images: true, videos: true, offers: true, reviews: true },
    });
    if (!gym) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Gym not found' } });
    res.json({ success: true, data: gym });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/search */
export async function searchGyms(req: Request, res: Response, next: NextFunction) {
  // Reuse listGyms – filters already support search
  return listGyms(req, res, next);
}

/** GET /api/v1/gyms/nearby */
export async function nearbyGyms(req: Request, res: Response, next: NextFunction) {
  try {
    const { lat, lng, radius = 5 } = req.query as any;
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'lat and lng required' } });
    }
    const latNum = Number(lat);
    const lngNum = Number(lng);
    const radiusKm = Number(radius);

    // Simple Haversine via raw SQL – PostgreSQL earthdistance extension is not guaranteed, so approximate.
    const gyms = await prisma.$queryRaw`
      SELECT *,
        (6371 * acos(
          cos(radians(${latNum})) * cos(radians("latitude")) *
          cos(radians("longitude") - radians(${lngNum})) +
          sin(radians(${latNum})) * sin(radians("latitude"))
        )) AS distance
      FROM "Gym"
      WHERE "verified" = true
        AND (6371 * acos(
          cos(radians(${latNum})) * cos(radians("latitude")) *
          cos(radians("longitude") - radians(${lngNum})) +
          sin(radians(${latNum})) * sin(radians("latitude"))
        )) <= ${radiusKm}
      ORDER BY distance ASC;
    `;
    res.json({ success: true, data: gyms });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/facilities */
export async function getGymFacilities(req: Request, res: Response, next: NextFunction) {
  try {
    const facilities = await prisma.gymFacility.findMany({
      where: { gymId: Number(req.params.id) },
      select: { id: true, name: true },
    });
    res.json({ success: true, data: facilities });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/trainers */
export async function getGymTrainers(req: Request, res: Response, next: NextFunction) {
  try {
    const trainers = await prisma.trainer.findMany({
      where: { gymId: Number(req.params.id) },
      select: {
        id: true,
        user: { select: { name: true, avatar: true } },
        // Add any public fields you store on Trainer model later
      },
    });
    res.json({ success: true, data: trainers });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/memberships */
export async function getGymMembershipPlans(req: Request, res: Response, next: NextFunction) {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { gymId: Number(req.params.id), active: true },
      select: { id: true, name: true, description: true, price: true, durationMonths: true, discount: true },
    });
    res.json({ success: true, data: plans });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/offers */
export async function getGymOffers(req: Request, res: Response, next: NextFunction) {
  try {
    const now = new Date();
    const offers = await prisma.offer.findMany({
      where: {
        gymId: Number(req.params.id),
        active: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      select: { id: true, title: true, description: true, discount: true, startDate: true, endDate: true },
    });
    res.json({ success: true, data: offers });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/reviews */
export async function getGymReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, limit = 12, sort = 'newest', rating } = req.query as any;
    const skip = (page - 1) * limit;
    const where: any = { gymId: Number(req.params.id), moderated: true };
    if (rating) where.rating = Number(rating);
    const orderBy = sort === 'newest' ? { createdAt: 'desc' } : { rating: 'desc' };
    const [total, reviews] = await Promise.all([
      prisma.review.count({ where }),
      prisma.review.findMany({ where, skip, take: Number(limit), orderBy, select: { rating: true, comment: true, createdAt: true, user: { select: { name: true, avatar: true } } } }),
    ]);
    const totalPages = Math.ceil(total / limit);
    res.json({ success: true, data: { items: reviews, pagination: { page: Number(page), limit: Number(limit), total, totalPages } } });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/hours */
export async function getGymHours(req: Request, res: Response, next: NextFunction) {
  try {
    const hours = await prisma.gymOperatingHour.findMany({
      where: { gymId: Number(req.params.id) },
      orderBy: { dayOfWeek: 'asc' },
    });
    res.json({ success: true, data: hours });
  } catch (err) {
    next(err);
  }
}

/** GET /api/v1/gyms/:id/gallery */
export async function getGymGallery(req: Request, res: Response, next: NextFunction) {
  try {
    const images = await prisma.gymImage.findMany({ where: { gymId: Number(req.params.id) } });
    const videos = await prisma.gymVideo.findMany({ where: { gymId: Number(req.params.id) } });
    res.json({ success: true, data: { images, videos } });
  } catch (err) {
    next(err);
  }
}
