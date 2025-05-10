
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "CryptoBroker made trading cryptocurrencies incredibly easy. Their platform is intuitive and the $20 signup bonus was a great way to start!",
    author: "Alex Johnson",
    role: "Retail Investor"
  },
  {
    quote: "I've been trading crypto for years and this is by far the most user-friendly platform I've used. Fast transactions and excellent customer support.",
    author: "Sarah Williams",
    role: "Professional Trader"
  },
  {
    quote: "As a beginner, I was hesitant to start trading cryptocurrencies. CryptoBroker's platform made it easy to learn and start trading with confidence.",
    author: "Michael Chen",
    role: "New Investor"
  },
  {
    quote: "The security measures in place give me peace of mind. I know my investments are safe with CryptoBroker.",
    author: "Emma Rodriguez",
    role: "Long-term Investor"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Traders Say
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our community of traders has to say.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 pt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
              <Quote className="h-8 w-8 text-primary opacity-70" />
              <p className="flex-1 text-lg">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
