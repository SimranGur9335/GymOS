import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { MOCK_OWNER_DATA } from '../../data/mock/portals';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const OwnerAnalytics: React.FC = () => {
  const { revenueTrend, attendanceTrend } = MOCK_OWNER_DATA;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Gym Analytics & Intelligence</h1>
            <p className="text-xs text-gray-400">Iron Haven Fitness Club revenue & retention metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0B0D10] border border-[#272D3D] p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white">Revenue Growth Trend</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
                  <YAxis stroke="#6B7280" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#B5F800" fill="#B5F800" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0B0D10] border border-[#272D3D] p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white">Daily Traffic Volume</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrend}>
                  <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
                  <YAxis stroke="#6B7280" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="#B5F800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
