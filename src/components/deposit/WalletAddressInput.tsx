
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface WalletAddressInputProps {
  control: any;
  name: string;
}

const WalletAddressInput: React.FC<WalletAddressInputProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Wallet Address</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter the wallet address you're sending from" className="font-mono text-sm" />
          </FormControl>
          <FormDescription>
            Please enter the wallet address from which you're sending the cryptocurrency.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WalletAddressInput;
