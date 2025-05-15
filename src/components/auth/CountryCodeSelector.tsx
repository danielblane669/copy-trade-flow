
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from '@/components/ui/command';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Country data with codes and dial codes
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
];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  value,
  onChange,
  placeholder = "Code"
}) => {
  const [open, setOpen] = useState(false);
  
  const selectedCountry = countries.find(country => country.dial_code === value);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search code..." />
          <CommandEmpty>No code found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {countries.map((country) => (
              <CommandItem
                key={country.code}
                value={country.dial_code}
                onSelect={() => {
                  onChange(country.dial_code);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.dial_code ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.name} ({country.dial_code})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryCodeSelector;
