import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, ShieldCheck, UserCheck, Building2, User, ChevronDown, Sparkles, Scale, Percent } from 'lucide-react';
import { LocationSelector } from '../common/LocationSelector';
import { useAuthStore } from '../../store/useAuthStore';
import { useGymStore } from '../../store/useGymStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { activeRole, switchRole, user } = useAuthStore();
  const { compareGymIds } = useGymStore();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Discover Gyms', path: '/discover' },
    { label: 'Compare', path: '/compare', badge: compareGymIds.length > 0 ? compareGymIds.length : null },
    { label: 'Memberships', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Offers', path: '/offers', icon: Percent },
    { label: 'About', path: '/about' },
  ];

  const rolePaths = {
    member: '/member',
    trainer: '/trainer',
    owner: '/owner',
    admin: '/admin',
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#B5F800] flex items-center justify-center text-[#0B0D10] font-black tracking-tighter shadow-[0_0_15px_rgba(181,248,0,0.3)] group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Gym<span className="text-[#B5F800]">OS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">
                Gym Operating System
              </span>
            </div>
          </Link>

          <div className="hidden md:block h-5 w-[1px] bg-[#272D3D]" />

          <div className="hidden md:block">
            <LocationSelector />
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-[#14171F] border border-[#272D3D]'
                    : 'text-gray-300 hover:text-white hover:bg-[#14171F]/60'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-[#B5F800]" />}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-[#B5F800] text-[#0B0D10] font-bold rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Portal Switcher & Action CTAs */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Portal Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14171F] border border-[#272D3D] hover:border-[#B5F800]/50 text-xs font-medium text-gray-200 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B5F800]" />
              <span className="capitalize hidden sm:inline text-gray-300">Portal:</span>
              <span className="font-bold text-white capitalize">{activeRole}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {roleDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#14171F] border border-[#272D3D] shadow-2xl z-50 p-2 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#272D3D]">
                    Demo Portal Selector
                  </div>
                  <Link
                    to="/member"
                    onClick={() => {
                      switchRole('member');
                      setRoleDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      activeRole === 'member' ? 'bg-[#1E2330] text-[#B5F800]' : 'text-gray-300 hover:bg-[#1A1E29]'
                    }`}
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="font-semibold">Member Portal</div>
                      <div className="text-[10px] text-gray-500">Track workout, attendance</div>
                    </div>
                  </Link>

                  <Link
                    to="/trainer"
                    onClick={() => {
                      switchRole('trainer');
                      setRoleDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      activeRole === 'trainer' ? 'bg-[#1E2330] text-[#B5F800]' : 'text-gray-300 hover:bg-[#1A1E29]'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold">Trainer Portal</div>
                      <div className="text-[10px] text-gray-500">Manage clients & schedules</div>
                    </div>
                  </Link>

                  <Link
                    to="/owner"
                    onClick={() => {
                      switchRole('owner');
                      setRoleDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      activeRole === 'owner' ? 'bg-[#1E2330] text-[#B5F800]' : 'text-gray-300 hover:bg-[#1A1E29]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold">Gym Owner Portal</div>
                      <div className="text-[10px] text-gray-500">Revenue, leads, members</div>
                    </div>
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => {
                      switchRole('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      activeRole === 'admin' ? 'bg-[#1E2330] text-[#B5F800]' : 'text-gray-300 hover:bg-[#1A1E29]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="font-semibold">Platform Admin</div>
                      <div className="text-[10px] text-gray-500">Super admin controls</div>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link
            to={rolePaths[activeRole]}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1E2330] hover:bg-[#272D3D] text-xs font-semibold text-white border border-[#272D3D] transition-colors"
          >
            <span>My Portal</span>
          </Link>

          <Link
            to="/owner"
            onClick={() => switchRole('owner')}
            className="px-4 py-1.5 rounded-lg bg-[#B5F800] hover:bg-[#a2de00] text-[#0B0D10] text-xs font-bold transition-all shadow-[0_0_12px_rgba(181,248,0,0.25)] hover:shadow-[0_0_18px_rgba(181,248,0,0.4)]"
          >
            List Your Gym
          </Link>
        </div>
      </div>

      {/* Mobile Location bar */}
      <div className="md:hidden px-4 py-2 bg-[#14171F] border-t border-[#1E2330] flex items-center justify-between">
        <LocationSelector />
        <Link to="/compare" className="text-xs text-[#B5F800] font-semibold flex items-center gap-1">
          <Scale className="w-3.5 h-3.5" />
          <span>Compare ({compareGymIds.length})</span>
        </Link>
      </div>
    </header>
  );
};
