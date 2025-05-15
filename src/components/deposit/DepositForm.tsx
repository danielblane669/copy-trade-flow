
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bitcoin, Coins, FileUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { generateRandomAddress } from '@/lib/crypto';
import DepositInstructions from './DepositInstructions';
import FileUpload from './FileUpload';

// Define custom Ethereum icon component
const Ethereum = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l-8 14h16l-8-14z" />
    <path d="M4 16l8-5.2 8 5.2" />
    <path d="M4 16v4l8-6 8 6v-4" />
  </svg>
);

// Define custom Litecoin icon component
const Litecoin = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
    <path d="M15.6 14.2H9.2l-1 3.6h9.6l-0.8 2.4H6.8L9.2 8.8h3.2l-1.6 5.4h4l0.8-2.4h-4.4l0.4-1.8h6.4l-2.4 4.2z" />
  </svg>
);

// Define custom XRP icon component
const Xrp = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M16 8l-4 4-4-4" />
    <path d="M8 16l4-4 4 4" />
  </svg>
);

// Define the form schema with Zod
const depositFormSchema = z.object({
  cryptoType: z.enum(['bitcoin', 'ethereum', 'litecoin', 'xrp'], {
    required_error: "Please select a cryptocurrency type",
  }),
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) >= 200, { message: "Minimum deposit amount is $200" }),
  walletAddress: z.string(),
  receiptImage: z.any()
    .refine(files => files && files.length > 0, {
      message: "Payment proof is required"
    }),
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

const CryptoIcons = {
  bitcoin: <Bitcoin className="h-4 w-4" />,
  ethereum: <Ethereum className="h-4 w-4" />,
  litecoin: <Litecoin className="h-4 w-4" />,
  xrp: <Xrp className="h-4 w-4" />,
};

const DepositForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { user } = useAuth();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      walletAddress: '',
      amount: '',
    },
  });

  const handleCryptoTypeChange = (value: string) => {
    const address = generateRandomAddress(value);
    setWalletAddress(address);
    form.setValue('walletAddress', address);
  };

  const onSubmit = async (data: DepositFormValues) => {
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
      // Handle file upload if a file was provided
      let receiptUrl = null;
      if (data.receiptImage && data.receiptImage.length > 0) {
        const file = data.receiptImage[0];
        const fileExt = file.name.split('.').pop();
        const folderPath = `${user.id}/${Math.random().toString(36).substring(2)}`;
        const fileName = `${folderPath}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data: fileData, error: uploadError } = await supabase
          .storage
          .from('deposit-receipts')
          .upload(fileName, file);

        if (uploadError) {
          throw new Error(`Error uploading receipt: ${uploadError.message}`);
        }
        
        receiptUrl = fileData?.path;
      }

      // Insert into deposit_requests table first
      const { error: depositRequestError } = await supabase
        .from('deposit_requests')
        .insert({
          user_id: user.id,
          amount: parseFloat(data.amount),
          crypto_type: data.cryptoType,
          wallet_address: data.walletAddress,
          receipt_url: receiptUrl,
        });

      if (depositRequestError) {
        throw new Error(`Error creating deposit request: ${depositRequestError.message}`);
      }

      // Save deposit request to transaction history table
      const { error: insertError } = await supabase
        .from('user_transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(data.amount),
          transaction_type: 'deposit',
          status: 'pending',
          transaction_details: JSON.stringify({
            crypto_type: data.cryptoType,
            wallet_address: data.walletAddress,
            receipt_url: receiptUrl,
          }),
        });

      if (insertError) {
        throw new Error(`Error creating deposit request: ${insertError.message}`);
      }

      // Show success message
      toast({
        title: "Deposit request submitted",
        description: "Your deposit request is under review. You will be contacted via email regarding the status of your deposit.",
        duration: 10000,
      });
      
      // Reset form
      form.reset();
      setWalletAddress('');
    } catch (error) {
      toast({
        title: "Error submitting deposit",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Cryptocurrency</CardTitle>
        <CardDescription>
          Fill out this form to deposit cryptocurrency to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cryptoType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cryptocurrency Type</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCryptoTypeChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cryptocurrency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bitcoin">
                        <div className="flex items-center gap-2">
                          <Bitcoin className="h-4 w-4" />
                          <span>Bitcoin</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ethereum">
                        <div className="flex items-center gap-2">
                          <Ethereum className="h-4 w-4" />
                          <span>Ethereum</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="litecoin">
                        <div className="flex items-center gap-2">
                          <Litecoin className="h-4 w-4" />
                          <span>Litecoin</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="xrp">
                        <div className="flex items-center gap-2">
                          <Xrp className="h-4 w-4" />
                          <span>XRP</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input {...field} className="pl-7" placeholder="200" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Minimum deposit amount is $200
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {walletAddress && (
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Address</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input 
                          {...field} 
                          value={walletAddress}
                          readOnly 
                          className="flex-grow font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="ml-2"
                          onClick={() => {
                            navigator.clipboard.writeText(walletAddress);
                            toast({
                              title: "Address copied",
                              description: "Wallet address copied to clipboard",
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Send your cryptocurrency to this address
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="receiptImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Proof of Payment <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="max-w-full overflow-hidden">
                      <FileUpload 
                        onChange={(files) => onChange(files)}
                        {...rest}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a screenshot or receipt of your transaction (required)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {walletAddress && <DepositInstructions />}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || !form.getValues("cryptoType") || !form.formState.isValid}
            >
              {isSubmitting ? "Processing..." : "Submit Deposit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DepositForm;
