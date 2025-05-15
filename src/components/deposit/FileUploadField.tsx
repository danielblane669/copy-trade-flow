
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import FileUpload, { FileUploadProps } from './FileUpload';

interface FileUploadFieldProps extends Omit<FileUploadProps, 'value' | 'onChange'> {
  name: string;
  label: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  maxSizeMB,
  acceptedFileTypes
}) => {
  const form = useFormContext();
  
  if (!form) {
    throw new Error('FileUploadField must be used within a Form component');
  }
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onChange={field.onChange}
              maxSizeMB={maxSizeMB}
              acceptedFileTypes={acceptedFileTypes}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploadField;
