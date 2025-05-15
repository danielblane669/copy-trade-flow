
import React, { ReactNode, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, EyeOff } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  changeType?: 'positive' | 'negative' | 'neutral';
  changeValue?: string;
};

const StatCard = ({ title, value, icon, changeType, changeValue }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon && (
            <div className="bg-primary/10 text-primary rounded-full p-2">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-2 relative">
          <p className="text-2xl font-bold">
            {isVisible ? value : '•••••'}
          </p>
          <button 
            onClick={toggleVisibility} 
            className="absolute right-0 bottom-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isVisible ? "Hide value" : "Show value"}
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {changeType && changeValue && (
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  changeType === 'positive'
                    ? 'text-green-500'
                    : changeType === 'negative'
                    ? 'text-red-500'
                    : 'text-muted-foreground'
                }`}
              >
                {changeValue}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Loading skeleton for StatCard
export const StatCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-8 w-32 mt-2" />
          <Skeleton className="h-4 w-16 mt-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
