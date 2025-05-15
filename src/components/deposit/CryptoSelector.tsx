
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bitcoin, Coins } from 'lucide-react';

interface CryptoSelectorProps {
  control: Control<any>;
  name: string;
}

const cryptoOptions = [
  { label: "Bitcoin (BTC)", value: "bitcoin", icon: <Bitcoin className="h-5 w-5 mr-2" /> },
  { label: "Ethereum (ETH)", value: "ethereum", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "Litecoin (LTC)", value: "litecoin", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "XRP", value: "xrp", icon: <Coins className="h-5 w-5 mr-2" /> },
];

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
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
  );
};

export default CryptoSelector;
