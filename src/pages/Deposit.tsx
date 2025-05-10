
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import DepositForm from '@/components/deposit/DepositForm';

const Deposit = () => {
  return (
    <DashboardLayout>
      <Header 
        title="Deposit" 
        subtitle="Add funds to your trading account"
      />
      <DepositForm />
    </DashboardLayout>
  );
};

export default Deposit;
