
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import AmountInput from './AmountInput';
import CryptoSelector from './CryptoSelector';
import WalletAddressInput from './WalletAddressInput';
import FileUploadField from './FileUploadField';
import DepositInstructions from './DepositInstructions';

// Form validation schema
const depositFormSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) > 0, { message: "Amount must be greater than 0" }),
  cryptocurrency: z.string().min(1, { message: "Please select a cryptocurrency" }),
  walletAddress: z.string().min(10, { message: "Please enter a valid wallet address" }),
  receiptUrl: z.string().optional()
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

const DepositForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      amount: "",
      cryptocurrency: "",
      walletAddress: "",
      receiptUrl: ""
    },
  });

  const { data: wallet } = useQuery({
    queryKey: ['wallet', form.watch('cryptocurrency')],
    queryFn: () => {
      // In a real application, this would fetch the appropriate wallet address
      // for the selected cryptocurrency from your backend
      const wallets: Record<string, string> = {
        bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        ethereum: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        litecoin: "ltc1qvhyspt2qmxe8uqzd59pd44j9xfv8c8m2mqjuhs",
        xrp: "rMvAicXgHMrYeY6oFcmCm13rgYhTBX8Z9u"
      };
      
      return Promise.resolve({ 
        address: wallets[form.watch('cryptocurrency')] || ""
      });
    },
    enabled: !!form.watch('cryptocurrency'),
  });

  async function onSubmit(data: DepositFormValues) {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to make a deposit",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert into deposit_requests table first
      const { error: depositRequestError } = await supabase
        .from('deposit_requests' as any)
        .insert({
          user_id: user.id,
          amount: parseFloat(data.amount),
          crypto_type: data.cryptocurrency,
          wallet_address: data.walletAddress,
          receipt_url: data.receiptUrl || null
        });
      
      if (depositRequestError) throw depositRequestError;

      // Add transaction record
      const { error: transactionError } = await supabase
        .from('user_transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(data.amount),
          transaction_type: 'deposit',
          status: 'pending',
          transaction_details: `${data.cryptocurrency.toUpperCase()} deposit from ${data.walletAddress.substring(0, 8)}...`
        });
      
      if (transactionError) throw transactionError;

      // Show success message and reset form
      setShowSuccessMessage(true);
      form.reset();
      
      toast({
        title: "Deposit request submitted",
        description: "Your deposit is being processed. We'll notify you when it's confirmed.",
      });
      
      // Navigate to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } catch (error: any) {
      console.error("Deposit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit deposit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (showSuccessMessage) {
    return (
      <div className="max-w-lg mx-auto text-center p-8">
        <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg className="h-8 w-8 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Deposit Request Submitted</h2>
        <p className="text-muted-foreground mb-6">
          Your deposit request has been submitted successfully. Our team will review and process it shortly.
          You'll be notified when your deposit is confirmed.
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to dashboard in a few seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AmountInput control={form.control} name="amount" />
            <CryptoSelector control={form.control} name="cryptocurrency" />
            <WalletAddressInput control={form.control} name="walletAddress" />
            
            {user && (
              <FileUploadField 
                control={form.control} 
                name="receiptUrl" 
                userId={user.id} 
              />
            )}
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Deposit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <div>
        <DepositInstructions 
          cryptocurrency={form.watch('cryptocurrency')} 
          walletAddress={wallet?.address || ''} 
        />
      </div>
    </div>
  );
};

export default DepositForm;
