import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Coffee, 
  ChevronRight, 
  Star, 
  BadgeCheck, 
  Sparkles, 
  Flame,
  Heart,
  Info,
  PlusCircle,
  Check,
  BookOpen,
  Brain
} from 'lucide-react';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

import { 
  getMenuItemById, 
  menuItems,
  getPairingCoffees, 
  MenuItem, 
  CoffeeItem 
} from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';

const difficultyMap = {
  'beginner': { label: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', icon: <Star size={14} /> },
  'intermediate': { label: 'Intermediate', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100', icon: <Flame size={14} /> },
  'advanced': { label: 'Advanced', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100', icon: <Sparkles size={14} /> }
};

const badgeMap: Record<string, { icon: React.ReactNode, color: string }> = {
  'Popular': { icon: <Heart size={12} />, color: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100' },
  'Quick Start': { icon: <Clock size={12} />, color: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100' },
  'Featured': { icon: <Star size={12} />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' },
  'Trending': { icon: <Flame size={12} />, color: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' },
  'Essential': { icon: <BadgeCheck size={12} />, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100' },
  'Business': { icon: <Info size={12} />, color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100' }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 35px -10px rgba(0, 31, 84, 0.2), 0 10px 20px -5px rgba(0, 57, 166, 0.15)",
    transition: { duration: 0.3 }
  }
};

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  delay?: number;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pairingCoffees = getPairingCoffees(item.id);
  
  return (
    <motion.div
      className="h-full"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ delay: delay * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`h-full border-2 overflow-hidden transition-all duration-300 shadow-vsp-card hover:shadow-vsp-card-hover ${isHovered ? 'border-vsp-blue dark:border-vsp-blue' : 'border-transparent'}`}>
        <div className={`h-32 overflow-hidden bg-gradient-to-br ${item.bgColor} relative premium-card-header-blue`}>
          {item.featured && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-vsp-gold hover:bg-vsp-gold/90 text-vsp-darkgray font-medium">
                <Star className="mr-1 h-3 w-3" /> Featured
              </Badge>
            </div>
          )}
          <div className="h-full flex items-center justify-center p-4">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: isHovered ? [0, 5, 0] : 0 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Coffee size={52} className="text-vsp-blue/70" />
            </motion.div>
          </div>
        </div>
        
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-cafe text-vsp-darkgray dark:text-blue-light line-clamp-2">
              {item.title}
            </CardTitle>
            <div className="text-lg font-semibold text-vsp-blue dark:text-blue-light">
              {item.price}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {item.badges?.map(badge => (
              <Badge key={badge} variant="outline" className={`${badgeMap[badge]?.color} text-xs font-medium`}>
                {badgeMap[badge]?.icon}
                <span className="ml-1">{badge}</span>
              </Badge>
            ))}
            
            <Badge variant="outline" className={`${difficultyMap[item.difficulty].color} text-xs`}>
              {difficultyMap[item.difficulty].icon}
              <span className="ml-1">{difficultyMap[item.difficulty].label}</span>
            </Badge>
          </div>
          
          <CardDescription className="line-clamp-2 text-sm">
            {item.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {item.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="secondary" className="bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900 dark:text-blue-100 text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Clock size={14} className="mr-1" />
            <span>{item.duration}</span>
            
            {pairingCoffees.length > 0 && (
              <div className="ml-auto flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center text-vsp-blue dark:text-blue-400">
                        <Coffee size={14} className="mr-1" />
                        <span>{pairingCoffees.length} pairing{pairingCoffees.length > 1 ? 's' : ''}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div className="font-bold mb-1">Perfect pairings:</div>
                        <ul>
                          {pairingCoffees.map(coffee => (
                            <li key={coffee.id}>• {coffee.name}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-premium-gradient hover:bg-vsp-blue text-white"
            onClick={() => onSelect(item)}
          >
            <span>Select Item</span>
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface CoffeeCardProps {
  coffee: {
    id: string;
    name: string;
    price: string;
    image?: string;
    description?: string;
    preparation?: string;
    origin?: string;
    flavorNotes?: string[];
  };
  isSelected: boolean;
  onToggle: (coffee: any) => void;
  delay?: number;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, isSelected, onToggle, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="relative"
    >
      <div 
        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover-lift ${
          isSelected 
            ? 'bg-vsp-blue/10 border-2 border-vsp-blue dark:bg-vsp-blue/20 dark:border-vsp-blue/70' 
            : 'bg-card border-2 border-transparent hover:border-vsp-blue/40 dark:hover:border-vsp-blue/40'
        }`}
        onClick={() => onToggle(coffee)}
      >
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className={`w-12 h-12 rounded-full bg-vsp-blue/10 flex items-center justify-center ${isSelected ? 'premium-glow' : ''}`}>
              <Coffee size={24} className="text-vsp-blue" />
            </div>
            {isSelected && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-vsp-blue text-white rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Check size={12} />
              </motion.div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-vsp-darkgray dark:text-white">{coffee.name}</h3>
              <span className="text-sm font-medium text-vsp-blue dark:text-blue-light">{coffee.price}</span>
            </div>
            {coffee.flavorNotes && (
              <p className="text-xs text-muted-foreground mt-1">
                Notes: {coffee.flavorNotes.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface PreviewDialogProps {
  menuItem: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (menuItem: MenuItem, coffeeId?: string) => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ 
  menuItem, 
  isOpen, 
  onClose,
  onSelect
}) => {
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | undefined>(undefined);
  const pairingCoffees = menuItem ? getPairingCoffees(menuItem.id) : [];
  
  if (!menuItem) return null;
  
  const handleSelect = () => {
    onSelect(menuItem, selectedCoffeeId);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh] border-2 border-vsp-blue/20 shadow-premium">
        <DialogHeader className="premium-card-header">
          <DialogTitle className="text-xl font-cafe text-vsp-darkgray dark:text-blue-light flex items-center">
            <Coffee size={20} className="mr-2 text-vsp-blue" />
            {menuItem.title}
            <Badge className="ml-3 text-xs" variant="outline">
              {menuItem.category.charAt(0).toUpperCase() + menuItem.category.slice(1)}
            </Badge>
            <div className="ml-auto">{menuItem.price}</div>
          </DialogTitle>
          <DialogDescription>
            {menuItem.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-vsp-blue/5 to-white dark:from-blue-900/50 dark:to-blue-800/30 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-vsp-darkgray dark:text-blue-light">About this course</h3>
            <p className="text-sm text-muted-foreground">{menuItem.content.intro}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <h4 className="text-sm font-semibold mb-1 text-vsp-darkgray dark:text-blue-light">Duration</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-2" />
                  {menuItem.duration}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1 text-vsp-darkgray dark:text-blue-light">Difficulty</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  {difficultyMap[menuItem.difficulty].icon}
                  <span className="ml-2">{difficultyMap[menuItem.difficulty].label}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-1 text-vsp-darkgray dark:text-blue-light">Key Highlights</h4>
              <div className="flex flex-wrap gap-1">
                {menuItem.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900 dark:text-blue-100 text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
            
            {menuItem.content.interactiveElement && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-1 text-vsp-darkgray dark:text-blue-light">Interactive Experience</h4>
                <div className="bg-vsp-blue/10 dark:bg-blue-800/30 p-3 rounded-md text-sm text-vsp-darkgray dark:text-blue-50">
                  <div className="flex items-start">
                    <Sparkles size={16} className="mr-2 text-vsp-blue dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">{menuItem.content.interactiveElement.type.charAt(0).toUpperCase() + menuItem.content.interactiveElement.type.slice(1)}</div>
                      <p className="text-muted-foreground">{menuItem.content.interactiveElement.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {pairingCoffees.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-vsp-darkgray dark:text-blue-light gold-accent">
                Recommended Coffee Pairings
              </h3>
              <div className="space-y-3">
                {pairingCoffees.map((coffee) => (
                  <Card 
                    key={coffee.id} 
                    className={`cursor-pointer overflow-hidden transition-all ${selectedCoffeeId === coffee.id ? 'ring-2 ring-vsp-blue shadow-premium' : ''}`}
                    onClick={() => setSelectedCoffeeId(prev => prev === coffee.id ? undefined : coffee.id)}
                  >
                    <div className="flex items-center p-3">
                      <div className="mr-3">
                        <div className={`p-2 rounded-full ${selectedCoffeeId === coffee.id ? 'bg-premium-gradient text-white' : 'bg-vsp-blue/10 text-vsp-blue'}`}>
                          <Coffee size={28} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-vsp-darkgray dark:text-blue-light">{coffee.name}</h4>
                          <div className="font-medium text-vsp-blue">{coffee.price}</div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{coffee.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {coffee.flavorNotes?.map((note, index) => (
                            <Badge key={index} variant="outline" className="text-[10px] bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900 dark:text-blue-50">
                              {note}
                            </Badge>
                          )) || (
                            <Badge variant="outline" className="text-xs bg-vsp-blue/10 text-vsp-blue dark:bg-blue-900 dark:text-blue-50">
                              Premium Blend
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <div className="text-xs text-muted-foreground italic text-center">
                  Coffee pairing enhances your learning experience, but is optional
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="border-vsp-blue/50 text-vsp-darkgray hover:bg-vsp-blue/5">
            Cancel
          </Button>
          <Button onClick={handleSelect} className="bg-premium-gradient hover:bg-vsp-blue text-white">
            <PlusCircle size={16} className="mr-2" />
            Add to Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EnhancedMenuDisplayProps {
  title?: string;
  description?: string;
  showIntro?: boolean;
}

const EnhancedMenuDisplay: React.FC<EnhancedMenuDisplayProps> = ({ 
  title = "Today's AI Learning Menu", 
  description = "Browse our selection of AI learning items and craft your personalized learning journey",
  showIntro = true
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { session, createOrder } = useSessionStore();
  
  // Get featured items (items marked as featured or popular)
  const featuredItems = menuItems.filter(item => 
    item.featured || (item.badges && item.badges.includes('Popular'))
  );
  
  // Get courses (items categorized as course)
  const courseItems = menuItems.filter(item => item.category === 'course');
  
  // Get workshops (items categorized as workshop)
  const workshopItems = menuItems.filter(item => item.category === 'workshop');
  
  const isCoffeeSelected = (id: string) => session.selectedCoffees.some(coffee => coffee.id === id);
  
  const toggleCoffeeSelection = (coffee: CoffeeItem) => {
    const { addCoffeeToSelection, removeCoffeeFromSelection } = useSessionStore.getState();
    
    if (isCoffeeSelected(coffee.id)) {
      removeCoffeeFromSelection(coffee.id);
    } else {
      addCoffeeToSelection({
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
        image: coffee.image
      });
    }
  };
  
  const handlePreview = (item: MenuItem) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };
  
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewItem(null);
  };
  
  const handleSelect = (menuItem: MenuItem, coffeeId?: string) => {
    // Create an order with this menu item and optional coffee
    createOrder(menuItem.id, coffeeId);
    
    // Navigate to lesson page
    setIsPreviewOpen(false);
    
    if (menuItem.proceedToLesson) {
      setTimeout(() => {
        navigate('/lesson-page');
      }, 500);
    }
  };
  
  return (
    <div className="py-6">
      {showIntro && (
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="badge-premium-gold mb-2">
            VSP Premium Selection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-cafe font-bold mb-2 text-vsp-darkgray dark:text-white">
            {title}
          </h2>
          <div className="premium-divider-gold">
            <Star className="text-vsp-premium" size={16} />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      )}
      
      <Tabs 
        defaultValue="featured" 
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full max-w-xl mx-auto grid grid-cols-4 mb-8">
          <TabsTrigger value="featured" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
            <Star className="w-4 h-4 mr-2" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="courses" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="workshops" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
            <Brain className="w-4 h-4 mr-2" />
            Workshops
          </TabsTrigger>
          <TabsTrigger value="coffee" className="vsp-nav-item data-[state=active]:bg-vsp-blue data-[state=active]:text-white">
            <Coffee className="w-4 h-4 mr-2" />
            Coffee
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="space-y-8">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={handlePreview} 
                  delay={index}
                />
              ))}
            </div>
          </motion.section>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-8">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseItems.map((item, index) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={handlePreview}
                  delay={index}
                />
              ))}
            </div>
          </motion.section>
        </TabsContent>
        
        <TabsContent value="workshops" className="space-y-8">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopItems.map((item, index) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={handlePreview}
                  delay={index}
                />
              ))}
            </div>
          </motion.section>
        </TabsContent>
        
        <TabsContent value="coffee" className="space-y-8">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="vsp-premium-card-gold p-6 mb-6">
              <h3 className="font-cafe font-semibold text-xl mb-3 text-vsp-darkgray">Enhance Your Experience</h3>
              <p className="text-muted-foreground mb-4">Select from our premium coffee collection to pair with your learning modules</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-vsp-premium/10 p-1.5 rounded-full">
                  <BadgeCheck size={16} className="text-vsp-premium" />
                </div>
                <span className="text-vsp-darkgray">Expertly paired to enhance cognition and focus</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {session.selectedCoffees.map((coffee, index) => (
                <CoffeeCard 
                  key={coffee.id}
                  coffee={coffee}
                  isSelected={isCoffeeSelected(coffee.id)}
                  onToggle={toggleCoffeeSelection}
                  delay={index}
                />
              ))}
            </div>
          </motion.section>
        </TabsContent>
      </Tabs>
      
      <PreviewDialog 
        menuItem={previewItem} 
        isOpen={isPreviewOpen} 
        onClose={handleClosePreview}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default EnhancedMenuDisplay; 