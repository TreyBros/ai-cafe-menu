import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useSessionStore } from '@/stores/sessionStore';
import { menuItems } from '@/data/menu-items';
import { 
  BarChart, 
  BookOpen, 
  Check, 
  CheckCheck, 
  Clock, Sparkles, 
  Timer,
  TrendingUp
} from 'lucide-react';

interface AnimatedProgressTrackerProps {
  className?: string;
  showDetails?: boolean;
  onViewDashboard?: () => void;
}

const AnimatedProgressTracker: React.FC<AnimatedProgressTrackerProps> = ({ 
  className = '',
  showDetails = false,
  onViewDashboard
}) => {
  const { session } = useSessionStore();
  const [progress, setProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [timeData, setTimeData] = useState({
    hoursSaved: 0,
    minutesLearned: 0,
    sessionsCompleted: 0
  });
  
  // Calculate the completion percentage
  const completedItemIds = session.completedItems.map(item => item.id);
  const totalItems = menuItems.length;
  const completionPercentage = Math.round((completedItemIds.length / totalItems) * 100);
  
  // Calculate category-specific progress
  const appetizers = menuItems.filter(item => item.category === 'appetizer');
  const entrees = menuItems.filter(item => item.category === 'entree');
  const desserts = menuItems.filter(item => item.category === 'dessert');
  
  const appetizerCompletionCount = appetizers.filter(item => 
    completedItemIds.includes(item.id)
  ).length;
  
  const entreeCompletionCount = entrees.filter(item => 
    completedItemIds.includes(item.id)
  ).length;
  
  const dessertCompletionCount = desserts.filter(item => 
    completedItemIds.includes(item.id)
  ).length;
  
  const appetizerPercentage = Math.round((appetizerCompletionCount / appetizers.length) * 100);
  const entreePercentage = Math.round((entreeCompletionCount / entrees.length) * 100);
  const dessertPercentage = Math.round((dessertCompletionCount / desserts.length) * 100);
  
  // Calculate time saved metrics
  useEffect(() => {
    // Calculate hours saved metric (estimated from completed modules)
    let weeklyHoursSaved = 0;
    
    // Base time saved per category
    if (appetizerCompletionCount > 0) weeklyHoursSaved += 1;
    if (entreeCompletionCount > 0) weeklyHoursSaved += 2;
    if (dessertCompletionCount > 0) weeklyHoursSaved += 3;
    
    // Calculate learning time in minutes
    let minutesLearned = 0;
    menuItems.forEach(item => {
      if (completedItemIds.includes(item.id)) {
        const durationMatch = item.duration.match(/(\d+)/);
        if (durationMatch) {
          minutesLearned += parseInt(durationMatch[0]);
        }
      }
    });
    
    // Set the time data
    setTimeData({
      hoursSaved: weeklyHoursSaved,
      minutesLearned,
      sessionsCompleted: session.completedItems.length
    });
  }, [session]);
  
  // Animate progress on load
  useEffect(() => {
    if (!hasLoaded) {
      setTimeout(() => {
        setHasLoaded(true);
      }, 300);
    }
    
    // Animate progress growth
    const timer = setTimeout(() => {
      setProgress(completionPercentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [completionPercentage, hasLoaded]);
  
  // If no completed items, show a starting message
  if (!hasLoaded) {
    return (
      <div className={`${className} flex items-center justify-center text-center p-4`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BookOpen className="mx-auto h-10 w-10 text-coffee-medium mb-2 opacity-70" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </motion.div>
      </div>
    );
  }
  
  // If no completed items, show a starting message
  if (completedItemIds.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center text-center p-4`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BookOpen className="mx-auto h-10 w-10 text-coffee-medium mb-2 opacity-70" />
          <p className="text-muted-foreground">Begin your learning journey by selecting a module</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center">
            <BarChart className="h-5 w-5 text-accent-teal mr-2" />
            <h3 className="font-medium">Learning Progress</h3>
          </div>
          <div>
            <span className="text-2xl font-bold">{progress}%</span>
          </div>
        </div>
        
        <div className="relative h-3 mb-4">
          <Progress
            value={progress}
            className="h-3"
          />
          
          {progress > 0 && progress <= 25 && (
            <motion.div 
              className="absolute right-[75%] -top-1"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <div className="bg-accent-teal h-5 w-5 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          )}
          
          {progress > 25 && progress <= 50 && (
            <motion.div 
              className="absolute right-[50%] -top-1"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <div className="bg-accent-teal h-5 w-5 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          )}
          
          {progress > 50 && progress <= 75 && (
            <motion.div 
              className="absolute right-[25%] -top-1"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <div className="bg-accent-teal h-5 w-5 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          )}
          
          {progress > 75 && (
            <motion.div 
              className="absolute right-[0%] -top-1"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <div className="bg-accent-teal h-5 w-5 rounded-full flex items-center justify-center">
                <CheckCheck className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          )}
        </div>
        
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3 }}
            className="space-y-6 mt-2"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Quick Start Modules</span>
                  <span className="text-sm text-muted-foreground">{appetizerCompletionCount}/{appetizers.length}</span>
                </div>
                <Progress value={appetizerPercentage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Core AI Tools</span>
                  <span className="text-sm text-muted-foreground">{entreeCompletionCount}/{entrees.length}</span>
                </div>
                <Progress value={entreePercentage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Advanced Productivity</span>
                  <span className="text-sm text-muted-foreground">{dessertCompletionCount}/{desserts.length}</span>
                </div>
                <Progress value={dessertPercentage} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-lg p-3 flex flex-col items-center">
                <Timer className="h-5 w-5 text-accent-teal mb-1" />
                <span className="text-lg font-bold">{timeData.hoursSaved}</span>
                <span className="text-xs text-muted-foreground">hrs/week saved</span>
              </div>
              
              <div className="bg-coffee-light/5 border border-coffee-light/20 rounded-lg p-3 flex flex-col items-center">
                <Clock className="h-5 w-5 text-coffee-light mb-1" />
                <span className="text-lg font-bold">{timeData.minutesLearned}</span>
                <span className="text-xs text-muted-foreground">mins learning</span>
              </div>
              
              <div className="bg-coffee-medium/5 border border-coffee-medium/20 rounded-lg p-3 flex flex-col items-center">
                <TrendingUp className="h-5 w-5 text-coffee-medium mb-1" />
                <span className="text-lg font-bold">{completedItemIds.length}</span>
                <span className="text-xs text-muted-foreground">modules done</span>
              </div>
            </div>
            
            {completionPercentage === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent-teal/10 border border-accent-teal/20 rounded-lg p-3 flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-accent-teal mr-2" />
                <span className="font-medium text-accent-teal">Journey Complete!</span>
              </motion.div>
            )}
            
            {onViewDashboard && (
              <button 
                onClick={onViewDashboard}
                className="text-sm text-accent-teal flex items-center justify-center hover:underline transition-colors w-full"
              >
                <BarChart className="h-4 w-4 mr-1" /> View detailed dashboard
              </button>
            )}
          </motion.div>
        )}
        
        {!showDetails && onViewDashboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-right"
          >
            <button 
              onClick={onViewDashboard}
              className="text-sm text-accent-teal flex items-center justify-end hover:underline transition-colors"
            >
              <BarChart className="h-4 w-4 mr-1" /> View detailed stats
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnimatedProgressTracker; 