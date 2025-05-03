import React, { useState, useEffect } from 'react';
import { Coffee, Clock, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItem } from '@/data/menu-items';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MenuSectionProps {
  title: string;
  description: string;
  items: MenuItem[];
  emoji: string;
  index: number;
}

// Component for rendering animated coffee cup with progress
const CoffeeCupProgress = ({ progress = 0 }) => {
  return (
    <div className="relative h-10 w-16">
      <div className="coffee-cup">
        <div 
          className="coffee-fill animate-pour" 
          style={{ height: `${Math.max(10, progress)}%` }}
        ></div>
      </div>
      {progress > 30 && (
        <>
          <div className="steam left-3" />
          <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
        </>
      )}
    </div>
  );
};

// Component for a single menu item card with enhanced interactivity
const MenuItemCard = ({ item, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate random position for coffee stains
  const stainPositions = React.useMemo(() => {
    return [
      { top: Math.random() * 70 + 10, left: Math.random() * 70 + 10 },
      { top: Math.random() * 70 + 10, left: Math.random() * 70 + 10 }
    ];
  }, []);
  
  return (
    <Card 
      key={item.id} 
      id={item.id}
      className={`menu-card overflow-hidden border border-coffee-light/20 transform transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Coffee stains for decoration */}
      {stainPositions.map((pos, i) => (
        <div 
          key={i} 
          className="coffee-stain" 
          style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        />
      ))}
      
      <div className="h-48 overflow-hidden bg-gradient-to-br from-coffee-cream to-coffee-light/20 relative">
        {item.category === 'appetizer' && (
          <Badge className="absolute top-3 right-3 bg-green-500 z-10">Quick Start</Badge>
        )}
        {item.category === 'dessert' && (
          <Badge className="absolute top-3 right-3 bg-amber-500 z-10">Advanced</Badge>
        )}
        <div className="h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-coffee-light/5 to-coffee-medium/10" />
          <Coffee 
            size={isHovered ? 64 : 48} 
            className={`text-coffee-medium/60 transition-all duration-300 ${isHovered ? 'animate-bubble' : ''}`}
          />
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-cafe text-coffee-dark dark:text-coffee-light flex items-center gap-2">
          {item.title}
          {isHovered && (
            <Sparkles size={18} className="text-amber-500 animate-bounce-in" />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={16} className="mr-1" />
            <span>{item.duration}</span>
          </div>
          
          {/* Show what type of interactive element is included */}
          {item.content.interactiveElement && (
            <Badge variant="outline" className="text-xs">
              {item.content.interactiveElement.type === 'quiz' && 'Interactive Quiz'}
              {item.content.interactiveElement.type === 'simulation' && 'Simulation'}
              {item.content.interactiveElement.type === 'exercise' && 'Practice Exercise'}
              {item.content.interactiveElement.type === 'case-study' && 'Case Study'}
            </Badge>
          )}
        </div>
        
        {/* Show key productivity metrics */}
        {isHovered && (
          <div className="mt-4 pt-3 border-t border-muted animate-fade-in">
            <div className="flex gap-2 items-center text-sm text-muted-foreground mb-1">
              <Star size={14} className="text-amber-500" />
              <span>Productivity boost potential:</span>
            </div>
            <Progress 
              value={
                item.category === 'appetizer' ? 60 :
                item.category === 'entree' ? 80 :
                95
              } 
              className="h-1.5 mb-2"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full transition-all duration-300 ${
            isHovered 
              ? 'bg-accent-teal hover:bg-accent-teal/90 text-white'
              : 'bg-coffee-medium hover:bg-coffee-dark text-white'
          }`}
          onClick={() => navigate(`/lesson/${item.id}`)}
        >
          <span>{isHovered ? 'Start Your Learning Journey' : 'Start Learning'}</span>
          <ArrowRight size={16} className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, description, items, emoji, index }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Stagger animation entrance of sections
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 300);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div className={`mb-16 transition-opacity duration-700 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Chalkboard-style section header */}
      <div className="mb-10 p-6 chalkboard rounded-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-coffee-light/20"></div>
        <div className="chalk-text text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{emoji}</span>
            <h2 className="text-3xl md:text-4xl font-chalk font-bold text-white animate-chalk-write">
              {title}
            </h2>
          </div>
          <p className="text-xl text-coffee-cream/80 font-chalk pl-14">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div 
            key={item.id}
            className={`animate-fade-in-up`}
            style={{ animationDelay: `${i * 0.15 + 0.3}s` }}
          >
            <MenuItemCard item={item} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface MenuDisplayProps {
  items: MenuItem[];
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ items }) => {
  const appetizers = items.filter(item => item.category === 'appetizer');
  const entrees = items.filter(item => item.category === 'entree');
  const desserts = items.filter(item => item.category === 'dessert');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-cafe font-medium text-coffee-dark dark:text-coffee-light">
          Today's Specials
        </h2>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <CoffeeCupProgress progress={80} />
            <span className="text-sm text-muted-foreground ml-2">Popular choice</span>
          </div>
        </div>
      </div>
      
      <MenuSection 
        title="Morning Kickstarters" 
        description="Quick, energizing introductions to power up your productivity"
        items={appetizers}
        emoji="☕"
        index={0}
      />
      
      <MenuSection 
        title="Productivity Power Lunch" 
        description="Substantial modules to transform your daily workflow with AI"
        items={entrees} 
        emoji="🍲"
        index={1}
      />
      
      <MenuSection 
        title="Sweet Productivity Finishers" 
        description="Advanced techniques that bring everything together for maximum impact"
        items={desserts} 
        emoji="🍰"
        index={2}
      />
      
      {/* Special of the day section */}
      <div className="mt-16 mb-8 p-8 bg-coffee-paper rounded-lg border border-coffee-light/20 shadow-lg relative overflow-hidden animate-fade-in">
        <div className="absolute top-3 right-3">
          <Badge className="bg-red-500">Today's Special</Badge>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-20 h-20 bg-coffee-medium/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Zap size={32} className="text-amber-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-2">
              Productivity Assessment Bundle
            </h3>
            <p className="text-muted-foreground mb-4">
              Take our interactive assessment, get personalized AI tool recommendations, and track your productivity gains over time.
            </p>
            <Button className="bg-accent-teal hover:bg-accent-teal/90">
              Get Started <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDisplay;
