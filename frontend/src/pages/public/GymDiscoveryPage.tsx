import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Map as MapIcon, Grid, SlidersHorizontal, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { GymCard } from '../../components/gym/GymCard';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { MapView } from '../../components/discovery/MapView';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { Gym } from '../../types/gym';

export const GymDiscoveryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const areaFromUrl = searchParams.get('area') || '';

  const {
    gyms,
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    maxDistanceKm,
    maxMonthlyPrice,
    minRating,
    filter24x7,
    filterParking,
    filterLocker,
    filterPersonalTraining,
    filterGroupClasses,
    filterSteamSauna,
    resetFilters,
  } = useGymStore();

  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price_low' | 'price_high'>('distance');
  const [enquiryGym, setEnquiryGym] = useState<Gym | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initial URL query params if provided
  React.useEffect(() => {
    if (queryFromUrl) setSearchQuery(queryFromUrl);
    if (areaFromUrl) setSelectedArea(areaFromUrl);
  }, [queryFromUrl, areaFromUrl]);

  // Filtered Gyms Logic
  const filteredGyms = useMemo(() => {
    return gyms
      .filter((gym) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            gym.name.toLowerCase().includes(q) ||
            gym.area.toLowerCase().includes(q) ||
            gym.description.toLowerCase().includes(q) ||
            gym.facilities.some((f) => f.name.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Area filter
        if (selectedArea !== 'All' && gym.area !== selectedArea) {
          return false;
        }

        // Distance filter
        if (gym.distanceKm > maxDistanceKm) {
          return false;
        }

        // Price filter
        if (gym.startingPriceMonthly > maxMonthlyPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && gym.rating < minRating) {
          return false;
        }

        // Feature flags
        if (filter24x7 && !gym.is24x7) return false;
        if (filterParking && !gym.hasParking) return false;
        if (filterLocker && !gym.hasLocker) return false;
        if (filterPersonalTraining && !gym.hasPersonalTraining) return false;
        if (filterGroupClasses && !gym.hasGroupClasses) return false;
        if (filterSteamSauna && !gym.hasSteamSauna) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') return a.startingPriceMonthly - b.startingPriceMonthly;
        if (sortBy === 'price_high') return b.startingPriceMonthly - a.startingPriceMonthly;
        return 0;
      });
  }, [
    gyms,
    searchQuery,
    selectedArea,
    maxDistanceKm,
    maxMonthlyPrice,
    minRating,
    filter24x7,
    filterParking,
    filterLocker,
    filterPersonalTraining,
    filterGroupClasses,
    filterSteamSauna,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Search Bar Bar */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Gym Discovery <span className="text-[#B5F800]">Keshav Nagar</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Showing verified gyms near <strong>Keshav Nagar, Mundhwa, Magarpatta & Kharadi</strong>.
            </p>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 bg-[#0B0D10] p-1 rounded-xl border border-[#272D3D]">
            <button
              onClick={() => setViewMode('split')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'split' ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid Only</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'map' ? 'bg-[#B5F800] text-[#0B0D10]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map Only</span>
            </button>
          </div>
        </div>

        {/* Search Input + Sort Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-7 flex items-center gap-3 px-3.5 py-2.5 bg-[#0B0D10] rounded-xl border border-[#272D3D]">
            <Search className="w-4 h-4 text-[#B5F800]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by gym name, amenity or facility (e.g. Steam, Rogue Racks)..."
              className="w-full bg-transparent text-xs text-white placeholder-gray-500 outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2.5 bg-[#0B0D10] rounded-xl border border-[#272D3D] text-xs text-white">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400 font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-transparent text-xs text-[#B5F800] font-bold outline-none cursor-pointer"
            >
              <option value="distance">Distance (Nearest First)</option>
              <option value="rating">Rating (Highest First)</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="sm:col-span-2 lg:hidden py-2.5 px-4 rounded-xl bg-[#1E2330] border border-[#272D3D] text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B5F800]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Filter Panel Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <FilterPanel />
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex justify-between items-center bg-[#14171F] p-3 rounded-xl border border-[#272D3D]">
                <span className="text-sm font-bold text-white">Discovery Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-xs font-bold text-[#B5F800] px-3 py-1 bg-[#1E2330] rounded-lg"
                >
                  Done
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Results View Area */}
        <div
          className={`${
            viewMode === 'map' ? 'lg:col-span-12' : viewMode === 'grid' ? 'lg:col-span-9' : 'lg:col-span-9'
          } space-y-6`}
        >
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>
              Found <strong className="text-white">{filteredGyms.length} gyms</strong> matching your search
            </span>
            {selectedArea !== 'All' && (
              <span className="bg-[#B5F800]/10 text-[#B5F800] px-2.5 py-0.5 rounded-full font-bold">
                Filtered by {selectedArea}
              </span>
            )}
          </div>

          {/* EMPTY STATE */}
          {filteredGyms.length === 0 ? (
            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No gyms found matching your criteria.</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Try expanding your search radius to 5 km or resetting your price & facility filters to see all Keshav Nagar area options.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'map' ? (
            /* Map Only View */
            <MapView gyms={filteredGyms} />
          ) : viewMode === 'split' ? (
            /* Split Screen View: Grid on left, Map sticky on right */
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} onEnquire={(g) => setEnquiryGym(g)} />
                ))}
              </div>

              <div className="hidden xl:block xl:col-span-5 sticky top-20">
                <MapView gyms={filteredGyms} />
              </div>
            </div>
          ) : (
            /* Grid Only View */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} onEnquire={(g) => setEnquiryGym(g)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal gym={enquiryGym} onClose={() => setEnquiryGym(null)} />
    </div>
  );
};
