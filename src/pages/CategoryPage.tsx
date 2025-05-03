
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Coffee, Medal, Star } from 'lucide-react';
import TabletLayout from '@/components/layout/TabletLayout';
import { useSessionStore } from '@/stores/sessionStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  onClick: () => void;
  selected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  onClick, 
  selected 
}) => (
  <motion.div
    variants={itemVariants}
    className={`p-6 rounded-xl cursor-pointer shadow-sm transition-all duration-300 ${selected ? 'ring-4 ring-blue-600 scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}
    style={{ backgroundColor: bgColor }}
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      <div className="bg-white/90 p-3 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-blue-dark mb-1">{title}</h3>
        <p className="text-sm text-slate-700">{description}</p>
      </div>
      {selected && (
        <div className="bg-blue-600 text-white p-2 rounded-full">
          <Star size={16} />
        </div>
      )}
    </div>
  </motion.div>
);

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useSessionStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    {
      id: 'featured',
      title: 'Featured Items',
      description: 'Our most popular and recommended AI learning experiences',
      icon: <Sparkles size={24} className="text-amber-500" />,
      bgColor: '#fef9ec'
    },
    {
      id: 'courses',
      title: 'Full Courses',
      description: 'Comprehensive AI learning journeys from fundamentals to advanced concepts',
      icon: <BookOpen size={24} className="text-blue-600" />,
      bgColor: '#edf2fc'
    },
    {
      id: 'workshops',
      title: 'Workshops',
      description: 'Hands-on, interactive sessions focused on specific AI skills and tools',
      icon: <Medal size={24} className="text-indigo-600" />,
      bgColor: '#f2eefa'
    },
    {
      id: 'coffee',
      title: 'Coffee Selection',
      description: 'Premium coffees to enhance your AI learning experience',
      icon: <Coffee size={24} className="text-amber-700" />,
      bgColor: '#f8f1e9'
    }
  ];
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleContinue = () => {
    if (selectedCategory) {
      navigate(`/items?category=${selectedCategory}`);
    }
  };
  
  // Safely get the userName from session
  const userName = session?.userName || '';
  
  return (
    <TabletLayout
      currentStep={2}
      nextButtonText="Continue"
      showNextButton={!!selectedCategory}
      onNext={handleContinue}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-blue-dark font-cafe">
            Choose a Menu Category
          </h1>
          <p className="text-slate-600">
            Select a category to explore our premium AI learning options{userName ? `, ${userName}` : ''}
          </p>
        </div>
        
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              bgColor={category.bgColor}
              onClick={() => handleCategorySelect(category.id)}
              selected={selectedCategory === category.id}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tap a category to select it, then press Continue
        </motion.div>
      </div>
    </TabletLayout>
  );
};

export default CategoryPage;
