
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CB</span>
              </div>
              <span className="font-bold text-xl">CryptoBroker</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The trusted platform for cryptocurrency trading. Trade with confidence.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-semibold">Resources</div>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Market Analysis</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Crypto Prices</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Learning Center</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-semibold">Company</div>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Careers</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Contact</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Press</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-semibold">Legal</div>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Terms of Service</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Cookie Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">Risk Disclosure</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CryptoBroker. All rights reserved.</p>
          <p className="mt-2">
            Trading cryptocurrencies involves risk. Please ensure that you fully understand the risks involved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
