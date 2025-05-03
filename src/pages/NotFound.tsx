
import React from 'react';
import { Coffee, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 max-w-md">
        <div className="mb-6 inline-block">
          <Coffee size={64} className="text-coffee-medium mx-auto" />
        </div>
        <h1 className="text-4xl font-cafe font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! Looks like this menu item is no longer available.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-coffee-medium hover:bg-coffee-dark"
          size="lg"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Café Menu
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
