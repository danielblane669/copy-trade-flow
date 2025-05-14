
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const DepositInstructions = () => {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Important information</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Send only the specified cryptocurrency to this address.</li>
          <li>Double-check the wallet address before sending any funds.</li>
          <li>Your deposit will require manual verification by our team.</li>
          <li>You will receive an email confirmation once your deposit is approved.</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default DepositInstructions;
