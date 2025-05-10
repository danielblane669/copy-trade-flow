
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { Bitcoin, Coins } from 'lucide-react';

// Define cryptocurrency options
export const cryptoOptions = [
  { label: "Bitcoin (BTC)", value: "bitcoin", icon: <Bitcoin className="h-5 w-5 mr-2" /> },
  { label: "Ethereum (ETH)", value: "ethereum", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "Litecoin (LTC)", value: "litecoin", icon: <Coins className="h-5 w-5 mr-2" /> },
  { label: "XRP", value: "xrp", icon: <Coins className="h-5 w-5 mr-2" /> },
];

type CryptoSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const CryptoSelector = ({ value, onValueChange }: CryptoSelectorProps) => {
  return (
    <FormItem>
      <FormLabel>Select Cryptocurrency</FormLabel>
      <Select 
        onValueChange={onValueChange}
        defaultValue={value}
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
  );
};

export default CryptoSelector;
