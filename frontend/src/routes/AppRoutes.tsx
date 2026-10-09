import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages (lazy loaded)
const LandingPage = lazy(() => import('../pages/public/LandingPage').then(m => ({ default: m.LandingPage })));
const GymDiscoveryPage = lazy(() => import('../pages/public/GymDiscoveryPage').then(m => ({ default: m.GymDiscoveryPage })));
const GymDetailsPage = lazy(() => import('../pages/public/GymDetailsPage').then(m => ({ default: m.GymDetailsPage })));
const ComparePage = lazy(() => import('../pages/public/ComparePage').then(m => ({ default: m.ComparePage })));
const MembershipPage = lazy(() => import('../pages/public/MembershipPage').then(m => ({ default: m.MembershipPage })));
const TrainersPage = lazy(() => import('../pages/public/TrainersPage').then(m => ({ default: m.TrainersPage })));
const OffersPage = lazy(() => import('../pages/public/OffersPage').then(m => ({ default: m.OffersPage })));
const AboutPage = lazy(() => import('../pages/public/AboutPage').then(m => ({ default: m.AboutPage })));

// Auth Pages (lazy loaded)
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
// Member Portal Pages (lazy loaded)
const MemberDashboard = lazy(() => import('../pages/member/MemberDashboard').then(m => ({ default: m.MemberDashboard })));
const MemberProfile = lazy(() => import('../pages/member/MemberProfile').then(m => ({ default: m.MemberProfile })));
const MemberMembership = lazy(() => import('../pages/member/MemberMembership').then(m => ({ default: m.MemberMembership })));
const MemberAttendance = lazy(() => import('../pages/member/MemberAttendance').then(m => ({ default: m.MemberAttendance })));
const MemberWorkouts = lazy(() => import('../pages/member/MemberWorkouts').then(m => ({ default: m.MemberWorkouts })));
const MemberProgress = lazy(() => import('../pages/member/MemberProgress').then(m => ({ default: m.MemberProgress })));
const MemberPayments = lazy(() => import('../pages/member/MemberPayments').then(m => ({ default: m.MemberPayments })));
const MemberBookings = lazy(() => import('../pages/member/MemberBookings').then(m => ({ default: m.MemberBookings })));
// Trainer Portal Pages (lazy loaded)
const TrainerDashboard = lazy(() => import('../pages/trainer/TrainerDashboard').then(m => ({ default: m.TrainerDashboard })));
const TrainerMembers = lazy(() => import('../pages/trainer/TrainerMembers').then(m => ({ default: m.TrainerMembers })));
const TrainerSchedule = lazy(() => import('../pages/trainer/TrainerSchedule').then(m => ({ default: m.TrainerSchedule })));
const TrainerWorkouts = lazy(() => import('../pages/trainer/TrainerWorkouts').then(m => ({ default: m.TrainerWorkouts })));
const TrainerProgress = lazy(() => import('../pages/trainer/TrainerProgress').then(m => ({ default: m.TrainerProgress })));

// Owner Portal Pages (lazy loaded)
const OwnerDashboard = lazy(() => import('../pages/owner/OwnerDashboard').then(m => ({ default: m.OwnerDashboard })));
const OwnerMembers = lazy(() => import('../pages/owner/OwnerMembers').then(m => ({ default: m.OwnerMembers })));
const OwnerMemberships = lazy(() => import('../pages/owner/OwnerMemberships').then(m => ({ default: m.OwnerMemberships })));
const OwnerTrainers = lazy(() => import('../pages/owner/OwnerTrainers').then(m => ({ default: m.OwnerTrainers })));
const OwnerAttendance = lazy(() => import('../pages/owner/OwnerAttendance').then(m => ({ default: m.OwnerAttendance })));
const OwnerPayments = lazy(() => import('../pages/owner/OwnerPayments').then(m => ({ default: m.OwnerPayments })));
const OwnerLeads = lazy(() => import('../pages/owner/OwnerLeads').then(m => ({ default: m.OwnerLeads })));
const OwnerOffers = lazy(() => import('../pages/owner/OwnerOffers').then(m => ({ default: m.OwnerOffers })));
const OwnerReviews = lazy(() => import('../pages/owner/OwnerReviews').then(m => ({ default: m.OwnerReviews })));
const OwnerAnalytics = lazy(() => import('../pages/owner/OwnerAnalytics').then(m => ({ default: m.OwnerAnalytics })));
const OwnerProfile = lazy(() => import('../pages/owner/OwnerProfile').then(m => ({ default: m.OwnerProfile })));
// Admin Portal Pages (lazy loaded)
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminGyms = lazy(() => import('../pages/admin/AdminGyms').then(m => ({ default: m.AdminGyms })));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Loading...</div>}>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<GymDiscoveryPage />} />
        <Route path="/gyms" element={<GymDiscoveryPage />} />
        <Route path="/gyms/:slug" element={<GymDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Dashboard Routes with Sidebar Navigation */}
      <Route element={<DashboardLayout />}>
        {/* Member Portal */}
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member/profile" element={<MemberProfile />} />
        <Route path="/member/membership" element={<MemberMembership />} />
        <Route path="/member/attendance" element={<MemberAttendance />} />
        <Route path="/member/workouts" element={<MemberWorkouts />} />
        <Route path="/member/progress" element={<MemberProgress />} />
        <Route path="/member/payments" element={<MemberPayments />} />
        <Route path="/member/bookings" element={<MemberBookings />} />

        {/* Trainer Portal */}
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/trainer/members" element={<TrainerMembers />} />
        <Route path="/trainer/schedule" element={<TrainerSchedule />} />
        <Route path="/trainer/workouts" element={<TrainerWorkouts />} />
        <Route path="/trainer/progress" element={<TrainerProgress />} />

        {/* Gym Owner Portal */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/members" element={<OwnerMembers />} />
        <Route path="/owner/memberships" element={<OwnerMemberships />} />
        <Route path="/owner/trainers" element={<OwnerTrainers />} />
        <Route path="/owner/attendance" element={<OwnerAttendance />} />
        <Route path="/owner/payments" element={<OwnerPayments />} />
        <Route path="/owner/leads" element={<OwnerLeads />} />
        <Route path="/owner/offers" element={<OwnerOffers />} />
        <Route path="/owner/reviews" element={<OwnerReviews />} />
        <Route path="/owner/analytics" element={<OwnerAnalytics />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />

        {/* Platform Admin Portal */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/gyms" element={<AdminGyms />} />
        <Route path="/admin/verification" element={<AdminDashboard />} />
        <Route path="/admin/payments" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
  );
};
