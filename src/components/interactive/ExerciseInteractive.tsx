import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Send, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  Database,
  Award,
  Terminal,
  BarChart
} from 'lucide-react';

interface ExerciseInteractiveProps {
  title: string;
  description: string;
  data: {
    sampleQueries?: string[];
    scenarios?: string[];
  };
  onComplete: () => void;
}

const ExerciseInteractive: React.FC<ExerciseInteractiveProps> = ({ title, description, data, onComplete }) => {
  const [userQuery, setUserQuery] = useState('');
  const [results, setResults] = useState<{ query: string; result: string }[]>([]);
  const [completedQueries, setCompletedQueries] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState('');
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('exercise');
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { sampleQueries, scenarios } = data;
  
  // Helper function to generate chart data visualization
  const generateVisualization = (query: string) => {
    // Simplified for demo - in a real app this would use actual data visualizations
    const salesData = {
      "Sales trends over the last quarter": `
📊 Quarterly Sales Trend

Q1: $245,000 ↑ 12%
Q2: $278,000 ↑ 13.5%
Q3: $312,000 ↑ 12.2%
Q4: $342,000 ↑ 9.6%

🔍 Key Insights:
- Consistent growth throughout the year
- Highest growth rate in Q2
- Slight slowdown in growth rate during Q4
- Overall annual growth: 11.8%

Would you like to see this data broken down by product category or region?
      `,
      
      "Which product has the highest profit margin?": `
📈 Product Profit Margin Analysis

Top 5 Products by Margin:
1. Premium Software Subscription: 78% 
2. Enterprise Support Package: 65%
3. Cloud Hosting - Enterprise Tier: 61%
4. Professional Services Consultation: 58% 
5. Developer API Package: 52%

🔍 Key Insights:
- Digital products dominate the highest margin category
- Service-based offerings outperform hardware products
- Lowest margin product: Budget Hardware (12%)
- Recommendation: Focus marketing resources on top 3 margin leaders

Would you like to see trend analysis of these margins over time?
      `,
      
      "Forecast revenue for next month based on current trends": `
📈 Revenue Forecast (Next Month)

Projected Revenue: $372,400 ± $15,200
Compared to Current Month: +8.3%

Confidence Level: High (92%)

Forecast Breakdown:
- Subscription Revenue: $218,600 (↑9.2%)
- One-time Purchases: $96,800 (↑6.5%)
- Professional Services: $57,000 (↑8.8%)

🔍 Influencing Factors:
- Seasonal uptick in business spending (positive)
- New product launch impact (positive)
- Market volatility indicator (neutral)

Would you like to adjust any assumptions in this forecast model?
      `
    };
    
    // Default response if none of the sample queries
    let result = `
📊 Analysis Results

Based on your query: "${query}"

I've analyzed the available data and found the following insights:
- Overall positive trend in the requested metrics
- Several outliers that may require further investigation
- Opportunity for 12-15% improvement based on historical patterns

Would you like me to generate a more detailed report or visualization?
    `;
    
    // Check if the query matches or contains key phrases from our sample queries
    for (const sampleQuery of Object.keys(salesData)) {
      if (query.toLowerCase().includes(sampleQuery.toLowerCase()) || 
          sampleQuery.toLowerCase().includes(query.toLowerCase())) {
        result = salesData[sampleQuery];
        break;
      }
    }
    
    return result;
  };
  
  // Generate workflow steps for the selected scenario
  const generateWorkflowSteps = (scenario: string) => {
    const workflowsMap = {
      "Client onboarding process with document collection and welcome emails": [
        "Configure document request trigger when new client signs up",
        "Create automated email requesting necessary documents",
        "Setup document upload portal with auto-categorization",
        "Implement AI verification to check document completeness",
        "Generate personalized welcome sequence based on client type",
        "Schedule automatic follow-ups for missing documents",
        "Create integration with CRM to update client status"
      ],
      
      "Expense reporting workflow with receipt processing and approval routing": [
        "Configure receipt capture via mobile app or email",
        "Setup AI receipt parser to extract merchant, date, amount and category",
        "Create expense categorization rules with accounting code mapping",
        "Implement approval routing based on amount thresholds and departments",
        "Generate expense reports with automatic currency conversion",
        "Create integration with accounting software for reimbursement",
        "Setup automatic reminders for approvers and submitters"
      ],
      
      "Content publishing workflow with review, approval and scheduling steps": [
        "Create content calendar with automated assignment notifications",
        "Implement draft submission process with version tracking",
        "Setup review routing with role-based permissions",
        "Create approval workflow with edit request functionality",
        "Implement content scheduling with platform-specific formatting",
        "Setup automated social media post generation from approved content",
        "Configure analytics tracking and performance reporting"
      ]
    };
    
    // Return the workflow steps for the selected scenario
    return workflowsMap[scenario] || [];
  };
  
  // Handle running a data analysis query
  const handleRunQuery = () => {
    if (!userQuery.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      const result = generateVisualization(userQuery);
      
      // Add the query and result to the results array
      setResults(prev => [...prev, { query: userQuery, result }]);
      
      // Add to completed queries
      setCompletedQueries(prev => [...prev, userQuery]);
      
      // Clear the input
      setUserQuery('');
      
      // Mark as complete after 3 queries
      if (completedQueries.length >= 2) {
        setExerciseComplete(true);
      }
      
      setIsGenerating(false);
    }, 1500);
  };
  
  // Handle selecting a predefined query
  const handleSelectQuery = (query: string) => {
    setUserQuery(query);
  };
  
  // Handle selecting a workflow scenario
  const handleSelectScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    const steps = generateWorkflowSteps(scenario);
    setWorkflowSteps(steps);
    
    // Mark as complete after selecting a scenario and seeing the steps
    setTimeout(() => {
      setExerciseComplete(true);
    }, 500);
  };
  
  // Handle completion of the exercise
  const handleComplete = () => {
    onComplete();
  };
  
  // Completed exercise view
  if (exerciseComplete && activeTab === 'results') {
    return (
      <div className="text-center animate-fade-in">
        <div className="mb-6">
          <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-3">
            <Award className="h-8 w-8 text-accent-teal" />
          </div>
          <h3 className="text-xl font-bold mb-2">Exercise Completed!</h3>
          <p className="text-muted-foreground mb-4">
            You've successfully practiced {sampleQueries ? 'data analysis using natural language' : 'workflow automation'}.
          </p>
          
          <div className="mb-4">
            <div className="font-medium text-sm mb-1">Productivity Improvement</div>
            <Progress value={90} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground">Estimated time saved: {sampleQueries ? '75 minutes' : '4.5 hours'} per week</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 text-left">
          <h4 className="font-medium">Key Skills Acquired:</h4>
          
          {sampleQueries ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Natural Language Data Analysis</p>
                  <p className="text-sm text-muted-foreground">Ask questions about your data in plain language</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Insight Extraction</p>
                  <p className="text-sm text-muted-foreground">Quickly identify patterns and anomalies in complex datasets</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Forecasting and Prediction</p>
                  <p className="text-sm text-muted-foreground">Use AI to generate forward-looking projections</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Automation Design</p>
                  <p className="text-sm text-muted-foreground">Create efficient workflows for repetitive business processes</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Process Optimization</p>
                  <p className="text-sm text-muted-foreground">Identify and eliminate manual steps that can be automated</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                <div>
                  <p className="font-medium">Integration Planning</p>
                  <p className="text-sm text-muted-foreground">Connect different systems for seamless data flow</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleComplete}
          className="bg-accent-teal hover:bg-accent-teal/90"
        >
          Continue Learning
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <Tabs 
        defaultValue="exercise" 
        className="w-full" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercise">
            {sampleQueries ? <BarChart3 className="w-4 h-4 mr-2" /> : <Terminal className="w-4 h-4 mr-2" />}
            {sampleQueries ? 'Data Analysis' : 'Workflow Builder'}
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!exerciseComplete}>
            <BarChart className="w-4 h-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="exercise" className="animate-fade-in">
          {/* Data Analysis Exercise */}
          {sampleQueries && (
            <div>
              <div className="mb-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Available Data Sets</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sales data, product inventory, customer information, financial metrics, and marketing campaign performance
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Ask a question about your data:
                </label>
                <div className="flex gap-2">
                  <Input
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Example: Show me sales trends for the last quarter"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleRunQuery}
                    disabled={!userQuery.trim() || isGenerating}
                  >
                    {isGenerating ? (
                      <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Example queries:</div>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((query, index) => (
                    <Badge 
                      key={index} 
                      variant={completedQueries.includes(query) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSelectQuery(query)}
                    >
                      {completedQueries.includes(query) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {query}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Results Display */}
              {results.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">Analysis Results:</h4>
                  
                  {results.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="bg-accent-teal/80 text-white p-2 text-sm">
                        <span className="font-medium">Query:</span> {item.query}
                      </div>
                      <CardContent className="p-4">
                        <pre className="whitespace-pre-wrap font-sans text-sm">{item.result}</pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {exerciseComplete && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setActiveTab('results')}
                    className="bg-accent-teal hover:bg-accent-teal/90"
                  >
                    View Results <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Workflow Automation Exercise */}
          {scenarios && (
            <div>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Select a workflow scenario to automate:
                </label>
                <div className="space-y-3">
                  {scenarios.map((scenario, index) => (
                    <Card 
                      key={index} 
                      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        selectedScenario === scenario ? 'border-accent-teal ring-1 ring-accent-teal' : ''
                      }`}
                      onClick={() => handleSelectScenario(scenario)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${selectedScenario === scenario ? 'bg-accent-teal/20' : 'bg-muted'}`}>
                            <Terminal className={`h-4 w-4 ${selectedScenario === scenario ? 'text-accent-teal' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <div className="font-medium">{scenario}</div>
                            <div className="text-sm text-muted-foreground">
                              {index === 0 ? 'Difficulty: Easy' : index === 1 ? 'Difficulty: Medium' : 'Difficulty: Advanced'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Workflow Steps */}
              {selectedScenario && workflowSteps.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-4">AI-Generated Workflow:</h4>
                  
                  <div className="space-y-3 ml-4 relative before:absolute before:left-1.5 before:top-1 before:h-full before:w-0.5 before:bg-muted">
                    {workflowSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 pl-6 relative">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-accent-teal z-10"></div>
                        <div className="p-3 bg-muted/50 rounded-lg w-full">
                          <div className="flex justify-between">
                            <div className="font-medium">Step {index + 1}</div>
                            <Badge variant="outline" className="text-xs">
                              {index < 3 ? 'Simple' : index < 5 ? 'Moderate' : 'Advanced'}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => setActiveTab('results')}
                      className="bg-accent-teal hover:bg-accent-teal/90"
                    >
                      Complete Exercise <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="results" className="animate-fade-in">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-3">
                <Award className="h-8 w-8 text-accent-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Exercise Completed!</h3>
              <p className="text-muted-foreground mb-4">
                You've successfully practiced {sampleQueries ? 'data analysis using natural language' : 'workflow automation'}.
              </p>
              
              <div className="mb-4">
                <div className="font-medium text-sm mb-1">Productivity Improvement</div>
                <Progress value={90} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">Estimated time saved: {sampleQueries ? '75 minutes' : '4.5 hours'} per week</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 text-left">
              <h4 className="font-medium">Key Skills Acquired:</h4>
              
              {sampleQueries ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Natural Language Data Analysis</p>
                      <p className="text-sm text-muted-foreground">Ask questions about your data in plain language</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Insight Extraction</p>
                      <p className="text-sm text-muted-foreground">Quickly identify patterns and anomalies in complex datasets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Forecasting and Prediction</p>
                      <p className="text-sm text-muted-foreground">Use AI to generate forward-looking projections</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Automation Design</p>
                      <p className="text-sm text-muted-foreground">Create efficient workflows for repetitive business processes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Process Optimization</p>
                      <p className="text-sm text-muted-foreground">Identify and eliminate manual steps that can be automated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-accent-teal mt-0.5" />
                    <div>
                      <p className="font-medium">Integration Planning</p>
                      <p className="text-sm text-muted-foreground">Connect different systems for seamless data flow</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleComplete}
              className="bg-accent-teal hover:bg-accent-teal/90"
            >
              Continue Learning
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExerciseInteractive; 