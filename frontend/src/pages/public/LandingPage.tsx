import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, Dumbbell, Star, CheckCircle2, Zap, Scale, Award, Users, ChevronRight, Activity, Percent } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { GymCard } from '../../components/gym/GymCard';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { Gym } from '../../types/gym';
import { MOCK_TRAINERS, MOCK_OFFERS } from '../../data/mock/gyms';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { gyms, searchQuery, setSearchQuery, selectedLocation } = useGymStore();
  const [enquiryGym, setEnquiryGym] = useState<Gym | null>(null);

  const featuredGyms = gyms.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/discover${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* HERO SECTION - Premium Editorial Split Layout */}
      <section className="relative pt-8 lg:pt-14 overflow-hidden">
        {/* Background Subtle Gradient Highlights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B5F800]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14171F] border border-[#272D3D] text-xs font-semibold text-[#B5F800]">
                <MapPin className="w-4 h-4 text-[#B5F800]" />
                <span>
                  Initial Launch Location: <strong className="text-white">Keshav Nagar, Pune</strong>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5F800] animate-ping ml-1" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Find the gym that <span className="text-[#B5F800] underline decoration-[#B5F800]/40 decoration-4 underline-offset-8">fits you.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed font-normal">
                Discover gyms, compare memberships, explore facilities and find the right place to train around <strong>Keshav Nagar, Pune</strong>.
              </p>

              {/* Main Search Bar Box */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-[#14171F] border border-[#272D3D] p-2 sm:p-2.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl"
              >
                <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-[#0B0D10] rounded-xl border border-[#1E2330]">
                  <Search className="w-4 h-4 text-[#B5F800] flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gyms, fitness studios or trainers in Keshav Nagar..."
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs sm:text-sm hover:bg-[#a2de00] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(181,248,0,0.3)] cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Gyms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Area Filter Pills */}
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1 flex-wrap">
                <span className="font-semibold text-gray-300">Popular hubs:</span>
                {['Keshav Nagar', 'Mundhwa', 'Magarpatta', 'Kharadi'].map((area) => (
                  <button
                    key={area}
                    onClick={() => navigate(`/discover?area=${encodeURIComponent(area)}`)}
                    className="px-2.5 py-1 rounded-lg bg-[#14171F] hover:bg-[#1E2330] border border-[#272D3D] text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    📍 {area}
                  </button>
                ))}
              </div>

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1E2330] max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">48+</div>
                  <div className="text-[11px] text-gray-400 font-medium">Local Pune Gyms</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#B5F800]">100%</div>
                  <div className="text-[11px] text-gray-400 font-medium">Verified Pricing</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">12,400+</div>
                  <div className="text-[11px] text-gray-400 font-medium">Active Members</div>
                </div>
              </div>
            </div>

            {/* Right Photography Split */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#272D3D] shadow-2xl group aspect-[4/5] bg-[#14171F]">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                  alt="GymOS Keshav Nagar Fitness Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-black/20" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#14171F]/90 backdrop-blur-md border border-[#B5F800]/40 shadow-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B5F800] bg-[#B5F800]/10 px-2 py-0.5 rounded-full">
                      Spotlight Listing
                    </span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> 4.8 (248 reviews)
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">Iron Haven Fitness Club</div>
                  <div className="text-xs text-gray-300 flex items-center justify-between">
                    <span>📍 Main Road, Keshav Nagar (0.8 km)</span>
                    <strong className="text-[#B5F800]">₹2,200/mo</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 - POPULAR GYMS AROUND KESHAV NAGAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>Local Market Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Popular Gyms Around Keshav Nagar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Top verified fitness centers, powerlifting facilities, and 24/7 studios in Keshav Nagar, Mundhwa & Magarpatta.
            </p>
          </div>

          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14171F] hover:bg-[#1E2330] border border-[#272D3D] text-xs font-bold text-white transition-colors"
          >
            <span>View All 48 Gyms</span>
            <ChevronRight className="w-4 h-4 text-[#B5F800]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} onEnquire={(g) => setEnquiryGym(g)} />
          ))}
        </div>
      </section>

      {/* SECTION 3 - COMPARE BEFORE YOU COMMIT */}
      <section className="bg-[#0E1117] border-y border-[#1E2330] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14171F] border border-[#272D3D] text-xs font-bold text-[#B5F800]">
              <Scale className="w-4 h-4" />
              <span>Transparent Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Compare before you commit.
            </h2>
            <p className="text-sm text-gray-400">
              No hidden fees, no surprise admission charges. Compare monthly pricing, equipment quality, personal trainer ratios, steam access, and parking facilities side by side.
            </p>
          </div>

          {/* Quick Comparison Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3 hover:border-[#B5F800]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B5F800]/10 text-[#B5F800] flex items-center justify-center font-bold">
                ₹
              </div>
              <h3 className="text-base font-bold text-white">Full Pricing Breakdown</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Compare monthly, quarterly, half-yearly and annual pass savings across gyms near Keshav Nagar without talking to pushy salespeople.
              </p>
            </div>

            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3 hover:border-[#B5F800]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B5F800]/10 text-[#B5F800] flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Equipment & Facility Matrix</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Filter by squat rack availability, turf sprint zones, spin rooms, 24/7 keycard entry, or steam and sauna recovery setups.
              </p>
            </div>

            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3 hover:border-[#B5F800]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B5F800]/10 text-[#B5F800] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Verified Member Reviews</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Read authentic ratings from local Keshav Nagar & Mundhwa gym goers regarding hygiene, crowd levels, and trainer quality.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-sm hover:bg-[#a2de00] transition-all shadow-[0_0_18px_rgba(181,248,0,0.3)]"
            >
              <span>Launch Gym Comparator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 - LOCAL OFFERS & PROMOTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#1E2330] pb-4">
          <div>
            <div className="text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Percent className="w-4 h-4" />
              <span>Exclusive Keshav Nagar Deals</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Active Local Gym Offers</h2>
          </div>
          <Link to="/offers" className="text-xs font-bold text-[#B5F800] hover:underline flex items-center gap-1">
            <span>View All Offers ({MOCK_OFFERS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <div key={offer.id} className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs">
                  {offer.discountBadge}
                </span>
                <span className="text-[11px] text-gray-400">{offer.validTill}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#B5F800] transition-colors">{offer.title}</h3>
              <p className="text-xs text-gray-400">{offer.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-[#1E2330]">
                <span className="text-gray-300 font-semibold">📍 {offer.gymName}</span>
                <span className="px-2 py-0.5 rounded bg-[#0B0D10] text-[#B5F800] font-mono font-bold border border-[#272D3D]">
                  {offer.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - FEATURED TRAINERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#1E2330] pb-4">
          <div>
            <div className="text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-1">
              Certified Coaches
            </div>
            <h2 className="text-2xl font-extrabold text-white">Top Trainers Near Keshav Nagar</h2>
          </div>
          <Link to="/trainers" className="text-xs font-bold text-[#B5F800] hover:underline flex items-center gap-1">
            <span>Explore All Coaches</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TRAINERS.slice(0, 4).map((trainer) => (
            <div key={trainer.id} className="bg-[#14171F] border border-[#272D3D] rounded-2xl overflow-hidden space-y-3 p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1E2330]">
                  <img src={trainer.photo} alt={trainer.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-[#0B0D10]/80 text-amber-400 font-bold text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {trainer.rating}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{trainer.name}</h3>
                  <div className="text-xs text-[#B5F800] font-medium">{trainer.role}</div>
                  <div className="text-[11px] text-gray-400">📍 {trainer.gymName} ({trainer.experienceYears} yrs exp)</div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {trainer.specialization.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 rounded bg-[#1E2330] text-[10px] text-gray-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/trainers`}
                className="w-full py-2 rounded-xl bg-[#1E2330] hover:bg-[#272D3D] text-xs font-bold text-white text-center block transition-colors"
              >
                Book Personal Session
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 - FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#14171F] via-[#1E2330] to-[#14171F] border border-[#B5F800]/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#B5F800] text-[#0B0D10] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(181,248,0,0.4)]">
            <Dumbbell className="w-8 h-8 fill-current" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your next workout starts here.
            </h2>
            <p className="text-sm text-gray-300">
              Join thousands of members across Keshav Nagar, Mundhwa, and Magarpatta discovering local gyms with GymOS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/discover"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-sm hover:bg-[#a2de00] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(181,248,0,0.3)]"
            >
              <span>Find a Gym Nearby</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/owner"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1E2330] text-white font-bold text-sm hover:bg-[#272D3D] border border-[#272D3D] transition-colors"
            >
              List Your Gym Free
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal gym={enquiryGym} onClose={() => setEnquiryGym(null)} />
    </div>
  );
};
