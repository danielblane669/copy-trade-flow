
import React, { useMemo } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Country data for dropdown
const countries = [
  { code: "US", name: "United States", dial_code: "+1" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "RU", name: "Russia", dial_code: "+7" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "NG", name: "Nigeria", dial_code: "+234" },
  { code: "GH", name: "Ghana", dial_code: "+233" },
  { code: "KE", name: "Kenya", dial_code: "+254" },
  // Add more countries as needed
];

interface CountryCodeSelectorProps {
  control: any;
  name: string;
  onCountryChange?: (countryCode: string, dialCode: string) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({ 
  control, 
  name,
  onCountryChange 
}) => {
  // Sort countries alphabetically for easier search
  const sortedCountries = useMemo(() => 
    [...countries].sort((a, b) => a.name.localeCompare(b.name)), 
    []
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel>Code</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between font-normal"
                >
                  {field.value ? field.value : "Select"}
                  <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." icon={<Search className="w-4 h-4" />} />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-auto">
                  {sortedCountries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.code}
                      onSelect={() => {
                        field.onChange(country.dial_code);
                        if (onCountryChange) {
                          onCountryChange(country.code, country.dial_code);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === country.dial_code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country.name} ({country.dial_code})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CountryCodeSelector;
