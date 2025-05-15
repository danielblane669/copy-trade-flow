
import React, { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FileUpload from './FileUpload';

interface FileUploadFieldProps {
  control: any;
  name: string;
  userId: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ control, name, userId }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Payment Receipt</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onChange={(url) => field.onChange(url)}
              onUploadStateChange={setIsUploading}
              userId={userId}
              maxSizeMB={5}
              acceptedFileTypes={{
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'application/pdf': ['.pdf']
              }}
            />
          </FormControl>
          <FormDescription>
            Upload a screenshot or PDF of the payment confirmation. Maximum file size: 5MB.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploadField;
