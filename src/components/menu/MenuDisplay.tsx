import React from 'react';
import { Coffee, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItem } from '@/data/menu-items';
import { useNavigate } from 'react-router-dom';

interface MenuSectionProps {
  title: string;
  description: string;
  items: MenuItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, description, items }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-cafe font-bold text-blue-dark dark:text-blue-light mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="menu-card overflow-hidden border border-blue-light/20">
            <div className="h-48 overflow-hidden bg-blue-dark/10">
              <div className="h-full bg-gradient-to-br from-blue-light/20 to-blue-medium/20 flex items-center justify-center">
                <Coffee size={48} className="text-blue-medium/60" />
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-cafe text-blue-dark dark:text-blue-light">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{item.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={16} className="mr-1" />
                <span>{item.duration}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-medium hover:bg-blue-dark text-white"
                onClick={() => navigate(`/lesson/${item.id}`)}
              >
                <span>Start Learning</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
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
      <MenuSection 
        title="☕ Appetizers" 
        description="Quick, energizing introductions to get you started on your AI learning journey"
        items={appetizers}
      />
      
      <MenuSection 
        title="🍲 Entrées" 
        description="Substantial modules that dive deep into core AI concepts and techniques"
        items={entrees} 
      />
      
      <MenuSection 
        title="🍰 Desserts" 
        description="Sweet finishers that bring together theory with practical applications"
        items={desserts} 
      />
    </div>
  );
};

export default MenuDisplay;
