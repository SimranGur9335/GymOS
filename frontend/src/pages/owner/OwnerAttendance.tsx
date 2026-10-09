import React from 'react';
import { Clock, QrCode, CheckCircle2 } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const OwnerAttendance: React.FC = () => {
  const { attendanceHistory } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Biometric Gate Check-In Stream</h1>
            <p className="text-xs text-gray-400">Live RFID & fingerprint gate access logs for Keshav Nagar branch</p>
          </div>
          <span className="text-xs font-bold text-[#B5F800] bg-[#B5F800]/10 px-3 py-1 rounded-full border border-[#B5F800]/30">
            Live Stream Connected
          </span>
        </div>

        <div className="space-y-3">
          {attendanceHistory.map((a) => (
            <div key={a.id} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Rohan Sharma (VIP Pass)</div>
                  <div className="text-[11px] text-gray-400">Check-in at {a.checkInTime} • Biometric Sensor #01</div>
                </div>
              </div>
              <span className="text-emerald-400 font-bold">{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
