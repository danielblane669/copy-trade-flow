
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import TransactionHistory from '@/components/dashboard/TransactionHistory';

const Transactions = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Transactions" 
        subtitle="View your transaction history"
      />
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <TransactionHistory />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
