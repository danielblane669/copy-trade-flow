
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface AmountInputProps {
  control: any;
  name: string;
  currency?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ control, name, currency = '$' }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">{currency}</span>
              <Input {...field} className="pl-7" placeholder="0.00" type="number" step="0.01" min="0" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AmountInput;
