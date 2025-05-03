import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, BadgeCheck, Sparkles, Star, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TabletLayout from '@/components/layout/TabletLayout';
import { menuItems, getMenuItemsByCategory } from '@/data/menu-items';
import { MenuItem } from '@/data/menu-items';

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

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
  >
    <div className={`h-32 bg-gradient-to-br ${item.bgColor}`}>
      {item.image && (
        <div className="h-full w-full flex items-center justify-center overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover opacity-90"
          />
          {item.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-amber-500 text-white">
                <Star size={12} className="mr-1" /> Featured
              </Badge>
            </div>
          )}
        </div>
      )}
    </div>
    
    <div className="p-4">
      <h3 className="text-lg font-bold text-blue-dark mb-1">{item.title}</h3>
      
      <div className="flex items-center text-sm text-slate-600 mb-2">
        <Clock size={14} className="mr-1" />
        <span>{item.duration}</span>
        <span className="mx-2">•</span>
        <BadgeCheck size={14} className="mr-1" />
        <span className="capitalize">{item.difficulty}</span>
      </div>
      
      <p className="text-sm text-slate-700 mb-3 line-clamp-2">{item.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-blue-600 font-bold">{item.price}</div>
        <ChevronRight size={16} className="text-slate-400" />
      </div>
    </div>
  </motion.div>
);

const ItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  
  useEffect(() => {
    if (category === 'featured') {
      // Filter featured items
      setDisplayedItems(menuItems.filter(item => item.featured));
      setCategoryName('Featured Items');
    } else if (category === 'coffee') {
      // This would be handled differently in a real app,
      // since coffee is a separate data structure
      navigate('/coffee');
    } else if (category === 'courses') {
      // Filter entree items (treating courses as entrees)
      setDisplayedItems(getMenuItemsByCategory('entree'));
      setCategoryName('Full Courses');
    } else if (category === 'workshops') {
      // Filter appetizer items (treating workshops as appetizers)
      setDisplayedItems(getMenuItemsByCategory('appetizer'));
      setCategoryName('Workshops');
    } else {
      // Default to showing all items
      setDisplayedItems(menuItems);
      setCategoryName('All Menu Items');
    }
  }, [category, navigate]);
  
  const handleItemSelect = (itemId: string) => {
    navigate(`/item-detail/${itemId}`);
  };
  
  return (
    <TabletLayout
      currentStep={3}
      showNextButton={false}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-3 text-blue-dark font-cafe"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoryName}
          </motion.h1>
          <motion.p 
            className="text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select an item to view details
          </motion.p>
        </div>
        
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onClick={() => handleItemSelect(item.id)}
            />
          ))}
        </motion.div>
        
        {displayedItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">No items available</h3>
            <p className="text-slate-500">Please select a different category</p>
          </motion.div>
        )}
      </div>
    </TabletLayout>
  );
};

export default ItemsPage; 