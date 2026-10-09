import React, { useState } from 'react';
import { Users, Calendar, Award, Star, CheckCircle, Clock, Dumbbell, TrendingUp } from 'lucide-react';
import { MOCK_TRAINER_DATA } from '../../data/mock/portals';

export const TrainerDashboard: React.FC = () => {
  const { profile, todaySchedule, assignedClients } = MOCK_TRAINER_DATA;
  const [schedule, setSchedule] = useState(todaySchedule);

  const toggleSession = (id: string) => {
    setSchedule(
      schedule.map((s) => (s.id === id ? { ...s, status: s.status === 'Completed' ? 'Upcoming' : 'Completed' } : s))
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14171F] via-[#1E2330] to-[#14171F] border border-[#272D3D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border border-[#272D3D]" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#B5F800] bg-[#B5F800]/10 px-2.5 py-0.5 rounded-full border border-[#B5F800]/30">
              Trainer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">{profile.name}</h1>
            <p className="text-xs text-gray-300">{profile.title} • {profile.gymName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0B0D10] border border-[#272D3D] p-3 rounded-2xl text-center min-w-[90px]">
            <div className="text-lg font-extrabold text-[#B5F800]">{profile.assignedClientsCount}</div>
            <div className="text-[10px] text-gray-400">Clients</div>
          </div>
          <div className="bg-[#0B0D10] border border-[#272D3D] p-3 rounded-2xl text-center min-w-[90px]">
            <div className="text-lg font-extrabold text-white">{profile.completedSessionsThisMonth}</div>
            <div className="text-[10px] text-gray-400">Sessions</div>
          </div>
          <div className="bg-[#0B0D10] border border-[#272D3D] p-3 rounded-2xl text-center min-w-[90px]">
            <div className="text-lg font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-current" /> {profile.averageRating}
            </div>
            <div className="text-[10px] text-gray-400">Rating</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Assigned Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Today's Schedule */}
        <div className="lg:col-span-7 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#B5F800]" />
              <span>Today's Coaching Schedule</span>
            </h2>
            <span className="text-xs text-gray-400">{schedule.filter((s) => s.status === 'Completed').length} / {schedule.length} Completed</span>
          </div>

          <div className="space-y-3">
            {schedule.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleSession(s.id)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  s.status === 'Completed'
                    ? 'bg-[#1E2330] border-[#B5F800]/30 text-gray-400'
                    : 'bg-[#0B0D10] border-[#272D3D] text-white hover:border-[#B5F800]'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white">{s.clientName}</div>
                  <div className="text-xs text-gray-400">{s.goal}</div>
                  <div className="text-xs text-[#B5F800] font-semibold mt-1">{s.time}</div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Roster Overview */}
        <div className="lg:col-span-5 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B5F800]" />
              <span>Client Progress Roster</span>
            </h2>
          </div>

          <div className="space-y-3">
            {assignedClients.map((cli) => (
              <div key={cli.id} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{cli.name}</span>
                  <span className="text-[#B5F800] font-bold">{cli.progress}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Plan: {cli.plan}</span>
                  <span>Attendance: {cli.attendance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
