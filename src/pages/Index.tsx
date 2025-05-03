import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import MenuDisplay from '@/components/menu/MenuDisplay';
import { menuItems } from '@/data/menu-items';
import Layout from '@/components/layout/Layout';
import ReceiptSummary from '@/components/receipt/ReceiptSummary';
import { Coffee, ChevronDown, Sparkles, Calculator, Brain, BarChart4, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [productivityScore, setProductivityScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { session, addCompletedAssessment } = useSessionStore();
  const { toast } = useToast();
  const hasCompletedItems = session.completedItems.length > 0;
  
  const assessmentQuestions = [
    {
      question: "How much time do you spend on email each day?",
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

  useEffect(() => {
    // Show AI assistant after 2 seconds
    const timer = setTimeout(() => {
      setAiAssistantVisible(true);
      typeMessage("Welcome to the AI Café! Would you like help finding ways to boost your productivity with AI?");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const typeMessage = (message: string) => {
    setIsTyping(true);
    setAiMessage('');
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        setAiMessage(prev => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
  };

  const handleAiAssistantAction = () => {
    setAiAssistantVisible(false);
    setShowAssessment(true);
    typeMessage("Let's assess your current productivity and find AI tools that can help you.");
  };
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="mb-12 py-12 px-4 bg-gradient-to-br from-coffee-cream to-white dark:from-coffee-dark dark:to-coffee-medium/50 rounded-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="relative inline-block mb-6">
            <Coffee size={48} className="text-coffee-dark dark:text-coffee-cream" />
            <div className="steam left-2" />
            <div className="steam left-5" style={{ animationDelay: '0.5s' }} />
            <div className="steam left-3" style={{ animationDelay: '1s' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-cafe font-bold text-coffee-dark dark:text-coffee-cream mb-4">
            VSP AI Café
          </h1>
          <p className="text-xl md:text-2xl text-coffee-medium dark:text-coffee-light mb-8 max-w-2xl mx-auto">
            Boost your <span className="text-accent-teal font-semibold">workplace productivity</span> with AI tools - bite-sized learning for busy professionals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              onClick={() => setShowAssessment(true)}
              className="bg-accent-teal hover:bg-accent-teal/90 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Calculator size={16} className="mr-2" />
              AI Productivity Assessment
            </Button>
            
            {hasCompletedItems && (
              <Button 
                size="lg" 
                variant="outline"
                className="border-coffee-medium text-coffee-dark dark:text-coffee-light"
                onClick={() => setShowReceipt(!showReceipt)}
              >
                {showReceipt ? 'Hide Receipt' : 'View Learning Receipt'}
              </Button>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent dark:from-coffee-dark/20"></div>
      </section>
      
      {/* Productivity stats section (if assessment completed) */}
      {showResults && (
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-6 flex items-center">
            <BarChart4 className="mr-3 text-accent-teal" />
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
                    <Coffee className="text-coffee-dark" size={20} />
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
            <h3 className="text-xl font-semibold mb-4">Recommended Modules for You</h3>
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
        <section className="mb-12 animate-fade-in">
          <ReceiptSummary />
        </section>
      )}
      
      {/* Menu section */}
      <section id="menu">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-cafe font-bold text-coffee-dark dark:text-coffee-light mb-3">
            Today's AI Productivity Menu
          </h2>
          <p className="text-muted-foreground">
            Browse our selection of bite-sized AI learning modules designed to boost your workplace productivity
          </p>
        </div>
        <MenuDisplay items={menuItems} />
      </section>
      
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
      
      {/* AI Assistant */}
      {aiAssistantVisible && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in-up">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-accent-teal/20 p-1.5 rounded-full">
                <Sparkles size={14} className="text-accent-teal" />
              </div>
              <span className="font-medium">AI Assistant</span>
            </div>
            <p className="text-sm mb-3">{aiMessage}{isTyping && "▋"}</p>
            <div className="flex justify-end gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setAiAssistantVisible(false)}
              >
                Dismiss
              </Button>
              <Button 
                size="sm" 
                className="bg-accent-teal hover:bg-accent-teal/90"
                onClick={handleAiAssistantAction}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
