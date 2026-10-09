import React from 'react';
import { CreditCard, Download, CheckCircle2 } from 'lucide-react';
import { MOCK_MEMBER_DATA } from '../../data/mock/portals';

export const MemberPayments: React.FC = () => {
  const { payments } = MOCK_MEMBER_DATA;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Payment History & Invoices</h1>
            <p className="text-xs text-gray-400">GymOS verified transactions for Iron Haven Fitness Club</p>
          </div>
        </div>

        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] flex justify-between items-center text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{p.description}</div>
                <div className="text-gray-400">{p.gymName} • Paid via {p.paymentMethod} on {p.date}</div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-extrabold text-[#B5F800] text-sm">₹{p.amount.toLocaleString()}</div>
                <button
                  onClick={() => alert(`Downloading GST Invoice #${p.id}`)}
                  className="px-2.5 py-1 rounded bg-[#1E2330] hover:bg-[#272D3D] text-[11px] font-semibold text-gray-300 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#B5F800]" />
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
