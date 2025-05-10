
import React from 'react';
import { User, ArrowDownToLine, TrendingUp, ArrowUpFromLine } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Create an Account',
    description: 'Sign up in minutes and get a $20 bonus instantly credited to your account.',
    icon: <User className="h-8 w-8 text-primary" />
  },
  {
    id: '02',
    title: 'Deposit Funds',
    description: 'Fund your account using your preferred cryptocurrency.',
    icon: <ArrowDownToLine className="h-8 w-8 text-primary" />
  },
  {
    id: '03',
    title: 'Trade Cryptocurrencies',
    description: 'Start trading major cryptocurrencies with our intuitive platform.',
    icon: <TrendingUp className="h-8 w-8 text-primary" />
  },
  {
    id: '04',
    title: 'Withdraw Profits',
    description: 'Withdraw your profits to your bank account or crypto wallet.',
    icon: <ArrowUpFromLine className="h-8 w-8 text-primary" />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get Started in Four Simple Steps
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our streamlined process makes it easy to start trading cryptocurrencies
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 pt-12">
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                {step.icon}
              </div>
              <div className="absolute top-8 left-full hidden h-0.5 w-full -translate-y-1/2 bg-primary/30 lg:block"></div>
              <div className="space-y-2 text-center">
                <div className="text-xl font-bold">{step.title}</div>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
