import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Coffee, 
  CheckCircle, 
  Clock, 
  Star, 
  BookOpen,
  Brain,
  Play,
  PauseCircle,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { MenuItem, getCoffeeItemById } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const slideIn = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface EnhancedLessonContentProps {
  lesson: MenuItem;
  coffeeId?: string;
}

const EnhancedLessonContent: React.FC<EnhancedLessonContentProps> = ({ lesson, coffeeId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { addCompletedItem, addSkill, updateTimeSpent, completeOrderItem, getCurrentOrder } = useSessionStore();
  
  const matchingCoffee = coffeeId ? getCoffeeItemById(coffeeId) : null;
  const currentOrderItems = getCurrentOrder();
  const currentOrderItem = currentOrderItems.find(order => order.menuItemId === lesson.id);
  
  // Learning experience skill gain based on lesson type
  const skillsGained = [
    `Understanding of ${lesson.title.toLowerCase()}`,
    `Familiarity with key ${lesson.category} concepts in AI`,
    lesson.difficulty === 'beginner' 
      ? 'Foundation AI knowledge' 
      : lesson.difficulty === 'intermediate'
        ? 'Applied AI techniques'
        : 'Advanced AI mastery'
  ];
  
  // Simulate progress as user reads
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
      
      setReadingTime(prev => prev + 1);
    }, 1200); // Update every 1.2 seconds to simulate reading
    
    return () => clearInterval(timer);
  }, [isCompleted]);
  
  // Mark as complete when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && !isCompleted) {
      handleComplete();
    }
  }, [progress]);
  
  const handleComplete = () => {
    setIsCompleted(true);
    
    // Add to completed items
    addCompletedItem({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category,
      price: lesson.price,
      image: lesson.image
    });
    
    // Add skills gained
    skillsGained.forEach(skill => {
      addSkill(skill);
    });
    
    // Update time spent in minutes
    const minutesSpent = Math.ceil(readingTime / 60);
    updateTimeSpent(minutesSpent);
    
    // Complete the order if it exists
    if (currentOrderItem) {
      completeOrderItem(currentOrderItem.id);
    }
    
    // Show completion toast
    toast({
      title: "Course completed!",
      description: `You've successfully completed "${lesson.title}". New skills have been added to your profile.`,
      duration: 5000,
    });
  };
  
  const difficultyColorMap = {
    'beginner': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100',
    'intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100',
    'advanced': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100'
  };
  
  return (
    <div className="space-y-8">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="text-blue-medium hover:text-blue-dark hover:bg-blue-50 dark:text-blue-light dark:hover:text-blue-200"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Menu
        </Button>
        
        <div className="flex items-center">
          <Clock size={16} className="text-blue-medium mr-2" />
          <span className="text-sm text-muted-foreground">
            Reading time: {readingTime < 60 
              ? `${readingTime} sec` 
              : `${Math.floor(readingTime / 60)}:${String(readingTime % 60).padStart(2, '0')} min`
            }
          </span>
        </div>
      </div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl overflow-hidden text-white"
      >
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/20 hover:bg-white/30">
                  {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
                </Badge>
                
                <Badge className={`${difficultyColorMap[lesson.difficulty]} bg-opacity-20`}>
                  {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                </Badge>
                
                <div className="ml-auto md:hidden text-lg font-bold">
                  {lesson.price}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-cafe font-bold mb-3">
                {lesson.title}
              </h1>
              
              <p className="text-blue-50 md:max-w-2xl">
                {lesson.description}
              </p>
            </div>
            
            <div className="hidden md:block text-center">
              <div className="font-cafe text-3xl font-bold">
                {lesson.price}
              </div>
              <div className="text-sm text-blue-100 mt-1">
                {lesson.duration} learning time
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-blue-400/30" />
          </div>
        </div>
      </motion.div>
      
      {/* Lesson content tabs */}
      <Tabs 
        defaultValue="content" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full mb-6 grid grid-cols-3 bg-blue-50 dark:bg-blue-900/30">
          <TabsTrigger 
            value="content" 
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger 
            value="interactive" 
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Interactive
          </TabsTrigger>
          <TabsTrigger 
            value="coffee" 
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Coffee className="h-4 w-4 mr-2" />
            Coffee Pairing
          </TabsTrigger>
        </TabsList>
        
        {/* Main content tab */}
        <TabsContent value="content" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <motion.h2 
                    custom={0}
                    variants={fadeInUp}
                    className="text-2xl font-cafe font-semibold mb-4 text-blue-dark dark:text-blue-light"
                  >
                    Introduction
                  </motion.h2>
                  
                  <motion.p 
                    custom={1}
                    variants={fadeInUp}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {lesson.content.intro}
                  </motion.p>
                  
                  {lesson.content.videoUrl && (
                    <motion.div 
                      custom={2}
                      variants={fadeInUp}
                      className="mt-6 rounded-lg overflow-hidden bg-blue-900/10 relative"
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                        <Button 
                          size="icon" 
                          className="rounded-full bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform duration-200 w-16 h-16"
                          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        >
                          {isVideoPlaying ? 
                            <PauseCircle size={32} /> : 
                            <Play size={32} className="ml-1" />
                          }
                        </Button>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/40 text-center text-sm text-muted-foreground">
                        {isVideoPlaying ? 
                          "Video playing... (Simulated video content)" : 
                          "Click to watch the introduction video"
                        }
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              {/* Key points */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <motion.h2 
                    custom={0}
                    variants={fadeInUp}
                    className="text-2xl font-cafe font-semibold mb-4 text-blue-dark dark:text-blue-light"
                  >
                    Key Learning Points
                  </motion.h2>
                  
                  <div className="space-y-4">
                    {lesson.content.keyPoints.map((point, index) => (
                      <motion.div 
                        key={index}
                        custom={index + 1}
                        variants={slideIn}
                        className="flex"
                      >
                        <div className="mr-4 mt-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Summary */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-3 mr-4">
                      <Lightbulb className="text-blue-600 dark:text-blue-200" size={24} />
                    </div>
                    
                    <div>
                      <motion.h2 
                        custom={0}
                        variants={fadeInUp}
                        className="text-2xl font-cafe font-semibold mb-2 text-blue-dark dark:text-blue-light"
                      >
                        Summary
                      </motion.h2>
                      
                      <motion.p 
                        custom={1}
                        variants={fadeInUp}
                        className="text-muted-foreground"
                      >
                        {lesson.content.summary}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Completion card */}
              <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/30 pb-4">
                  <CardTitle className="text-blue-dark dark:text-blue-light font-cafe text-xl">
                    {isCompleted ? 'Course Completed!' : 'Your Progress'}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  {isCompleted ? (
                    <div className="text-center py-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 mb-4">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-blue-dark dark:text-blue-light mb-2">
                        Great job!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You've successfully completed this course and earned new skills.
                      </p>
                      <div className="space-y-2">
                        {skillsGained.map((skill, index) => (
                          <div 
                            key={index} 
                            className="flex items-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded"
                          >
                            <CheckCircle className="text-blue-500 mr-2" size={16} />
                            <span className="text-sm text-blue-dark dark:text-blue-light">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Course progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Continue reading to complete this course and earn your certificate.
                      </p>
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={handleComplete}
                      >
                        <CheckCircle className="mr-2" size={16} />
                        Mark as Completed
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Course details */}
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-dark dark:text-blue-light font-cafe text-xl">
                    Course Details
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-2">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-blue-50 dark:border-blue-800/50">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-blue-dark dark:text-blue-light">{lesson.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-50 dark:border-blue-800/50">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="font-medium text-blue-dark dark:text-blue-light capitalize">{lesson.difficulty}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-50 dark:border-blue-800/50">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-blue-dark dark:text-blue-light capitalize">{lesson.category}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium text-blue-dark dark:text-blue-light">{lesson.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Highlights */}
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-dark dark:text-blue-light font-cafe text-xl">
                    Highlights
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {lesson.highlights.map((highlight, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Interactive tab */}
        <TabsContent value="interactive" className="m-0">
          <Card className="border-2 border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="font-cafe text-2xl text-blue-dark dark:text-blue-light">
                Interactive Learning Experience
              </CardTitle>
              <CardDescription>
                Enhance your understanding with this interactive module
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {lesson.content.interactiveElement ? (
                <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-dark dark:text-blue-light mb-2">
                        {lesson.content.interactiveElement.type.charAt(0).toUpperCase() + 
                          lesson.content.interactiveElement.type.slice(1)}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {lesson.content.interactiveElement.description}
                      </p>
                      <div className="bg-blue-900/5 border border-blue-100 dark:border-blue-800 rounded-lg p-6 flex items-center justify-center h-64">
                        <div className="text-center">
                          <Sparkles size={48} className="mx-auto mb-4 text-blue-400" />
                          <p className="text-muted-foreground">
                            Interactive {lesson.content.interactiveElement.type} would be rendered here in the full application.
                          </p>
                          <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                            Start Interactive Experience
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles size={48} className="mx-auto mb-4 text-blue-300" />
                  <h3 className="text-xl font-semibold text-blue-dark dark:text-blue-light mb-2">
                    No interactive content available
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This lesson doesn't include interactive elements. 
                    Please check other lessons for interactive experiences.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Coffee pairing tab */}
        <TabsContent value="coffee" className="m-0">
          <Card className="border-2 border-blue-100 dark:border-blue-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-900/10 pb-6">
              <div className="flex items-center">
                <Coffee size={24} className="text-blue-500 mr-3" />
                <CardTitle className="font-cafe text-2xl text-blue-dark dark:text-blue-light">
                  Coffee Pairing
                </CardTitle>
              </div>
              <CardDescription>
                Enhance your learning experience with the perfect coffee pairing
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {matchingCoffee ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-blue-500 aspect-square rounded-lg text-white flex items-center justify-center">
                      <Coffee size={96} />
                    </div>
                    
                    <div>
                      <div className="text-3xl font-cafe font-bold text-blue-dark dark:text-blue-light mb-1">
                        {matchingCoffee.name}
                      </div>
                      <div className="text-lg font-semibold text-blue-medium dark:text-blue-300">
                        {matchingCoffee.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {matchingCoffee.description}
                    </p>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-blue-dark dark:text-blue-light">
                        Flavor Notes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {matchingCoffee.flavorNotes.map((note, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          >
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-sm font-medium text-blue-dark dark:text-blue-light w-32">Origin:</span>
                        <span className="text-sm text-muted-foreground">{matchingCoffee.origin}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm font-medium text-blue-dark dark:text-blue-light w-32">Preparation:</span>
                        <span className="text-sm text-muted-foreground">{matchingCoffee.preparation}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                      <h3 className="text-sm font-medium mb-2 text-blue-dark dark:text-blue-light">
                        Why this pairing works
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        This carefully selected coffee enhances your {lesson.title} learning experience. 
                        The {matchingCoffee.flavorNotes.join(', ').toLowerCase()} notes complement 
                        the {lesson.category} concepts perfectly, stimulating the right cognitive pathways
                        for optimal learning and retention.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Coffee size={48} className="mx-auto mb-4 text-blue-300" />
                  <h3 className="text-xl font-semibold text-blue-dark dark:text-blue-light mb-2">
                    No coffee pairing selected
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You didn't select a coffee pairing for this lesson.
                    Return to the menu to select a coffee that complements this learning experience.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Bottom actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
        <Button 
          variant="outline" 
          className="border-blue-medium text-blue-dark dark:text-blue-light hover:bg-blue-50 dark:hover:bg-blue-900/30"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Menu
        </Button>
        
        {!isCompleted ? (
          <Button 
            className="bg-blue-medium hover:bg-blue-dark text-white"
            onClick={handleComplete}
          >
            <CheckCircle size={16} className="mr-2" />
            Mark as Completed
          </Button>
        ) : (
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white cursor-default"
            disabled
          >
            <Check size={16} className="mr-2" />
            Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default EnhancedLessonContent; 