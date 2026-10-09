import React, { useState } from 'react';
import { MapPin, Check, ChevronDown, Navigation } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';

const PUNE_LOCALITIES = [
  { locality: 'Keshav Nagar', isPrimary: true, note: 'Primary Launch Market' },
  { locality: 'Mundhwa', isPrimary: false, note: '0.5 - 2 km' },
  { locality: 'Magarpatta', isPrimary: false, note: '2 - 3.5 km' },
  { locality: 'Kharadi', isPrimary: false, note: '2.5 - 4 km' },
  { locality: 'Hadapsar', isPrimary: false, note: '3 - 5 km' },
  { locality: 'Viman Nagar', isPrimary: false, note: '4 - 6 km' },
];

export const LocationSelector: React.FC = () => {
  const { selectedLocation, setLocation, setSelectedArea } = useGymStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (locality: string) => {
    setLocation({
      ...selectedLocation,
      locality,
    });
    setSelectedArea(locality === 'Keshav Nagar' ? 'All' : locality);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14171F] hover:bg-[#1E2330] border border-[#272D3D] text-xs font-medium text-gray-200 transition-all cursor-pointer"
      >
        <MapPin className="w-3.5 h-3.5 text-[#B5F800]" />
        <span>
          <strong className="text-white">{selectedLocation.locality}</strong>, {selectedLocation.city}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#14171F] border border-[#272D3D] shadow-2xl z-50 p-3">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#272D3D]">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Location (Pune)</span>
              <span className="text-[10px] bg-[#B5F800]/10 text-[#B5F800] px-2 py-0.5 rounded-full font-bold">Pune Region</span>
            </div>

            <button
              onClick={() => handleSelect('Keshav Nagar')}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#1E2330] border border-[#B5F800]/30 text-left mb-2 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#B5F800] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold text-white">📍 Keshav Nagar (Default)</div>
                  <div className="text-[10px] text-gray-400">Launch location</div>
                </div>
              </div>
              {selectedLocation.locality === 'Keshav Nagar' && <Check className="w-4 h-4 text-[#B5F800]" />}
            </button>

            <div className="space-y-1">
              <div className="text-[11px] font-medium text-gray-400 px-2 py-1">Nearby Pune Hubs</div>
              {PUNE_LOCALITIES.filter(l => !l.isPrimary).map((loc) => (
                <button
                  key={loc.locality}
                  onClick={() => handleSelect(loc.locality)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                    selectedLocation.locality === loc.locality
                      ? 'bg-[#1E2330] text-[#B5F800] font-semibold'
                      : 'text-gray-300 hover:bg-[#1A1E29]'
                  }`}
                >
                  <span>{loc.locality}</span>
                  <span className="text-[10px] text-gray-500">{loc.note}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
