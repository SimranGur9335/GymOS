import React, { useState } from 'react';
import { X, CheckCircle, Send, Dumbbell, MapPin, Phone, Calendar } from 'lucide-react';
import { Gym } from '../../types/gym';

interface EnquiryModalProps {
  gym: Gym | null;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ gym, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [planInterest, setPlanInterest] = useState('Annual VIP Plan');
  const [preferredTime, setPreferredTime] = useState('Morning (6 AM - 10 AM)');

  // Accessibility: trap focus when modal opens and close on Escape
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!gym) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
      <div className="relative w-full max-w-lg bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1E2330] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#272D3D]">
              <div className="w-10 h-10 rounded-xl bg-[#B5F800]/10 border border-[#B5F800]/30 flex items-center justify-center text-[#B5F800]">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 id="enquiry-modal-title" className="text-base font-bold text-white">Membership Enquiry</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B5F800]" />
                  <span>{gym.name} ({gym.area}, Pune)</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Deshmukh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] focus:border-[#B5F800] text-xs text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98234 56789"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] focus:border-[#B5F800] text-xs text-white outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Interested Plan</label>
                  <select
                    value={planInterest}
                    onChange={(e) => setPlanInterest(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] text-xs text-white outline-none"
                  >
                    <option value="Annual VIP Plan">Annual VIP Plan</option>
                    <option value="Half-Yearly Plan">Half-Yearly Plan</option>
                    <option value="Quarterly Pass">Quarterly Pass</option>
                    <option value="Monthly Trial">Monthly Trial</option>
                    <option value="Personal Training">Personal Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Preferred Time</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D] text-xs text-white outline-none"
                  >
                    <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                    <option value="Afternoon (11 AM - 4 PM)">Afternoon (11 AM - 4 PM)</option>
                    <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                    <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1E2330] border border-[#272D3D] text-[11px] text-gray-400">
                💡 <strong className="text-gray-200">GymOS Instant Connect:</strong> Your details will be sent directly to {gym.name} desk for special Keshav Nagar pricing & free trial day pass.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(181,248,0,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Membership Enquiry</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#B5F800]/20 text-[#B5F800] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Enquiry Sent Successfully!</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Thank you {name}. The manager at <strong>{gym.name}</strong> will contact you shortly on {phone} with Keshav Nagar member offer details.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#1E2330] text-white font-semibold text-xs hover:bg-[#272D3D] cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
