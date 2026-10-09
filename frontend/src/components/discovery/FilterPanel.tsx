import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';

const AREAS = ['All', 'Keshav Nagar', 'Mundhwa', 'Magarpatta', 'Kharadi'];
const DISTANCES = [1, 2, 3, 5, 10];

export const FilterPanel: React.FC = () => {
  const {
    selectedArea,
    setSelectedArea,
    maxDistanceKm,
    setMaxDistanceKm,
    maxMonthlyPrice,
    setMaxMonthlyPrice,
    minRating,
    setMinRating,
    filter24x7,
    filterParking,
    filterLocker,
    filterPersonalTraining,
    filterGroupClasses,
    filterSteamSauna,
    toggleFilter,
    resetFilters,
  } = useGymStore();

  return (
    <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-6 text-white shadow-xl sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#272D3D]">
        <div className="flex items-center gap-2 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-[#B5F800]" />
          <span>Filter Gyms</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-gray-400 hover:text-[#B5F800] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Area Selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">Locality / Area</label>
        <div className="flex flex-wrap gap-1.5">
          {AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedArea === area
                  ? 'bg-[#B5F800] text-[#0B0D10] font-bold shadow-[0_0_10px_rgba(181,248,0,0.3)]'
                  : 'bg-[#1E2330] text-gray-300 hover:bg-[#272D3D]'
              }`}
            >
              {area === 'Keshav Nagar' ? '📍 Keshav Nagar' : area}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Radius */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-gray-300 mb-2">
          <span>Distance Radius</span>
          <span className="text-[#B5F800] font-bold">Within {maxDistanceKm} km</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {DISTANCES.map((d) => (
            <button
              key={d}
              onClick={() => setMaxDistanceKm(d)}
              className={`py-1.5 rounded-lg text-xs font-medium text-center cursor-pointer transition-all ${
                maxDistanceKm === d
                  ? 'bg-[#1E2330] text-[#B5F800] border border-[#B5F800]/50 font-bold'
                  : 'bg-[#0B0D10] text-gray-400 hover:bg-[#1E2330]'
              }`}
            >
              {d} km
            </button>
          ))}
        </div>
      </div>

      {/* Max Monthly Price */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-gray-300 mb-2">
          <span>Max Monthly Fee</span>
          <span className="text-[#B5F800] font-bold">₹{maxMonthlyPrice.toLocaleString()} / mo</span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="250"
          value={maxMonthlyPrice}
          onChange={(e) => setMaxMonthlyPrice(Number(e.target.value))}
          className="w-full accent-[#B5F800] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>₹1,000</span>
          <span>₹3,000</span>
          <span>₹5,000+</span>
        </div>
      </div>

      {/* Amenities & Features Checklist */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2.5">Features & Amenities</label>
        <div className="space-y-2">
          {[
            { key: 'filter24x7', label: '24/7 Access' },
            { key: 'filterPersonalTraining', label: 'Personal Trainers Available' },
            { key: 'filterSteamSauna', label: 'Steam & Sauna Recovery' },
            { key: 'filterGroupClasses', label: 'Group Classes (Zumba / Yoga)' },
            { key: 'filterParking', label: 'Dedicated Parking Space' },
            { key: 'filterLocker', label: 'Personal Lockers & Shower' },
          ].map((item) => {
            const isChecked = Boolean(
              item.key === 'filter24x7'
                ? filter24x7
                : item.key === 'filterPersonalTraining'
                ? filterPersonalTraining
                : item.key === 'filterSteamSauna'
                ? filterSteamSauna
                : item.key === 'filterGroupClasses'
                ? filterGroupClasses
                : item.key === 'filterParking'
                ? filterParking
                : filterLocker
            );

            return (
              <label
                key={item.key}
                onClick={() =>
                  toggleFilter(
                    item.key as
                      | 'filter24x7'
                      | 'filterParking'
                      | 'filterLocker'
                      | 'filterPersonalTraining'
                      | 'filterGroupClasses'
                      | 'filterSteamSauna'
                  )
                }
                className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-[#1E2330] border-[#B5F800]/40 text-white'
                    : 'bg-[#0B0D10]/50 border-[#272D3D] text-gray-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isChecked ? 'bg-[#B5F800] border-[#B5F800] text-[#0B0D10]' : 'border-gray-600'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
