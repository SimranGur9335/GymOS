import React from 'react';
import { TrendingUp, Phone, Mail, MessageSquare } from 'lucide-react';
import { MOCK_OWNER_DATA } from '../../data/mock/portals';

export const OwnerLeads: React.FC = () => {
  const { leads } = MOCK_OWNER_DATA;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">GymOS Lead Management Engine</h1>
            <p className="text-xs text-gray-400">Direct membership enquiries from Keshav Nagar marketplace</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#B5F800]/10 text-[#B5F800] text-xs font-bold border border-[#B5F800]/30">
            {leads.length} Active Leads
          </span>
        </div>

        <div className="space-y-4">
          {leads.map((ld) => (
            <div key={ld.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-sm">{ld.name}</div>
                <div className="text-xs text-gray-400">Interested in: <strong className="text-white">{ld.interest}</strong></div>
                <div className="text-[11px] text-gray-500">Source: {ld.source} • {ld.date}</div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${ld.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-[#1E2330] hover:bg-[#272D3D] text-xs font-bold text-white flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B5F800]" />
                  <span>Call {ld.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
