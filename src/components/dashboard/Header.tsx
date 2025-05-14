
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6 pb-4 md:pb-6 border-b border-border">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className={`flex items-center space-x-2 w-full md:w-auto ${isMobile ? 'justify-between' : ''}`}>
        <div className="relative flex-grow md:flex-grow-0 md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full pl-9 py-2 pr-4 rounded-md bg-secondary text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
