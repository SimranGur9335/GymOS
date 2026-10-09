import React from 'react';
import { ShieldCheck, Building2, Users, CreditCard, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { MOCK_ADMIN_DATA } from '../../data/mock/portals';

export const AdminDashboard: React.FC = () => {
  const { stats, pendingGyms, platformReports } = MOCK_ADMIN_DATA;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14171F] via-[#1E2330] to-[#14171F] border border-[#272D3D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>GymOS Platform Super Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">System Control Center</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Primary Operating Region: <strong>Pune (Keshav Nagar & Surrounds)</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            ● All Services Operational
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Total Gyms Registered</span>
            <Building2 className="w-4 h-4 text-[#B5F800]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalGyms}</div>
          <div className="text-[11px] text-[#B5F800] font-semibold">{stats.verifiedGyms} Verified Facilities</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Verification Queue</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{stats.pendingVerification} Gyms</div>
          <div className="text-[11px] text-amber-400 font-semibold">Action required</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Total Platform Members</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalMembers.toLocaleString()}</div>
          <div className="text-[11px] text-gray-400">Across Pune hubs</div>
        </div>

        <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Platform Revenue Tracked</span>
            <CreditCard className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">₹1.85 Cr</div>
          <div className="text-[11px] text-emerald-400 font-semibold">YTD Volume</div>
        </div>
      </div>

      {/* Main Grid: Pending Gym Verification Queue & City Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pending Verification Queue */}
        <div className="lg:col-span-7 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Pending Gym Verification Queue</span>
            </h2>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
              {pendingGyms.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingGyms.map((g) => (
              <div key={g.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-white text-sm">{g.name}</div>
                  <span className="text-gray-400">{g.submittedDate}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>📍 {g.location} (Owner: {g.ownerName})</span>
                  <span className="text-[#B5F800] font-semibold">{g.documentStatus}</span>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#1E2330]">
                  <button
                    onClick={() => alert(`Verified ${g.name}!`)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-bold cursor-pointer"
                  >
                    Approve & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Rollout Metrics */}
        <div className="lg:col-span-5 bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#272D3D]">
            <h2 className="text-base font-bold text-white">City Rollout Distribution</h2>
          </div>

          <div className="space-y-3">
            {stats.cityDistribution.map((dist, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
                <span className="font-bold text-white">{dist.city}</span>
                <span className="font-extrabold text-[#B5F800]">{dist.count} Gyms</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
