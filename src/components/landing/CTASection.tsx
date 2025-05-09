
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-600/10 to-violet-600/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your crypto copy trading journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of traders already using our platform to boost their profits
              and learn from the best in the market.
            </p>
            <Link to="/signup">
              <Button size="lg" className="btn-gradient py-6 px-8 text-lg">
                Get started for free
              </Button>
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
