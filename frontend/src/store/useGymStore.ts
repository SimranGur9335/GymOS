import { create } from 'zustand';
import { LocationFilter, Gym } from '../types/gym';
import { MOCK_GYMS } from '../data/mock/gyms';

interface GymStoreState {
  gyms: Gym[];
  selectedLocation: LocationFilter;
  searchQuery: string;
  selectedArea: string; // 'All' | 'Keshav Nagar' | 'Mundhwa' | 'Magarpatta' | 'Kharadi'
  maxDistanceKm: number;
  maxMonthlyPrice: number;
  minRating: number;
  filter24x7: boolean;
  filterParking: boolean;
  filterLocker: boolean;
  filterPersonalTraining: boolean;
  filterGroupClasses: boolean;
  filterSteamSauna: boolean;
  compareGymIds: string[];

  // Actions
  setLocation: (loc: LocationFilter) => void;
  setSearchQuery: (query: string) => void;
  setSelectedArea: (area: string) => void;
  setMaxDistanceKm: (dist: number) => void;
  setMaxMonthlyPrice: (price: number) => void;
  setMinRating: (rating: number) => void;
  toggleFilter: (key: 'filter24x7' | 'filterParking' | 'filterLocker' | 'filterPersonalTraining' | 'filterGroupClasses' | 'filterSteamSauna') => void;
  resetFilters: () => void;
  toggleCompareGym: (gymId: string) => void;
  clearCompareGyms: () => void;
}

export const useGymStore = create<GymStoreState>((set) => ({
  gyms: MOCK_GYMS,
  selectedLocation: {
    locality: 'Keshav Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
  },
  searchQuery: '',
  selectedArea: 'All',
  maxDistanceKm: 10,
  maxMonthlyPrice: 5000,
  minRating: 0,
  filter24x7: false,
  filterParking: false,
  filterLocker: false,
  filterPersonalTraining: false,
  filterGroupClasses: false,
  filterSteamSauna: false,
  compareGymIds: ['gym-1', 'gym-3'], // default compare pair for immediate preview

  setLocation: (selectedLocation) => set({ selectedLocation }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedArea: (selectedArea) => set({ selectedArea }),
  setMaxDistanceKm: (maxDistanceKm) => set({ maxDistanceKm }),
  setMaxMonthlyPrice: (maxMonthlyPrice) => set({ maxMonthlyPrice }),
  setMinRating: (minRating) => set({ minRating }),
  toggleFilter: (key) => set((state) => ({ [key]: !state[key] })),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedArea: 'All',
      maxDistanceKm: 10,
      maxMonthlyPrice: 5000,
      minRating: 0,
      filter24x7: false,
      filterParking: false,
      filterLocker: false,
      filterPersonalTraining: false,
      filterGroupClasses: false,
      filterSteamSauna: false,
    }),
  toggleCompareGym: (gymId) =>
    set((state) => {
      const exists = state.compareGymIds.includes(gymId);
      if (exists) {
        return { compareGymIds: state.compareGymIds.filter((id) => id !== gymId) };
      }
      if (state.compareGymIds.length >= 3) {
        // limit 3 gyms max
        return { compareGymIds: [...state.compareGymIds.slice(1), gymId] };
      }
      return { compareGymIds: [...state.compareGymIds, gymId] };
    }),
  clearCompareGyms: () => set({ compareGymIds: [] }),
}));
