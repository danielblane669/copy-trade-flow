
import React from 'react';
import { ShieldCheck, TrendingUp, RefreshCw, Clock, CreditCard, Wallet } from 'lucide-react';

const features = [
  {
    title: 'Secure Trading Environment',
    description: 'Enterprise-grade security measures to protect your assets and personal information.',
    icon: <ShieldCheck className="h-10 w-10 text-primary" />
  },
  {
    title: 'Advanced Trading Tools',
    description: 'Real-time charts, technical indicators, and market analysis tools.',
    icon: <TrendingUp className="h-10 w-10 text-primary" />
  },
  {
    title: 'Multiple Cryptocurrencies',
    description: 'Trade Bitcoin, Ethereum, XRP, Litecoin and many more cryptocurrencies.',
    icon: <RefreshCw className="h-10 w-10 text-primary" />
  },
  {
    title: '24/7 Trading',
    description: 'Markets never close - trade cryptocurrencies whenever you want.',
    icon: <Clock className="h-10 w-10 text-primary" />
  },
  {
    title: 'Multiple Payment Methods',
    description: 'Deposit and withdraw using various cryptocurrencies and bank transfers.',
    icon: <CreditCard className="h-10 w-10 text-primary" />
  },
  {
    title: 'User-friendly Wallet',
    description: 'Manage your assets easily with our intuitive digital wallet.',
    icon: <Wallet className="h-10 w-10 text-primary" />
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Trade Crypto
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools and features you need to trade cryptocurrencies confidently.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
