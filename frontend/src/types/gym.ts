export interface PricingPlan {
  id: string;
  name: string; // e.g., "Monthly Pass", "Quarterly Pro", "Annual VIP"
  durationMonths: number;
  price: number;
  originalPrice?: number;
  savingsBadge?: string;
  popular?: boolean;
  features: string[];
}

export interface TrainerInfo {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialization: string[];
  photo: string;
  rating: number;
  bio: string;
}

export interface GymFacility {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'functional' | 'wellness' | 'amenity';
  iconName: string;
  description?: string;
}

export interface GymReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedMember: boolean;
  tag?: string;
}

export interface GymOffer {
  id: string;
  title: string;
  discountBadge: string;
  code: string;
  validTill: string;
  description: string;
}

export interface GymOpeningHours {
  day: string;
  open: string;
  close: string;
  is24Hours?: boolean;
}

export interface Gym {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  area: string; // "Keshav Nagar" | "Mundhwa" | "Magarpatta" | "Kharadi"
  city: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured?: boolean;
  startingPriceMonthly: number;
  monthlyPrice: number;
  quarterlyPrice: number;
  halfYearlyPrice: number;
  yearlyPrice: number;
  heroImage: string;
  photos: string[];
  videos?: string[];
  description: string;
  phone: string;
  email: string;
  whatsapp?: string;
  facilities: GymFacility[];
  amenities: string[];
  trainers: TrainerInfo[];
  plans: PricingPlan[];
  reviews: GymReview[];
  offers: GymOffer[];
  openingHours: GymOpeningHours[];
  hasParking: boolean;
  hasLocker: boolean;
  hasPersonalTraining: boolean;
  hasGroupClasses: boolean;
  hasSteamSauna: boolean;
  is24x7: boolean;
  genderAccess: 'Unisex' | 'Male' | 'Female';
}

export interface LocationFilter {
  city: string;
  locality: string;
  state: string;
  country: string;
}
