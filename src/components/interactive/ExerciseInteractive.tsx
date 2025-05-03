import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, Search, ArrowRight, Zap } from 'lucide-react';

interface ExerciseInteractiveProps {
  title: string;
  description: string;
  data: {
    sampleQueries?: string[];
    scenarios?: string[];
  };
  onComplete: () => void;
}

const ExerciseInteractive: React.FC<ExerciseInteractiveProps> = ({
  title,
  description,
  data,
  onComplete
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [activeScenario, setActiveScenario] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Determine if this is a data analysis or workflow automation exercise
  const isDataAnalysis = data.sampleQueries && data.sampleQueries.length > 0;
  const isWorkflowAutomation = data.scenarios && data.scenarios.length > 0;

  const handleSampleQuerySelect = (query: string) => {
    setUserQuery(query);
  };

  const handleScenarioSelect = (scenario: string) => {
    setActiveScenario(scenario);
    setStepCompleted(false);
    setCurrentStep(1);
  };

  const handleDataQuery = () => {
    if (!userQuery) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate mock results based on the query
      let mockResults = [];
      
      if (userQuery.toLowerCase().includes('sales trends')) {
        mockResults = [
          { month: 'January', sales: 45000, trend: '+5%' },
          { month: 'February', sales: 52000, trend: '+15%' },
          { month: 'March', sales: 48000, trend: '-8%' }
        ];
      } else if (userQuery.toLowerCase().includes('profit margin')) {
        mockResults = [
          { product: 'Premium Plan', margin: '72%', rank: 1 },
          { product: 'Standard Plan', margin: '68%', rank: 2 },
          { product: 'Basic Plan', margin: '54%', rank: 3 }
        ];
      } else if (userQuery.toLowerCase().includes('forecast')) {
        mockResults = [
          { month: 'Current', revenue: '$120,000' },
          { month: 'Next (Forecast)', revenue: '$135,000', confidence: '87%' }
        ];
      } else {
        mockResults = [
          { result: 'No specific data found for this query' },
          { suggestion: 'Try asking about sales trends, profit margins, or forecasts' }
        ];
      }
      
      setResults(mockResults);
      setIsLoading(false);
      setStepCompleted(true);
    }, 1500);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setStepCompleted(false);
    } else {
      onComplete();
    }
  };

  const getStepContent = (step: number) => {
    if (isWorkflowAutomation) {
      switch (step) {
        case 1:
          return {
            title: 'Step 1: Identify Trigger Event',
            description: 'Select what starts your automation workflow',
            options: [
              'New form submission',
              'Document uploaded',
              'Scheduled time/date',
              'Manual trigger button'
            ]
          };
        case 2:
          return {
            title: 'Step 2: Add Processing Steps',
            description: 'Select what happens during your workflow',
            options: [
              'Extract data from document',
              'Send notification/email',
              'Update database record',
              'Generate report'
            ]
          };
        case 3:
          return {
            title: 'Step 3: Define Completion Actions',
            description: 'Select how your workflow concludes',
            options: [
              'Send confirmation message',
              'Update dashboard',
              'Schedule follow-up task',
              'Generate completion report'
            ]
          };
        default:
          return { title: '', description: '', options: [] };
      }
    }
    
    return { title: '', description: '', options: [] };
  };

  const handleStepSelection = (option: string) => {
    // In a real app, this would actually build the workflow
    setStepCompleted(true);
  };

  const renderWorkflowBuilder = () => {
    const stepContent = getStepContent(currentStep);
    
    return (
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${currentStep > index + 1 
                    ? 'bg-accent-teal text-white' 
                    : currentStep === index + 1 
                      ? 'bg-accent-teal/20 border border-accent-teal text-accent-teal' 
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {currentStep > index + 1 ? <CheckCircle size={16} /> : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`h-1 w-10 ${
                    currentStep > index + 1 ? 'bg-accent-teal' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        <h3 className="text-lg font-medium mb-2">{stepContent.title}</h3>
        <p className="text-muted-foreground mb-4">{stepContent.description}</p>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {stepContent.options.map((option, index) => (
            <Card 
              key={index}
              className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                stepCompleted && index === 0 ? 'border-accent-teal bg-accent-teal/10' : ''
              }`}
              onClick={() => handleStepSelection(option)}
            >
              {option}
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleNextStep}
            disabled={!stepCompleted}
            className="bg-accent-teal hover:bg-accent-teal/90"
          >
            {currentStep < totalSteps ? (
              <>Next <ArrowRight size={16} className="ml-2" /></>
            ) : (
              'Complete Workflow'
            )}
          </Button>
        </div>
      </div>
    );
  };

  // Render for Data Analysis Exercise
  if (isDataAnalysis) {
    return (
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        {stepCompleted && results ? (
          <div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Results for: "{userQuery}"</h4>
              <div className="bg-muted rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {Object.keys(results[0]).map((key, i) => (
                        <th key={i} className="text-left p-2">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-b border-border/40">
                        {Object.values(row).map((value, j) => (
                          <td key={j} className="p-2">{value as React.ReactNode}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setResults(null);
                    setStepCompleted(false);
                  }}
                >
                  Try Another Query
                </Button>
                <Button 
                  onClick={onComplete}
                  className="bg-accent-teal hover:bg-accent-teal/90"
                >
                  Complete Exercise
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Try asking a question about your data:</h4>
              <div className="flex mb-2">
                <Input 
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Ask a question about your data..."
                  className="flex-1 mr-2"
                />
                <Button 
                  onClick={handleDataQuery}
                  disabled={isLoading || !userQuery}
                  className="bg-accent-teal hover:bg-accent-teal/90"
                >
                  <Search size={16} className="mr-2" />
                  {isLoading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-muted-foreground mb-2">Sample queries:</h4>
                <div className="flex flex-wrap gap-2">
                  {data.sampleQueries?.map((query, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSampleQuerySelect(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render for Workflow Automation Exercise
  if (isWorkflowAutomation) {
    return (
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        {!activeScenario ? (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Select a scenario to automate:</h4>
            <div className="space-y-3">
              {data.scenarios?.map((scenario, index) => (
                <Card 
                  key={index} 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleScenarioSelect(scenario)}
                >
                  <div className="flex items-start">
                    <div className="bg-accent-teal/20 p-2 rounded-full mr-3">
                      <Zap size={16} className="text-accent-teal" />
                    </div>
                    <div>
                      <h5 className="font-medium">{scenario}</h5>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Automating: {activeScenario}</h4>
            </div>
            
            {renderWorkflowBuilder()}
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="text-center py-6">
        <p>Exercise not available</p>
        <Button onClick={onComplete} className="mt-4">Complete</Button>
      </div>
    </div>
  );
};

export default ExerciseInteractive; 