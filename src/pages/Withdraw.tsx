
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';

const Withdraw = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Withdraw" 
        subtitle="Withdraw funds from your trading account"
      />
      
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Withdraw Feature Coming Soon</h3>
          <p className="text-muted-foreground">This feature is currently under development.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
