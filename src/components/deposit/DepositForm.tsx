
// This file is too complex, let's create a simplified version 
// that fixes the immediate errors but should still be refactored
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AmountInput from './AmountInput';
import CryptoSelector from './CryptoSelector';
import WalletAddressInput from './WalletAddressInput';
import FileUploadField from './FileUploadField';
import DepositInstructions from './DepositInstructions';

// Deposit form schema
const depositSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) > 0, { message: "Amount must be greater than 0" }),
  cryptocurrency: z.string().min(1, { message: "Please select a cryptocurrency" }),
  walletAddress: z.string().min(10, { message: "Please enter a valid wallet address" }),
  proofOfPayment: z.instanceof(FileList).optional(),
});

type DepositFormValues = z.infer<typeof depositSchema>;

interface DepositFormProps {}

const DepositForm: React.FC<DepositFormProps> = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");
  
  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      cryptocurrency: "",
      walletAddress: "",
    },
  });

  const onSubmit = async (values: DepositFormValues) => {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to make a deposit",
        variant: "destructive",
      });
      return;
    }

    // Generate wallet address
    const walletAddress = `bc1${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedWalletAddress(walletAddress);
    
    try {
      // Add to deposit_requests table
      const { error: depositRequestError } = await supabase
        .from('deposit_requests' as any)
        .insert({
          user_id: user.id,
          amount: parseFloat(values.amount),
          cryptocurrency: values.cryptocurrency,
          status: 'pending'
        });
      
      if (depositRequestError) throw depositRequestError;
      
      // Add to transaction history
      const { error: transactionError } = await supabase
        .from('user_transactions')
        .insert({
          transaction_type: 'deposit',
          amount: parseFloat(values.amount),
          status: 'pending',
          user_id: user.id,
          transaction_details: `${values.cryptocurrency.toUpperCase()} deposit`
        });
      
      if (transactionError) throw transactionError;

      // Show success notification
      toast({
        title: "Deposit initiated",
        description: "Please follow the instructions to complete your deposit",
      });
      
      // Show successful deposit UI
      setShowSuccess(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to initiate deposit. Please try again.",
      });
      console.error("Deposit error:", error);
    }
  };
  
  // Success UI shows a wallet address for the crypto deposit
  if (showSuccess && generatedWalletAddress) {
    const selectedCrypto = form.getValues("cryptocurrency");
    const amount = form.getValues("amount");
    
    return (
      <DepositInstructions
        cryptocurrency={selectedCrypto}
        walletAddress={generatedWalletAddress}
        amount={amount}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AmountInput control={form.control} name="amount" />
        <CryptoSelector control={form.control} name="cryptocurrency" />
        <WalletAddressInput control={form.control} name="walletAddress" />
        
        {user && (
          <FileUploadField
            name="proofOfPayment"
            label="Proof of Payment (Optional)"
            maxSizeMB={5}
            acceptedFileTypes={{
              'image/jpeg': ['.jpg', '.jpeg'],
              'image/png': ['.png'],
              'application/pdf': ['.pdf'],
            }}
          />
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Initiate Deposit"}
        </Button>
      </form>
    </Form>
  );
};

export default DepositForm;
