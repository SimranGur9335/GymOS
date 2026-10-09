import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowRight, User, Phone, Mail, Lock, Building2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [role, setRole] = useState<UserRole>('member');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
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
          <h2 className="text-xl font-bold text-white">Create GymOS Account</h2>
          <p className="text-xs text-gray-400">Join the Keshav Nagar fitness ecosystem</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('member')}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  role === 'member'
                    ? 'bg-[#B5F800] text-[#0B0D10] border-[#B5F800]'
                    : 'bg-[#0B0D10] text-gray-400 border-[#272D3D]'
                }`}
              >
                Fitness Member
              </button>
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  role === 'owner'
                    ? 'bg-[#B5F800] text-[#0B0D10] border-[#B5F800]'
                    : 'bg-[#0B0D10] text-gray-400 border-[#272D3D]'
                }`}
              >
                Gym Owner
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
              <User className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                placeholder="Rohan Deshmukh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
              <Mail className="w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="rohan@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Phone (WhatsApp)</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
              <Phone className="w-4 h-4 text-gray-500" />
              <input
                type="tel"
                required
                placeholder="+91 98234 56789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(181,248,0,0.3)]"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-[#B5F800] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
