import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Clock,
  RefreshCw,
  Save,
  Settings,
  Timer,
  BarChart2,
  Zap,
  Calendar,
  Mail,
  FileText,
  Database,
  Users,
  Lightbulb,
  CheckSquare,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  defaultTimeHours: number;
  minSavings: number;
  maxSavings: number;
  currentValue: number;
}

interface ProductivityCalculatorProps {
  onClose: () => void;
}

const ProductivityCalculator: React.FC<ProductivityCalculatorProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('calculator');
  const [totalSavings, setTotalSavings] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [percentImprovement, setPercentImprovement] = useState(0);
  const [workdayHours, setWorkdayHours] = useState(8);
  const [salaryPerHour, setSalaryPerHour] = useState(50);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'email',
      name: 'Email & Communications',
      icon: <Mail className="h-4 w-4" />,
      description: 'Writing emails, messages, and other communications',
      defaultTimeHours: 10,
      minSavings: 20,
      maxSavings: 70,
      currentValue: 40
    },
    {
      id: 'documents',
      name: 'Document Creation',
      icon: <FileText className="h-4 w-4" />,
      description: 'Creating reports, documentation, and other content',
      defaultTimeHours: 8,
      minSavings: 30,
      maxSavings: 80,
      currentValue: 50
    },
    {
      id: 'data',
      name: 'Data Analysis',
      icon: <Database className="h-4 w-4" />,
      description: 'Analyzing data, creating reports, making visualizations',
      defaultTimeHours: 6,
      minSavings: 30,
      maxSavings: 60,
      currentValue: 40
    },
    {
      id: 'meetings',
      name: 'Meetings & Calls',
      icon: <Users className="h-4 w-4" />,
      description: 'Time in meetings, preparing for meetings, and follow-ups',
      defaultTimeHours: 8,
      minSavings: 15,
      maxSavings: 50,
      currentValue: 30
    },
    {
      id: 'research',
      name: 'Research & Learning',
      icon: <Lightbulb className="h-4 w-4" />,
      description: 'Finding information, learning new tools and concepts',
      defaultTimeHours: 5,
      minSavings: 20,
      maxSavings: 60,
      currentValue: 40
    },
    {
      id: 'tasks',
      name: 'Task Management',
      icon: <CheckSquare className="h-4 w-4" />,
      description: 'Planning, organizing, and tracking tasks',
      defaultTimeHours: 3,
      minSavings: 10,
      maxSavings: 40,
      currentValue: 20
    }
  ]);

  // Calculate savings whenever tasks or values change
  useEffect(() => {
    let totalWeeklyHours = 0;
    let totalSavedHours = 0;
    
    tasks.forEach(task => {
      const taskHours = task.defaultTimeHours;
      const savedPercentage = task.currentValue / 100;
      const savedHours = taskHours * savedPercentage;
      
      totalWeeklyHours += taskHours;
      totalSavedHours += savedHours;
    });
    
    setTotalSavings(parseFloat(totalSavedHours.toFixed(1)));
    setAnnualSavings(parseFloat((totalSavedHours * 50).toFixed(0))); // 50 working weeks per year
    setPercentImprovement(parseFloat(((totalSavedHours / totalWeeklyHours) * 100).toFixed(1)));
  }, [tasks, workdayHours]);

  const handleSliderChange = (id: string, value: number[]) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, currentValue: value[0] } : task
      )
    );
  };

  const handleReset = () => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        currentValue: Math.round((task.minSavings + task.maxSavings) / 2)
      }))
    );
  };

  const handleSave = () => {
    localStorage.setItem('productivitySettings', JSON.stringify({
      tasks,
      workdayHours,
      salaryPerHour
    }));
    
    toast({
      title: "Settings saved",
      description: "Your productivity calculator settings have been saved.",
      duration: 3000,
    });
  };

  const monetarySavings = Math.round(annualSavings * salaryPerHour);

  return (
    <Card className="border-coffee-light/10 shadow-xl">
      <CardHeader className="bg-coffee-dark text-white pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-accent-teal rounded-full p-1">
              <Zap className="h-5 w-5" />
            </div>
            <CardTitle>AI Productivity Calculator</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <CardDescription className="text-coffee-cream">
          Estimate your potential time savings with AI productivity tools
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-4 border-b">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="calculator" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Results</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="calculator" className="m-0">
            <div className="space-y-6">
              {/* Summary at the top */}
              <div className="bg-coffee-light/5 rounded-lg p-4 border border-coffee-light/10">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-sm text-muted-foreground mb-1">Your Estimated Weekly Time Savings</span>
                  <div className="flex items-end">
                    <motion.span 
                      className="text-4xl font-bold text-accent-teal"
                      key={totalSavings}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {totalSavings}
                    </motion.span>
                    <span className="text-xl ml-1 mb-1 text-muted-foreground">hours/week</span>
                  </div>
                  <motion.div 
                    className="flex items-center mt-1 text-sm text-accent-teal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    <span>{percentImprovement}% productivity improvement</span>
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-coffee-medium/10 p-1 rounded-full">
                          {task.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{task.name}</h4>
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">{task.currentValue}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-10">Low</span>
                      <Slider
                        value={[task.currentValue]}
                        min={task.minSavings}
                        max={task.maxSavings}
                        step={5}
                        onValueChange={(value) => handleSliderChange(task.id, value)}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-10">High</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Currently: {task.defaultTimeHours} hrs/week</span>
                      <motion.span
                        key={task.currentValue}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-accent-teal"
                      >
                        Save: {((task.defaultTimeHours * task.currentValue) / 100).toFixed(1)} hrs/week
                      </motion.span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset to Defaults
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="text-accent-teal border-accent-teal"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="m-0">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Workday Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="workday-hours" className="text-sm text-muted-foreground">
                      Hours in workday
                    </label>
                    <Input
                      id="workday-hours"
                      type="number"
                      min={1}
                      max={24}
                      value={workdayHours}
                      onChange={(e) => setWorkdayHours(parseInt(e.target.value) || 8)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="salary-hour" className="text-sm text-muted-foreground">
                      Hourly value ($)
                    </label>
                    <Input
                      id="salary-hour"
                      type="number"
                      min={1}
                      max={1000}
                      value={salaryPerHour}
                      onChange={(e) => setSalaryPerHour(parseInt(e.target.value) || 50)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Default Task Hours (Weekly)</h3>
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-coffee-medium/10 rounded-full flex items-center justify-center shrink-0">
                        {task.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{task.name}</h4>
                      </div>
                      <Input
                        type="number"
                        min={0}
                        max={50}
                        value={task.defaultTimeHours}
                        onChange={(e) => {
                          setTasks(prevTasks => 
                            prevTasks.map(t => 
                              t.id === task.id ? { ...t, defaultTimeHours: parseInt(e.target.value) || 0 } : t
                            )
                          );
                        }}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">hrs</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset All
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="text-accent-teal border-accent-teal"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="m-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="bg-accent-teal h-1" />
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-teal/10 p-2 rounded-full">
                        <Timer className="h-5 w-5 text-accent-teal" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Weekly Time Savings</h3>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold">{totalSavings}</span>
                          <span className="text-sm ml-1 mb-1 text-muted-foreground">hours/week</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          That's {(totalSavings / workdayHours).toFixed(1)} workdays each week
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-coffee-medium h-1" />
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-coffee-medium/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-coffee-medium" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Annual Time Savings</h3>
                        <div className="flex items-end">
                          <span className="text-3xl font-bold">{annualSavings}</span>
                          <span className="text-sm ml-1 mb-1 text-muted-foreground">hours/year</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          That's {Math.round(annualSavings / workdayHours)} workdays each year
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="overflow-hidden">
                <div className="bg-coffee-light h-1" />
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-coffee-light/10 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-coffee-light" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Productivity Improvement</h3>
                      <p className="text-xs text-muted-foreground">
                        Estimated overall efficiency gain across your workweek
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Progress value={percentImprovement} className="h-4" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-semibold text-accent-teal">{percentImprovement}%</span>
                      <span className="text-muted-foreground ml-1">improvement</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value: </span>
                      <span className="font-semibold">${monetarySavings.toLocaleString()}/year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Top Time-Saving Opportunities</h3>
                <div className="space-y-3">
                  {tasks
                    .slice()
                    .sort((a, b) => {
                      const aSavings = (a.defaultTimeHours * a.currentValue) / 100;
                      const bSavings = (b.defaultTimeHours * b.currentValue) / 100;
                      return bSavings - aSavings;
                    })
                    .slice(0, 3)
                    .map(task => {
                      const savedHours = (task.defaultTimeHours * task.currentValue) / 100;
                      return (
                        <div key={task.id} className="flex items-center gap-3">
                          <div className="bg-coffee-medium/10 p-2 rounded-full">
                            {task.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{task.name}</h4>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Save {savedHours.toFixed(1)} hours/week</span>
                              <span>{task.currentValue}% efficiency gain</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              
              <div className="text-center space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  Ready to start saving {totalSavings} hours every week?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('calculator')}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Recalculate
                  </Button>
                  <Button onClick={onClose} className="bg-accent-teal hover:bg-accent-teal/90">
                    <Share2 className="h-4 w-4 mr-1" />
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ProductivityCalculator; 