import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#14171F] border border-[#272D3D] rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#B5F800] flex items-center justify-center text-[#0B0D10] font-black">
              <Dumbbell className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              Gym<span className="text-[#B5F800]">OS</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400">Enter your registered email to receive reset instructions</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#272D3D]">
                <Mail className="w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="rohan@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(181,248,0,0.3)]"
            >
              <span>Send Password Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#B5F800]/20 text-[#B5F800] flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Reset Link Sent</h3>
            <p className="text-xs text-gray-400">
              Password reset link has been dispatched to <strong>{email}</strong>.
            </p>
          </div>
        )}

        <div className="text-center text-xs text-gray-400">
          Remembered password?{' '}
          <Link to="/login" className="text-[#B5F800] font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
