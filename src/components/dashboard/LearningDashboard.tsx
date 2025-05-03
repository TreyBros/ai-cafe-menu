import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { useSessionStore } from '@/stores/sessionStore';
import { menuItems } from '@/data/menu-items';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Brain, 
  PieChart, 
  BarChart3, 
  Timer,
  TrendingUp,
  Award
} from 'lucide-react';

interface LearningDashboardProps {
  onClose: () => void;
}

const LearningDashboard: React.FC<LearningDashboardProps> = ({ onClose }) => {
  const { session } = useSessionStore();
  const [activeTab, setActiveTab] = useState('progress');
  
  // Calculate completion percentages
  const completedItemIds = session.completedItems.map(item => item.id);
  const totalItems = menuItems.length;
  const completionPercentage = Math.round((completedItemIds.length / totalItems) * 100);
  
  // Calculate category completion
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
  
  // Calculate estimated time saved based on completed modules
  const calculateTimeSaved = () => {
    let minutesSaved = 0;
    let weeklyHoursSaved = 0;
    
    // Base time saved per category
    if (appetizerCompletionCount > 0) weeklyHoursSaved += 1;
    if (entreeCompletionCount > 0) weeklyHoursSaved += 2;
    if (dessertCompletionCount > 0) weeklyHoursSaved += 3;
    
    // Add learning time
    menuItems.forEach(item => {
      if (completedItemIds.includes(item.id)) {
        // Extract minute value from duration string (e.g., "10 min" → 10)
        const durationMatch = item.duration.match(/(\d+)/);
        if (durationMatch) {
          minutesSaved += parseInt(durationMatch[0]);
        }
      }
    });
    
    // If user has completed assessment, add more time saved
    const latestAssessment = session.productivityAssessments.length > 0 
      ? session.productivityAssessments[session.productivityAssessments.length - 1] 
      : null;
      
    if (latestAssessment) {
      weeklyHoursSaved += latestAssessment.score > 70 ? 1 : 
                          latestAssessment.score > 40 ? 2 : 3;
    }
    
    return {
      learning: minutesSaved,
      weekly: weeklyHoursSaved
    };
  };
  
  const timeSaved = calculateTimeSaved();
  
  // Productivity chart data
  const productivityData = [
    { name: 'Before AI', value: 40 },
    { name: 'Email Automation', value: 55 },
    { name: 'Meeting Tools', value: 65 },
    { name: 'AI Writing', value: 80 },
    { name: 'All Tools', value: 90 }
  ];
  
  // Weekly time savings projection
  const weeklyData = [
    { week: 'Week 1', hours: timeSaved.weekly },
    { week: 'Week 2', hours: Math.round(timeSaved.weekly * 1.2) },
    { week: 'Week 3', hours: Math.round(timeSaved.weekly * 1.5) },
    { week: 'Week 4', hours: Math.round(timeSaved.weekly * 1.8) },
    { week: 'Week 5', hours: Math.round(timeSaved.weekly * 2) },
  ];
  
  // Get recommended next modules
  const getRecommendedModules = () => {
    const incomplete = menuItems.filter(item => !completedItemIds.includes(item.id));
    
    // Prioritize recommendations based on assessment if available
    const latestAssessment = session.productivityAssessments.length > 0 
      ? session.productivityAssessments[session.productivityAssessments.length - 1] 
      : null;
      
    if (latestAssessment) {
      if (latestAssessment.score < 40) {
        const basics = incomplete.filter(item => item.id === "ai-productivity-basics");
        if (basics.length > 0) return basics;
      } else if (latestAssessment.score < 70) {
        const writing = incomplete.filter(item => item.id === "ai-writing-assistant");
        if (writing.length > 0) return writing;
      } else {
        const advanced = incomplete.filter(item => item.category === "dessert");
        if (advanced.length > 0) return advanced;
      }
    }
    
    // Default recommendations - incomplete items
    return incomplete.slice(0, 3);
  };
  
  const recommendedModules = getRecommendedModules();
  const latestAssessment = session.productivityAssessments.length > 0 
    ? session.productivityAssessments[session.productivityAssessments.length - 1] 
    : null;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden animate-fade-in">
      <div className="p-6 bg-coffee-dark text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Learning Dashboard</h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-coffee-medium">
            Close
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab} className="p-6">
        <TabsList className="mb-6">
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <PieChart size={16} />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Productivity</span>
          </TabsTrigger>
          <TabsTrigger value="timeSaved" className="flex items-center gap-2">
            <Timer size={16} />
            <span>Time Saved</span>
          </TabsTrigger>
          <TabsTrigger value="next" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Next Steps</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Your learning journey completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold">{completionPercentage}%</span>
                  <span className="text-sm text-muted-foreground">
                    {completedItemIds.length}/{totalItems} modules
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-3 mb-4" />
                
                {completionPercentage === 100 && (
                  <div className="flex items-center justify-center mt-4 p-2 bg-accent-teal/10 rounded text-accent-teal">
                    <Award className="mr-2" size={16} />
                    <span>Journey Complete!</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Quick introductory modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold">{appetizerPercentage}%</span>
                  <span className="text-sm text-muted-foreground">
                    {appetizerCompletionCount}/{appetizers.length} modules
                  </span>
                </div>
                <Progress value={appetizerPercentage} className="h-2 mb-4" />
                
                <div className="mt-4 space-y-2">
                  {appetizers.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {completedItemIds.includes(item.id) ? (
                          <CheckCircle2 size={16} className="text-accent-teal" />
                        ) : (
                          <div className="w-4 h-4 border border-muted rounded-full" />
                        )}
                        <span className="text-sm">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Learning Time</CardTitle>
                <CardDescription>Minutes invested in learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{timeSaved.learning}</span>
                  <span className="text-xl mb-1">minutes</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-muted">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Learning efficiency:</span>
                    <span>Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>AI Productivity Module Completion</CardTitle>
              <CardDescription>Track your progress across all learning categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Quick Start Modules</span>
                    <span className="text-sm text-muted-foreground">{appetizerCompletionCount}/{appetizers.length}</span>
                  </div>
                  <Progress value={appetizerPercentage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Core AI Tools</span>
                    <span className="text-sm text-muted-foreground">{entreeCompletionCount}/{entrees.length}</span>
                  </div>
                  <Progress value={entreePercentage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Advanced Productivity</span>
                    <span className="text-sm text-muted-foreground">{dessertCompletionCount}/{desserts.length}</span>
                  </div>
                  <Progress value={dessertPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Productivity Tab */}
        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Impact</CardTitle>
              <CardDescription>How AI tools improve your efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Productivity %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2192FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {latestAssessment && (
            <Card>
              <CardHeader>
                <CardTitle>Your Productivity Assessment</CardTitle>
                <CardDescription>Based on your recent assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold">{latestAssessment.score}%</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    latestAssessment.score > 70 
                      ? "bg-accent-teal text-white" 
                      : latestAssessment.score > 40 
                        ? "bg-accent-yellow text-coffee-dark" 
                        : "bg-accent-orange text-white"
                  }`}>
                    {latestAssessment.score > 70 ? "Advanced" : latestAssessment.score > 40 ? "Intermediate" : "Beginner"}
                  </div>
                </div>
                <Progress value={latestAssessment.score} className="h-3 mb-4" />
                
                <p className="text-sm text-muted-foreground mb-4">
                  {latestAssessment.score > 70 
                    ? "You're already productive but can optimize further with AI" 
                    : latestAssessment.score > 40 
                      ? "You have a solid foundation but AI can help improve specific areas" 
                      : "There's significant opportunity to boost productivity with AI tools"
                  }
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={onClose}
                >
                  Retake Assessment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Time Saved Tab */}
        <TabsContent value="timeSaved" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weekly Time Savings</CardTitle>
                <CardDescription>Estimated hours saved per week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-accent-teal/10 p-3 rounded-full">
                    <Clock size={24} className="text-accent-teal" />
                  </div>
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">{timeSaved.weekly}</span>
                      <span className="text-xl mb-1">hours/week</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on completed modules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Annual Savings</CardTitle>
                <CardDescription>Projected annual time saved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-coffee-light/10 p-3 rounded-full">
                    <Timer size={24} className="text-coffee-light" />
                  </div>
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">{timeSaved.weekly * 50}</span>
                      <span className="text-xl mb-1">hours/year</span>
                    </div>
                    <p className="text-sm text-muted-foreground">~{Math.round(timeSaved.weekly * 50 / 40)} work weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Productivity Growth Projection</CardTitle>
              <CardDescription>Estimated time savings as you implement more AI tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis label={{ value: 'Hours Saved', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#1A5F7A" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Next Steps Tab */}
        <TabsContent value="next" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
              <CardDescription>Continue your AI productivity journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedModules.length > 0 ? (
                  recommendedModules.map(module => (
                    <div key={module.id} className="p-4 border rounded-lg border-muted hover:bg-muted/5 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-coffee-medium/10 p-2 rounded-full">
                          <Brain size={20} className="text-coffee-medium" />
                        </div>
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Clock size={14} className="mr-1" />
                            <span>{module.duration}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-coffee-medium text-coffee-medium hover:bg-coffee-light/10"
                            onClick={() => {
                              onClose();
                              setTimeout(() => {
                                const element = document.getElementById(module.id);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 300);
                            }}
                          >
                            Start Learning <ArrowRight size={12} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6">
                    <div className="bg-accent-teal/10 p-4 rounded-full inline-flex mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-accent-teal" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">All modules completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      Congratulations! You've completed all available modules.
                    </p>
                    <Button onClick={onClose}>
                      Return to Menu
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Continue Your Learning</CardTitle>
              <CardDescription>Implementation next steps</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-accent-yellow/10 p-1 rounded-full mt-0.5">
                    <CheckCircle2 size={16} className="text-accent-yellow" />
                  </div>
                  <span className="text-sm">Try implementing one AI tool you learned about this week</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-accent-yellow/10 p-1 rounded-full mt-0.5">
                    <CheckCircle2 size={16} className="text-accent-yellow" />
                  </div>
                  <span className="text-sm">Measure how much time you save with your chosen AI tool</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-accent-yellow/10 p-1 rounded-full mt-0.5">
                    <CheckCircle2 size={16} className="text-accent-yellow" />
                  </div>
                  <span className="text-sm">Share your learnings with colleagues to multiply productivity gains</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-accent-yellow/10 p-1 rounded-full mt-0.5">
                    <CheckCircle2 size={16} className="text-accent-yellow" />
                  </div>
                  <span className="text-sm">Return in 2 weeks to take a new assessment and track your progress</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningDashboard; 