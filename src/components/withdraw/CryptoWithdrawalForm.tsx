
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Bitcoin, Coins } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AmountInput from '../deposit/AmountInput';

// Define cryptocurrency options
const cryptoOptions = [
  { label: "Bitcoin (BTC)", value: "bitcoin", icon: <Bitcoin className="h-5 w-5 mr-2" /> },
  { label: "Ethereum (ETH)", value: "ethereum", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "Litecoin (LTC)", value: "litecoin", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "XRP", value: "xrp", icon: <Coins className="h-5 w-5 mr-2" /> },
];

// Crypto withdrawal form schema
const cryptoWithdrawalSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) > 0, { message: "Amount must be greater than 0" }),
  cryptocurrency: z.string().min(1, { message: "Please select a cryptocurrency" }),
  walletAddress: z.string().min(10, { message: "Please enter a valid wallet address" }),
});

interface CryptoWithdrawalFormProps {
  onSuccess: () => void;
  onSubmitting: (isSubmitting: boolean) => void;
}

const CryptoWithdrawalForm: React.FC<CryptoWithdrawalFormProps> = ({ 
  onSuccess, 
  onSubmitting 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof cryptoWithdrawalSchema>>({
    resolver: zodResolver(cryptoWithdrawalSchema),
    defaultValues: {
      amount: "",
      cryptocurrency: "",
      walletAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof cryptoWithdrawalSchema>) => {
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
          withdrawal_type: 'crypto',
          crypto_type: values.cryptocurrency,
          wallet_address: values.walletAddress
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
          transaction_details: `${values.cryptocurrency.toUpperCase()} withdrawal to ${values.walletAddress.substring(0, 8)}...`
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
          name="cryptocurrency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Cryptocurrency</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cryptoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        {option.icon}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Wallet Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your wallet address" className="font-mono text-sm" />
              </FormControl>
              <FormDescription>
                Enter the wallet address where you want to receive your funds
              </FormDescription>
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

export default CryptoWithdrawalForm;
