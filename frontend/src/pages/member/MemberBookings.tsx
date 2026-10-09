import React from 'react';
import { Calendar, UserCheck, Clock, CheckCircle } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberBookings: React.FC = () => {
  const { bookings } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Personal Trainer Session Bookings</h1>
            <p className="text-xs text-gray-400">1-on-1 coaching appointments</p>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.map((bk) => (
            <div key={bk.id} className="p-4 rounded-2xl bg-[#0B0D10] border border-[#272D3D] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={bk.trainerPhoto} alt={bk.trainerName} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-white text-sm">{bk.sessionType}</div>
                  <div className="text-xs text-gray-400">Coach: {bk.trainerName}</div>
                  <div className="text-xs text-[#B5F800] font-semibold mt-0.5">
                    {bk.date} ({bk.timeSlot})
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">
                {bk.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
