
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users } from 'lucide-react';

interface TraderCardProps {
  name: string;
  avatar: string;
  profit: string;
  followers: string;
  strategy: string;
  description: string;
  following?: boolean;
}

const TraderCard: React.FC<TraderCardProps> = ({
  name,
  avatar,
  profit,
  followers,
  strategy,
  description,
  following = false
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 card-hover">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4">
          {avatar}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-primary font-medium">{strategy}</p>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6 line-clamp-2">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <TrendingUp className="w-4 h-4 mr-1" /> Yearly profit
          </div>
          <div className="text-lg font-semibold text-green-500">{profit}</div>
        </div>
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Users className="w-4 h-4 mr-1" /> Followers
          </div>
          <div className="text-lg font-semibold">{followers}</div>
        </div>
      </div>
      
      <Button className={`w-full ${following ? 'bg-secondary hover:bg-secondary/80 text-foreground' : 'btn-gradient'}`}>
        {following ? 'Following' : 'Copy trader'}
      </Button>
    </div>
  );
};

export default TraderCard;
