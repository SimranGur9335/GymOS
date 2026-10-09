import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';

export const CompareFloatingBar: React.FC = () => {
  const { compareGymIds, gyms, toggleCompareGym, clearCompareGyms } = useGymStore();

  if (compareGymIds.length === 0) return null;

  const selectedGyms = gyms.filter((g) => compareGymIds.includes(g.id));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-5">
      <div className="bg-[#14171F]/95 backdrop-blur-md border border-[#B5F800]/40 rounded-2xl shadow-2xl p-3 sm:p-4 flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B5F800] whitespace-nowrap">
            <Scale className="w-4 h-4" />
            <span>Comparing ({compareGymIds.length}/3):</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedGyms.map((gym) => (
              <div
                key={gym.id}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#1E2330] border border-[#272D3D] text-xs font-medium whitespace-nowrap"
              >
                <span>{gym.name}</span>
                <button
                  onClick={() => toggleCompareGym(gym.id)}
                  className="text-gray-400 hover:text-red-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCompareGyms}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 cursor-pointer"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(181,248,0,0.3)] whitespace-nowrap"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
