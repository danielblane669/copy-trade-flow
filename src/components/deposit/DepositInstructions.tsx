
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClipboardCopy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DepositInstructionsProps {
  cryptocurrency: string;
  walletAddress: string;
  amount: string;
}

const DepositInstructions: React.FC<DepositInstructionsProps> = ({
  cryptocurrency,
  walletAddress,
  amount
}) => {
  const { toast } = useToast();
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info size={20} className="text-primary" />
          Deposit Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Send the following amount:</p>
          <p className="font-medium text-lg">{amount} {cryptocurrency}</p>
        </div>
        
        <Separator />
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">To this address:</p>
          <div className="flex items-center gap-2">
            <div className="bg-muted p-3 rounded-md flex-1 break-all text-sm">
              {walletAddress}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleCopyAddress}
              title="Copy address"
            >
              <ClipboardCopy size={16} />
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <p className="font-medium">Important notes:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Only send {cryptocurrency} to this address</li>
            <li>Minimum deposit: 0.001 {cryptocurrency}</li>
            <li>The deposit will be credited after 6 network confirmations</li>
            <li>Upload the transaction receipt below for faster processing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepositInstructions;
