import React from 'react';
import SideNav from '@/components/dashboard/SideNav';
import './dashboard.css';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main content area */}
      <main className="flex-1 bg-white h-screen overflow-y-scroll styled-scrollbar">
        {children}
      </main>
    </div>
  );
}
