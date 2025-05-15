
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface FileUploadProps {
  value: any;
  onChange: (...event: any[]) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: Record<string, string[]>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  maxSizeMB = 5,
  acceptedFileTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf'],
  }
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const acceptedTypes = Object.entries(acceptedFileTypes)
    .flatMap(([, extensions]) => extensions)
    .join(',');
    
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    const fileType = file.type;
    if (!Object.keys(acceptedFileTypes).includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: `Accepted file types: ${Object.values(acceptedFileTypes).flat().join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    setProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      // Create a unique file path for the upload
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('deposit-proofs')
        .upload(filePath, file);
      
      clearInterval(progressInterval);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProgress(100);
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('deposit-proofs')
        .getPublicUrl(filePath);
      
      // Return the file data to the form
      onChange({
        name: file.name,
        size: file.size,
        type: file.type,
        url: publicUrl,
        path: filePath,
      });
      
      toast({
        title: "File uploaded successfully",
        description: file.name
      });
      
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const removeFile = () => {
    // If a file was previously uploaded, you might want to delete it from storage here
    onChange(null);
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-10 w-10 text-primary" />;
    }
    return <FileText className="h-10 w-10 text-primary" />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <div className="space-y-4">
      {!value ? (
        <>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept={acceptedTypes}
              disabled={uploading}
            />
            
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Object.values(acceptedFileTypes).flat().join(', ')} up to {maxSizeMB}MB
                </p>
              </div>
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">
                {progress}%
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between bg-muted p-4 rounded-md">
          <div className="flex items-center space-x-3">
            {getFileIcon(value.type)}
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]">
                {value.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(value.size)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={removeFile}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
