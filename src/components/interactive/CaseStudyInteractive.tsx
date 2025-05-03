import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  ListChecks,
  BrainCircuit,
  Settings,
  Lightbulb
} from 'lucide-react';

interface CaseStudyInteractiveProps {
  title: string;
  description: string;
  data: {
    caseStudy: {
      title: string;
      scenario: string;
      challenge: string;
      solution: string;
      results: string;
      questions: string[];
    }
  };
  onComplete: () => void;
}

const CaseStudyInteractive: React.FC<CaseStudyInteractiveProps> = ({ title, description, data, onComplete }) => {
  const [activeSection, setActiveSection] = useState('scenario');
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(data.caseStudy.questions.length).fill(''));
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('case-study');
  const [readSections, setReadSections] = useState<string[]>(['scenario']);
  
  const { caseStudy } = data;
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Mark section as read
    if (!readSections.includes(section)) {
      setReadSections(prev => [...prev, section]);
    }
  };
  
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };
  
  const handleSubmitAnswers = () => {
    setAnswersSubmitted(true);
    
    // Generate AI insights based on the case study
    setInsights([
      "This case demonstrates how AI can dramatically reduce time spent on repetitive document processing tasks.",
      "The combination of document analysis and workflow automation created a multiplier effect on productivity.",
      "Employee satisfaction improved due to reduction in tedious manual work.",
      "The initial investment in AI technology was recovered within 4 months through time savings.",
      "The solution maintained human oversight for critical decisions while automating routine processes."
    ]);
    
    // After a delay, move to insights tab
    setTimeout(() => {
      setActiveTab('insights');
    }, 1000);
  };
  
  const handleComplete = () => {
    onComplete();
  };
  
  const hasReadAllSections = ['scenario', 'challenge', 'solution', 'results'].every(section => 
    readSections.includes(section)
  );
  
  const hasAnsweredQuestions = userAnswers.every(answer => answer.trim().length > 0);
  
  const renderProgress = () => {
    // Calculate progress percentage based on sections read and questions answered
    let progress = 0;
    
    // Each section is worth 20% (4 sections = 80%)
    progress += (readSections.length / 5) * 80;
    
    // Questions are worth the remaining 20%
    if (answersSubmitted) {
      progress += 20;
    } else if (hasAnsweredQuestions) {
      progress += 15;
    } else {
      // Partial credit for partial answers
      const answeredCount = userAnswers.filter(a => a.trim().length > 0).length;
      progress += (answeredCount / userAnswers.length) * 15;
    }
    
    return Math.min(Math.round(progress), 100);
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <Tabs 
        defaultValue="case-study" 
        className="w-full" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="case-study">
            <BookOpen className="w-4 h-4 mr-2" />
            Case Study
          </TabsTrigger>
          <TabsTrigger value="insights" disabled={!answersSubmitted}>
            <BrainCircuit className="w-4 h-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="case-study" className="animate-fade-in">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ListChecks className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Progress: {renderProgress()}%</span>
              </div>
              <Progress value={renderProgress()} className="w-[70%] h-1.5" />
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{caseStudy.title}</h4>
                <Badge variant="outline">Real-world Example</Badge>
              </div>
              
              <div className="flex border-b mt-4">
                <TabsList className="bg-background h-9 grid w-full grid-cols-4">
                  <TabsTrigger 
                    value="scenario" 
                    onClick={() => handleSectionChange('scenario')}
                    className={`data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none rounded-none ${
                      readSections.includes('scenario') && activeSection !== 'scenario' ? 'text-muted-foreground/70' : ''
                    }`}
                  >
                    Scenario
                    {readSections.includes('scenario') && <CheckCircle2 className="w-3 h-3 ml-1 text-accent-teal" />}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="challenge" 
                    onClick={() => handleSectionChange('challenge')}
                    className={`data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none rounded-none ${
                      readSections.includes('challenge') && activeSection !== 'challenge' ? 'text-muted-foreground/70' : ''
                    }`}
                  >
                    Challenge
                    {readSections.includes('challenge') && <CheckCircle2 className="w-3 h-3 ml-1 text-accent-teal" />}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="solution" 
                    onClick={() => handleSectionChange('solution')}
                    className={`data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none rounded-none ${
                      readSections.includes('solution') && activeSection !== 'solution' ? 'text-muted-foreground/70' : ''
                    }`}
                  >
                    Solution
                    {readSections.includes('solution') && <CheckCircle2 className="w-3 h-3 ml-1 text-accent-teal" />}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="results" 
                    onClick={() => handleSectionChange('results')}
                    className={`data-[state=active]:border-b-2 data-[state=active]:border-accent-teal data-[state=active]:shadow-none rounded-none ${
                      readSections.includes('results') && activeSection !== 'results' ? 'text-muted-foreground/70' : ''
                    }`}
                  >
                    Results
                    {readSections.includes('results') && <CheckCircle2 className="w-3 h-3 ml-1 text-accent-teal" />}
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="scenario" className="animate-fade-in mt-0">
                <div className="prose max-w-none">
                  <p>{caseStudy.scenario}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSectionChange('challenge')}
                  >
                    Next: Challenge <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="challenge" className="animate-fade-in mt-0">
                <div className="prose max-w-none">
                  <p>{caseStudy.challenge}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSectionChange('solution')}
                  >
                    Next: Solution <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="solution" className="animate-fade-in mt-0">
                <div className="prose max-w-none">
                  <p>{caseStudy.solution}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSectionChange('results')}
                  >
                    Next: Results <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="animate-fade-in mt-0">
                <div className="prose max-w-none">
                  <p>{caseStudy.results}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveSection('reflection')}
                  >
                    Continue to Reflection <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
          
          {activeSection === 'reflection' && (
            <Card className="mb-6 border-accent-teal/50">
              <CardHeader className="pb-3">
                <h4 className="text-lg font-semibold">Reflection Questions</h4>
                <p className="text-sm text-muted-foreground">
                  Answer the following questions based on the case study you just read.
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {caseStudy.questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <label className="font-medium">{question}</label>
                      <Textarea 
                        placeholder="Enter your answer..."
                        value={userAnswers[index]}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        disabled={answersSubmitted}
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  ))}
                  
                  {answersSubmitted ? (
                    <div className="flex items-center justify-center py-3 bg-accent-teal/10 rounded-md">
                      <CheckCircle2 className="text-accent-teal mr-2 h-5 w-5" />
                      <span>Your answers have been submitted!</span>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-accent-teal hover:bg-accent-teal/90 mt-4"
                      disabled={!hasAnsweredQuestions}
                      onClick={handleSubmitAnswers}
                    >
                      Submit Answers
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="insights" className="animate-fade-in">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-accent-teal h-5 w-5" />
                <h4 className="text-lg font-semibold">AI-Generated Productivity Insights</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on this case study, here are key insights about AI and workplace productivity:
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="bg-accent-teal/20 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                      <Lightbulb className="text-accent-teal h-4 w-4" />
                    </div>
                    <p>{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="text-coffee-dark h-5 w-5" />
                <h4 className="text-lg font-semibold">Application to Your Workplace</h4>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Potential Time Savings</h5>
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-3 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm">75% reduction in processing time</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Implementation Difficulty</h5>
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-3 bg-muted rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm">Medium - requires some technical expertise</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Return on Investment</h5>
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-3 bg-muted rounded-full overflow-hidden">
                      <div className="bg-accent-teal h-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-sm">Excellent - rapid payback period</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleComplete}
              className="bg-accent-teal hover:bg-accent-teal/90"
            >
              <Award className="mr-2 h-5 w-5" />
              Complete Case Study
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseStudyInteractive; 