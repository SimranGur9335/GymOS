import React from 'react';
import { Percent, Plus } from 'lucide-react';
import { MOCK_OFFERS } from '../../data/mock/gyms';

export const OwnerOffers: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Promotions & Discount Campaigns</h1>
            <p className="text-xs text-gray-400">Coupon codes visible on GymOS Keshav Nagar discovery page</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Launch Offer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_OFFERS.slice(0, 2).map((off) => (
            <div key={off.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs">
                  {off.discountBadge}
                </span>
                <span className="text-[11px] text-gray-400">{off.validTill}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{off.title}</h3>
              <p className="text-xs text-gray-400">{off.description}</p>
              <div className="text-xs font-mono font-bold text-[#B5F800] pt-1">CODE: {off.code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
