
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 -z-10 hero-gradient"></div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                The Trusted Platform for 
                <span className="text-primary block">Cryptocurrency Trading</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                Trade confidently with our secure, intuitive platform. Get started today with a $20 signup bonus.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link to="/signup">
                <Button size="lg" className="btn-gradient">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-primary/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Fast Transactions</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quick deposit and withdrawal processing
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-full border border-primary/10 bg-primary/5">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-background to-background/80 p-4">
                <div className="aspect-square overflow-hidden rounded-full bg-gradient-to-br from-primary to-purple-600 p-8">
                  <img
                    alt="Cryptocurrency"
                    src="https://ucarecdn.com/c4825d5c-546a-47d4-9378-0360c63cf2a6/-/preview/500x500/-/quality/smart/-/format/auto/"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
