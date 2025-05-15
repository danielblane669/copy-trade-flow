
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type StatCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  changeType?: 'positive' | 'negative' | 'neutral';
  changeValue?: string;
};

const StatCard = ({ title, value, icon, changeType, changeValue }: StatCardProps) => {
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
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
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
