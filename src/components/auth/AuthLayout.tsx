
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-sm">CT</span>
            </div>
            <span className="font-bold text-xl">CopyTrade</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Maximize your crypto profits with the power of copy trading</h2>
          <p className="text-lg opacity-90">
            Join thousands of traders already using our platform to boost their profits and learn from the best in the market.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="font-semibold text-xl">50k+</div>
              <div className="text-sm opacity-80">Active users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="font-semibold text-xl">$15M+</div>
              <div className="text-sm opacity-80">Monthly volume</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="font-semibold text-xl">200+</div>
              <div className="text-sm opacity-80">Top traders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="font-semibold text-xl">95%</div>
              <div className="text-sm opacity-80">User satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm opacity-80">
          © 2025 CopyTrade. All rights reserved.
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
