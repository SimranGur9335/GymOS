import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/layout/Footer';
import { CompareFloatingBar } from '../components/discovery/CompareFloatingBar';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D10] text-[#F3F4F6] selection:bg-[#B5F800] selection:text-[#0B0D10]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CompareFloatingBar />
      <Footer />
    </div>
  );
};
