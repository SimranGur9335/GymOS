import React from 'react';
import { User, Mail, Phone, MapPin, ShieldCheck, Dumbbell, Calendar } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberProfile: React.FC = () => {
  const { profile } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-4 pb-6 border-b border-[#272D3D]">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover border border-[#272D3D]" />
          <div>
            <h1 className="text-xl font-bold text-white">{profile.name}</h1>
            <p className="text-xs text-gray-400">GymOS Member ID: #MEM-884920</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/20">
              {profile.membershipStatus} VIP Member
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="space-y-1 bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D]">
            <span className="text-gray-500 font-semibold">Email Address</span>
            <div className="font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#B5F800]" /> {profile.email}
            </div>
          </div>

          <div className="space-y-1 bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D]">
            <span className="text-gray-500 font-semibold">Phone Number</span>
            <div className="font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B5F800]" /> {profile.phone}
            </div>
          </div>

          <div className="space-y-1 bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D]">
            <span className="text-gray-500 font-semibold">Home Gym Facility</span>
            <div className="font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#B5F800]" /> {profile.gymName}
            </div>
          </div>

          <div className="space-y-1 bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D]">
            <span className="text-gray-500 font-semibold">Assigned Personal Trainer</span>
            <div className="font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#B5F800]" /> {profile.assignedTrainer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
