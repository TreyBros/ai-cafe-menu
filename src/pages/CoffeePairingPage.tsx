import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Coffee, Sparkles, Droplet, MapPin, Star } from 'lucide-react';
import TabletLayout from '@/components/layout/TabletLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { coffeeItems, getMenuItemById, getPairingCoffees } from '@/data/menu-items';
import { CoffeeItem } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface CoffeeCardProps {
  coffee: CoffeeItem;
  onClick: () => void;
  selected: boolean;
  recommended?: boolean;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, onClick, selected, recommended }) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${selected ? 'ring-2 ring-blue-600' : ''}`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
  >
    <div className="h-32 bg-amber-50 relative">
      {coffee.image && (
        <img 
          src={coffee.image} 
          alt={coffee.name} 
          className="w-full h-full object-cover"
        />
      )}
      {recommended && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-blue-600 text-white">
            <Sparkles size={12} className="mr-1" /> Recommended
          </Badge>
        </div>
      )}
    </div>
    
    <div className="p-4">
      <h3 className="text-lg font-bold text-blue-dark mb-1">{coffee.name}</h3>
      
      <div className="flex items-center text-sm text-slate-600 mb-2">
        <Droplet size={14} className="mr-1" />
        <span>{coffee.preparation}</span>
      </div>
      
      <p className="text-sm text-slate-700 mb-3 line-clamp-2">{coffee.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-blue-600 font-bold">{coffee.price}</div>
        {selected && (
          <div className="bg-blue-600 text-white p-1 rounded-full">
            <Star size={16} />
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const CoffeePairingPage: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const { createOrder } = useSessionStore();
  
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const [pairings, setPairings] = useState<CoffeeItem[]>([]);
  
  const menuItem = itemId ? getMenuItemById(itemId) : undefined;
  
  useEffect(() => {
    if (itemId) {
      // Get recommended coffees for this menu item
      const recommendedCoffees = getPairingCoffees(itemId);
      
      if (recommendedCoffees.length > 0) {
        // Start with recommended coffees, then add others
        const otherCoffees = coffeeItems.filter(
          coffee => !recommendedCoffees.some(rec => rec.id === coffee.id)
        );
        setPairings([...recommendedCoffees, ...otherCoffees]);
      } else {
        // If no recommendations, show all coffees
        setPairings(coffeeItems);
      }
    }
  }, [itemId]);
  
  const handleCoffeeSelect = (coffeeId: string) => {
    setSelectedCoffee(coffeeId);
  };
  
  const handleContinue = () => {
    if (itemId) {
      // Create the order with the selected item and coffee
      createOrder(itemId, selectedCoffee || undefined);
      navigate('/checkout');
    }
  };
  
  // Handle case where menu item is not found
  if (!menuItem) {
    return (
      <TabletLayout currentStep={5}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-blue-dark mb-4">Menu Item Not Found</h2>
          <p className="text-slate-600 mb-6">The menu item for coffee pairing could not be found.</p>
          <Button onClick={() => navigate('/categories')}>
            Return to Categories
          </Button>
        </div>
      </TabletLayout>
    );
  }
  
  return (
    <TabletLayout
      currentStep={5}
      nextButtonText="Continue to Checkout"
      showNextButton={true}
      onNext={handleContinue}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-3 text-blue-dark font-cafe"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Select a Coffee Pairing
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge variant="outline" className="px-3 py-1 text-blue-dark">
              <Coffee size={14} className="mr-1" /> 
              Selected: {menuItem.title}
            </Badge>
          </motion.div>
          
          <motion.p 
            className="text-slate-600 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Choose a coffee to complement your learning experience
          </motion.p>
          
          <motion.p
            className="text-sm text-slate-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Or skip to continue without a coffee pairing
          </motion.p>
        </div>
        
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pairings.map((coffee, index) => {
            // Check if this coffee is recommended for the selected menu item
            const isRecommended = itemId && coffee.pairsWith.includes(itemId);
            
            return (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onClick={() => handleCoffeeSelect(coffee.id)}
                selected={selectedCoffee === coffee.id}
                recommended={isRecommended}
              />
            );
          })}
        </motion.div>
        
        {pairings.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Coffee size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">No coffee pairings available</h3>
            <p className="text-slate-500">Please continue to checkout</p>
          </motion.div>
        )}
      </div>
    </TabletLayout>
  );
};

export default CoffeePairingPage; 