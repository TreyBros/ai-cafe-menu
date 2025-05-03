import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '@/stores/sessionStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  Sparkles,
  Clock,
  Brain,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  BookOpenCheck,
  Rocket,
  Medal as MedalIcon,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { menuItems } from '@/data/menu-items';
import confetti from 'canvas-confetti';

export interface Achievement {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  requirement: number;
  type: 'completion' | 'assessment' | 'categories' | 'streak';
  progress: number;
  unlocked: boolean;
  rewardPoints: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementSystemProps {
  onClose: () => void;
  showModal: boolean;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ onClose, showModal }) => {
  const { session } = useSessionStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'progress'>('all');
  const [userPoints, setUserPoints] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  // Generate list of achievements
  const generateAchievements = (): Achievement[] => {
    // Prepare the data we need for achievement calculations
    const completedCount = session.completedItems.length;
    const completedCategories = [
      ...new Set(session.completedItems.map(item => item.category))
    ].length;
    
    const latestAssessment = session.productivityAssessments.length > 0
      ? session.productivityAssessments[session.productivityAssessments.length - 1]
      : null;
    
    const assessmentScore = latestAssessment?.score || 0;
    
    // Calculate streak - this would be more complex in a real app
    // Here we're just simulating it based on completed items count
    const streak = Math.min(Math.floor(completedCount / 2), 7);
    
    // Define achievements
    return [
      {
        id: 'getting-started',
        icon: <BookOpen className="h-6 w-6 text-accent-teal" />,
        name: 'First Step',
        description: 'Complete your first learning module',
        requirement: 1,
        type: 'completion',
        progress: completedCount,
        unlocked: completedCount >= 1,
        rewardPoints: 50,
        rarity: 'common'
      },
      {
        id: 'eager-learner',
        icon: <BookOpenCheck className="h-6 w-6 text-accent-teal" />,
        name: 'Eager Learner',
        description: 'Complete 3 learning modules',
        requirement: 3,
        type: 'completion',
        progress: completedCount,
        unlocked: completedCount >= 3,
        rewardPoints: 100,
        rarity: 'common'
      },
      {
        id: 'productivity-master',
        icon: <Rocket className="h-6 w-6 text-accent-teal" />,
        name: 'Productivity Master',
        description: 'Complete all learning modules',
        requirement: menuItems.length,
        type: 'completion',
        progress: completedCount,
        unlocked: completedCount >= menuItems.length,
        rewardPoints: 500,
        rarity: 'legendary'
      },
      {
        id: 'well-rounded',
        icon: <Brain className="h-6 w-6 text-accent-yellow" />,
        name: 'Well-Rounded',
        description: 'Try modules from all categories',
        requirement: 3, // Assuming 3 categories
        type: 'categories',
        progress: completedCategories,
        unlocked: completedCategories >= 3,
        rewardPoints: 200,
        rarity: 'uncommon'
      },
      {
        id: 'assessment-novice',
        icon: <Medal className="h-6 w-6 text-coffee-medium" />,
        name: 'Assessment Novice',
        description: 'Score at least 40% on the productivity assessment',
        requirement: 40,
        type: 'assessment',
        progress: assessmentScore,
        unlocked: assessmentScore >= 40,
        rewardPoints: 100,
        rarity: 'common'
      },
      {
        id: 'assessment-pro',
        icon: <Award className="h-6 w-6 text-accent-yellow" />,
        name: 'Assessment Pro',
        description: 'Score at least 70% on the productivity assessment',
        requirement: 70,
        type: 'assessment',
        progress: assessmentScore,
        unlocked: assessmentScore >= 70,
        rewardPoints: 300,
        rarity: 'rare'
      },
      {
        id: 'assessment-expert',
        icon: <Trophy className="h-6 w-6 text-accent-teal" />,
        name: 'Assessment Expert',
        description: 'Score at least 90% on the productivity assessment',
        requirement: 90,
        type: 'assessment',
        progress: assessmentScore,
        unlocked: assessmentScore >= 90,
        rewardPoints: 500,
        rarity: 'epic'
      },
      {
        id: 'consistent-learner',
        icon: <Clock className="h-6 w-6 text-coffee-medium" />,
        name: 'Consistent Learner',
        description: 'Maintain a 3-day learning streak',
        requirement: 3,
        type: 'streak',
        progress: streak,
        unlocked: streak >= 3,
        rewardPoints: 150,
        rarity: 'uncommon'
      },
      {
        id: 'dedicated-learner',
        icon: <Star className="h-6 w-6 text-accent-yellow" />,
        name: 'Dedicated Learner',
        description: 'Maintain a 7-day learning streak',
        requirement: 7,
        type: 'streak',
        progress: streak,
        unlocked: streak >= 7,
        rewardPoints: 300,
        rarity: 'rare'
      },
      {
        id: 'innovation-mindset',
        icon: <Lightbulb className="h-6 w-6 text-accent-teal" />,
        name: 'Innovation Mindset',
        description: 'Complete all advanced modules',
        requirement: menuItems.filter(item => item.category === 'dessert').length,
        type: 'completion',
        progress: session.completedItems.filter(item => item.category === 'dessert').length,
        unlocked: session.completedItems.filter(item => item.category === 'dessert').length >= 
                 menuItems.filter(item => item.category === 'dessert').length,
        rewardPoints: 400,
        rarity: 'epic'
      }
    ];
  };

  const [achievements, setAchievements] = useState<Achievement[]>(generateAchievements());

  // Check for newly unlocked achievements
  useEffect(() => {
    const currentAchievements = generateAchievements();
    setAchievements(currentAchievements);
    
    // Calculate points
    const points = currentAchievements
      .filter(a => a.unlocked)
      .reduce((total, achievement) => total + achievement.rewardPoints, 0);
    
    setUserPoints(points);
    
    // Store current unlocked achievements to compare
    const prevUnlocked = localStorage.getItem('unlockedAchievements');
    const prevUnlockedIds = prevUnlocked ? JSON.parse(prevUnlocked) : [];
    
    // Get currently unlocked achievements
    const currentlyUnlocked = currentAchievements
      .filter(a => a.unlocked)
      .map(a => a.id);
    
    // Find new unlocks (in current but not in previous)
    const newUnlocks = currentlyUnlocked.filter(id => !prevUnlockedIds.includes(id));
    
    if (newUnlocks.length > 0) {
      // Get the first new achievement to display
      const newAchievement = currentAchievements.find(a => a.id === newUnlocks[0]);
      if (newAchievement) {
        setNewUnlock(newAchievement);
        
        // Show confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    
    // Save current unlocked achievements
    localStorage.setItem('unlockedAchievements', JSON.stringify(currentlyUnlocked));
  }, [session]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-accent-teal/30 bg-accent-teal/5';
      case 'uncommon':
        return 'border-coffee-medium/30 bg-coffee-medium/5';
      case 'rare':
        return 'border-accent-yellow/30 bg-accent-yellow/5';
      case 'epic':
        return 'border-purple-500/30 bg-purple-500/5';
      case 'legendary':
        return 'border-amber-500/30 bg-amber-500/5';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-accent-teal';
      case 'uncommon':
        return 'text-coffee-medium';
      case 'rare':
        return 'text-accent-yellow';
      case 'epic':
        return 'text-purple-500';
      case 'legendary':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  };

  const getUserLevel = () => {
    if (userPoints < 100) return { level: 1, title: 'Beginner' };
    if (userPoints < 300) return { level: 2, title: 'Enthusiast' };
    if (userPoints < 600) return { level: 3, title: 'Apprentice' };
    if (userPoints < 1000) return { level: 4, title: 'Adept' };
    if (userPoints < 1500) return { level: 5, title: 'Expert' };
    return { level: 6, title: 'Master' };
  };

  const level = getUserLevel();

  const filteredAchievements = () => {
    switch (activeTab) {
      case 'unlocked':
        return achievements.filter(a => a.unlocked);
      case 'progress':
        return achievements.filter(a => !a.unlocked && a.progress > 0);
      default:
        return achievements;
    }
  };

  const handleCloseNewUnlock = () => {
    setNewUnlock(null);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden max-w-5xl w-[90vw] max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-coffee-dark text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">Achievements</h2>
                  </div>
                  <Button variant="ghost" onClick={onClose} className="text-white hover:bg-coffee-medium">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* User Level Info */}
              <div className="bg-coffee-dark/90 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-teal rounded-full p-2">
                      <MedalIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Level {level.level}: {level.title}</h3>
                      <div className="text-sm text-gray-200">Achievement points: {userPoints}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-200 mb-1">
                      {achievements.filter(a => a.unlocked).length} / {achievements.length} achievements
                    </div>
                    <Progress
                      value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100}
                      className="h-2 w-40"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex">
                  <button
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'all'
                        ? 'border-accent-teal text-accent-teal'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Achievements
                  </button>
                  <button
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'unlocked'
                        ? 'border-accent-teal text-accent-teal'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('unlocked')}
                  >
                    Unlocked
                  </button>
                  <button
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'progress'
                        ? 'border-accent-teal text-accent-teal'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('progress')}
                  >
                    In Progress
                  </button>
                </div>
              </div>
              
              {/* Achievements Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredAchievements().map(achievement => (
                    <Card 
                      key={achievement.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        getRarityColor(achievement.rarity)
                      } ${
                        achievement.unlocked ? 'border border-accent-teal/50' : 'opacity-80'
                      }`}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            achievement.unlocked 
                              ? 'bg-accent-teal/10' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            {achievement.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">
                                {achievement.name}
                              </h3>
                              {achievement.unlocked && (
                                <CheckCircle2 className="h-4 w-4 text-accent-teal" />
                              )}
                            </div>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {achievement.description}
                            </p>
                            
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span className={getRarityTextColor(achievement.rarity)}>
                                {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                              </span>
                              <span>
                                {achievement.progress} / {achievement.requirement}
                              </span>
                            </div>
                            
                            <Progress 
                              value={(achievement.progress / achievement.requirement) * 100} 
                              className="h-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Achievement detail dialog */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${
                    selectedAchievement.unlocked 
                      ? 'bg-accent-teal/10' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {selectedAchievement.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">{selectedAchievement.name}</h3>
                    <div className={`text-sm ${getRarityTextColor(selectedAchievement.rarity)}`}>
                      {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => setSelectedAchievement(null)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAchievement.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Progress</h4>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>
                      {selectedAchievement.progress} / {selectedAchievement.requirement}
                    </span>
                    <span>
                      {Math.round((selectedAchievement.progress / selectedAchievement.requirement) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(selectedAchievement.progress / selectedAchievement.requirement) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Reward</h4>
                  <div className="flex items-center gap-2 text-accent-teal">
                    <Trophy size={16} />
                    <span>{selectedAchievement.rewardPoints} points</span>
                  </div>
                </div>
                
                {selectedAchievement.unlocked && (
                  <div className="bg-accent-teal/10 border border-accent-teal/20 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal" />
                    <span className="text-sm font-medium">Achievement Unlocked!</span>
                  </div>
                )}
                
                {!selectedAchievement.unlocked && (
                  <div className="bg-muted/20 border border-muted/30 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">
                      {selectedAchievement.type === 'completion' && (
                        <span>Complete {selectedAchievement.requirement} modules to unlock.</span>
                      )}
                      {selectedAchievement.type === 'assessment' && (
                        <span>Score at least {selectedAchievement.requirement}% on the assessment.</span>
                      )}
                      {selectedAchievement.type === 'categories' && (
                        <span>Try modules from {selectedAchievement.requirement} different categories.</span>
                      )}
                      {selectedAchievement.type === 'streak' && (
                        <span>Complete a {selectedAchievement.requirement}-day learning streak.</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* New Achievement Notification */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
          >
            <Card className="border-2 border-accent-teal shadow-lg bg-white dark:bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent-teal/10 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-accent-teal" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">Achievement Unlocked!</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-accent-teal/10 p-1 rounded-full">
                        {newUnlock.icon}
                      </div>
                      <span className="font-medium">{newUnlock.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-accent-teal text-sm">
                        <Trophy size={14} />
                        <span>+{newUnlock.rewardPoints} points</span>
                      </div>
                      
                      <Button size="sm" onClick={handleCloseNewUnlock}>
                        <CheckCircle2 size={14} className="mr-1" />
                        Got it!
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementSystem; 