import React from 'react';
import { Users, TrendingUp, Calendar, Dumbbell } from 'lucide-react';
import { MOCK_TRAINER_DATA } from '../../data/mock/portals';

export const TrainerMembers: React.FC = () => {
  const { assignedClients } = MOCK_TRAINER_DATA;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Assigned Personal Clients</h1>
            <p className="text-xs text-gray-400">Iron Haven Fitness Club 1-on-1 trainees</p>
          </div>
          <span className="text-xs text-[#B5F800] font-bold bg-[#B5F800]/10 px-3 py-1 rounded-full border border-[#B5F800]/20">
            {assignedClients.length} Active Clients
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assignedClients.map((cli) => (
            <div key={cli.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-white">{cli.name}</h3>
                  <div className="text-xs text-[#B5F800] font-medium">{cli.plan}</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {cli.attendance} Att.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#14171F] border border-[#272D3D] text-xs">
                <span className="text-gray-400">Transformation Progress: </span>
                <strong className="text-white">{cli.progress}</strong>
              </div>

              <div className="flex justify-between text-[11px] text-gray-400 pt-1">
                <span>Last Session: {cli.lastSession}</span>
                <button
                  onClick={() => alert(`Opening workout plan editor for ${cli.name}`)}
                  className="text-[#B5F800] hover:underline font-bold"
                >
                  Edit Routine →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
