
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Helmet } from 'react-helmet';
import DepositForm from '@/components/deposit/DepositForm';

const Deposit = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Deposit - CryptoBroker</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deposit</h1>
          <p className="text-muted-foreground mt-2">
            Deposit cryptocurrency to your account
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <DepositForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
