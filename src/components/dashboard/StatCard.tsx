
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  changeType?: "positive" | "negative" | "neutral";
  changeValue?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changeType,
  changeValue,
  icon
}) => {
  const [isValueHidden, setIsValueHidden] = useState(false);

  const toggleValueVisibility = () => {
    setIsValueHidden(!isValueHidden);
  };

  const renderValue = () => {
    if (isValueHidden) {
      return '••••••';
    }
    return value;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm text-muted-foreground">{title}</h3>
              <button
                className="p-1 hover:bg-muted rounded-full transition-colors"
                onClick={toggleValueVisibility}
                aria-label={isValueHidden ? "Show value" : "Hide value"}
              >
                {isValueHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div>
              <p className="text-2xl font-semibold">{renderValue()}</p>
              {changeType && changeValue && !isValueHidden && (
                <div className={`flex items-center text-xs mt-1
                  ${changeType === 'positive' ? 'text-green-500' : 
                    changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'}
                `}>
                  {changeType === 'positive' && <ArrowUp className="h-3 w-3 mr-1" />}
                  {changeType === 'negative' && <ArrowDown className="h-3 w-3 mr-1" />}
                  <span>{changeValue}</span>
                </div>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-2 rounded-md bg-[#9b87f5] text-white">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
