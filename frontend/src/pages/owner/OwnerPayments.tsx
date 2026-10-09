import React from 'react';
import { CreditCard, Download } from 'lucide-react';
import { MOCK_OWNER_DATA } from '../../data/mock/portals';

export const OwnerPayments: React.FC = () => {
  const { recentMembers } = MOCK_OWNER_DATA;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Revenue & Payment Settlements</h1>
            <p className="text-xs text-gray-400">GymOS verified Razorpay / UPI settlements</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Total Settlement Oct</div>
            <div className="text-lg font-extrabold text-[#B5F800]">₹4,85,000</div>
          </div>
        </div>

        <div className="space-y-3">
          {recentMembers.map((m) => (
            <div key={m.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-white text-sm">{m.name}</div>
                <div className="text-gray-400">{m.plan} • {m.joinedDate}</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-[#B5F800] text-sm">{m.amount}</div>
                <div className="text-emerald-400 font-semibold text-[10px]">Settled to HDFC Bank</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
