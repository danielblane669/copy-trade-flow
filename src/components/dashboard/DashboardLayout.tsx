
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setShowMobileSidebar(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile hamburger menu toggle - increased z-index */}
      {isMobile && (
        <button 
          onClick={toggleMobileSidebar}
          className="fixed z-50 top-4 left-4 p-2 rounded-md bg-primary/10 text-primary"
          aria-label={showMobileSidebar ? "Close sidebar" : "Open sidebar"}
        >
          {showMobileSidebar ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}
      
      {/* Sidebar - only visible on desktop or when toggled on mobile */}
      {(isMobile && showMobileSidebar) || !isMobile ? (
        <div className={`fixed z-40 transition-all duration-300 ${
          isMobile ? (showMobileSidebar ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}>
          <Sidebar 
            defaultCollapsed={!isMobile && false} 
            onNavigate={closeSidebar} 
          />
        </div>
      ) : null}
      
      {/* Main content - adapts to sidebar state */}
      <div className="flex-grow w-full transition-all duration-300 ease-in-out ml-0 md:ml-[72px]" 
           style={{ position: 'relative' }}
           data-sidebar-expanded="false">
        <div className="min-h-screen pb-20 overflow-y-auto">
          {/* Add padding on mobile for the hamburger icon */}
          <div className={`py-6 px-4 ${isMobile ? 'pt-16' : ''}`}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
