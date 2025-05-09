
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className
}) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div 
            className={cn(
              "ml-2 text-sm font-medium",
              changeType === 'positive' && "text-green-500",
              changeType === 'negative' && "text-red-500",
              changeType === 'neutral' && "text-muted-foreground"
            )}
          >
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
