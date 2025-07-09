
import React, { useState } from 'react';
import { Search, Plus, User, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center pulse-glow border border-white/20">
              <div className="w-8 h-8 bg-gradient-to-br from-white via-accent to-primary rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 bg-background rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent tracking-tight">
              Quanty
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors morphic-hover">
              Interviews
            </a>
            <a href="#questions" className="text-foreground/80 hover:text-foreground transition-colors morphic-hover">
              Questions
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors morphic-hover">
              Experts
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors morphic-hover">
              Categories
            </a>
            <Button 
              variant="ghost" 
              className="glass-card border-white/20 hover:bg-white/5 text-primary font-medium morphic-hover"
            >
              Sign In
            </Button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input
                type="text"
                placeholder="Search interviews..."
                className="glass-card pl-10 pr-4 py-2 w-64 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            
            <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover">
              <Plus className="w-4 h-4 mr-2" />
              Post Interview
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="glass-card morphic-hover">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-card morphic-hover">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden glass-card"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass-card p-4 rounded-xl">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Interviews</a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Experts</a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Categories</a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
              <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Interview
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
