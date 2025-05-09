
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="hero-gradient pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Copy the trades of top-performing <span className="text-primary">crypto traders</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            Automatically mirror the strategies of expert traders and maximize your profits without the learning curve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="btn-gradient text-lg py-6 px-8">
                Start copy trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-lg py-6 px-8">
                Log in to your account
              </Button>
            </Link>
          </div>
          <div className="mt-12 bg-card shadow-md border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Trusted by</div>
              <div className="h-px bg-border flex-grow mx-4"></div>
              <div className="text-sm text-muted-foreground">50,000+ traders</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
              <div className="text-xl font-semibold text-foreground/80">BitFund</div>
              <div className="text-xl font-semibold text-foreground/80">CryptoEdge</div>
              <div className="text-xl font-semibold text-foreground/80">AlphaInvest</div>
              <div className="text-xl font-semibold text-foreground/80">BlockVenture</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
