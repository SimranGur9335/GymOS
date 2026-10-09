import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Calendar, Award, Flame, TrendingUp, CheckCircle, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const MemberDashboard: React.FC = () => {
  const { profile, stats, todayWorkout, progressLogs, attendanceHistory, bookings } = MOCK_MEMBER_DATA;
  const [exercises, setExercises] = useState(todayWorkout.exercises);

  const toggleExercise = (index: number) => {
    const updated = [...exercises];
    updated[index].completed = !updated[index].completed;
    setExercises(updated);
  };

  const completedCount = exercises.filter((e) => e.completed).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#14171F] via-[#1E2330] to-[#14171F] border border-[#272D3D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/30">
            <span>Active Member</span>
            <span className="w-2 h-2 rounded-full bg-[#B5F800] animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {profile.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Current Club: <strong>{profile.gymName}</strong> ({profile.locality})
          </p>
        </div>

        {/* Membership Status Badge */}
        <div className="bg-[#0B0D10] border border-[#272D3D] p-4 rounded-2xl flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#B5F800] text-[#0B0D10] font-black flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold">{profile.membershipPlan}</div>
            <div className="text-lg font-extrabold text-[#B5F800]">{profile.daysRemaining} Days Left</div>
            <div className="text-[10px] text-gray-500">Expires {profile.endDate}</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Total Workouts</span>
            <Dumbbell className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalWorkouts}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+6 this week</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Monthly Check-Ins</span>
            <Clock className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.monthlyCheckIns} Days</div>
          <div className="text-[11px] text-gray-400">Target: 22 days/mo</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{stats.streakDays} Days 🔥</div>
          <div className="text-[11px] text-gray-400">Personal best: 9 days</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Calories Burned</span>
            <TrendingUp className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.caloriesBurned.toLocaleString()} kcal</div>
          <div className="text-[11px] text-emerald-400 font-semibold">On track for fat loss</div>
        </div>
      </div>

      {/* Main Grid: Workout Plan & Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Today's Workout Tracker */}
        <div className="lg:col-span-7 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#272D3D]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#B5F800] tracking-wider">
                {todayWorkout.day} Routine
              </span>
              <h2 className="text-lg font-bold text-white">{todayWorkout.title}</h2>
            </div>
            <div className="text-xs font-bold text-[#B5F800] bg-[#0B0D10] px-3 py-1.5 rounded-xl border border-[#272D3D]">
              {completedCount} / {exercises.length} Done
            </div>
          </div>

          <div className="space-y-3">
            {exercises.map((ex, idx) => (
              <div
                key={idx}
                onClick={() => toggleExercise(idx)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  ex.completed
                    ? 'bg-[#1E2330] border-[#B5F800]/40 text-gray-400'
                    : 'bg-[#0B0D10] border-[#272D3D] text-white hover:border-[#B5F800]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                      ex.completed ? 'bg-[#B5F800] border-[#B5F800] text-[#0B0D10]' : 'border-gray-600'
                    }`}
                  >
                    {ex.completed && <CheckCircle className="w-4 h-4 fill-current text-[#0B0D10]" />}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${ex.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                      {ex.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {ex.sets} sets × {ex.reps} {ex.weight && `(${ex.weight})`}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold text-[#B5F800]">
                  {ex.completed ? 'Completed' : 'Mark Done'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weight & Body Fat Progress Chart */}
        <div className="lg:col-span-5 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">Weight Transformation Log</h2>
            <span className="text-xs text-emerald-400 font-bold">-6.7 kg lost</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressLogs}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B5F800" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B5F800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6B7280" fontSize={10} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#6B7280" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="weightKg" stroke="#B5F800" strokeWidth={3} fillOpacity={1} fill="url(#weightGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming PT Booking Widget */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Next Trainer Session</h3>
            {bookings.slice(0, 1).map((bk) => (
              <div key={bk.id} className="bg-[#0B0D10] border border-[#272D3D] rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={bk.trainerPhoto} alt={bk.trainerName} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{bk.sessionType}</div>
                    <div className="text-[11px] text-gray-400">Coach {bk.trainerName} • {bk.date}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#B5F800]/10 text-[#B5F800] px-2 py-1 rounded-lg font-bold border border-[#B5F800]/20">
                  {bk.timeSlot.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
