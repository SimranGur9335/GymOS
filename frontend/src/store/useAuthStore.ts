import { create } from 'zustand';
import { User, UserRole } from '../types/user';

interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  member: {
    id: 'usr-mem-1',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    gymId: 'gym-1',
    gymName: 'Iron Haven Fitness Club',
    joinedDate: '15 Jan 2026',
  },
  trainer: {
    id: 'usr-trn-1',
    name: 'Vikram Shinde',
    email: 'vikram.shinde@ironhaven.in',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    gymId: 'gym-1',
    gymName: 'Iron Haven Fitness Club',
    joinedDate: '01 Mar 2024',
  },
  owner: {
    id: 'usr-own-1',
    name: 'Rajesh Shinde',
    email: 'owner@ironhaven.in',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    gymId: 'gym-1',
    gymName: 'Iron Haven Fitness Club',
    joinedDate: '10 Oct 2023',
  },
  admin: {
    id: 'usr-adm-1',
    name: 'GymOS System Admin',
    email: 'admin@gymos.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    joinedDate: '01 Jan 2024',
  },
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: DEFAULT_USERS.member,
  isAuthenticated: true,
  activeRole: 'member',
  login: (role) =>
    set({
      user: DEFAULT_USERS[role],
      isAuthenticated: true,
      activeRole: role,
    }),
  logout: () => set({ user: null, isAuthenticated: false }),
  switchRole: (role) =>
    set({
      user: DEFAULT_USERS[role],
      activeRole: role,
      isAuthenticated: true,
    }),
}));
