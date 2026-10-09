import React from 'react';
import { Clock, Calendar, CheckCircle2, QrCode } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberAttendance: React.FC = () => {
  const { attendanceHistory } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Biometric Attendance History</h1>
            <p className="text-xs text-gray-400">Recorded check-ins at Iron Haven Fitness Club</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            <span>Show Biometric Digital Pass</span>
          </button>
        </div>

        <div className="space-y-3">
          {attendanceHistory.map((att) => (
            <div
              key={att.id}
              className="bg-[#0B0D10] border border-[#272D3D] rounded-xl p-4 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">{att.date}</div>
                  <div className="text-[11px] text-gray-400">{att.gymName}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-[#B5F800]">{att.checkInTime} - {att.checkOutTime || 'Active'}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">{att.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
