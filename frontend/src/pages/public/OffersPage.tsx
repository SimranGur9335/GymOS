import React, { useState } from 'react';
import { Percent, MapPin, Tag, Copy, Check, Clock, ArrowRight } from 'lucide-react';
import { MOCK_OFFERS, MOCK_GYMS } from '../../data/mock/gyms';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { Gym } from '../../types/gym';

export const OffersPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [enquiryGym, setEnquiryGym] = useState<Gym | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B5F800] uppercase tracking-wider mb-1">
          <Percent className="w-4 h-4" />
          <span>Keshav Nagar Gym Deals</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Active Gym Offers & Discounts
        </h1>
        <p className="text-xs text-gray-400">
          Exclusive local gym coupons, annual pass discounts, and student deals in Keshav Nagar, Mundhwa, and Magarpatta.
        </p>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_OFFERS.map((offer) => {
          const gym = MOCK_GYMS.find((g) => g.name === offer.gymName) || MOCK_GYMS[0];
          return (
            <div
              key={offer.id}
              className="bg-[#14171F] border border-[#272D3D] hover:border-[#B5F800]/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs">
                    {offer.discountBadge}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B5F800]" />
                    <span>{offer.validTill}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{offer.description}</p>

                <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-[#B5F800]" />
                  <span>{offer.gymName} ({offer.area})</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#272D3D]">
                <div className="flex items-center justify-between bg-[#0B0D10] p-2.5 rounded-xl border border-[#272D3D]">
                  <span className="text-xs text-gray-400 font-medium">Coupon Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#B5F800] tracking-wider">{offer.code}</span>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="p-1 rounded bg-[#1E2330] hover:bg-[#272D3D] text-gray-300 cursor-pointer"
                    >
                      {copiedCode === offer.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setEnquiryGym(gym)}
                  className="w-full py-2.5 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(181,248,0,0.2)]"
                >
                  <span>Claim Offer & Enquire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EnquiryModal gym={enquiryGym} onClose={() => setEnquiryGym(null)} />
    </div>
  );
};
