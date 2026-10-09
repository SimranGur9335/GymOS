import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { MOCK_GYMS } from '../../data/mock/gyms';

export const OwnerReviews: React.FC = () => {
  const reviews = MOCK_GYMS[0].reviews;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#272D3D]">
          <div>
            <h1 className="text-xl font-bold text-white">Public Reviews & Reputation</h1>
            <p className="text-xs text-gray-400">Iron Haven Fitness Club ratings on GymOS Keshav Nagar</p>
          </div>
          <div className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" /> 4.8 Rating (248 reviews)
          </div>
        </div>

        <div className="space-y-3">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#272D3D] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{rev.userName}</span>
                <span className="text-gray-500">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-gray-300">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
