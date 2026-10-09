import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { MOCK_TRAINER_DATA } from '../../data/mock/portals';

export const TrainerProgress: React.FC = () => {
  const { assignedClients } = MOCK_TRAINER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Client Progress Tracker</h1>
            <p className="text-xs text-gray-400">Monthly fat loss and strength gain milestones</p>
          </div>
        </div>

        <div className="space-y-3">
          {assignedClients.map((cli) => (
            <div key={cli.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-white text-sm">{cli.name}</div>
                <div className="text-gray-400">{cli.plan}</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-[#B5F800] text-sm">{cli.progress}</div>
                <div className="text-emerald-400 text-[10px] font-semibold">{cli.attendance} attendance rate</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
