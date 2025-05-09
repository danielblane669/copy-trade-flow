
import React from 'react';
import { CircleCheck, BarChart, TrendingUp, CircleDollarSign } from 'lucide-react';

const features = [
  {
    icon: <CircleCheck className="h-8 w-8 text-primary" />,
    title: "One-Click Copy Trading",
    description: "Connect to top traders with one click and automatically copy their trades with your desired investment allocation."
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Real-Time Performance Tracking",
    description: "Monitor your portfolio and see how your copied traders are performing with detailed analytics and reports."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Risk Management Tools",
    description: "Set stop-losses, take-profits, and maximum investment amounts to protect your capital and manage risk."
  },
  {
    icon: <CircleDollarSign className="h-8 w-8 text-primary" />,
    title: "Multiple Exchange Support",
    description: "Connect to major crypto exchanges like Binance, Coinbase, and Kraken to copy trades across platforms."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Designed for traders of all levels</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy for beginners to follow experts while providing advanced tools for experienced traders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border card-hover">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
