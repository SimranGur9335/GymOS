import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';

export const TrainerWorkouts: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Custom Workout Templates</h1>
            <p className="text-xs text-gray-400">Reusable workout plans for clients</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-2">
            <h3 className="text-sm font-bold text-white">12-Week Powerlifting Peak</h3>
            <p className="text-xs text-gray-400">Squat, Bench, Deadlift periodization for advanced lifters.</p>
            <div className="text-[11px] text-[#B5F800] font-bold pt-1">Used by 4 clients</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-2">
            <h3 className="text-sm font-bold text-white">Fat Loss HIIT & Mobility</h3>
            <p className="text-xs text-gray-400">Metabolic conditioning turf circuits + calorie deficit.</p>
            <div className="text-[11px] text-[#B5F800] font-bold pt-1">Used by 6 clients</div>
          </div>
        </div>
      </div>
    </div>
  );
};
