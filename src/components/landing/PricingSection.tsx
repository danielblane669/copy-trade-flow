
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for beginners",
    features: [
      "Copy up to 3 traders",
      "Basic performance analytics",
      "Manual trade execution",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$29",
    description: "For serious traders",
    features: [
      "Copy up to 10 traders",
      "Advanced analytics dashboard",
      "Automatic trade execution",
      "Risk management tools",
      "Priority email support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For professionals",
    features: [
      "Unlimited trader copying",
      "Real-time advanced analytics",
      "Custom risk management",
      "API access",
      "Priority 24/7 support",
      "Dedicated account manager"
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Choose the right plan for you</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free and upgrade as your portfolio grows. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-card rounded-xl p-8 border ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <Button 
                className={`w-full mb-8 ${plan.popular ? 'btn-gradient' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.price === "Free" ? "Sign up" : "Subscribe now"}
              </Button>
              
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
