import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Check, X, Star, MapPin, Plus, Trash2, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { Gym } from '../../types/gym';

export const ComparePage: React.FC = () => {
  const { gyms, compareGymIds, toggleCompareGym, clearCompareGyms } = useGymStore();
  const [enquiryGym, setEnquiryGym] = useState<Gym | null>(null);

  const selectedGyms = gyms.filter((g) => compareGymIds.includes(g.id));
  const availableGyms = gyms.filter((g) => !compareGymIds.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Gym Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Compare Gyms in Keshav Nagar
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Compare features, pricing, trainers, steam recovery, and facilities across local Pune fitness centers.
          </p>
        </div>

        {compareGymIds.length > 0 && (
          <button
            onClick={clearCompareGyms}
            className="px-4 py-2 rounded-xl bg-[#1E2330] hover:bg-red-500/20 hover:text-red-400 text-xs font-semibold text-gray-300 border border-[#272D3D] transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {selectedGyms.length === 0 ? (
        /* Empty State */
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#B5F800]/10 text-[#B5F800] flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No gyms selected for comparison yet.</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Select up to 3 gyms from the discovery list to compare monthly fees, equipment, personal training, and facilities side-by-side.
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-gray-300 mb-3">Quick Add Popular Gyms:</h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {gyms.slice(0, 3).map((g) => (
                <button
                  key={g.id}
                  onClick={() => toggleCompareGym(g.id)}
                  className="px-3.5 py-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] border border-[#272D3D] text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B5F800]" />
                  <span>{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Comparison Table Matrix */
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#272D3D] bg-[#0B0D10]">
                <th className="p-4 w-1/4 text-xs font-bold uppercase tracking-wider text-gray-400">Gym Feature</th>
                {selectedGyms.map((gym) => (
                  <th key={gym.id} className="p-4 text-center border-l border-[#272D3D] relative">
                    <button
                      onClick={() => toggleCompareGym(gym.id)}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={gym.heroImage}
                      alt={gym.name}
                      className="w-full h-28 object-cover rounded-xl mb-3 border border-[#272D3D]"
                    />
                    <div className="text-sm font-bold text-white line-clamp-1">{gym.name}</div>
                    <div className="text-[11px] text-gray-400">📍 {gym.area} ({gym.distanceKm} km)</div>
                  </th>
                ))}
                {selectedGyms.length < 3 && (
                  <th className="p-4 text-center border-l border-[#272D3D] bg-[#14171F]/50">
                    <div className="p-6 border-2 border-dashed border-[#272D3D] rounded-xl flex flex-col items-center justify-center space-y-2">
                      <Plus className="w-6 h-6 text-gray-500" />
                      <span className="text-xs font-bold text-gray-400">Add Gym to Compare</span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) toggleCompareGym(e.target.value);
                        }}
                        className="mt-2 text-xs bg-[#1E2330] text-white p-2 rounded-lg border border-[#272D3D]"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a Gym...</option>
                        {availableGyms.map((ag) => (
                          <option key={ag.id} value={ag.id}>
                            {ag.name} ({ag.area})
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#272D3D] text-xs text-gray-300">
              {/* Monthly Fee */}
              <tr className="bg-[#14171F]">
                <td className="p-4 font-bold text-white">Monthly Fee (Starting)</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center font-extrabold text-[#B5F800] text-base border-l border-[#272D3D]">
                    ₹{g.startingPriceMonthly.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Annual Fee */}
              <tr>
                <td className="p-4 font-bold text-white">Annual VIP Pass</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center font-bold text-white border-l border-[#272D3D]">
                    ₹{g.yearlyPrice.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="bg-[#14171F]">
                <td className="p-4 font-bold text-white">Rating & Reviews</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{g.rating}</span>
                      <span className="text-gray-500 font-normal">({g.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Verified Status */}
              <tr>
                <td className="p-4 font-bold text-white">Verified Status</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    {g.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-gray-500">Standard</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* 24/7 Access */}
              <tr className="bg-[#14171F]">
                <td className="p-4 font-bold text-white">24/7 Keycard Access</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    {g.is24x7 ? (
                      <Check className="w-5 h-5 text-[#B5F800] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Steam & Sauna */}
              <tr>
                <td className="p-4 font-bold text-white">Steam & Sauna Bath</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    {g.hasSteamSauna ? (
                      <Check className="w-5 h-5 text-[#B5F800] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Personal Trainers */}
              <tr className="bg-[#14171F]">
                <td className="p-4 font-bold text-white">Certified Personal Training</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    {g.hasPersonalTraining ? (
                      <Check className="w-5 h-5 text-[#B5F800] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Group Classes */}
              <tr>
                <td className="p-4 font-bold text-white">Group Classes (Zumba/Yoga)</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    {g.hasGroupClasses ? (
                      <Check className="w-5 h-5 text-[#B5F800] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr className="bg-[#0B0D10]">
                <td className="p-4 font-bold text-white">Action</td>
                {selectedGyms.map((g) => (
                  <td key={g.id} className="p-4 text-center border-l border-[#272D3D]">
                    <div className="space-y-2">
                      <button
                        onClick={() => setEnquiryGym(g)}
                        className="w-full py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors cursor-pointer"
                      >
                        Enquire Now
                      </button>
                      <Link
                        to={`/gyms/${g.slug}`}
                        className="w-full py-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-white font-bold text-xs block transition-colors"
                      >
                        View Full Details
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal gym={enquiryGym} onClose={() => setEnquiryGym(null)} />
    </div>
  );
};
