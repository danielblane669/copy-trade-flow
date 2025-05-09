
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  TrendingUp, 
  CircleUser, 
  CircleDollarSign, 
  BarChart, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navigationItems: SidebarItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { name: 'Markets', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/markets' },
  { name: 'Copy Traders', icon: <CircleUser className="w-5 h-5" />, path: '/dashboard/traders' },
  { name: 'My Portfolio', icon: <CircleDollarSign className="w-5 h-5" />, path: '/dashboard/portfolio' },
  { name: 'Analytics', icon: <BarChart className="w-5 h-5" />, path: '/dashboard/analytics' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/settings' },
];

interface SidebarProps {
  defaultCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  
  // Get user details
  const firstName = user?.user_metadata?.first_name || 'User';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'User';
  const email = user?.email || '';
  
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
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    
    // Update parent layout to adjust content margin
    const sidebarWidth = collapsed ? '256px' : '72px';
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
    
    // Update data attribute for any elements that need to respond to sidebar state
    document.querySelectorAll('[data-sidebar-expanded]').forEach(el => {
      el.setAttribute('data-sidebar-expanded', (!collapsed).toString());
    });
  };

  // Update collapse state when screen size changes
  useEffect(() => {
    setCollapsed(isMobile);
    
    // Set initial sidebar width CSS variable
    const sidebarWidth = isMobile || defaultCollapsed ? '72px' : '256px';
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
    
    // Update data attribute
    const isExpanded = !(isMobile || defaultCollapsed);
    document.querySelectorAll('[data-sidebar-expanded]').forEach(el => {
      el.setAttribute('data-sidebar-expanded', isExpanded.toString());
    });
  }, [isMobile, defaultCollapsed]);

  return (
    <div 
      className={`sidebar fixed left-0 top-0 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-lg">CopyTrade</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  } ${collapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <div className="text-sm font-medium">{fullName}</div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">{email}</div>
                </div>
              </div>
            )}
            {collapsed && (
              <Avatar className="w-8 h-8 mx-auto">
                <AvatarFallback className="bg-secondary text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Logout and collapse buttons */}
          <div className={`mt-3 flex ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
              <button 
                onClick={logout}
                className="flex items-center text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </button>
            )}
            <button 
              onClick={toggleCollapse} 
              className="flex items-center text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-4 h-4 mr-2" />
              )}
              {!collapsed && <span>Collapse</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
