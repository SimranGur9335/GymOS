import React, { useState } from 'react';
import { TrendingUp, Plus, Activity } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const MemberProgress: React.FC = () => {
  const { progressLogs } = MOCK_MEMBER_DATA;
  const [logs, setLogs] = useState(progressLogs);
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    const newEntry = {
      id: `pr-${Date.now()}`,
      date: 'Today',
      weightKg: parseFloat(newWeight),
      notes: newNotes || 'Self log',
    };
    setLogs([...logs, newEntry]);
    setNewWeight('');
    setNewNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Body Transformation Tracking</h1>
            <p className="text-xs text-gray-400">Monthly weigh-in and muscle mass progression</p>
          </div>
          <span className="text-xs text-[#B5F800] font-bold bg-[#B5F800]/10 px-3 py-1 rounded-full border border-[#B5F800]/20">
            Total Loss: 6.7 kg Fat
          </span>
        </div>

        {/* Chart */}
        <div className="h-64 w-full bg-[#0B0D10] p-4 rounded-2xl border border-[#272D3D]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={logs}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B5F800" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#B5F800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#6B7280" fontSize={11} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#6B7280" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#272D3D', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="weightKg" stroke="#B5F800" strokeWidth={3} fill="url(#progressGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Add Entry Form */}
        <form onSubmit={handleAddLog} className="bg-[#0B0D10] p-4 rounded-xl border border-[#272D3D] space-y-3">
          <h3 className="text-xs font-bold text-white">Log Today's Weight Entry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="number"
              step="0.1"
              placeholder="Weight (kg) e.g. 75.4"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="px-3 py-2 bg-[#14171F] border border-[#272D3D] rounded-xl text-xs text-white outline-none"
            />
            <input
              type="text"
              placeholder="Notes e.g. Morning empty stomach"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="px-3 py-2 bg-[#14171F] border border-[#272D3D] rounded-xl text-xs text-white outline-none"
            />
            <button
              type="submit"
              className="py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] cursor-pointer"
            >
              Add Entry
            </button>
          </div>
        </form>

        {/* Log History */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Log History</h3>
          {logs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-white">{log.date}</div>
                <div className="text-gray-400">{log.notes}</div>
              </div>
              <div className="text-sm font-extrabold text-[#B5F800]">{log.weightKg} kg</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
