
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, XIcon } from 'lucide-react';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (files: FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, ...props }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
      onChange?.(fileList);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange?.(null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-6 bg-muted/20">
          <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to upload or drag and drop
          </p>
          <Button type="button" variant="secondary" size="sm" onClick={handleButtonClick}>
            Select File
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-muted/30 rounded-md p-3">
          <div className="flex items-center space-x-3">
            <div className="bg-background rounded p-2">
              <UploadIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium truncate" style={{ maxWidth: '200px' }}>
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
        {...props}
      />
    </div>
  );
};

export default FileUpload;
