
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import TraderCard from '@/components/dashboard/TraderCard';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, CircleDollarSign, CircleUser } from 'lucide-react';

const traders = [
  {
    name: "Alex Thompson",
    avatar: "AT",
    profit: "+287%",
    followers: "7.2k",
    strategy: "Swing Trading",
    description: "Focuses on mid-term momentum trading with technical analysis.",
    following: true
  },
  {
    name: "Sarah Chen",
    avatar: "SC",
    profit: "+156%",
    followers: "5.9k",
    strategy: "Position Trading",
    description: "Long-term holder with fundamental analysis-based entries.",
    following: false
  },
  {
    name: "Michael Rodriguez",
    avatar: "MR",
    profit: "+312%",
    followers: "9.1k",
    strategy: "Day Trading",
    description: "Quick scalping strategies with high win rates on major pairs.",
    following: true
  }
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back, John! Here's an overview of your portfolio."
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Portfolio Value"
          value="$12,680.54"
          change="+15.3%"
          changeType="positive"
          icon={<CircleDollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="Active Traders"
          value="5"
          change="+2 this week"
          changeType="positive"
          icon={<CircleUser className="h-5 w-5" />}
        />
        <StatCard
          title="Total Profit"
          value="$1,245.23"
          change="+8.1%"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Win Rate"
          value="68%"
          change="-2.3%"
          changeType="negative"
          icon={<BarChart className="h-5 w-5" />}
        />
      </div>
      
      {/* Trading Activity Chart */}
      <div className="bg-card rounded-xl p-6 border border-border mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Trading Activity</h2>
            <p className="text-sm text-muted-foreground">Your trading performance over the last 30 days</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="outline" size="sm">Week</Button>
            <Button className="bg-primary text-primary-foreground" size="sm">Month</Button>
            <Button variant="outline" size="sm">Year</Button>
          </div>
        </div>
        
        <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">Chart will be implemented when backend is connected</p>
        </div>
      </div>
      
      {/* Followed Traders */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Traders You're Following</h2>
            <p className="text-sm text-muted-foreground">Performance of traders you're currently copying</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traders.map((trader, index) => (
            trader.following && (
              <TraderCard
                key={index}
                name={trader.name}
                avatar={trader.avatar}
                profit={trader.profit}
                followers={trader.followers}
                strategy={trader.strategy}
                description={trader.description}
                following={trader.following}
              />
            )
          ))}
        </div>
      </div>
      
      {/* Recommended Traders */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recommended Traders</h2>
            <p className="text-sm text-muted-foreground">Top traders you might want to follow</p>
          </div>
          <Button variant="outline" size="sm">Browse All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traders.map((trader, index) => (
            !trader.following && (
              <TraderCard
                key={index}
                name={trader.name}
                avatar={trader.avatar}
                profit={trader.profit}
                followers={trader.followers}
                strategy={trader.strategy}
                description={trader.description}
                following={trader.following}
              />
            )
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
