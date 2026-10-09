import React from 'react';
import { Award, Calendar, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberMembership: React.FC = () => {
  const { profile } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Active Gym Membership</h1>
            <p className="text-xs text-gray-400">Managing membership for {profile.gymName}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#B5F800] text-[#0B0D10] font-bold text-xs">
            {profile.membershipStatus}
          </span>
        </div>

        <div className="bg-[#0B0D10] border border-[#272D3D] rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-semibold">Plan Name</span>
            <span className="text-sm font-extrabold text-white">{profile.membershipPlan}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-semibold">Start Date</span>
            <span className="text-xs font-bold text-gray-200">{profile.startDate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-semibold">Expiration Date</span>
            <span className="text-xs font-bold text-[#B5F800]">{profile.endDate}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#272D3D]">
            <span className="text-xs text-gray-400 font-semibold">Days Remaining</span>
            <span className="text-xl font-extrabold text-[#B5F800]">{profile.daysRemaining} Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider text-gray-400">Included Plan Privileges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
            {['Unlimited Strength & Cardio Turf Access', 'Steam Bath Twice per Week', '4 Free Personal Training Sessions', 'Dietitian Consultation & Chart', '45 Days Freeze Privilege', '2 Monthly Guest Passes'].map((priv, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
                <CheckCircle2 className="w-4 h-4 text-[#B5F800]" />
                <span>{priv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
