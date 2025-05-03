import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Coffee, 
  CheckCircle, 
  Lightbulb, 
  Briefcase, 
  ListChecks,
  Timer,
  Award,
  Star,
  ChevronUp,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItem } from '@/data/menu-items';
import { useSessionStore } from '@/stores/sessionStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import QuizInteractive from '@/components/interactive/QuizInteractive';
import SimulationInteractive from '@/components/interactive/SimulationInteractive';
import ExerciseInteractive from '@/components/interactive/ExerciseInteractive';
import CaseStudyInteractive from '@/components/interactive/CaseStudyInteractive';

interface LessonContentProps {
  lesson: MenuItem;
}

// Progress tracking configuration
const progressSteps = [
  { id: 'intro', label: 'Introduction', value: 10 },
  { id: 'keyPoints', label: 'Key Points', value: 30 },
  { id: 'interactive', label: 'Interactive Practice', value: 70 },
  { id: 'tips', label: 'Practical Tips', value: 80 },
  { id: 'summary', label: 'Summary', value: 90 },
  { id: 'complete', label: 'Completed', value: 100 }
];

// Coffee-themed confetti effect
const CelebrationEffect = () => {
  const items = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {items.map(i => {
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const animationDuration = 3 + Math.random() * 5;
        const delay = Math.random() * 0.5;
        const type = Math.random() > 0.7 ? 'coffee-bean' : 'star';
        
        return (
          <div 
            key={i}
            className={`absolute top-0 ${type === 'coffee-bean' ? 'bg-coffee-dark' : 'bg-amber-500'} rounded-full`}
            style={{
              width: `${size}px`,
              height: type === 'coffee-bean' ? `${size * 1.5}px` : `${size}px`,
              left: `${left}%`,
              opacity: Math.random() * 0.6 + 0.4,
              animation: `fall ${animationDuration}s ease-in forwards`,
              animationDelay: `${delay}s`,
              transform: type === 'coffee-bean' ? 'rotate(45deg)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

// Coffee cup progress animation
const CoffeeProgress = ({ progress = 0 }) => {
  return (
    <div className="relative h-28 w-20 mx-auto mb-4">
      <div className="coffee-cup overflow-hidden">
        <div 
          className="coffee-fill animate-pour" 
          style={{ height: `${Math.max(10, progress)}%` }}
        ></div>
      </div>
      {progress > 50 && (
        <>
          <div className="steam left-3" />
          <div className="steam left-8" style={{ animationDelay: '0.5s' }} />
          <div className="steam left-12" style={{ animationDelay: '1s' }} />
        </>
      )}
    </div>
  );
};

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const { addCompletedItem } = useSessionStore();
  const [interactionCompleted, setInteractionCompleted] = useState(false);
  const [currentProgressStep, setCurrentProgressStep] = useState('intro');
  const [progressValue, setProgressValue] = useState(10);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSections, setShowSections] = useState({
    intro: true,
    keyPoints: true,
    workplace: true,
    interactive: true,
    tips: true,
    summary: true
  });
  const [activeTab, setActiveTab] = useState('content');
  const [timeSaved, setTimeSaved] = useState(0);
  
  useEffect(() => {
    // Calculate the potential time saved based on lesson category
    const baseTime = lesson.category === 'appetizer' ? 30 : 
                    lesson.category === 'entree' ? 60 : 90;
    setTimeSaved(baseTime);
  }, [lesson]);
  
  useEffect(() => {
    // Update progress based on what's visible and completed
    let currentProgress = 10; // Start with intro value
    
    if (showSections.keyPoints) currentProgress = 30;
    if (showSections.interactive && interactionCompleted) currentProgress = 70;
    if (showSections.tips) currentProgress = 80;
    if (showSections.summary) currentProgress = 90;
    if (isCompleted) currentProgress = 100;
    
    setProgressValue(currentProgress);
    
    // Find current progress step
    const currentStep = progressSteps.find(step => step.value === currentProgress) || progressSteps[0];
    setCurrentProgressStep(currentStep.id);
  }, [showSections, interactionCompleted, isCompleted]);
  
  const toggleSection = (section) => {
    setShowSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleComplete = () => {
    setIsCompleted(true);
    setShowCelebration(true);
    
    addCompletedItem({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category
    });
    
    toast({
      title: "Great job! ✨",
      description: `You've mastered '${lesson.title}' and saved approximately ${timeSaved} minutes per week!`,
      duration: 5000,
    });
    
    setTimeout(() => {
      setShowCelebration(false);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 4000);
  };

  const renderInteractiveElement = () => {
    if (!lesson.content.interactiveElement) return null;
    
    const { type, title, description, data } = lesson.content.interactiveElement;
    
    switch (type) {
      case 'quiz':
        return (
          <QuizInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => {
              setInteractionCompleted(true);
              toast({
                title: "Interactive section completed!",
                description: "You're making great progress!",
                duration: 3000,
              });
            }} 
          />
        );
      case 'simulation':
        return (
          <SimulationInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => {
              setInteractionCompleted(true);
              toast({
                title: "Simulation completed!",
                description: "You've gained hands-on experience!",
                duration: 3000,
              });
            }} 
          />
        );
      case 'exercise':
        return (
          <ExerciseInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => {
              setInteractionCompleted(true);
              toast({
                title: "Exercise completed!",
                description: "You've successfully applied your knowledge!",
                duration: 3000,
              });
            }} 
          />
        );
      case 'case-study':
        return (
          <CaseStudyInteractive 
            title={title} 
            description={description} 
            data={data} 
            onComplete={() => {
              setInteractionCompleted(true);
              toast({
                title: "Case study analyzed!",
                description: "You've gained valuable real-world insights!",
                duration: 3000,
              });
            }} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-fade-in mb-16">
      {/* Progress tracking sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className="lg:sticky lg:top-4 lg:self-start w-full lg:w-64 mb-8 order-2 lg:order-1">
          <Card className="overflow-hidden border-coffee-light/20">
            <div className="bg-coffee-medium h-1"></div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Coffee size={18} className="text-coffee-dark" />
                Your Progress
              </h3>
              
              <CoffeeProgress progress={progressValue} />
              
              <Progress value={progressValue} className="h-2 mb-6" />
              
              <div className="space-y-3">
                {progressSteps.map(step => (
                  <div 
                    key={step.id} 
                    className={`flex items-center gap-2 py-1 px-2 rounded-md text-sm transition-colors ${
                      currentProgressStep === step.id 
                        ? 'bg-accent-teal/10 text-accent-teal font-medium' 
                        : progressValue >= step.value 
                          ? 'text-coffee-dark/80' 
                          : 'text-muted-foreground'
                    }`}
                  >
                    {progressValue >= step.value ? (
                      <CheckCircle size={14} className="text-accent-teal" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/50"></div>
                    )}
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-muted">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Time investment:</span>
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Time saved weekly:</span>
                  <div className="flex items-center gap-1 text-accent-teal">
                    <Timer size={14} />
                    <span>~{timeSaved} min</span>
                  </div>
                </div>
              </div>
              
              {lesson.content.interactiveElement && !interactionCompleted && (
                <div className="mt-6 pt-4 border-t border-muted">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-accent-teal border-accent-teal/50 hover:bg-accent-teal/10"
                    onClick={() => {
                      document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Jump to Interactive Section
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Related content */}
          <Card className="overflow-hidden border-coffee-light/20 mt-4">
            <div className="bg-coffee-medium h-1"></div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-coffee-dark" />
                Related Lessons
              </h3>
              
              <div className="space-y-3">
                {/* Show 2-3 related lessons based on category */}
                {menuItems
                  .filter(item => item.category === lesson.category && item.id !== lesson.id)
                  .slice(0, 2)
                  .map(item => (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      className="w-full justify-start text-sm h-auto p-2 font-normal"
                      onClick={() => navigate(`/lesson/${item.id}`)}
                    >
                      <Coffee size={14} className="mr-2 text-coffee-medium" />
                      {item.title}
                    </Button>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center text-coffee-dark dark:text-coffee-light"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Menu
            </Button>
            
            <Badge 
              className={`${
                lesson.category === 'appetizer' ? 'bg-green-500' : 
                lesson.category === 'entree' ? 'bg-coffee-medium' : 'bg-amber-500'
              }`}
            >
              {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
            </Badge>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-2">
              {lesson.title}
            </h1>
            <div className="flex items-center text-muted-foreground gap-4">
              <div className="flex items-center">
                <Coffee size={18} className="mr-2" />
                <span>{lesson.duration}</span>
              </div>
              {lesson.content.interactiveElement && (
                <div className="flex items-center">
                  <Lightbulb size={18} className="mr-2 text-amber-500" />
                  <span>{lesson.content.interactiveElement.type.charAt(0).toUpperCase() + lesson.content.interactiveElement.type.slice(1)} Included</span>
                </div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="content" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="w-full border-b rounded-none p-0 h-auto">
              <TabsTrigger 
                value="content" 
                className="flex-1 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none py-2"
              >
                Lesson Content
              </TabsTrigger>
              <TabsTrigger 
                value="takeaways" 
                className="flex-1 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none py-2"
              >
                Key Takeaways
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6 animate-fade-in">
              <Card className="mb-6 overflow-visible border-coffee-light/20">
                <CardContent className="pt-6">
                  {/* Introduction */}
                  <div className="mb-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('intro')}
                    >
                      <h3 className="text-xl font-cafe font-semibold flex items-center">
                        Introduction
                      </h3>
                      {showSections.intro ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    
                    {showSections.intro && (
                      <div className="animate-fade-in mt-4">
                        <p className="text-lg mb-4">{lesson.content.intro}</p>
                        
                        {lesson.content.videoUrl && (
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                            <div className="text-muted-foreground">Video content would appear here</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Key learning points */}
                  <div className="mb-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('keyPoints')}
                    >
                      <h3 className="text-xl font-cafe font-semibold flex items-center">
                        <CheckCircle size={20} className="text-accent-teal mr-3" />
                        Key Points
                      </h3>
                      {showSections.keyPoints ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    
                    {showSections.keyPoints && (
                      <ul className="space-y-3 mt-4 animate-fade-in">
                        {lesson.content.keyPoints.map((point, index) => (
                          <li key={index} className="flex bg-muted/50 p-3 rounded-lg">
                            <Check size={20} className="text-accent-teal mr-3 mt-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {/* Workplace scenario */}
                  {lesson.content.workplaceScenario && (
                    <div className="mb-8">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection('workplace')}
                      >
                        <h3 className="text-xl font-cafe font-semibold flex items-center">
                          <Briefcase size={20} className="text-coffee-medium mr-3" />
                          Real-World Application
                        </h3>
                        {showSections.workplace ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {showSections.workplace && (
                        <div className="mt-4 animate-fade-in bg-coffee-paper p-6 rounded-lg border border-muted-foreground/20">
                          <p>{lesson.content.workplaceScenario}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Interactive element */}
                  {lesson.content.interactiveElement && (
                    <div id="interactive-section" className="mb-8 scroll-mt-8">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection('interactive')}
                      >
                        <h3 className="text-xl font-cafe font-semibold flex items-center">
                          <Star size={20} className="text-amber-500 mr-3" />
                          Interactive Experience
                          {interactionCompleted && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Completed
                            </Badge>
                          )}
                        </h3>
                        {showSections.interactive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {showSections.interactive && (
                        <div className="mt-4 animate-fade-in">
                          <div className={`border-2 ${interactionCompleted ? 'border-accent-teal' : 'border-accent-teal/20'} p-6 rounded-lg bg-accent-teal/5`}>
                            {renderInteractiveElement()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Practical tips */}
                  {lesson.content.practicalTips && (
                    <div className="mb-8">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection('tips')}
                      >
                        <h3 className="text-xl font-cafe font-semibold flex items-center">
                          <Lightbulb size={20} className="text-amber-500 mr-3" />
                          Practical Tips
                        </h3>
                        {showSections.tips ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {showSections.tips && (
                        <div className="mt-4 animate-fade-in">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lesson.content.practicalTips.map((tip, index) => (
                              <Card key={index} className="bg-muted/50 border-coffee-light/10">
                                <CardContent className="p-4">
                                  <div className="flex items-start">
                                    <ListChecks size={18} className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                                    <span>{tip}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Summary */}
                  <div className="mb-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('summary')}
                    >
                      <h3 className="text-xl font-cafe font-semibold flex items-center">
                        Summary
                      </h3>
                      {showSections.summary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    
                    {showSections.summary && (
                      <div className="mt-4 animate-fade-in p-4 bg-accent-teal/10 rounded-lg">
                        <p>{lesson.content.summary}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="takeaways" className="mt-6">
              <Card className="mb-6 overflow-visible border-coffee-light/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Coffee size={16} className="text-coffee-dark" />
                        Main Concept
                      </h4>
                      <p>{lesson.description}</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Timer size={16} className="text-accent-teal" />
                        Productivity Impact
                      </h4>
                      <p>Using the techniques in this lesson could save you approximately {timeSaved} minutes per week on related tasks.</p>
                    </div>
                    
                    {lesson.content.keyPoints.slice(0, 3).map((point, index) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Check size={16} className="text-accent-teal" />
                          Remember
                        </h4>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Action buttons */}
          {!isCompleted ? (
            <div className="sticky bottom-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md p-4 rounded-lg border border-muted z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <Progress value={progressValue} className="h-2 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {progressValue}% Complete
                  </span>
                </div>
                
                <Button 
                  className="w-full sm:w-auto bg-accent-teal hover:bg-accent-teal/90"
                  size="lg"
                  onClick={handleComplete}
                  disabled={lesson.content.interactiveElement && !interactionCompleted}
                >
                  <Award size={18} className="mr-2" />
                  {lesson.content.interactiveElement && !interactionCompleted 
                    ? "Complete Interactive Section First" 
                    : "Mark as Complete & Save Time"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-accent-teal/20 text-accent-teal p-4 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="mr-2" />
              Lesson completed! Returning to menu...
            </div>
          )}
        </div>
      </div>
      
      {/* Celebration effect */}
      {showCelebration && <CelebrationEffect />}
      
      {/* Success message */}
      {showCelebration && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 dark:bg-gray-950/90 p-8 rounded-xl shadow-xl animate-bounce-in text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg mb-2">You've mastered {lesson.title}</p>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Coffee size={20} className="text-coffee-dark" />
              <span>Estimated time saved: <span className="font-bold text-accent-teal">{timeSaved} min/week</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonContent;
