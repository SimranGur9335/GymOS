import React from 'react';
import { Dumbbell, Plus, CheckCircle } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberWorkouts: React.FC = () => {
  const { todayWorkout } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Daily Workout Schedule</h1>
            <p className="text-xs text-gray-400">Assigned by Coach Vikram Shinde</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/20">
            Phase 2: Hypertrophy
          </span>
        </div>

        <div className="bg-[#0B0D10] border border-[#272D3D] rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white">{todayWorkout.title}</h2>
            <span className="text-xs text-[#B5F800] font-semibold">{todayWorkout.targetFocus}</span>
          </div>

          <div className="space-y-3">
            {todayWorkout.exercises.map((ex, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#14171F] border border-[#272D3D] flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#B5F800]/10 text-[#B5F800] flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white">{ex.name}</div>
                    <div className="text-gray-400">{ex.sets} sets × {ex.reps}</div>
                  </div>
                </div>
                <span className="font-mono text-[#B5F800] font-bold">{ex.weight || 'Bodyweight'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
