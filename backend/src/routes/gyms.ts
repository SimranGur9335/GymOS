// src/routes/gyms.ts
import { Router } from 'express';
import * as gymsController from '../controllers/gymsController';
import { validateGymQuery } from '../middleware/validation';

const router = Router();

// Public discovery endpoints – no auth middleware
router.get('/', validateGymQuery, gymsController.listGyms);
router.get('/slug/:slug', gymsController.getGymBySlug);
router.get('/search', validateGymQuery, gymsController.searchGyms);
router.get('/nearby', validateGymQuery, gymsController.nearbyGyms);
router.get('/:id', gymsController.getGymById);
router.get('/:id/facilities', gymsController.getGymFacilities);
router.get('/:id/trainers', gymsController.getGymTrainers);
router.get('/:id/memberships', gymsController.getGymMembershipPlans);
router.get('/:id/offers', gymsController.getGymOffers);
router.get('/:id/reviews', gymsController.getGymReviews);
router.get('/:id/hours', gymsController.getGymHours);
router.get('/:id/gallery', gymsController.getGymGallery);

export default router;
