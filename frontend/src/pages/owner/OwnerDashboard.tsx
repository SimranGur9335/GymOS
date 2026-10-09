import React from 'react';
import { Building2, Users, CreditCard, TrendingUp, Clock, Award, Star, ArrowUpRight, ChevronRight, Plus } from 'lucide-react';
import { MOCK_OWNER_DATA } from '../../data/mock/portals';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip } from 'recharts';

export const OwnerDashboard: React.FC = () => {
  const { gymProfile, revenueTrend, membershipDistribution, attendanceTrend, recentMembers, leads } = MOCK_OWNER_DATA;

  const COLORS = ['#B5F800', '#3B82F6', '#10B981'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14171F] via-[#1E2330] to-[#14171F] border border-[#272D3D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/30">
            <Building2 className="w-4 h-4" />
            <span>GymOS Enterprise OS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{gymProfile.name}</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            📍 {gymProfile.locality} • Rating: <strong className="text-amber-400">★ {gymProfile.rating}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('New member onboarding wizard launched')}
            className="px-4 py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#a2de00] cursor-pointer shadow-[0_0_15px_rgba(181,248,0,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Member</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Monthly Revenue</span>
            <CreditCard className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">₹{gymProfile.monthlyRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last month
          </div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Active Members</span>
            <Users className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{gymProfile.activeMembersCount}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+24 new this month</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>New Leads (Keshav Nagar)</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-blue-400">{gymProfile.newLeadsThisMonth}</div>
          <div className="text-[11px] text-gray-400">68% conversion rate</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Renewals Pending</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{gymProfile.renewalsPendingCount}</div>
          <div className="text-[11px] text-amber-400 font-semibold">Action required</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Growth Trend */}
        <div className="lg:col-span-8 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">Monthly Revenue Growth (INR)</h2>
            <span className="text-xs font-bold text-[#B5F800]">Keshav Nagar Branch</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B5F800" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B5F800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#B5F800" strokeWidth={3} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Attendance Trend Bar Chart */}
        <div className="lg:col-span-4 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">Daily Member Traffic</h2>
            <span className="text-xs text-gray-400">Peak: Mon</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend}>
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#B5F800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Members & GymOS Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Members */}
        <div className="lg:col-span-7 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">Recent Member Enrollments</h2>
            <span className="text-xs text-gray-400">Showing last 5</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead>
                <tr className="border-b border-[#272D3D] text-gray-500 font-semibold uppercase text-[10px]">
                  <th className="pb-2">Member</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2">Joined</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272D3D]">
                {recentMembers.map((m) => (
                  <tr key={m.id}>
                    <td className="py-2.5 font-bold text-white">{m.name}</td>
                    <td className="py-2.5 text-gray-400">{m.plan}</td>
                    <td className="py-2.5 text-gray-400">{m.joinedDate}</td>
                    <td className="py-2.5 text-right font-bold text-[#B5F800]">{m.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hot Leads from GymOS Marketplace */}
        <div className="lg:col-span-5 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">GymOS Platform Leads</h2>
            <span className="text-xs text-[#B5F800] font-bold bg-[#B5F800]/10 px-2 py-0.5 rounded">
              3 New
            </span>
          </div>

          <div className="space-y-3">
            {leads.map((ld) => (
              <div key={ld.id} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{ld.name}</span>
                  <span className="text-xs font-bold text-[#B5F800] bg-[#B5F800]/10 px-2 py-0.5 rounded">
                    {ld.status}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Interest: {ld.interest}</span>
                  <span>{ld.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
