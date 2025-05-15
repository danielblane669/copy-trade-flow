
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AmountInput from '../deposit/AmountInput';

// Bank withdrawal form schema
const bankWithdrawalSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) > 0, { message: "Amount must be greater than 0" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
  accountNumber: z.string().min(5, { message: "Account number is required" }),
  accountName: z.string().min(2, { message: "Account name is required" }),
  swiftCode: z.string().min(8, { message: "SWIFT/BIC code is required" }),
});

interface BankWithdrawalFormProps {
  onSuccess: () => void;
  onSubmitting: (isSubmitting: boolean) => void;
}

const BankWithdrawalForm: React.FC<BankWithdrawalFormProps> = ({ 
  onSuccess, 
  onSubmitting 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof bankWithdrawalSchema>>({
    resolver: zodResolver(bankWithdrawalSchema),
    defaultValues: {
      amount: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      swiftCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bankWithdrawalSchema>) => {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to make a withdrawal",
        variant: "destructive",
      });
      return;
    }

    onSubmitting(true);
    
    try {
      // Add to withdrawal_requests table
      const { error: withdrawalRequestError } = await supabase
        .from('withdrawal_requests' as any)
        .insert({
          user_id: user.id,
          amount: parseFloat(values.amount),
          withdrawal_type: 'bank',
          bank_name: values.bankName,
          account_number: values.accountNumber,
          account_name: values.accountName,
          swift_code: values.swiftCode
        });
      
      if (withdrawalRequestError) throw withdrawalRequestError;
      
      // Add to transaction history
      const { error: transactionError } = await supabase
        .from('user_transactions')
        .insert({
          transaction_type: 'withdrawal',
          amount: parseFloat(values.amount),
          status: 'pending', // Pending until admin approves
          user_id: user.id,
          transaction_details: `Bank withdrawal to ${values.bankName} - ${values.accountName}`
        });
      
      if (transactionError) throw transactionError;

      // Show success notification
      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request is being reviewed. We'll notify you via email within 24 hours.",
      });
      
      // Call success callback
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error", 
        description: error.message || "Failed to submit withdrawal request. Please try again.",
      });
      console.error("Withdrawal error:", error);
      onSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AmountInput control={form.control} name="amount" />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your bank name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your account number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter account holder name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="swiftCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SWIFT/BIC Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter SWIFT/BIC code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Place Withdrawal Request
        </Button>
      </form>
    </Form>
  );
};

export default BankWithdrawalForm;
