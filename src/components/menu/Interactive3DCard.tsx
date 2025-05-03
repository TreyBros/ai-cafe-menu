import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/data/menu-items';

interface Interactive3DCardProps {
  item: MenuItem;
  onClick: (id: string) => void;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position
    const rotateYVal = -((e.clientX - centerX) / (rect.width / 2)) * 8;
    const rotateXVal = ((e.clientY - centerY) / (rect.height / 2)) * 8;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
    setTranslateZ(10);
  };
  
  const resetRotation = () => {
    setRotateX(0);
    setRotateY(0);
    setTranslateZ(0);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'appetizer':
        return 'bg-accent-teal/10 text-accent-teal';
      case 'entree':
        return 'bg-coffee-medium/10 text-coffee-medium';
      case 'dessert':
        return 'bg-accent-yellow/10 text-coffee-dark';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'appetizer':
        return 'Quick Start';
      case 'entree':
        return 'Core Learning';
      case 'dessert':
        return 'Advanced';
      default:
        return 'Other';
    }
  };
  
  return (
    <div 
      className="w-full perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={cardRef}
        className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transition: isHovered ? 'none' : 'all 0.5s ease'
        }}
      >
        <div className="relative overflow-hidden h-48">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          
          {/* Card image */}
          <img 
            src={item.image || `/coffee-${Math.floor(Math.random() * 5) + 1}.jpg`} 
            alt={item.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(110%)' : 'scale(100%)'
            }}
          />
          
          {/* Category badge */}
          <Badge 
            className={`absolute top-3 left-3 z-20 ${getCategoryColor(item.category)}`}
          >
            {getCategoryLabel(item.category)}
          </Badge>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 w-full p-4 z-20">
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock size={14} className="mr-1" />
            <span>{item.duration}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              onClick={() => onClick(item.id)}
              variant="outline" 
              className="w-full border-coffee-medium text-coffee-medium hover:bg-coffee-light/10 group"
            >
              Explore 
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
        
        {/* 3D lighting effect elements */}
        <div 
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isHovered ? rotateY + 50 : 50}% ${isHovered ? rotateX + 50 : 50}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`,
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      </motion.div>
    </div>
  );
};

export default Interactive3DCard; 