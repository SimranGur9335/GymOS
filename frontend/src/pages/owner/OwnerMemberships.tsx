import React from 'react';
import { Award, Plus, Edit, Trash2 } from 'lucide-react';
import { MOCK_GYMS } from '../../data/mock/gyms';

export const OwnerMemberships: React.FC = () => {
  const plans = MOCK_GYMS[0].plans;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Membership Plan Configurator</h1>
            <p className="text-xs text-gray-400">Configure public pass prices & features shown on GymOS discovery</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{p.name}</h3>
                <div className="text-xl font-extrabold text-[#B5F800] mt-1">₹{p.price.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-2 space-y-1">
                  {p.features.map((f, i) => (
                    <div key={i}>• {f}</div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-1.5 rounded-lg bg-[#1E2330] hover:bg-[#272D3D] text-xs font-semibold text-white">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
