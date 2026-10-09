import React from 'react';
import { Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { MOCK_GYMS } from '../../data/mock/gyms';

export const OwnerProfile: React.FC = () => {
  const gym = MOCK_GYMS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-4 pb-6 border-b border-[#272D3D]">
          <img src={gym.heroImage} alt={gym.name} className="w-20 h-20 rounded-2xl object-cover border border-[#272D3D]" />
          <div>
            <h1 className="text-xl font-bold text-white">{gym.name}</h1>
            <p className="text-xs text-gray-400">📍 {gym.fullAddress}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Verified GymOS Partner
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D] space-y-1">
            <span className="text-gray-500 font-semibold">Contact Phone</span>
            <div className="font-bold text-white">{gym.phone}</div>
          </div>
          <div className="bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D] space-y-1">
            <span className="text-gray-500 font-semibold">Email Desk</span>
            <div className="font-bold text-white">{gym.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
