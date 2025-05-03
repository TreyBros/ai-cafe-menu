import React, { useState } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Coffee, Send, Download, CheckCircle, Check, Star, BarChart4, Sparkles, ChevronUp, ChevronDown, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ReceiptSummary: React.FC = () => {
  const { session, getReceipt, setEmail, resetSession } = useSessionStore();
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showFullReceipt, setShowFullReceipt] = useState(false);
  
  const receipt = getReceipt();
  
  const totalModules = 6; // Number of total modules in the menu
  const completedModules = receipt.stats.totalItems;
  const percentComplete = (completedModules / totalModules) * 100;
  
  const categoryCounts = {
    appetizer: 0,
    entree: 0,
    dessert: 0
  };
  
  receipt.items.forEach(item => {
    categoryCounts[item.category]++;
  });
  
  // Get productivity assessment history 
  const productivityHistory = session.productivityAssessments.map(assessment => ({
    date: new Date(assessment.date).toLocaleDateString(),
    score: assessment.score
  }));
  
  // Generate suggested next courses based on completed items
  const suggestNextCourses = () => {
    if (categoryCounts.appetizer === 0) {
      return "Try starting with an AI Productivity Espresso to get a quick overview.";
    } else if (categoryCounts.entree === 0) {
      return "Ready to dive deeper? Try one of our entree courses next.";
    } else if (categoryCounts.dessert === 0) {
      return "Complete your learning with a dessert course on workflow automation.";
    } else {
      return "You've explored all categories! Revisit topics that interest you most.";
    }
  };
  
  // Calculate estimated time saved based on completed modules and productivity score
  const calculateTimeSaved = () => {
    const baseHours = completedModules * 2; // Each module saves approximately 2 hours/week
    const multiplier = receipt.stats.productivityScore ? (receipt.stats.productivityScore / 50) : 1;
    return Math.round(baseHours * multiplier);
  };
  
  const handleSendEmail = () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      setEmail(emailInput);
      setIsSubmitting(false);
      toast({
        title: "Receipt sent!",
        description: `We've sent your AI Café learning receipt to ${emailInput}`,
        duration: 3000,
      });
    }, 1500);
  };
  
  const handleNewSession = () => {
    resetSession();
    toast({
      title: "New session started",
      description: "Your learning journey has been reset. Enjoy your new AI Café experience!",
      duration: 3000,
    });
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-cafe">Your Learning Journey</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowFullReceipt(!showFullReceipt)}
          >
            {showFullReceipt ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="progress">
        <TabsList className="mx-6">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="completion">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="p-6 pt-2">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Coffee size={18} className="text-coffee-medium" />
                    <span className="font-medium">Learning Progress</span>
                  </div>
                  <span className="text-lg font-bold">{completedModules}/{totalModules}</span>
                </div>
                <Progress value={percentComplete} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  You've completed {percentComplete.toFixed(0)}% of the AI productivity curriculum
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-coffee-medium" />
                    <span className="font-medium">Time Investment</span>
                  </div>
                  <span className="text-lg font-bold">{receipt.stats.timeSpentMinutes} min</span>
                </div>
                <Progress 
                  value={(receipt.stats.timeSpentMinutes / 60) * 100} 
                  className="h-2 mb-2" 
                />
                <p className="text-xs text-muted-foreground">
                  You've invested {(receipt.stats.timeSpentMinutes / 60).toFixed(1)} hours in improving your productivity
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    <span className="font-medium">Time Saved</span>
                  </div>
                  <span className="text-lg font-bold">{calculateTimeSaved()} hrs/week</span>
                </div>
                <Progress 
                  value={(calculateTimeSaved() / 20) * 100} 
                  className="h-2 mb-2" 
                />
                <p className="text-xs text-muted-foreground">
                  Estimated time saved by implementing what you've learned
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3">Category Completion</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Appetizers</span>
                    <span className="text-sm font-medium">{categoryCounts.appetizer}/1</span>
                  </div>
                  <Progress value={(categoryCounts.appetizer / 1) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Entrees</span>
                    <span className="text-sm font-medium">{categoryCounts.entree}/3</span>
                  </div>
                  <Progress value={(categoryCounts.entree / 3) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Desserts</span>
                    <span className="text-sm font-medium">{categoryCounts.dessert}/2</span>
                  </div>
                  <Progress value={(categoryCounts.dessert / 2) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <Book size={16} className="text-coffee-medium" />
                  <span className="font-medium">Learning Recommendation</span>
                </div>
                <p className="text-sm">
                  {suggestNextCourses()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productivity" className="p-6 pt-2">
          {productivityHistory.length > 0 ? (
            <>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-3">Productivity Assessment History</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productivityHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--accent-teal))" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart4 size={18} className="text-accent-teal" />
                      <span className="font-medium">Latest Productivity Score</span>
                    </div>
                    <span className="text-xl font-bold">{productivityHistory[productivityHistory.length - 1].score}%</span>
                  </div>
                  
                  <Progress 
                    value={productivityHistory[productivityHistory.length - 1].score} 
                    className="h-2 mb-4" 
                  />
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">What This Means</h4>
                    <p className="text-sm">
                      {productivityHistory[productivityHistory.length - 1].score > 70
                        ? "You're in the advanced tier of AI productivity. Focus on optimizing and integrating tools."
                        : productivityHistory[productivityHistory.length - 1].score > 40
                          ? "You have a good foundation in AI productivity. Continue building skills in specific areas."
                          : "You're at the beginning of your AI productivity journey. The modules will help you make significant gains."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-8">
              <BarChart4 size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Productivity Data Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Complete the AI Productivity Assessment to see your score and track improvements over time.
              </p>
              <Button variant="outline">Take Assessment</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completion" className="p-6 pt-2">
          {receipt.items.length > 0 ? (
            <div className="space-y-4">
              {receipt.items.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full 
                        ${item.category === 'appetizer' 
                          ? 'bg-coffee-cream/50 text-coffee-dark' 
                          : item.category === 'entree' 
                            ? 'bg-coffee-medium/20 text-coffee-dark'
                            : 'bg-coffee-light/20 text-coffee-dark'
                        }`}
                      >
                        <Check size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground capitalize">
                          {item.category} • Completed on {new Date().toLocaleDateString()}
                        </p>
                        
                        {showFullReceipt && (
                          <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                            <div className="flex items-center gap-1 mb-1">
                              <Star size={12} className="text-amber-500" />
                              <span className="font-medium">Key Takeaway</span>
                            </div>
                            <p className="text-muted-foreground">
                              {item.id === "ai-productivity-basics" && "AI tools can eliminate repetitive tasks and boost productivity"}
                              {item.id === "ai-writing-assistant" && "AI writing tools dramatically speed up document creation"}
                              {item.id === "data-analysis-ai" && "AI transforms hours of data work into minutes of interactive querying"}
                              {item.id === "meeting-productivity" && "Meeting AI tools create accountability and make information retrievable"}
                              {item.id === "ai-knowledge-management" && "AI knowledge management makes information instantly accessible"}
                              {item.id === "workflow-automation" && "Workflow automation eliminates repetitive tasks entirely"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Coffee size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Completed Items Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Complete modules from the AI productivity menu to track your learning journey.
              </p>
              <Button variant="outline">Browse Menu</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-end pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-muted-foreground"
        >
          Export Learning Record
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiptSummary;
