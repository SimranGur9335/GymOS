import React from 'react';
import { Dumbbell, Plus, Star } from 'lucide-react';
import { MOCK_GYMS } from '../../data/mock/gyms';

export const OwnerTrainers: React.FC = () => {
  const trainers = MOCK_GYMS[0].trainers;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Staff Trainers & Coaches</h1>
            <p className="text-xs text-gray-400">Iron Haven certified personal trainers</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Trainer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-2xl p-4 flex gap-4">
              <img src={t.photo} alt={t.name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h3 className="text-sm font-bold text-white">{t.name}</h3>
                <div className="text-xs text-[#B5F800]">{t.role}</div>
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {t.rating} ({t.experienceYears} yrs exp)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
