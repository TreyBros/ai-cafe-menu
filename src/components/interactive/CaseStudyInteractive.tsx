import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, LucideIcon, Building, Users, AlertCircle, LineChart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CaseStudyInteractiveProps {
  title: string;
  description: string;
  data: {
    companyType?: string;
    challenge?: string;
    solution?: string;
    results?: string;
  };
  onComplete: () => void;
}

const CaseStudyInteractive: React.FC<CaseStudyInteractiveProps> = ({
  title,
  description,
  data,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  
  const steps = [
    { 
      title: 'The Challenge', 
      icon: AlertCircle, 
      content: data.challenge || 'No challenge information provided.',
      question: 'What would you identify as the root cause of this problem?',
      options: [
        'Information silos across different teams and systems',
        'Lack of proper knowledge management tools',
        'Inefficient search capabilities',
        'Poor onboarding processes'
      ],
      correctAnswer: 'Information silos across different teams and systems'
    },
    { 
      title: 'The Solution', 
      icon: Building, 
      content: data.solution || 'No solution information provided.',
      question: 'Which aspect of the solution was likely most impactful?',
      options: [
        'Implementing a centralized repository',
        'Adding natural language search capabilities',
        'Creating a unified knowledge structure',
        'Training employees on the new system'
      ],
      correctAnswer: 'Adding natural language search capabilities'
    },
    { 
      title: 'The Results', 
      icon: LineChart, 
      content: data.results || 'No results information provided.',
      question: 'What additional benefit might this company experience?',
      options: [
        'Reduced IT support tickets',
        'Improved customer satisfaction scores',
        'Better cross-team collaboration',
        'All of the above'
      ],
      correctAnswer: 'All of the above'
    }
  ];

  const handleSelectAnswer = (answer: string) => {
    if (currentStep < steps.length) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentStep] = answer;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  if (quizCompleted) {
    return (
      <div className="text-center py-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-accent-teal/20 rounded-full">
            <CheckCircle size={40} className="text-accent-teal" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Case Study Complete!</h3>
        <p className="mb-4">
          You've completed the case study and learned how AI knowledge management
          can transform workplace productivity.
        </p>
        <div className="p-4 bg-muted rounded-lg mb-4 text-left">
          <h4 className="font-semibold mb-2">Key Takeaways:</h4>
          <ul className="space-y-2 list-disc list-inside">
            <li>AI-powered knowledge management can reduce information retrieval time by 75%</li>
            <li>Natural language search makes finding information intuitive for all employees</li>
            <li>Centralized knowledge bases improve cross-team collaboration</li>
            <li>These solutions pay for themselves through improved productivity</li>
          </ul>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {/* Company Info */}
      {data.companyType && (
        <div className="mb-6 flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Users className="text-muted-foreground" size={18} />
          <span>{data.companyType}</span>
        </div>
      )}
      
      {/* Progress Steps */}
      <div className="flex items-center space-x-2 mb-6">
        {steps.map((step, index) => {
          const StepIconComponent = step.icon;
          return (
            <React.Fragment key={index}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${currentStep > index 
                    ? 'bg-accent-teal text-white' 
                    : currentStep === index 
                      ? 'bg-accent-teal/20 border border-accent-teal text-accent-teal' 
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {currentStep > index ? 
                  <CheckCircle size={16} /> : 
                  <StepIconComponent size={16} />
                }
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`h-1 w-8 ${
                    currentStep > index ? 'bg-accent-teal' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Current Step Content */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <StepIcon size={20} className="mr-2 text-accent-teal" />
          {currentStepData.title}
        </h3>
        <Card className="p-4 mb-6">
          <p>{currentStepData.content}</p>
        </Card>
        
        {/* Question */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{currentStepData.question}</h4>
          <div className="space-y-2">
            {currentStepData.options.map((option, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-colors
                  ${selectedAnswers[currentStep] === option 
                    ? 'border-accent-teal bg-accent-teal/10' 
                    : 'border-muted hover:bg-muted/50'
                  }`}
                onClick={() => handleSelectAnswer(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNextStep}
            disabled={!selectedAnswers[currentStep]}
            className="bg-accent-teal hover:bg-accent-teal/90"
          >
            {currentStep < steps.length - 1 ? (
              <>Continue <ArrowRight size={16} className="ml-2" /></>
            ) : (
              'Complete Case Study'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyInteractive; 