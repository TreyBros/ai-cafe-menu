import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';

interface QuizInteractiveProps {
  title: string;
  description: string;
  data: {
    questions: {
      question: string;
      options: string[];
      correctAnswer?: number; // Optional index of correct answer
    }[];
  };
  onComplete: () => void;
}

const QuizInteractive: React.FC<QuizInteractiveProps> = ({ title, description, data, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(data.questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score (if correct answers are provided)
      if (data.questions.some(q => q.correctAnswer !== undefined)) {
        const correctCount = data.questions.reduce((count, q, index) => {
          if (q.correctAnswer !== undefined && q.options[q.correctAnswer] === answers[index]) {
            return count + 1;
          }
          return count;
        }, 0);
        
        setScore(Math.round((correctCount / data.questions.length) * 100));
      } else {
        // If no correct answers are provided, just set a high score
        setScore(100);
      }
      
      setShowResults(true);
    }
  };
  
  const handleComplete = () => {
    onComplete();
  };
  
  if (showResults) {
    return (
      <div className="text-center animate-fade-in">
        <div className="mb-4">
          <div className="inline-block p-4 bg-accent-teal/20 rounded-full mb-3">
            <Award className="h-8 w-8 text-accent-teal" />
          </div>
          <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
          {data.questions.some(q => q.correctAnswer !== undefined) ? (
            <>
              <p className="text-muted-foreground mb-4">Your score: {score}%</p>
              <Progress value={score} className="h-2 mb-6" />
            </>
          ) : (
            <p className="text-muted-foreground mb-6">
              Great job completing the productivity assessment!
            </p>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          {data.questions.map((q, index) => (
            <div key={index} className="text-left p-4 bg-muted/50 rounded-lg">
              <p className="font-medium mb-2">{q.question}</p>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  {q.correctAnswer !== undefined ? (
                    q.options[q.correctAnswer] === answers[index] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">Your answer:</span>
                  )}
                </div>
                <p className="text-sm">{answers[index]}</p>
              </div>
              
              {q.correctAnswer !== undefined && answers[index] !== q.options[q.correctAnswer] && (
                <div className="mt-2 ml-8 text-sm text-muted-foreground">
                  <span className="font-medium">Correct answer:</span> {q.options[q.correctAnswer]}
                </div>
              )}
            </div>
          ))}
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
  
  const question = data.questions[currentQuestion];
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {data.questions.length}
          </span>
          <Progress value={(currentQuestion / (data.questions.length - 1)) * 100} className="w-[60%] h-2" />
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4">{question.question}</h4>
          
          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-2"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer w-full">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={handleNextQuestion}
          disabled={!answers[currentQuestion]}
          className="bg-accent-teal hover:bg-accent-teal/90"
        >
          {currentQuestion < data.questions.length - 1 ? (
            <>
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete Quiz"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuizInteractive; 