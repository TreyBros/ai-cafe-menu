import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, Droplet, MapPin, ThumbsUp, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TabletLayout from '@/components/layout/TabletLayout';
import { coffeeItems } from '@/data/menu-items';
import { CoffeeItem } from '@/data/menu-items';

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

interface CoffeeDetailCardProps {
  coffee: CoffeeItem;
}

const CoffeeDetailCard: React.FC<CoffeeDetailCardProps> = ({ coffee }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="h-48 bg-amber-50 relative">
      {coffee.image && (
        <img 
          src={coffee.image} 
          alt={coffee.name} 
          className="w-full h-full object-cover"
        />
      )}
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-blue-dark mb-2">{coffee.name}</h3>
      
      <div className="flex flex-wrap items-center text-sm text-slate-600 mb-4 gap-x-4 gap-y-2">
        <div className="flex items-center">
          <Droplet size={14} className="mr-1 text-blue-600" />
          <span>{coffee.preparation}</span>
        </div>
        <div className="flex items-center">
          <MapPin size={14} className="mr-1 text-red-600" />
          <span>{coffee.origin}</span>
        </div>
      </div>
      
      <p className="text-slate-700 mb-4">{coffee.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-blue-dark mb-1">Flavor Notes</h4>
        <div className="flex flex-wrap gap-2">
          {coffee.flavorNotes.map((note, index) => (
            <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800">
              {note}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-blue-dark mb-1">Pairs Well With</h4>
        <div className="flex flex-wrap gap-2">
          {coffee.pairsWith.map((pair, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
              {pair}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">{coffee.price}</div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ThumbsUp size={14} />
          <span>Recommend</span>
        </Button>
      </div>
    </div>
  </motion.div>
);

const CoffeePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <TabletLayout
      currentStep={3}
      nextButtonText="Back to Categories"
      onNext={() => navigate('/categories')}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            className="inline-block mb-4"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Coffee size={40} className="text-amber-700" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold mb-3 text-blue-dark font-cafe"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Premium Coffee Selection
          </motion.h1>
          
          <motion.p 
            className="text-slate-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our artisanal coffee offerings designed to complement your AI learning experience
          </motion.p>
        </div>
        
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {coffeeItems.map((coffee) => (
            <CoffeeDetailCard
              key={coffee.id}
              coffee={coffee}
            />
          ))}
        </motion.div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={() => navigate('/categories')}
            className="bg-blue-dark hover:bg-blue-darker"
          >
            <span>Return to Menu Categories</span>
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </TabletLayout>
  );
};

export default CoffeePage; 