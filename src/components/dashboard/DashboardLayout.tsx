
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="pl-[72px] lg:pl-64">
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
