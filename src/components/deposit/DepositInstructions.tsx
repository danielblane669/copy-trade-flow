
import React from 'react';

const DepositInstructions = () => {
  return (
    <div className="bg-accent/30 p-4 rounded-lg mb-6">
      <h4 className="font-semibold mb-2">Deposit Instructions:</h4>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        <li>Select your preferred cryptocurrency.</li>
        <li>Copy the generated wallet address.</li>
        <li>Send funds from your personal wallet to the copied address.</li>
        <li>Upload a screenshot of your transaction as proof of payment.</li>
        <li>Enter the USD amount you've deposited.</li>
        <li>Submit your deposit request.</li>
      </ol>
    </div>
  );
};

export default DepositInstructions;
