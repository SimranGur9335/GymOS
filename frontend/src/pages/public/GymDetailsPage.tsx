import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Dumbbell, Clock, Phone, Mail, Share2, Heart, Scale, Check, ChevronRight, Award, MessageSquare, Play, Video, Users, Sparkles } from 'lucide-react';
import { useGymStore } from '../../store/useGymStore';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { Gym } from '../../types/gym';

export const GymDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { gyms, toggleCompareGym, compareGymIds } = useGymStore();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'facilities' | 'trainers' | 'reviews'>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gym = gyms.find((g) => g.slug === slug) || gyms[0];
  const isComparing = compareGymIds.includes(gym.id);

  return (
    <div className="pb-20 space-y-8">
      {/* Photo Gallery Header */}
      <div className="bg-[#14171F] border-b border-[#272D3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Hero Main Photo */}
            <div
              className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#1E2330] cursor-pointer group"
              onClick={() => setSelectedImage(gym.heroImage)}
            >
              <img
                src={gym.heroImage}
                alt={gym.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-[#0B0D10]/80 backdrop-blur-md text-xs font-bold text-[#B5F800] border border-[#B5F800]/30">
                  📍 {gym.distanceKm} km from Keshav Nagar center
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0B0D10]/80 backdrop-blur-md text-xs font-bold text-gray-200">
                  {gym.photos.length} Photos
                </span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {gym.photos.slice(1, 5).map((photo, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[#1E2330] cursor-pointer group"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img
                    src={photo}
                    alt={`${gym.name} facility ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title & Quick Actions Header */}
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/30">
                  📍 {gym.area}, {gym.city}
                </span>
                {gym.isVerified && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Gym</span>
                  </span>
                )}
                {gym.is24x7 && (
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/30">
                    24/7 Access
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{gym.name}</h1>
              <p className="text-sm text-gray-300 max-w-2xl">{gym.tagline}</p>

              <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{gym.rating}</span>
                  <span className="text-gray-400 font-normal">({gym.reviewCount} verified reviews)</span>
                </span>
                <span>•</span>
                <span>{gym.fullAddress}</span>
              </div>
            </div>

            {/* Price & Primary Action Box */}
            <div className="bg-[#0B0D10] border border-[#272D3D] p-5 rounded-2xl flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 flex-shrink-0">
              <div>
                <div className="text-[11px] uppercase font-semibold text-gray-400 tracking-wider">Starting Price</div>
                <div className="text-2xl font-extrabold text-white flex items-baseline gap-1">
                  <span className="text-[#B5F800]">₹{gym.startingPriceMonthly.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 font-normal">/month</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => toggleCompareGym(gym.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isComparing
                      ? 'bg-[#B5F800] text-[#0B0D10]'
                      : 'bg-[#1E2330] hover:bg-[#272D3D] text-white border border-[#272D3D]'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isComparing ? 'In Compare' : 'Compare'}</span>
                </button>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs sm:text-sm hover:bg-[#a2de00] transition-all shadow-[0_0_15px_rgba(181,248,0,0.3)] cursor-pointer whitespace-nowrap"
                >
                  Get Membership
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-[#272D3D] pt-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'plans', label: `Membership Plans (${gym.plans.length})` },
              { id: 'facilities', label: `Facilities (${gym.facilities.length})` },
              { id: 'trainers', label: `Trainers (${gym.trainers.length})` },
              { id: 'reviews', label: `Reviews (${gym.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#B5F800] text-[#0B0D10]'
                    : 'bg-[#0B0D10] text-gray-400 hover:text-white hover:bg-[#1E2330]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* OVERVIEW SECTION */}
            {(activeTab === 'overview' || activeTab === 'facilities') && (
              <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">About {gym.name}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">{gym.description}</p>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400">
                    Gym Amenities & Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {gym.amenities.map((am) => (
                      <div
                        key={am}
                        className="flex items-center gap-2 p-3 rounded-xl bg-[#0B0D10] border border-[#272D3D] text-xs font-semibold text-gray-200"
                      >
                        <Check className="w-4 h-4 text-[#B5F800] flex-shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MEMBERSHIP PLANS SECTION */}
            {(activeTab === 'overview' || activeTab === 'plans') && (
              <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Membership Plans</h2>
                    <p className="text-xs text-gray-400">Choose the pass duration that fits your routine.</p>
                  </div>
                  <span className="text-xs text-[#B5F800] font-bold bg-[#B5F800]/10 px-3 py-1 rounded-full border border-[#B5F800]/20">
                    ⚡ Guaranteed Keshav Nagar Rates
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {gym.plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`rounded-2xl p-5 space-y-4 flex flex-col justify-between border relative ${
                        plan.popular
                          ? 'bg-[#1E2330] border-[#B5F800] shadow-[0_0_20px_rgba(181,248,0,0.15)]'
                          : 'bg-[#0B0D10] border-[#272D3D]'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#B5F800] text-[#0B0D10] font-extrabold text-[10px] uppercase tracking-wider">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white">{plan.name}</h3>
                        <div className="text-2xl font-extrabold text-white">
                          ₹{plan.price.toLocaleString()}
                          {plan.originalPrice && (
                            <span className="text-xs text-gray-500 line-through font-normal ml-2">
                              ₹{plan.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {plan.savingsBadge && (
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                            {plan.savingsBadge}
                          </span>
                        )}

                        <ul className="space-y-2 pt-3 text-xs text-gray-300">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#B5F800]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setEnquiryModalOpen(true)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          plan.popular
                            ? 'bg-[#B5F800] text-[#0B0D10] hover:bg-[#a2de00]'
                            : 'bg-[#1E2330] text-white hover:bg-[#272D3D] border border-[#272D3D]'
                        }`}
                      >
                        Select Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFIED TRAINERS SECTION */}
            {(activeTab === 'overview' || activeTab === 'trainers') && (
              <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Certified Personal Trainers</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gym.trainers.map((t) => (
                    <div key={t.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-2xl p-4 flex gap-4">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-20 h-20 rounded-xl object-cover border border-[#272D3D]"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">{t.name}</h3>
                          <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> {t.rating}
                          </span>
                        </div>
                        <div className="text-xs text-[#B5F800] font-semibold">{t.role}</div>
                        <p className="text-[11px] text-gray-400 line-clamp-2">{t.bio}</p>
                        <div className="text-[10px] text-gray-500 font-medium">
                          Specializations: {t.specialization.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VERIFIED MEMBER REVIEWS SECTION */}
            {(activeTab === 'overview' || activeTab === 'reviews') && (
              <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Member Reviews</h2>
                  <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
                    <Star className="w-4 h-4 fill-current" /> {gym.rating} / 5.0
                  </div>
                </div>

                <div className="space-y-4">
                  {gym.reviews.map((rev) => (
                    <div key={rev.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{rev.userName}</span>
                          {rev.tag && (
                            <span className="px-2 py-0.5 rounded bg-[#1E2330] text-[10px] text-gray-400 font-medium">
                              {rev.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Info */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            {/* Opening Hours Card */}
            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-[#272D3D]">
                <Clock className="w-4 h-4 text-[#B5F800]" />
                <span>Gym Opening Hours</span>
              </div>

              <div className="space-y-2">
                {gym.openingHours.map((oh, i) => (
                  <div key={i} className="flex justify-between items-center text-xs text-gray-300">
                    <span className="font-semibold">{oh.day}</span>
                    <span className="text-[#B5F800] font-mono font-bold">
                      {oh.is24Hours ? '24 Hours Open' : `${oh.open} - ${oh.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact & Directions */}
            <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-4 text-xs text-gray-300">
              <h3 className="font-bold text-white text-sm pb-2 border-b border-[#272D3D]">Direct Gym Desk</h3>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B5F800]" />
                <span>{gym.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B5F800]" />
                <span>{gym.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B5F800] flex-shrink-0 mt-0.5" />
                <span>{gym.fullAddress}</span>
              </div>

              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors cursor-pointer mt-2"
              >
                Send Direct Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Expanded preview" className="max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14171F]/95 backdrop-blur-md border-t border-[#272D3D] p-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-gray-400">Starting From</div>
          <div className="text-sm font-extrabold text-[#B5F800]">₹{gym.startingPriceMonthly}/mo</div>
        </div>
        <button
          onClick={() => setEnquiryModalOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs shadow-[0_0_12px_rgba(181,248,0,0.3)] cursor-pointer"
        >
          Get Membership Pass
        </button>
      </div>

      {/* Membership Enquiry Modal */}
      <EnquiryModal gym={gym} onClose={() => setEnquiryModalOpen(false)} />
    </div>
  );
};
