
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar - hidden on mobile */}
      {!isMobile && (
        <div className="fixed z-40 transition-all duration-300">
          <Sidebar defaultCollapsed={false} />
        </div>
      )}
      
      {/* Main content */}
      <div 
        className="flex-grow w-full transition-all duration-300 ease-in-out ml-0 md:ml-[72px]" 
        style={{ position: 'relative' }}
        data-sidebar-expanded="false"
      >
        {/* Mobile menu trigger button - aligned with header */}
        {isMobile && (
          <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex justify-between items-center h-16 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CB</span>
                </div>
                <span className="font-bold text-lg">CryptoBroker</span>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-primary/10 text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
        
        <div className="min-h-screen pb-20 overflow-y-auto">
          <div className={`py-6 px-4 ${isMobile ? '' : 'pt-6'}`}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && showMobileMenu && <MobileMenu onClose={closeMobileMenu} />}
    </div>
  );
};

export default DashboardLayout;
