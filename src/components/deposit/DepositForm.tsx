
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { generateRandomAddress } from "@/lib/crypto";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Components
import CryptoSelector from './CryptoSelector';
import WalletAddress from './WalletAddress';
import AmountInput from './AmountInput';
import ReceiptUpload from './ReceiptUpload';
import DepositInstructions from './DepositInstructions';

// Define the form schema with proper types
const formSchema = z.object({
  cryptocurrency: z.string().min(1, { message: "Please select a cryptocurrency" }),
  amount: z.string().min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) >= 100, { message: "Minimum deposit amount is $100" }),
  // Use z.any() for file input but ensure it's a FileList during validation
  receiptImage: z.any()
    .refine((files) => files && files.length > 0, { message: "Proof of payment is required" }),
});

// Define type for the form data
type FormValues = z.infer<typeof formSchema>;

const DepositForm = () => {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cryptocurrency: "",
      amount: "",
      // Initialize receiptImage as undefined to prevent type errors
      receiptImage: undefined,
    },
  });

  const onCryptoChange = (value: string) => {
    // Generate a random address when crypto is selected
    const address = generateRandomAddress(value);
    setWalletAddress(address);
  };

  async function onSubmit(values: FormValues) {
    setLoadingSubmit(true);
    try {
      // Check that receipt image is present
      if (!values.receiptImage || values.receiptImage.length === 0) {
        throw new Error("Receipt image is required");
      }

      // Get the filename from the FileList
      const fileName = values.receiptImage[0]?.name || 'unknown-file';
      
      // Add to transaction history with detailed transaction info
      const { error } = await supabase.from('user_transactions').insert({
        transaction_type: 'deposit',
        amount: parseFloat(values.amount),
        status: 'pending', // Pending until admin approves
        user_id: user?.id,
        transaction_details: `${values.cryptocurrency.toUpperCase()} deposit - ${fileName}`
      });
      
      if (error) throw error;
      
      // Update user portfolio deposits total
      const { error: portfolioError } = await supabase.rpc('update_user_portfolio_deposits', {
        user_id_param: user?.id,
        deposit_amount: parseFloat(values.amount)
      });
      
      if (portfolioError) {
        console.error("Failed to update portfolio:", portfolioError);
        // Continue anyway as the transaction was recorded
      }
      
      toast({
        title: "Deposit request submitted",
        description: "Your deposit is pending approval. We'll notify you once it's processed.",
      });
      
      // Reset form
      form.reset();
      setWalletAddress("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit deposit request. Please try again.",
      });
      console.error("Deposit error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Deposit with Cryptocurrency</h3>
          <p className="text-muted-foreground">Minimum deposit: $100. Any deposit below $100 will not be credited to your account.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CryptoSelector 
              value={form.watch('cryptocurrency')} 
              onValueChange={(value) => {
                form.setValue('cryptocurrency', value);
                onCryptoChange(value);
              }}
            />
            
            <WalletAddress walletAddress={walletAddress} />
            
            <AmountInput
              value={form.watch('amount')}
              onChange={(e) => form.setValue('amount', e.target.value)}
            />
            
            <ReceiptUpload
              onChange={(files) => {
                if (files) {
                  form.setValue('receiptImage', files, { 
                    shouldValidate: true 
                  });
                }
              }}
            />
            
            <DepositInstructions />
            
            <Button type="submit" className="w-full" disabled={loadingSubmit}>
              {loadingSubmit ? "Processing..." : "Submit Deposit Request"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DepositForm;
