import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle2, Dumbbell, ShieldCheck, Scale, ArrowRight, Zap } from 'lucide-react';
import { Gym } from '../../types/gym';
import { useGymStore } from '../../store/useGymStore';

interface GymCardProps {
  gym: Gym;
  onEnquire?: (gym: Gym) => void;
}

export const GymCard: React.FC<GymCardProps> = ({ gym, onEnquire }) => {
  const { compareGymIds, toggleCompareGym } = useGymStore();
  const isComparing = compareGymIds.includes(gym.id);

  return (
    <div className="group rounded-lg bg-[#14171F] border border-[#272D3D] hover:border-[#B5F800]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1">
      {/* Photo Header with Overlay Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1E2330]">
        <img
          src={gym.heroImage}
          alt={gym.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* removed gradient overlay for cleaner look */}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#0B0D10]/80 backdrop-blur-md text-[11px] font-bold text-[#B5F800] border border-[#B5F800]/30 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{gym.distanceKm} km away</span>
            </span>
            {gym.isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-[#B5F800] text-[#0B0D10] text-[10px] font-extrabold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          {/* Compare Checkbox */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompareGym(gym.id);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isComparing
                ? 'bg-[#B5F800] text-[#0B0D10] font-bold shadow-[0_0_10px_rgba(181,248,0,0.4)]'
                : 'bg-[#0B0D10]/80 backdrop-blur-md text-gray-300 hover:text-white border border-[#272D3D]'
            }`}
          >
            <Scale className="w-3 h-3" />
            <span>{isComparing ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>

        {/* Bottom Photo Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B0D10]/80 backdrop-blur-md text-xs font-bold text-amber-400 border border-amber-400/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{gym.rating}</span>
            <span className="text-gray-400 font-normal">({gym.reviewCount})</span>
          </div>

          {gym.isVerified && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-[#0B0D10]/80 backdrop-blur-md px-2 py-0.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Gym</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link to={`/gyms/${gym.slug}`} className="group-hover:text-[#B5F800] transition-colors">
              <h3 className="text-base font-bold text-white leading-snug line-clamp-1">{gym.name}</h3>
            </Link>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-gray-500" />
            <span>{gym.area}, {gym.city}</span>
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
            {gym.tagline || gym.description}
          </p>

          {/* Key Facility Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {gym.hasPersonalTraining && (
              <span className="px-2 py-0.5 rounded bg-[#1E2330] text-[10px] text-gray-300 font-medium">
                Personal Training
              </span>
            )}
            {gym.hasSteamSauna && (
              <span className="px-2 py-0.5 rounded bg-[#1E2330] text-[10px] text-gray-300 font-medium">
                Steam & Sauna
              </span>
            )}
            {gym.is24x7 && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                24/7 Access
              </span>
            )}
            {gym.facilities.slice(0, 2).map((fac) => (
              <span key={fac.id} className="px-2 py-0.5 rounded bg-[#1E2330] text-[10px] text-gray-400">
                {fac.name.split(' ')[0]} {fac.name.split(' ')[1] || ''}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTAs Footer */}
        <div className="pt-3 border-t border-[#272D3D] flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Starting From</div>
            <div className="text-sm font-extrabold text-white flex items-baseline gap-0.5">
              <span className="text-[#B5F800]">₹{gym.startingPriceMonthly.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 font-normal">/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEnquire && (
              <button
                onClick={() => onEnquire(gym)}
                className="px-3 py-1.5 rounded-lg bg-[#1E2330] hover:bg-[#272D3D] border border-[#272D3D] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Enquire
              </button>
            )}

            <Link
              to={`/gyms/${gym.slug}`}
              className="px-3.5 py-1.5 rounded-lg bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(181,248,0,0.2)]"
            >
              <span>View Gym</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
