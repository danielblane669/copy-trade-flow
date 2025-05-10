
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";

type WalletAddressProps = {
  walletAddress: string;
};

const WalletAddress = ({ walletAddress }: WalletAddressProps) => {
  const { toast } = useToast();

  if (!walletAddress) return null;
  
  return (
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
  );
};

export default WalletAddress;
