import React from 'react';
import { Calendar, Clock, CheckCircle, Plus } from 'lucide-react';
import { MOCK_TRAINER_DATA } from '../../data/mock/portals';

export const TrainerSchedule: React.FC = () => {
  const { todaySchedule } = MOCK_TRAINER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Trainer Weekly Schedule</h1>
            <p className="text-xs text-gray-400">Iron Haven Personal Training appointments</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>

        <div className="space-y-3">
          {todaySchedule.map((s) => (
            <div key={s.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{s.clientName}</div>
                <div className="text-gray-400">{s.goal}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-bold text-[#B5F800]">{s.time}</div>
                <span className="text-[10px] text-emerald-400 font-bold">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
