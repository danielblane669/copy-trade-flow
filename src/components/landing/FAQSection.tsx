
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Creating an account is simple. Click on the 'Sign Up' button, fill in your details, and verify your email address. You'll receive a $20 bonus immediately after signing up."
  },
  {
    question: "What cryptocurrencies can I trade on CryptoBroker?",
    answer: "We support trading of major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), XRP, and many others."
  },
  {
    question: "How do I deposit funds into my account?",
    answer: "You can deposit funds using various cryptocurrencies. Go to the Deposit section in your dashboard, select your preferred cryptocurrency, and follow the instructions to complete your deposit."
  },
  {
    question: "What are the withdrawal options?",
    answer: "You can withdraw your funds via cryptocurrency to your personal wallet or via bank transfer to your bank account."
  },
  {
    question: "How long do deposits and withdrawals take to process?",
    answer: "Cryptocurrency deposits are typically credited within 1-2 hours after receiving the required confirmations. Withdrawals are processed within 24 hours of request submission."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard security measures to protect your personal information and funds. All data is encrypted and we implement strict security protocols."
  },
  {
    question: "Does CryptoBroker offer customer support?",
    answer: "Yes, we offer 24/7 customer support via email and live chat. Our support team is always ready to assist you with any questions or issues you may have."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our cryptocurrency trading platform.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl pt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
