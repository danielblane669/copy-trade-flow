
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import FileUpload from './FileUpload';

interface FileUploadFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  userId: string;
  maxSizeMB?: number;
  acceptedFileTypes?: {
    'image/jpeg': ['.jpg', '.jpeg'];
    'image/png': ['.png'];
    'application/pdf': ['.pdf'];
  };
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  control,
  name,
  label,
  userId,
  maxSizeMB = 2,
  acceptedFileTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf'],
  },
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onChange={field.onChange}
              userId={userId}
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
