
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CT</span>
          </div>
          <span className="font-bold text-xl">CopyTrade</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link to="/" className="font-medium text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <a href="#features" className="font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#traders" className="font-medium text-foreground/80 hover:text-primary transition-colors">Traders</a>
            <a href="#pricing" className="font-medium text-foreground/80 hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-gradient">Sign up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 font-medium" onClick={toggleMenu}>Home</Link>
            <a href="#features" className="py-2 font-medium" onClick={toggleMenu}>Features</a>
            <a href="#traders" className="py-2 font-medium" onClick={toggleMenu}>Traders</a>
            <a href="#pricing" className="py-2 font-medium" onClick={toggleMenu}>Pricing</a>
            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full btn-gradient">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
