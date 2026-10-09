import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowRight, ShieldCheck, User, UserCheck, Building2, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuthStore();
  const [email, setEmail] = useState('rohan.sharma@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    const roleRoutes: Record<UserRole, string> = {
      member: '/member',
      trainer: '/trainer',
      owner: '/owner',
      admin: '/admin',
    };
    navigate(roleRoutes[selectedRole]);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    const roleRoutes: Record<UserRole, string> = {
      member: '/member',
      trainer: '/trainer',
      owner: '/owner',
      admin: '/admin',
    };
    navigate(roleRoutes[role]);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#14171F] border border-[#272D3D] rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#B5F800] flex items-center justify-center text-[#0B0D10] font-black">
              <Dumbbell className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              Gym<span className="text-[#B5F800]">OS</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-gray-400">Sign in to your GymOS fitness portal</p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="space-y-2 bg-[#0B0D10] p-3 rounded-2xl border border-[#272D3D]">
          <div className="text-[10px] uppercase font-bold text-[#B5F800] tracking-wider text-center">
            ⚡ Quick Demo Login (1-Click Portal Access)
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('member')}
              className="p-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-white font-semibold flex items-center gap-1.5 cursor-pointer text-left"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Member</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('trainer')}
              className="p-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-white font-semibold flex items-center gap-1.5 cursor-pointer text-left"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trainer</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('owner')}
              className="p-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-white font-semibold flex items-center gap-1.5 cursor-pointer text-left"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Gym Owner</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-white font-semibold flex items-center gap-1.5 cursor-pointer text-left"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Select Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] text-xs text-white outline-none"
            >
              <option value="member">Member Portal</option>
              <option value="trainer">Trainer Portal</option>
              <option value="owner">Gym Owner Portal</option>
              <option value="admin">Platform Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
              <Mail className="w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-[#B5F800] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
              <Lock className="w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(181,248,0,0.3)] cursor-pointer"
          >
            <span>Sign In to GymOS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Don't have a GymOS account?{' '}
          <Link to="/register" className="text-[#B5F800] font-semibold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
