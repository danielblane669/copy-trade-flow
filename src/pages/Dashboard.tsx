
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import { Wallet, TrendingUp, Gift, ArrowDownToLine } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import TradingViewChart from '@/components/dashboard/TradingViewChart';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || 'User';
  
  // Fetch user portfolio data
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // No rows returned for single row fetch
          // Create a new portfolio for the user if it doesn't exist
          const { data: newPortfolio, error: createError } = await supabase
            .from('user_portfolios')
            .insert({ user_id: user?.id })
            .select('*')
            .single();
            
          if (createError) throw createError;
          return newPortfolio;
        }
        throw error;
      }
      return data;
    },
    enabled: !!user?.id,
  });
  
  return (
    <DashboardLayout>
      <Header 
        title="Dashboard" 
        subtitle={`Welcome back, ${firstName}! Here's an overview of your portfolio.`}
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {isLoading ? (
          <>
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </>
        ) : (
          <>
            <StatCard
              title="Portfolio Value"
              value={`$${Number(portfolio?.portfolio_value || 20).toFixed(2)}`}
              icon={<Wallet className="h-5 w-5" />}
            />
            <StatCard
              title="Total Profit"
              value={`$${Number(portfolio?.total_profit || 0).toFixed(2)}`}
              changeType={Number(portfolio?.total_profit) >= 0 ? "positive" : "negative"}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Bonus"
              value={`$${Number(portfolio?.bonus || 20).toFixed(2)}`}
              icon={<Gift className="h-5 w-5" />}
            />
            <StatCard
              title="Deposits"
              value={`$${Number(portfolio?.deposits || 0).toFixed(2)}`}
              icon={<ArrowDownToLine className="h-5 w-5" />}
            />
          </>
        )}
      </div>
      
      {/* Trading Activity Chart */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4 md:mb-6">
          <div>
            <h2 className="text-base md:text-lg font-semibold">Trading Activity</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Live cryptocurrency market data</p>
          </div>
        </div>
        
        <TradingViewChart height={400} />
      </div>
      
      {/* Transaction History */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4 md:mb-6">
          <div>
            <h2 className="text-base md:text-lg font-semibold">Transaction History</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Your recent deposits, withdrawals, and bonuses</p>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <TransactionHistory />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
