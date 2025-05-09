
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar positioned absolute on mobile, fixed on desktop */}
      <div className="z-40">
        <Sidebar defaultCollapsed={isMobile} />
      </div>
      
      {/* Main content - adapts to sidebar state */}
      <div className="flex-grow w-full transition-all duration-300 ease-in-out ml-[72px] md:ml-[72px]" 
           data-sidebar-expanded="false">
        <div className="min-h-screen pb-20 overflow-y-auto">
          <div className="py-6 px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
