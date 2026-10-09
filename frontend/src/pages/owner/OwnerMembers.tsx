import React from 'react';
import { Users, Search, Plus, Phone, Award } from 'lucide-react';
import { MOCK_OWNER_DATA } from '../../data/mock/portals';

export const OwnerMembers: React.FC = () => {
  const { recentMembers } = MOCK_OWNER_DATA;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Member Directory Management</h1>
            <p className="text-xs text-gray-400">Total active registered members at Iron Haven Keshav Nagar</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300 min-w-[600px]">
            <thead>
              <tr className="border-b border-[#272D3D] text-gray-500 font-bold uppercase text-[10px]">
                <th className="p-3">Member Name</th>
                <th className="p-3">Subscription Plan</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Contact</th>
                <th className="p-3 text-right">Fee Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272D3D]">
              {recentMembers.map((m) => (
                <tr key={m.id} className="hover:bg-[#1E2330]/50 transition-colors">
                  <td className="p-3 font-bold text-white">{m.name}</td>
                  <td className="p-3 text-[#B5F800] font-semibold">{m.plan}</td>
                  <td className="p-3 text-gray-400">{m.joinedDate}</td>
                  <td className="p-3 text-gray-400">{m.phone}</td>
                  <td className="p-3 text-right font-extrabold text-white">{m.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
