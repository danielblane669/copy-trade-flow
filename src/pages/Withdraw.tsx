
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/contexts/AuthContext";
import { Bitcoin, Building } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import CryptoWithdrawalForm from '@/components/withdraw/CryptoWithdrawalForm';
import BankWithdrawalForm from '@/components/withdraw/BankWithdrawalForm';

const Withdraw = () => {
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  
  const { data: portfolio, isLoading: loadingPortfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSuccess = () => {
    setShowSuccess(true);
    
    // Redirect to dashboard after 10 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 10000);
  };

  if (showSuccess) {
    return (
      <DashboardLayout>
        <Header 
          title="Withdrawal" 
          subtitle="Withdraw funds from your trading account"
        />
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="max-w-lg mx-auto text-center p-8">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Withdrawal Request Submitted</h2>
            <p className="text-muted-foreground mb-6">
              Your withdrawal request is being reviewed. We'll notify you via email within 24 hours
              about the status of your withdrawal request.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard in a few seconds...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header 
        title="Withdraw" 
        subtitle="Withdraw funds from your trading account"
      />
      
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Withdraw Funds</h3>
            <p className="text-muted-foreground">Choose your preferred withdrawal method.</p>
          </div>

          {!loadingPortfolio && portfolio && (
            <Card className="mb-6 bg-background/50">
              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">${Number(portfolio.portfolio_value).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="crypto">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="crypto" className="flex items-center gap-2">
                <Bitcoin className="h-4 w-4" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Bank Transfer</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="crypto">
              <CryptoWithdrawalForm 
                onSuccess={handleSuccess}
                onSubmitting={setLoadingSubmit}
              />
            </TabsContent>
            
            <TabsContent value="bank">
              <BankWithdrawalForm
                onSuccess={handleSuccess}
                onSubmitting={setLoadingSubmit}
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-accent/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Withdrawal Information:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Withdrawal requests are processed within 24 hours.</li>
              <li>You will receive an email notification once your request is approved.</li>
              <li>The minimum withdrawal amount is $10.</li>
              <li>Bank transfers may take 2-5 business days to reflect in your account.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
