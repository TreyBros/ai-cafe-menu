import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
}

interface QuizInteractiveProps {
  title: string;
  description: string;
  data: {
    questions: QuizQuestion[];
  };
  onComplete: () => void;
}

const QuizInteractive: React.FC<QuizInteractiveProps> = ({
  title,
  description,
  data,
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(data.questions.length).fill(''));
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      onComplete();
    }
  };

  const calculateProductivityScore = () => {
    // In a real app, this would calculate a meaningful score
    // For this demo, we'll return a random score
    return Math.floor(Math.random() * 100);
  };
  
  if (quizCompleted) {
    const score = calculateProductivityScore();
    
    return (
      <div className="text-center py-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-accent-teal/20 rounded-full">
            <CheckCircle size={40} className="text-accent-teal" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Productivity Assessment Complete!</h3>
        <p className="mb-4">Your productivity optimization score: <span className="font-bold text-accent-teal">{score}%</span></p>
        <div className="p-4 bg-muted rounded-lg mb-4 text-left">
          <h4 className="font-semibold mb-2">Your personalized recommendations:</h4>
          <ul className="space-y-2 list-disc list-inside">
            <li>Focus on implementing AI email management tools first</li>
            <li>Consider AI meeting assistants to optimize your meeting time</li>
            <li>Explore document automation to speed up repetitive tasks</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          This assessment helps you identify which AI tools would provide the most benefit for your specific workflow.
        </p>
      </div>
    );
  }
  
  const question = data.questions[currentQuestion];
  
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Card className="p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">
          Question {currentQuestion + 1} of {data.questions.length}
        </h4>
        <p className="mb-4">{question.question}</p>
        
        <RadioGroup 
          className="space-y-3" 
          value={answers[currentQuestion]}
          onValueChange={handleAnswer}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="bg-accent-teal hover:bg-accent-teal/90"
        >
          {currentQuestion < data.questions.length - 1 ? (
            <>Next Question <ArrowRight size={16} className="ml-2" /></>
          ) : (
            'Complete Assessment'
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuizInteractive; 