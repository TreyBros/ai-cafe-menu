import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import MenuDisplay from '@/components/menu/MenuDisplay';
import { menuItems } from '@/data/menu-items';
import Layout from '@/components/layout/Layout';
import ReceiptSummary from '@/components/receipt/ReceiptSummary';
import AIBarista from '@/components/interactive/AIBarista';
import LearningDashboard from '@/components/dashboard/LearningDashboard';
import { 
  Coffee, 
  ChevronDown, 
  Sparkles, 
  Calculator, 
  Brain, 
  BarChart4, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Clock,
  Zap,
  LineChart
} from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Animated Coffee Cup component
const AnimatedCoffeeCup = ({ size = 'large' }) => {
  return (
    <div className={`relative ${size === 'large' ? 'w-24 h-24' : 'w-12 h-12'} mx-auto`}>
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${size === 'large' ? 'w-20 h-16' : 'w-10 h-8'} bg-coffee-medium rounded-b-3xl rounded-t-sm border-t-4 border-coffee-light`}>
      </div>
      <div className={`absolute ${size === 'large' ? 'bottom-2 right-3 w-8 h-8' : 'bottom-1 right-1 w-4 h-4'} border-4 border-coffee-medium rounded-full border-l-0`}></div>
      <div className={`${size === 'large' ? 'steam left-8 delay-100' : 'steam left-4 delay-100'}`} />
      <div className={`${size === 'large' ? 'steam left-14 delay-300' : 'steam left-6 delay-300'}`} />
      <div className={`${size === 'large' ? 'steam left-11 delay-500' : 'steam left-5 delay-500'}`} />
    </div>
  );
};

// Coffee stain decorative element
const CoffeeStain = ({ top, left, size = 'medium', opacity = 0.1 }) => {
  const dimensions = size === 'small' ? 'w-12 h-12' : size === 'large' ? 'w-32 h-32' : 'w-24 h-24';
  return (
    <div 
      className={`absolute ${dimensions} coffee-stain`} 
      style={{ top: `${top}%`, left: `${left}%`, opacity }}
    />
  );
};

// Productivity Calculator component
const ProductivityCalculator = ({ onStart }) => {
  return (
    <Card className="overflow-hidden border border-coffee-light/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="bg-accent-teal h-2" />
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="bg-accent-teal/20 p-2 rounded-full">
            <Calculator size={24} className="text-accent-teal" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Productivity Calculator</h3>
            <p className="text-muted-foreground mb-4">
              Discover how many hours per week you could save with AI productivity tools tailored to your workflow.
            </p>
            
            <div className="flex items-center mb-4 text-muted-foreground text-sm">
              <CheckCircle2 size={16} className="text-accent-teal mr-2" />
              <span>Takes only 2 minutes to complete</span>
            </div>
            
            <Button 
              className="w-full bg-accent-teal hover:bg-accent-teal/90"
              onClick={onStart}
            >
              Start Assessment <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [productivityScore, setProductivityScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
  const [showUserRole, setShowUserRole] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const { session, addCompletedAssessment } = useSessionStore();
  const { toast } = useToast();
  const hasCompletedItems = session.completedItems.length > 0;
  
  const assessmentQuestions = [
    {
      question: "How much time do you spend managing your email each day?",
      options: ["Less than 30 minutes", "30-60 minutes", "1-2 hours", "More than 2 hours"]
    },
    {
      question: "How often do you feel overwhelmed by information at work?",
      options: ["Rarely", "Sometimes", "Often", "Almost always"]
    },
    {
      question: "How much time do you spend in meetings weekly?",
      options: ["Less than 2 hours", "2-5 hours", "5-10 hours", "More than 10 hours"]
    },
    {
      question: "How difficult is it to find specific information when you need it?",
      options: ["Very easy", "Somewhat easy", "Somewhat difficult", "Very difficult"]
    },
    {
      question: "What tasks consume most of your productive time?",
      options: ["Administrative work", "Communication (email, chat)", "Meetings", "Creating/editing documents", "Data analysis"]
    }
  ];

  const userRoles = [
    { id: 'manager', label: 'Manager/Team Lead', icon: <User size={16} /> },
    { id: 'knowledge', label: 'Knowledge Worker', icon: <Brain size={16} /> },
    { id: 'creative', label: 'Creative Professional', icon: <Sparkles size={16} /> },
    { id: 'admin', label: 'Administrative', icon: <Clock size={16} /> },
    { id: 'technical', label: 'Technical Role', icon: <Zap size={16} /> }
  ];

  useEffect(() => {
    // Start welcome animation
    setWelcomeAnimation(true);
    
    // Show AI assistant after 3 seconds
    const timer = setTimeout(() => {
      setAiAssistantVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAssessmentAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score based on answers
      calculateProductivityScore();
    }
  };

  const calculateProductivityScore = () => {
    // This is a simplified scoring system - in a real app, this would be more sophisticated
    let score = 0;
    
    // Email time
    if (answers[0] === "Less than 30 minutes") score += 25;
    else if (answers[0] === "30-60 minutes") score += 20;
    else if (answers[0] === "1-2 hours") score += 10;
    else score += 5;
    
    // Information overwhelm
    if (answers[1] === "Rarely") score += 25;
    else if (answers[1] === "Sometimes") score += 20;
    else if (answers[1] === "Often") score += 10;
    else score += 5;
    
    // Meeting time
    if (answers[2] === "Less than 2 hours") score += 25;
    else if (answers[2] === "2-5 hours") score += 20;
    else if (answers[2] === "5-10 hours") score += 10;
    else score += 5;
    
    // Information finding
    if (answers[3] === "Very easy") score += 25;
    else if (answers[3] === "Somewhat easy") score += 20;
    else if (answers[3] === "Somewhat difficult") score += 10;
    else score += 5;
    
    setProductivityScore(score);
    setAssessmentComplete(true);
    addCompletedAssessment(score);
  };

  const getRecommendedItems = () => {
    if (productivityScore < 40) {
      // Low score - needs comprehensive help
      return menuItems.filter(item => item.id === "workflow-automation" || item.id === "meeting-productivity" || item.id === "ai-knowledge-management");
    } else if (productivityScore < 70) {
      // Medium score - focus on specific improvements
      return menuItems.filter(item => item.id === "ai-writing-assistant" || item.id === "data-analysis-ai");
    } else {
      // High score - advanced optimization
      return menuItems.filter(item => item.id === "ai-productivity-basics");
    }
  };

  const handleCompleteAssessment = () => {
    setShowAssessment(false);
    setShowResults(true);
    
    // Show toast notification
    toast({
      title: "Productivity Assessment Complete!",
      description: `Your score: ${productivityScore}%. We've recommended some lessons to boost your productivity.`,
      duration: 5000,
    });
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers(Array(5).fill(''));
    setAssessmentComplete(false);
    setShowResults(false);
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    
    toast({
      title: "Role set!",
      description: `We've tailored the menu to focus on AI tools for ${userRoles.find(r => r.id === role)?.label}s.`,
      duration: 3000,
    });
    
    // After selecting a role, show the assessment
    setTimeout(() => {
      setShowUserRole(false);
      setShowAssessment(true);
    }, 1000);
  };
  
  return (
    <Layout>
      {/* Decorative Coffee Stains */}
      <CoffeeStain top={10} left={5} size="large" opacity={0.07} />
      <CoffeeStain top={80} left={80} size="medium" opacity={0.1} />
      <CoffeeStain top={40} left={90} size="small" opacity={0.08} />
      
      {/* Hero section */}
      <section className="mb-16 py-16 px-6 bg-coffee-paper rounded-xl text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className={`relative z-10 transition-all duration-1000 ${welcomeAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
          <div className="mb-8 transition-transform duration-700 delay-300">
            <AnimatedCoffeeCup />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-chalk font-bold text-coffee-dark dark:text-coffee-cream mb-4 transition-all duration-700 delay-500">
            AI Productivity Café
          </h1>
          
          <div className="bg-coffee-dark/10 w-32 h-1 mx-auto mb-8 rounded-full transition-all duration-700 delay-600"></div>
          
          <p className="text-xl md:text-2xl text-coffee-medium dark:text-coffee-light mb-10 max-w-2xl mx-auto transition-all duration-700 delay-700">
            Discover how <span className="text-accent-teal font-semibold">AI tools</span> can save you 
            <span className="relative bg-coffee-medium/10 px-3 py-1 mx-2 rounded-lg before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-coffee-medium/30">
              5-10 hours every week
            </span> 
            on workplace tasks
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-800">
            <Button 
              size="lg" 
              className="bg-coffee-medium hover:bg-coffee-dark font-medium text-white group transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Menu
              <ChevronDown size={16} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={() => setShowUserRole(true)}
              className="bg-accent-teal hover:bg-accent-teal/90 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Calculator size={16} className="mr-2" />
              Take Assessment
            </Button>
            
            {hasCompletedItems && (
              <>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-coffee-medium text-coffee-dark dark:text-coffee-light"
                  onClick={() => setShowReceipt(!showReceipt)}
                >
                  {showReceipt ? 'Hide Learning Receipt' : 'View Learning Receipt'}
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-accent-teal text-accent-teal hover:bg-accent-teal/10"
                  onClick={() => setShowDashboard(true)}
                >
                  <LineChart size={16} className="mr-2" />
                  Learning Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent dark:from-coffee-dark/20"></div>
      </section>
      
      {/* Hero cards - quick value props */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="overflow-hidden border border-coffee-light/20 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="h-1 bg-amber-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="bg-amber-500/10 p-2 rounded-full">
                <Clock size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Save Valuable Time</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how AI tools can eliminate repetitive tasks and free up hours of your workday.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-coffee-light/20 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="h-1 bg-green-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="bg-green-500/10 p-2 rounded-full">
                <Zap size={20} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Boost Productivity</h3>
                <p className="text-sm text-muted-foreground">
                  Discover practical AI workflows that dramatically increase your efficiency on daily tasks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ProductivityCalculator onStart={() => setShowUserRole(true)} />
      </section>
      
      {/* Productivity stats section (if assessment completed) */}
      {showResults && (
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-8 flex items-center">
            <div className="bg-accent-teal/10 p-2 rounded-full mr-3">
              <BarChart4 className="text-accent-teal" size={28} />
            </div>
            Your AI Productivity Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="overflow-hidden">
              <div className="bg-accent-teal h-2"></div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Your Productivity Score</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold">{productivityScore}%</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    productivityScore > 70 
                      ? "bg-green-500 text-white" 
                      : productivityScore > 40 
                        ? "bg-amber-500 text-white" 
                        : "bg-destructive text-destructive-foreground"
                  }`}>
                    {productivityScore > 70 ? "Advanced" : productivityScore > 40 ? "Intermediate" : "Beginner"}
                  </div>
                </div>
                <Progress value={productivityScore} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {productivityScore > 70 
                    ? "You're already productive but can optimize further with AI" 
                    : productivityScore > 40 
                      ? "You have a solid foundation but AI can help improve specific areas" 
                      : "There's significant opportunity to boost productivity with AI tools"
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Time-saving Potential</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-coffee-medium/20 p-2 rounded-full">
                    <Clock className="text-coffee-dark" size={20} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      {productivityScore > 70 ? "3-5" : productivityScore > 40 ? "5-10" : "10+"}
                    </span> hours/week
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is how much time you could save each week by implementing AI productivity tools
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Focus Areas</h3>
                <ul className="space-y-2">
                  {answers[4] === "Administrative work" && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent-teal" size={16} />
                      <span>Workflow automation</span>
                    </li>
                  )}
                  {answers[4] === "Communication (email, chat)" && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent-teal" size={16} />
                      <span>AI writing assistance</span>
                    </li>
                  )}
                  {answers[4] === "Meetings" && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent-teal" size={16} />
                      <span>Meeting efficiency tools</span>
                    </li>
                  )}
                  {answers[4] === "Creating/editing documents" && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent-teal" size={16} />
                      <span>Document generation and editing</span>
                    </li>
                  )}
                  {answers[4] === "Data analysis" && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent-teal" size={16} />
                      <span>AI-powered data analysis</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">Recommended Modules for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRecommendedItems().map(item => (
                <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-coffee-medium h-1"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-coffee-medium/10 p-2 rounded-full">
                        <Brain size={20} className="text-coffee-dark" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full border-coffee-medium text-coffee-dark hover:bg-coffee-medium/10"
                          onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Learn More <ArrowRight size={12} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="ghost" onClick={resetAssessment} className="text-muted-foreground">
              Retake Assessment
            </Button>
          </div>
        </section>
      )}
      
      {/* Receipt section (conditionally shown) */}
      {showReceipt && hasCompletedItems && (
        <section className="mb-16 animate-fade-in">
          <ReceiptSummary />
        </section>
      )}
      
      {/* Menu section */}
      <section id="menu" className="mb-16">
        <MenuDisplay items={menuItems} />
      </section>
      
      {/* User Role Dialog */}
      <Dialog open={showUserRole} onOpenChange={setShowUserRole}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Let's personalize your experience</DialogTitle>
            <DialogDescription>
              Select your role to help us tailor the AI productivity recommendations
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-2">
              {userRoles.map(role => (
                <Button 
                  key={role.id}
                  variant="outline" 
                  className="w-full justify-start text-left font-normal h-auto py-3"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="bg-accent-teal/10 p-2 rounded-full mr-3">
                    {role.icon}
                  </div>
                  <span>{role.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Assessment Dialog */}
      <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Productivity Assessment</DialogTitle>
            <DialogDescription>
              {assessmentComplete 
                ? "Your assessment is complete! Here's your productivity score."
                : "Answer a few quick questions to identify your AI productivity opportunities."}
            </DialogDescription>
          </DialogHeader>
          
          {!assessmentComplete ? (
            <>
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {assessmentQuestions.length}
                  </span>
                  <Progress value={(currentQuestion / assessmentQuestions.length) * 100} className="w-[60%] h-2" />
                </div>
                
                <h3 className="font-medium mb-4">{assessmentQuestions[currentQuestion].question}</h3>
                
                <RadioGroup
                  className="space-y-3"
                  value={answers[currentQuestion]}
                  onValueChange={handleAssessmentAnswer}
                >
                  {assessmentQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="w-full bg-accent-teal hover:bg-accent-teal/90"
                >
                  {currentQuestion < assessmentQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="py-4 text-center">
                <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-4">
                  <BarChart4 size={32} className="text-accent-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Your Score: {productivityScore}%</h3>
                <Progress value={productivityScore} className="h-3 mb-4" />
                <p className="mb-4">
                  {productivityScore > 70 
                    ? "Great job! You're already quite productive, but there's always room for improvement with AI tools." 
                    : productivityScore > 40 
                      ? "You have a solid foundation, but AI tools can help you become significantly more productive." 
                      : "You have a great opportunity to boost your productivity with AI tools!"
                  }
                </p>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleCompleteAssessment}
                  className="w-full bg-accent-teal hover:bg-accent-teal/90"
                >
                  See Detailed Analysis & Recommendations
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* AI Barista */}
      {aiAssistantVisible && (
        <AIBarista 
          onOpenAssessment={() => {
            setAiAssistantVisible(false);
            setShowUserRole(true);
          }}
          onDismiss={() => setAiAssistantVisible(false)}
        />
      )}
      
      {/* Learning Dashboard Dialog */}
      <Dialog open={showDashboard} onOpenChange={setShowDashboard} className="max-w-6xl">
        <DialogContent className="max-w-6xl w-[90vw] max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
          <LearningDashboard onClose={() => setShowDashboard(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
