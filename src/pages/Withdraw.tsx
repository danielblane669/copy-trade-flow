import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Bitcoin, Coins, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';

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

const Withdraw = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  
  const { data: portfolio, isLoading: loadingPortfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const cryptoForm = useForm<z.infer<typeof cryptoWithdrawalSchema>>({
    resolver: zodResolver(cryptoWithdrawalSchema),
    defaultValues: {
      amount: "",
      cryptocurrency: "",
      walletAddress: "",
    },
  });

  const bankForm = useForm<z.infer<typeof bankWithdrawalSchema>>({
    resolver: zodResolver(bankWithdrawalSchema),
    defaultValues: {
      amount: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      swiftCode: "",
    },
  });

  async function onCryptoSubmit(values: z.infer<typeof cryptoWithdrawalSchema>) {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to make a withdrawal",
        variant: "destructive",
      });
      return;
    }

    setLoadingSubmit(true);
    
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
      setShowSuccess(true);
      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request is being reviewed. We'll notify you via email within 24 hours.",
      });
      
      // Redirect to dashboard after 10 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 10000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit withdrawal request. Please try again.",
      });
      console.error("Withdrawal error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function onBankSubmit(values: z.infer<typeof bankWithdrawalSchema>) {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to make a withdrawal",
        variant: "destructive",
      });
      return;
    }

    setLoadingSubmit(true);
    
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
      setShowSuccess(true);
      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request is being reviewed. We'll notify you via email within 24 hours.",
      });
      
      // Redirect to dashboard after 10 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 10000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error", 
        description: error.message || "Failed to submit withdrawal request. Please try again.",
      });
      console.error("Withdrawal error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  if (showSuccess) {
    return (
      <DashboardLayout>
        <Header 
          title="Withdrawal" 
          subtitle="Withdraw funds from your trading account"
        />
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="max-w-lg mx-auto text-center p-8">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Withdrawal Request Submitted</h2>
            <p className="text-muted-foreground mb-6">
              Your withdrawal request is being reviewed. We'll notify you via email within 24 hours
              about the status of your withdrawal request.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard in a few seconds...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header 
        title="Withdraw" 
        subtitle="Withdraw funds from your trading account"
      />
      
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Withdraw Funds</h3>
            <p className="text-muted-foreground">Choose your preferred withdrawal method.</p>
          </div>

          {!loadingPortfolio && portfolio && (
            <Card className="mb-6 bg-background/50">
              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">${Number(portfolio.portfolio_value).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="crypto">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="crypto" className="flex items-center gap-2">
                <Bitcoin className="h-4 w-4" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Bank Transfer</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="crypto">
              <Form {...cryptoForm}>
                <form onSubmit={cryptoForm.handleSubmit(onCryptoSubmit)} className="space-y-6">
                  <FormField
                    control={cryptoForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input {...field} className="pl-7" placeholder="100" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={cryptoForm.control}
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
                    control={cryptoForm.control}
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

                  <Button type="submit" className="w-full" disabled={loadingSubmit}>
                    {loadingSubmit ? "Processing..." : "Place Withdrawal Request"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="bank">
              <Form {...bankForm}>
                <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-6">
                  <FormField
                    control={bankForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input {...field} className="pl-7" placeholder="100" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={bankForm.control}
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
                      control={bankForm.control}
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
                      control={bankForm.control}
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
                    control={bankForm.control}
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

                  <Button type="submit" className="w-full" disabled={loadingSubmit}>
                    {loadingSubmit ? "Processing..." : "Place Withdrawal Request"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-accent/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Withdrawal Information:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Withdrawal requests are processed within 24 hours.</li>
              <li>You will receive an email notification once your request is approved.</li>
              <li>The minimum withdrawal amount is $10.</li>
              <li>Bank transfers may take 2-5 business days to reflect in your account.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
