
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MobileMenuProps {
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { name: 'Deposit', icon: <ArrowDownToLine className="w-5 h-5" />, path: '/dashboard/deposit' },
  { name: 'Withdraw', icon: <ArrowUpFromLine className="w-5 h-5" />, path: '/dashboard/withdraw' },
  { name: 'Transactions', icon: <FileText className="w-5 h-5" />, path: '/dashboard/transactions' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user details
  const firstName = user?.user_metadata?.first_name || 'User';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'User';
  
  // Get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2); // Take up to two initials
  };

  const initials = getInitials(fullName);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header with close button */}
      <div className="flex justify-between items-center p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-lg">{fullName}</span>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 rounded-full hover:bg-muted"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
