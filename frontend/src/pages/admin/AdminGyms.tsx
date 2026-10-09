import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { MOCK_GYMS } from '../../data/mock/gyms';

export const AdminGyms: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Platform Gym Registry</h1>
            <p className="text-xs text-gray-400">All registered facilities across Pune and initial launch zones</p>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_GYMS.map((g) => (
            <div key={g.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-white text-sm">{g.name}</div>
                <div className="text-gray-400">📍 {g.area}, {g.city} • Rating: ★ {g.rating}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold">Verified Partner</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
