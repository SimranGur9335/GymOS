import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { MOCK_GYMS } from '../../data/mock/gyms';
import { Gym } from '../../types/gym';

export const MembershipPage: React.FC = () => {
  const [selectedBilling, setSelectedBilling] = useState<'annual' | 'quarterly'>('annual');
  const [enquiryGym, setEnquiryGym] = useState<Gym | null>(MOCK_GYMS[0]);

  const globalPlans = [
    {
      title: 'Monthly Pass',
      price: '₹2,200',
      period: 'per month',
      badge: 'Flexible Routine',
      description: 'Ideal for travelers, short-term fitness goals, or testing out local Keshav Nagar gyms.',
      features: [
        'Access to selected Keshav Nagar gym',
        'Standard strength & cardio zones',
        'Personal locker during workout',
        'General trainer assistance',
      ],
      popular: false,
      cta: 'Explore Monthly Gyms',
    },
    {
      title: 'Quarterly Pass (3 Months)',
      price: '₹5,999',
      period: 'for 3 months',
      savings: 'Save ₹1,000',
      badge: 'Popular Transformation',
      description: 'Great for structured 90-day weight loss or hypertrophy transformation programs.',
      features: [
        'Full access to gym facilities',
        '2 Free Personal Trainer orientation sessions',
        'InBody body composition report',
        'Steam bath access twice per week',
        'Freeze membership up to 14 days',
      ],
      popular: true,
      cta: 'Get 3-Month Membership',
    },
    {
      title: 'Annual VIP Pass (12 Months)',
      price: '₹15,999',
      period: 'per year (₹1,333/mo)',
      savings: 'Save up to 40%',
      badge: 'Best Long-term Value',
      description: 'Unlimited 365-day access with maximum savings, free PT sessions, and guest privileges.',
      features: [
        'Unlimited gym & functional turf access',
        '4 Free 1-on-1 Personal Trainer sessions',
        'Unlimited steam & sauna bath recovery',
        'Custom Dietitian consultation & chart',
        'Freeze membership up to 45 days',
        '2 Free monthly guest passes for friends',
      ],
      popular: false,
      cta: 'Get Annual VIP Pass',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#14171F] border border-[#272D3D] text-xs font-bold text-[#B5F800]">
          <Zap className="w-4 h-4" />
          <span>Transparent Local Membership Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible Gym Memberships Around <span className="text-[#B5F800]">Keshav Nagar</span>
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          No hidden admission fees. Zero lock-in contracts. Join top-rated local fitness centers with verified pricing guarantees.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {globalPlans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 space-y-6 flex flex-col justify-between border relative transition-all duration-300 ${
              plan.popular
                ? 'bg-[#14171F] border-[#B5F800] shadow-[0_0_30px_rgba(181,248,0,0.15)] scale-105'
                : 'bg-[#14171F]/60 border-[#272D3D]'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs uppercase tracking-wider shadow-lg">
                ★ {plan.badge}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  <div className="text-xs text-gray-400 mt-1">{plan.description}</div>
                </div>
              </div>

              <div className="py-2 border-y border-[#272D3D]">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {plan.price} <span className="text-xs text-gray-400 font-normal">{plan.period}</span>
                </div>
                {plan.savings && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    {plan.savings}
                  </span>
                )}
              </div>

              <ul className="space-y-3 pt-2 text-xs text-gray-300">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#B5F800] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setEnquiryGym(MOCK_GYMS[0])}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-[#B5F800] text-[#0B0D10] hover:bg-[#a2de00]'
                  : 'bg-[#1E2330] hover:bg-[#272D3D] text-white border border-[#272D3D]'
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#B5F800]" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
          <div className="space-y-1">
            <h4 className="font-bold text-white">Can I freeze my membership if I travel?</h4>
            <p className="text-gray-400">Yes! Annual VIP plans allow up to 45 days of membership pause with zero penalty.</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white">Are there additional admission or registration fees?</h4>
            <p className="text-gray-400">No. All prices listed on GymOS are final all-inclusive fees for Keshav Nagar partner gyms.</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white">Is personal training included in standard plans?</h4>
            <p className="text-gray-400">General trainer floor guidance is included. Dedicated 1-on-1 personal training packages are available as add-ons.</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white">Can I transfer my membership to another local gym?</h4>
            <p className="text-gray-400">GymOS supports seamless multi-gym pass transfers across participating Keshav Nagar and Mundhwa partners.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EnquiryModal gym={enquiryGym} onClose={() => setEnquiryGym(null)} />
    </div>
  );
};
