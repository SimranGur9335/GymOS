import React, { useState } from 'react';
import { Star, Award, ShieldCheck, MapPin, Search, Calendar, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { MOCK_TRAINERS } from '../../data/mock/gyms';

export const TrainersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [bookedTrainer, setBookedTrainer] = useState<any>(null);

  const specializations = ['All', 'Bodybuilding', 'Powerlifting', 'Fat Loss', 'Crossfit', 'Functional Training'];

  const filteredTrainers = MOCK_TRAINERS.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches = t.name.toLowerCase().includes(q) || t.specialization.some((s) => s.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (selectedSpecialization !== 'All' && !t.specialization.includes(selectedSpecialization)) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Certified Fitness Coaches</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personal Trainers in Keshav Nagar & Pune East
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Work 1-on-1 with certified powerlifting, fat loss, and functional movement specialists.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-7 flex items-center gap-3 px-3.5 py-2.5 bg-[#0B0D10] rounded-xl border border-[#272D3D]">
            <Search className="w-4 h-4 text-[#B5F800]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainer by name or specialization..."
              className="w-full bg-transparent text-xs text-white placeholder-gray-500 outline-none"
            />
          </div>

          <div className="sm:col-span-5 flex items-center gap-1.5 overflow-x-auto">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSpecialization === spec
                    ? 'bg-[#B5F800] text-[#0B0D10]'
                    : 'bg-[#0B0D10] text-gray-300 hover:bg-[#1E2330]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-[#14171F] border border-[#272D3D] hover:border-[#B5F800]/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#272D3D] shadow-md"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{trainer.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-[#0B0D10] px-2 py-0.5 rounded-lg border border-amber-400/20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{trainer.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#B5F800] font-semibold">{trainer.role}</div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{trainer.gymName} ({trainer.experienceYears} yrs exp)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{trainer.bio}</p>

              <div className="space-y-1">
                <div className="text-[10px] uppercase font-semibold text-gray-500">Specializations</div>
                <div className="flex flex-wrap gap-1.5">
                  {trainer.specialization.map((spec) => (
                    <span key={spec} className="px-2.5 py-0.5 rounded-md bg-[#0B0D10] text-[11px] text-gray-300 font-medium border border-[#272D3D]">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setBookedTrainer(trainer)}
              className="w-full py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(181,248,0,0.2)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Personal Session</span>
            </button>
          </div>
        ))}
      </div>

      {/* Trainer Booking Modal */}
      {bookedTrainer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <img src={bookedTrainer.photo} alt={bookedTrainer.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="text-base font-bold text-white">Book Session with {bookedTrainer.name}</h3>
                <p className="text-xs text-gray-400">📍 {bookedTrainer.gymName}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Select Date</label>
                <input
                  type="date"
                  defaultValue="2026-10-06"
                  className="w-full px-3 py-2 bg-[#0B0D10] border border-[#272D3D] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Preferred Time Slot</label>
                <select className="w-full px-3 py-2 bg-[#0B0D10] border border-[#272D3D] rounded-xl text-xs text-white">
                  <option>07:00 AM - 08:00 AM (Morning)</option>
                  <option>08:30 AM - 09:30 AM (Morning)</option>
                  <option>05:30 PM - 06:30 PM (Evening)</option>
                  <option>07:00 PM - 08:00 PM (Evening)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Fitness Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Squat technique, Weight Loss, Muscle gain"
                  className="w-full px-3 py-2 bg-[#0B0D10] border border-[#272D3D] rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setBookedTrainer(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#1E2330] text-xs font-bold text-gray-300 hover:bg-[#272D3D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Session requested with ${bookedTrainer.name}! Coach will contact you on WhatsApp.`);
                  setBookedTrainer(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] text-xs font-extrabold hover:bg-[#a2de00] cursor-pointer"
              >
                Confirm Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
