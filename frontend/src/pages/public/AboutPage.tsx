import React from 'react';
import { Dumbbell, ShieldCheck, MapPin, Building2, Users, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#14171F] border border-[#272D3D] text-xs font-bold text-[#B5F800]">
          <Dumbbell className="w-4 h-4" />
          <span>Product Vision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Operating System for Modern Gyms
        </h1>
        <p className="text-base text-gray-300 leading-relaxed">
          GymOS is building the complete fitness technology ecosystem — bridging local gym discovery, transparent membership pricing, trainer booking, and biometric gym management.
        </p>
      </div>

      {/* Local Launch Focus */}
      <div className="bg-[#14171F] border border-[#272D3D] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-[#B5F800] uppercase tracking-wider bg-[#B5F800]/10 px-3 py-1 rounded-full border border-[#B5F800]/20">
            📍 Initial Market Spotlight
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Keshav Nagar, Pune?</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Keshav Nagar is one of Pune’s fastest growing residential & IT fitness corridors. Surrounded by Mundhwa, Magarpatta City, and Kharadi, thousands of active professionals seek high quality strength gyms, 24/7 access studios, and personal coaching nearby.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            GymOS empowers local gym owners with enterprise-grade management software while giving local residents a seamless marketplace to discover, compare, and join fitness clubs.
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#0B0D10] p-6 rounded-2xl border border-[#272D3D] space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider text-gray-400">GymOS Launch Metrics</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#1E2330]">
              <span className="text-gray-300">Launch Locality</span>
              <strong className="text-white">Keshav Nagar, Pune</strong>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#1E2330]">
              <span className="text-gray-300">Target Expansion Hubs</span>
              <strong className="text-white">Mundhwa, Magarpatta, Kharadi</strong>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#1E2330]">
              <span className="text-gray-300">Partner Gyms</span>
              <strong className="text-[#B5F800]">48 Verified Facilities</strong>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Active Platform Users</span>
              <strong className="text-white">12,450+ Members</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Core Ecosystem Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white text-center">Built for the Complete Fitness Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3">
            <Users className="w-8 h-8 text-[#B5F800]" />
            <h3 className="text-base font-bold text-white">Fitness Seekers</h3>
            <p className="text-xs text-gray-400">Discover gyms near you, compare memberships, book trainer sessions, and track workout progress.</p>
          </div>

          <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3">
            <Building2 className="w-8 h-8 text-[#B5F800]" />
            <h3 className="text-base font-bold text-white">Gym Owners</h3>
            <p className="text-xs text-gray-400">Manage member renewals, track monthly revenue trends, capture leads, and automate attendance.</p>
          </div>

          <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3">
            <Dumbbell className="w-8 h-8 text-[#B5F800]" />
            <h3 className="text-base font-bold text-white">Personal Trainers</h3>
            <p className="text-xs text-gray-400">Schedule client sessions, track weight & body fat progress logs, and assign custom workout plans.</p>
          </div>

          <div className="bg-[#14171F] border border-[#272D3D] rounded-2xl p-6 space-y-3">
            <Cpu className="w-8 h-8 text-[#B5F800]" />
            <h3 className="text-base font-bold text-white">Platform Super Admin</h3>
            <p className="text-xs text-gray-400">Verify gym document credentials, monitor platform transactions, and manage city rollout parameters.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-[#14171F] border border-[#272D3D] rounded-3xl p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">Ready to experience GymOS?</h3>
        <div className="flex justify-center gap-4">
          <Link
            to="/discover"
            className="px-6 py-3 rounded-xl bg-[#B5F800] text-[#0B0D10] font-extrabold text-xs hover:bg-[#a2de00]"
          >
            Explore Gyms Now
          </Link>
          <Link
            to="/owner"
            className="px-6 py-3 rounded-xl bg-[#1E2330] text-white font-bold text-xs hover:bg-[#272D3D] border border-[#272D3D]"
          >
            Owner Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
