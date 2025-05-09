
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar defaultCollapsed={isMobile} />
      
      {/* Main content - adapts to sidebar state */}
      <div className="flex-grow transition-all duration-300 ease-in-out w-full">
        <div className="container h-screen overflow-y-auto pb-20">
          <div className="py-6 px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
