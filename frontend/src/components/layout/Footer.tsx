import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07090C] border-t border-[#1E2330] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1 & 2: Brand & Location */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B5F800] flex items-center justify-center text-[#0B0D10] font-black">
                <Dumbbell className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Gym<span className="text-[#B5F800]">OS</span>
              </span>
            </Link>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              GymOS is the operating system for modern gyms. Connecting fitness seekers in <strong>Keshav Nagar, Pune</strong> with top-rated gyms, verified trainers, and transparent membership pricing.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gray-300 bg-[#14171F] p-3 rounded-lg border border-[#1E2330] max-w-sm">
              <MapPin className="w-4 h-4 text-[#B5F800] flex-shrink-0" />
              <span>
                <strong>Initial Launch Zone:</strong> Keshav Nagar & surrounding Pune East hubs (Mundhwa, Magarpatta, Kharadi).
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-gray-400 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5F800]" /> 100% Verified Gyms
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#B5F800]" /> Best Price Guarantee
              </span>
            </div>
          </div>

          {/* Col 3: For Gym Seekers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Discover Gyms</h4>
            <ul className="space-y-2">
              <li><Link to="/discover" className="hover:text-[#B5F800] transition-colors">Gyms in Keshav Nagar</Link></li>
              <li><Link to="/discover?area=Mundhwa" className="hover:text-[#B5F800] transition-colors">Gyms in Mundhwa</Link></li>
              <li><Link to="/discover?area=Magarpatta" className="hover:text-[#B5F800] transition-colors">Gyms in Magarpatta</Link></li>
              <li><Link to="/discover?area=Kharadi" className="hover:text-[#B5F800] transition-colors">Gyms in Kharadi</Link></li>
              <li><Link to="/compare" className="hover:text-[#B5F800] transition-colors">Compare Gym Memberships</Link></li>
              <li><Link to="/offers" className="hover:text-[#B5F800] transition-colors">Local Gym Discounts</Link></li>
            </ul>
          </div>

          {/* Col 4: For Gym Owners & Trainers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Gym Owners</h4>
            <ul className="space-y-2">
              <li><Link to="/owner" className="hover:text-[#B5F800] transition-colors">GymOS Management Suite</Link></li>
              <li><Link to="/owner/members" className="hover:text-[#B5F800] transition-colors">Member Management</Link></li>
              <li><Link to="/owner/attendance" className="hover:text-[#B5F800] transition-colors">Biometric Attendance</Link></li>
              <li><Link to="/owner/leads" className="hover:text-[#B5F800] transition-colors">Lead Growth Engine</Link></li>
              <li><Link to="/trainer" className="hover:text-[#B5F800] transition-colors">Trainer Portal</Link></li>
              <li><Link to="/admin" className="hover:text-[#B5F800] transition-colors">Platform Super Admin</Link></li>
            </ul>
          </div>

          {/* Col 5: Local SEO & Callout */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Grow Your Gym</h4>
            <p className="text-[11px] text-gray-400">
              Own a gym near Keshav Nagar, Mundhwa or Magarpatta? Get listed on GymOS to reach thousands of active fitness seekers.
            </p>

            <Link
              to="/owner"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#B5F800] text-[#0B0D10] font-bold text-xs hover:bg-[#a2de00] transition-colors"
            >
              <span>List Gym Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1E2330] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} GymOS Technologies Inc. All rights reserved. Built for Keshav Nagar, Pune.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/about" className="hover:text-gray-300">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
