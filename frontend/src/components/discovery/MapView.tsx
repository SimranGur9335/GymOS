import React, { useState } from 'react';
import { MapPin, Navigation, Star, ShieldCheck, ArrowRight, Layers, Compass } from 'lucide-react';
import { Gym } from '../../types/gym';
import { Link } from 'react-router-dom';

interface MapViewProps {
  gyms: Gym[];
}

export const MapView: React.FC<MapViewProps> = ({ gyms }) => {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(gyms[0] || null);
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');

  // Simulated coordinate positions on mock map canvas (percentage offsets)
  const pinPositions: Record<string, { top: string; left: string }> = {
    'gym-1': { top: '38%', left: '42%' }, // Iron Haven (Keshav Nagar Center)
    'gym-2': { top: '32%', left: '56%' }, // Pulse 24/7 (Keshav Nagar Lonkar)
    'gym-3': { top: '65%', left: '30%' }, // Nitro Arena (Mundhwa Road)
    'gym-4': { top: '78%', left: '22%' }, // Cult.fit (Magarpatta)
    'gym-5': { top: '20%', left: '68%' }, // Gold's Gym (Kharadi)
    'gym-6': { top: '48%', left: '46%' }, // Bodyline (Keshav Nagar School)
  };

  return (
    <div className="relative w-full h-[600px] lg:h-[720px] rounded-2xl overflow-hidden bg-[#0A0C0F] border border-[#272D3D] shadow-2xl flex flex-col">
      {/* Map Control Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-[#14171F]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#272D3D] flex items-center gap-2.5 text-xs text-white shadow-xl">
          <Navigation className="w-4 h-4 text-[#B5F800] animate-pulse" />
          <span>
            Map Center: <strong className="text-white">Keshav Nagar, Pune</strong>
          </span>
          <span className="text-[10px] bg-[#B5F800]/10 text-[#B5F800] px-2 py-0.5 rounded-full font-bold">
            {gyms.length} Gyms
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-[#14171F]/90 backdrop-blur-md p-1 rounded-xl border border-[#272D3D]">
          <button
            onClick={() => setMapStyle('dark')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              mapStyle === 'dark' ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Vector Dark
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              mapStyle === 'satellite' ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0D1017]">
        {/* Vector Grid Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            mapStyle === 'dark'
              ? 'bg-[radial-[#1E2330]_1px,transparent_1px] [background-size:24px_24px] opacity-70'
              : 'bg-[radial-[#272D3D]_2px,transparent_2px] [background-size:32px_32px] opacity-90'
          }`}
        />

        {/* Mock Pune Roads & River Lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30 stroke-[#272D3D]" strokeWidth="2">
          {/* Mula Mutha River */}
          <path d="M 0,220 Q 300,180 600,280 T 1200,220" fill="none" stroke="#1E3A8A" strokeWidth="18" opacity="0.6" />
          {/* Keshav Nagar Main Road */}
          <path d="M 200,0 L 500,400 L 900,600" fill="none" stroke="#3B4359" strokeWidth="5" />
          {/* Mundhwa Kharadi Road */}
          <path d="M 100,500 L 600,200 L 1100,100" fill="none" stroke="#3B4359" strokeWidth="4" />
          {/* Magarpatta Bypass */}
          <path d="M 0,600 L 400,500 L 800,450" fill="none" stroke="#3B4359" strokeWidth="4" />
        </svg>

        {/* Area Label Markers */}
        <div className="absolute top-[35%] left-[40%] text-[11px] font-extrabold uppercase tracking-widest text-[#B5F800]/40 pointer-events-none">
          📍 Keshav Nagar
        </div>
        <div className="absolute top-[60%] left-[25%] text-[10px] font-bold uppercase tracking-wider text-gray-600 pointer-events-none">
          Mundhwa
        </div>
        <div className="absolute top-[75%] left-[18%] text-[10px] font-bold uppercase tracking-wider text-gray-600 pointer-events-none">
          Magarpatta City
        </div>
        <div className="absolute top-[15%] left-[62%] text-[10px] font-bold uppercase tracking-wider text-gray-600 pointer-events-none">
          Kharadi Bypass
        </div>

        {/* Gym Pin Markers */}
        {gyms.map((gym) => {
          const pos = pinPositions[gym.id] || { top: '50%', left: '50%' };
          const isSelected = selectedGym?.id === gym.id;

          return (
            <div
              key={gym.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
              onClick={() => setSelectedGym(gym)}
            >
              {/* Pulse Ring if selected */}
              {isSelected && (
                <div className="absolute -inset-3 rounded-full bg-[#B5F800]/30 animate-ping pointer-events-none" />
              )}

              {/* Marker Button */}
              <div
                className={`relative px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all shadow-2xl ${
                  isSelected
                    ? 'bg-[#B5F800] text-[#0B0D10] border-white font-extrabold scale-110 z-40'
                    : 'bg-[#14171F] text-white border-[#272D3D] hover:border-[#B5F800] font-bold'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0B0D10]' : 'text-[#B5F800]'}`} />
                <span className="text-xs whitespace-nowrap">{gym.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-80">₹{gym.startingPriceMonthly}</span>
              </div>
            </div>
          );
        })}

        {/* Selected Gym Card Tooltip Overlay */}
        {selectedGym && (
          <div className="absolute bottom-4 left-4 right-4 z-40 max-w-sm bg-[#14171F]/95 backdrop-blur-md border border-[#B5F800]/50 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-3">
            <div className="flex gap-3">
              <img
                src={selectedGym.heroImage}
                alt={selectedGym.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#272D3D]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-sm font-bold text-white truncate">{selectedGym.name}</h4>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{selectedGym.rating}</span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 mb-1">
                  📍 {selectedGym.area} ({selectedGym.distanceKm} km away)
                </div>

                <div className="text-xs font-extrabold text-[#B5F800] mb-2">
                  ₹{selectedGym.startingPriceMonthly.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">/month starting</span>
                </div>

                <Link
                  to={`/gyms/${selectedGym.slug}`}
                  className="w-full py-1.5 rounded-lg bg-[#B5F800] text-[#0B0D10] text-xs font-bold hover:bg-[#a2de00] transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
