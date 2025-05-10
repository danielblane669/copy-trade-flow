
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Start Trading Cryptocurrencies Today
              </h2>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                Join thousands of traders on our platform and get a $20 bonus when you sign up.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/signup">
                <Button size="lg" className="btn-gradient">
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-full w-full overflow-hidden rounded-xl border bg-gradient-to-b from-background/10 to-background/80 p-1 shadow-lg">
              <div className="grid h-full w-full place-items-center overflow-hidden rounded-lg bg-background p-6">
                <div className="grid gap-2 text-center">
                  <div className="text-xl font-bold">Get $20 Bonus</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sign up today and receive a $20 bonus to start your trading journey
                  </p>
                  <div className="flex flex-col items-center gap-2 pt-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
                      $20
                    </div>
                    <div className="text-sm font-medium">Signup Bonus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
