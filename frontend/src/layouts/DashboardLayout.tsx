import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  LayoutDashboard,
  User,
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
  Percent,
  BarChart3,
  ShieldCheck,
  Building2,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { UserRole } from '../types/user';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeRole, switchRole, user, logout } = useAuthStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Define sidebar navigation links per portal role
  const roleNavItems: Record<UserRole, { label: string; path: string; icon: any }[]> = {
    member: [
      { label: 'Overview', path: '/member', icon: LayoutDashboard },
      { label: 'My Membership', path: '/member/membership', icon: Award },
      { label: 'Attendance Log', path: '/member/attendance', icon: Clock },
      { label: 'Today Workout', path: '/member/workouts', icon: Dumbbell },
      { label: 'Progress Tracking', path: '/member/progress', icon: TrendingUp },
      { label: 'Trainer Sessions', path: '/member/bookings', icon: Calendar },
      { label: 'Payments & Receipts', path: '/member/payments', icon: CreditCard },
      { label: 'My Profile', path: '/member/profile', icon: User },
    ],
    trainer: [
      { label: 'Overview', path: '/trainer', icon: LayoutDashboard },
      { label: 'Assigned Members', path: '/trainer/members', icon: Users },
      { label: 'Session Schedule', path: '/trainer/schedule', icon: Calendar },
      { label: 'Workout Plans', path: '/trainer/workouts', icon: Dumbbell },
      { label: 'Client Progress', path: '/trainer/progress', icon: TrendingUp },
    ],
    owner: [
      { label: 'Gym Overview', path: '/owner', icon: LayoutDashboard },
      { label: 'Members', path: '/owner/members', icon: Users },
      { label: 'Membership Plans', path: '/owner/memberships', icon: Award },
      { label: 'Attendance Engine', path: '/owner/attendance', icon: Clock },
      { label: 'Trainers', path: '/owner/trainers', icon: Dumbbell },
      { label: 'Revenue & Payments', path: '/owner/payments', icon: CreditCard },
      { label: 'Leads Growth', path: '/owner/leads', icon: TrendingUp },
      { label: 'Gym Offers', path: '/owner/offers', icon: Percent },
      { label: 'Member Reviews', path: '/owner/reviews', icon: MessageSquare },
      { label: 'Analytics Suite', path: '/owner/analytics', icon: BarChart3 },
      { label: 'Gym Profile', path: '/owner/profile', icon: Building2 },
    ],
    admin: [
      { label: 'Platform Overview', path: '/admin', icon: LayoutDashboard },
      { label: 'Platform Users', path: '/admin/users', icon: Users },
      { label: 'Gym Registry', path: '/admin/gyms', icon: Building2 },
      { label: 'Gym Verification', path: '/admin/verification', icon: ShieldCheck },
      { label: 'Revenue Audit', path: '/admin/payments', icon: CreditCard },
      { label: 'System Reports', path: '/admin/reports', icon: BarChart3 },
      { label: 'System Settings', path: '/admin/settings', icon: Sparkles },
    ],
  };

  const currentNavItems = roleNavItems[activeRole] || roleNavItems.member;

  return (
    <div className="min-h-screen flex bg-[#0B0D10] text-[#F3F4F6]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#14171F] border-r border-[#272D3D] flex-shrink-0 sticky top-0 h-screen">
        {/* Top Logo Bar */}
        <div className="p-4 border-b border-[#272D3D] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#B5F800] flex items-center justify-center text-[#0B0D10] font-black">
              <Dumbbell className="w-4 h-4 fill-current" />
            </div>
            <span className="text-lg font-extrabold text-white">
              Gym<span className="text-[#B5F800]">OS</span>
            </span>
          </Link>
          <span className="text-[10px] uppercase font-bold text-[#B5F800] bg-[#B5F800]/10 px-2 py-0.5 rounded-full border border-[#B5F800]/30 capitalize">
            {activeRole}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <Link
            to="/discover"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#1E2330] mb-3 border border-[#272D3D]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#B5F800]" />
            <span>Back to Discovery</span>
          </Link>

          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#B5F800] text-[#0B0D10] shadow-[0_0_12px_rgba(181,248,0,0.3)]'
                    : 'text-gray-300 hover:bg-[#1E2330] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B0D10]' : 'text-[#B5F800]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer Card */}
        <div className="p-3 border-t border-[#272D3D] bg-[#0B0D10]/50 space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#14171F] border border-[#272D3D]">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-gray-400 truncate capitalize">{activeRole} Account</div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-1.5 rounded-lg bg-[#1E2330] hover:bg-red-500/20 hover:text-red-400 text-xs font-semibold text-gray-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-[#14171F] border-b border-[#272D3D] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#1E2330] text-gray-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="capitalize">{activeRole} Workspace</span>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <span className="text-xs text-[#B5F800] hidden sm:inline">📍 Keshav Nagar, Pune Hub</span>
            </div>
          </div>

          {/* Role Switcher Pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 hidden md:inline">Switch Role:</span>
            <div className="flex items-center gap-1 bg-[#0B0D10] p-1 rounded-xl border border-[#272D3D]">
              {(['member', 'trainer', 'owner', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    const defaultRoutes: Record<UserRole, string> = {
                      member: '/member',
                      trainer: '/trainer',
                      owner: '/owner',
                      admin: '/admin',
                    };
                    navigate(defaultRoutes[r]);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                    activeRole === r ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className="w-72 bg-[#14171F] border-r border-[#272D3D] p-4 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#272D3D]">
                  <span className="text-sm font-bold text-white">Portal Navigation</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:bg-[#1E2330]"
                      >
                        <Icon className="w-4 h-4 text-[#B5F800]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#1E2330] text-xs font-bold text-white text-center block"
              >
                Back to Public Marketplace
              </Link>
            </div>
          </div>
        )}

        {/* Dashboard Subpage Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
