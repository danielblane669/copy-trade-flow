
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DepositForm from '@/components/deposit/DepositForm';
import Header from '@/components/dashboard/Header';

const Deposit = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Deposit" 
        subtitle="Deposit cryptocurrency to your account"
      />
      
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Deposit Funds</h3>
            <p className="text-muted-foreground">Complete the form below to deposit cryptocurrency to your account.</p>
          </div>
          
          <div className="grid gap-6">
            <div>
              <DepositForm />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
