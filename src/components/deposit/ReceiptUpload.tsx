
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

type ReceiptUploadProps = {
  onChange: (files: FileList | null) => void;
};

const ReceiptUpload = ({ onChange }: ReceiptUploadProps) => {
  // Create a function that passes the file directly
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  return (
    <FormItem>
      <FormLabel>Proof of Payment</FormLabel>
      <FormControl>
        <div className="grid w-full gap-2">
          <div className="border-2 border-dashed border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <Input
              type="file"
              className="hidden"
              id="receipt-upload"
              accept="image/*"
              onChange={handleFileChange}
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
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ReceiptUpload;
