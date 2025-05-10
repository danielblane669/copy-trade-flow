
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Header from '@/components/dashboard/Header';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Bitcoin, Ethereum, Litecoin, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
import { generateRandomAddress } from "@/lib/crypto";
import { supabase } from "@/integrations/supabase/client";

// Define cryptocurrency options
const cryptoOptions = [
  { label: "Bitcoin (BTC)", value: "bitcoin", icon: <Bitcoin className="h-5 w-5 mr-2" /> },
  { label: "Ethereum (ETH)", value: "ethereum", icon: <Ethereum className="h-5 w-5 mr-2" /> },
  { label: "Litecoin (LTC)", value: "litecoin", icon: <Litecoin className="h-5 w-5 mr-2" /> },
  { label: "XRP", value: "xrp", icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fillOpacity=".5"/><path d="M15.975 11.75a.525.525 0 00-.55-.525H7.9l3.325-3.325a.525.525 0 000-.75.525.525 0 00-.75 0l-4.2 4.2a.525.525 0 000 .75l4.2 4.2a.525.525 0 00.75 0 .525.525 0 000-.75L7.9 12.275h7.525c.3 0 .55-.225.55-.525zm2-4.2L13.775 3.35a.525.525 0 00-.75 0 .525.525 0 000 .75l3.325 3.325H8.825a.525.525 0 00-.525.525c0 .3.225.55.525.55h7.525L13.025 11.825a.525.525 0 000 .75c.1.1.225.15.375.15s.275-.05.375-.15l4.2-4.2a.525.525 0 000-.75v-.075z"/></svg> },
];

const formSchema = z.object({
  cryptocurrency: z.string().min(1, { message: "Please select a cryptocurrency" }),
  amount: z.string().min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine((val) => Number(val) >= 100, { message: "Minimum deposit amount is $100" }),
  receiptImage: z.instanceof(FileList).refine(
    (files) => files.length > 0, 
    { message: "Proof of payment is required" }
  ),
});

const Deposit = () => {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cryptocurrency: "",
      amount: "",
    },
  });

  const onCryptoChange = (value: string) => {
    // Generate a random address when crypto is selected
    const address = generateRandomAddress(value);
    setWalletAddress(address);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingSubmit(true);
    try {
      // Add to transaction history
      const { error } = await supabase.from('user_transactions').insert({
        transaction_type: 'deposit',
        amount: parseFloat(values.amount),
        status: 'pending' // Pending until admin approves
      });
      
      if (error) throw error;
      
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
    <DashboardLayout>
      <Header 
        title="Deposit" 
        subtitle="Add funds to your trading account"
      />
      
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Deposit with Cryptocurrency</h3>
            <p className="text-muted-foreground">Minimum deposit: $100. Any deposit below $100 will not be credited to your account.</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cryptocurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Cryptocurrency</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        onCryptoChange(value);
                      }}
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
              
              {walletAddress && (
                <div className="border border-border rounded-md p-4 bg-background/50">
                  <FormLabel className="block mb-2">Deposit Address</FormLabel>
                  <div className="flex">
                    <Input
                      readOnly
                      value={walletAddress}
                      className="flex-1 bg-background font-mono text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                        toast({
                          description: "Address copied to clipboard",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <FormDescription className="mt-2">
                    Send your cryptocurrency to this address. The transaction may take some time to confirm.
                  </FormDescription>
                </div>
              )}

              <FormField
                control={form.control}
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
                    <FormDescription>
                      Minimum deposit: $100
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiptImage"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Proof of Payment</FormLabel>
                    <FormControl>
                      <div className="grid w-full gap-2">
                        <div className="border-2 border-dashed border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="receipt-upload"
                            onChange={(e) => onChange(e.target.files)}
                            {...rest}
                          />
                          <label 
                            htmlFor="receipt-upload"
                            className="flex flex-col items-center gap-2 cursor-pointer"
                          >
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Click to upload a screenshot of your payment
                            </span>
                            <span className="text-xs text-muted-foreground">
                              JPG, PNG or GIF files
                            </span>
                          </label>
                        </div>
                        
                        {value && value.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Selected file: {value[0].name}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-accent/30 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Deposit Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Select your preferred cryptocurrency.</li>
                  <li>Copy the generated wallet address.</li>
                  <li>Send funds from your personal wallet to the copied address.</li>
                  <li>Upload a screenshot of your transaction as proof of payment.</li>
                  <li>Enter the USD amount you've deposited.</li>
                  <li>Submit your deposit request.</li>
                </ol>
              </div>

              <Button type="submit" className="w-full" disabled={loadingSubmit}>
                {loadingSubmit ? "Processing..." : "Submit Deposit Request"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
