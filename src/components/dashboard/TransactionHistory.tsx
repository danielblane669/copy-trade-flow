
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TransactionHistory = ({ limit }: { limit?: number }) => {
  const { user } = useAuth();
  
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      let query = supabase
        .from('user_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-center">
        An error occurred while loading your transactions
      </div>
    );
  }

  if (transactions?.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {format(new Date(transaction.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="capitalize">
                {transaction.transaction_type}
              </TableCell>
              <TableCell>
                {transaction.transaction_details || 
                  (transaction.transaction_type === 'bonus' ? 'Signup Bonus' : 
                   transaction.transaction_type === 'deposit' ? 'Account Deposit' : 
                   'Account Withdrawal')}
              </TableCell>
              <TableCell className={transaction.transaction_type === 'withdrawal' ? 'text-red-500' : 'text-green-500'}>
                {transaction.transaction_type === 'withdrawal' ? '-' : '+'}
                ${transaction.amount.toString()}
              </TableCell>
              <TableCell className="capitalize">
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-400' 
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-700/20 dark:text-red-400'
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
