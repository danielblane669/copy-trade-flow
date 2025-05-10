
import React from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';

type AmountInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AmountInput = ({ value, onChange }: AmountInputProps) => {
  return (
    <FormItem>
      <FormLabel>Amount (USD)</FormLabel>
      <FormControl>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
          <Input value={value} onChange={onChange} className="pl-7" placeholder="100" />
        </div>
      </FormControl>
      <FormDescription>
        Minimum deposit: $100
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default AmountInput;
