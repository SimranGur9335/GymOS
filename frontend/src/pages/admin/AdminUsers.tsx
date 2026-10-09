import React from 'react';
import { Users, ShieldCheck } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Platform User Accounts</h1>
            <p className="text-xs text-gray-400">Managing 12,450 members, gym owners, and certified trainers</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Rohan Sharma', role: 'Member', location: 'Keshav Nagar, Pune', email: 'rohan.sharma@gmail.com' },
            { name: 'Vikram Shinde', role: 'Trainer', location: 'Keshav Nagar, Pune', email: 'vikram.shinde@ironhaven.in' },
            { name: 'Rajesh Shinde', role: 'Owner', location: 'Keshav Nagar, Pune', email: 'owner@ironhaven.in' },
          ].map((u, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-white text-sm">{u.name}</div>
                <div className="text-gray-400">{u.email} • {u.location}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#1E2330] text-[#B5F800] font-bold capitalize">{u.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
