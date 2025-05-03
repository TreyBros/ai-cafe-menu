import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, BadgeCheck, PlayCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TabletLayout from '@/components/layout/TabletLayout';
import { getMenuItemById } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const ItemDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const { addCompletedItem } = useSessionStore();
  
  const menuItem = itemId ? getMenuItemById(itemId) : undefined;
  
  if (!menuItem) {
    return (
      <TabletLayout currentStep={4}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-blue-dark mb-4">Item Not Found</h2>
          <p className="text-slate-600 mb-6">The menu item you're looking for could not be found.</p>
          <Button onClick={() => navigate('/categories')}>
            Return to Categories
          </Button>
        </div>
      </TabletLayout>
    );
  }
  
  const handleSelectItem = () => {
    // Add to completed items
    addCompletedItem({
      id: menuItem.id,
      title: menuItem.title,
      category: menuItem.category,
      price: menuItem.price,
      image: menuItem.image
    });
    
    // Navigate to the coffee pairing page
    navigate(`/coffee-pairing/${menuItem.id}`);
  };
  
  return (
    <TabletLayout
      currentStep={4}
      nextButtonText="Select This Item"
      onNext={handleSelectItem}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-xl overflow-hidden shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Hero image */}
          <div className={`h-56 bg-gradient-to-br ${menuItem.bgColor} relative`}>
            <img 
              src={menuItem.image} 
              alt={menuItem.title} 
              className="w-full h-full object-cover opacity-90"
            />
            {menuItem.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 text-white">
                  Featured
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {menuItem.badges?.map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-slate-100">
                  {badge}
                </Badge>
              ))}
              <div className="flex items-center text-sm text-slate-600 ml-auto">
                <Clock size={14} className="mr-1" />
                <span>{menuItem.duration}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-blue-dark mb-2">{menuItem.title}</h1>
            
            <div className="flex items-center text-sm text-slate-600 mb-4">
              <BadgeCheck size={16} className="mr-1" />
              <span className="capitalize">{menuItem.difficulty} level</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{menuItem.category}</span>
            </div>
            
            <p className="text-slate-700 mb-6">{menuItem.description}</p>
            
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl font-bold text-blue-600">{menuItem.price}</div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.open(menuItem.content.videoUrl, '_blank')}
                disabled={!menuItem.content.videoUrl}
              >
                <PlayCircle size={16} />
                Preview
              </Button>
            </div>
            
            {/* Key points */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-dark mb-4">What You'll Learn</h3>
              <ul className="space-y-3">
                {menuItem.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-dark mb-4">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {menuItem.highlights.map((highlight, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-slate-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-dark mb-2">Summary</h3>
              <p className="text-slate-700">{menuItem.content.summary}</p>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="bg-blue-dark hover:bg-blue-darker w-full sm:w-auto"
                onClick={handleSelectItem}
              >
                <span>Select This Item</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </TabletLayout>
  );
};

export default ItemDetailPage; 