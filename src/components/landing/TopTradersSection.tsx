
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, CircleUser } from 'lucide-react';

const traders = [
  {
    name: "Alex Thompson",
    avatar: "AT",
    profit: "+287%",
    followers: "7.2k",
    strategy: "Swing Trading",
    description: "Focuses on mid-term momentum trading with technical analysis."
  },
  {
    name: "Sarah Chen",
    avatar: "SC",
    profit: "+156%",
    followers: "5.9k",
    strategy: "Position Trading",
    description: "Long-term holder with fundamental analysis-based entries."
  },
  {
    name: "Michael Rodriguez",
    avatar: "MR",
    profit: "+312%",
    followers: "9.1k",
    strategy: "Day Trading",
    description: "Quick scalping strategies with high win rates on major pairs."
  }
];

const TopTradersSection = () => {
  return (
    <section id="traders" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Top-performing traders you can copy</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow verified traders with proven track records and start copying their successful strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {traders.map((trader, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4">
                  {trader.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trader.name}</h3>
                  <p className="text-primary font-medium">{trader.strategy}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{trader.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4 mr-1" /> Yearly profit
                  </div>
                  <div className="text-lg font-semibold text-green-500">{trader.profit}</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Users className="w-4 h-4 mr-1" /> Followers
                  </div>
                  <div className="text-lg font-semibold">{trader.followers}</div>
                </div>
              </div>
              
              <Button className="w-full">
                <CircleUser className="w-4 h-4 mr-2" />
                Copy trader
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-6">
            View all traders
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopTradersSection;
